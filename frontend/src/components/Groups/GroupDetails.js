import { deleteMembershipThunk, getGroupDetailsThunk, requestMembershipThunk } from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import EventsCard from "../Events/EventCard";
import DeleteButton from "./DeleteGroup/DeleteGroupButton";
import { useModal } from "../../context/Modal";
import DeleteConfirmModal from "./DeleteGroup";

function GroupDetails() {
    const {setModalContent} = useModal()
    const history = useHistory();
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const group = useSelector(state => state.groups.singleGroup);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId));

    }, [dispatch])

    if (!Object.values(group).length) return <h1>loading...</h1>


    const eventsArr = group.Events

    const futureEvents = [];
    const orderedFutureEvents = [];

    const pastEvents = [];
    const orderedPastEvents = [];

    //Order the events
    if (eventsArr?.length) {
        for (let event of eventsArr) {
            if (new Date(event.startDate) > new Date()) {
                futureEvents.push(event)
            } else pastEvents.push(event)
        }

        while (futureEvents.length) {
            let currMin = Infinity;
            let currEvent;
            let currMinIndex;
            for (let i = 0; i < futureEvents.length; i++) {
                const event = futureEvents[i];
                if (new Date(event.startDate) < currMin) {
                    currMin = new Date(event.startDate);
                    currEvent = event;
                    currMinIndex = i;
                }
            }
            orderedFutureEvents.push(currEvent);
            futureEvents.splice(currMinIndex, 1);
        }

        while (pastEvents.length) {
            let currMax = -Infinity;
            let currEvent;
            let currMaxIndex;
            for (let i = 0; i < pastEvents.length; i++){
                const event = pastEvents[i];
                if (new Date(event.startDate) > currMax){
                    currMax = new Date(event.startDate);
                    currEvent = event;
                    currMaxIndex = i;
                }
            }
            orderedPastEvents.push(currEvent);
            pastEvents.splice(currMaxIndex, 1);
        }
    }

    function requestMembership(){
        dispatch(requestMembershipThunk(group.id))
    }
    function deleteOwnMembership(){
        dispatch(deleteMembershipThunk(group.id, user.id))
    }
    function leaveGroup(){
        setModalContent(<DeleteConfirmModal groupId={groupId} membership={true}/>)
    }

    if (!group) return <h1>Loading...</h1>

    return (
        <>
            <div className="upper-details">
                <div className="upper-left">
                    <span><NavLink to="/groups/all">Back to Groups</NavLink></span>
                    <img src={group.GroupImages?.length ? group.GroupImages[0]?.url : ''}></img>
                </div>
                <div className="upper-right">
                    <div>
                        <h2>{group.name}</h2>
                        <p>{group.city}, {group.state}</p>
                        {Object.values(group)?.length > 0 && <h4>{group.Events?.length || 0} event{group.Events?.length > 1 ? 's' : ''} · {group.private ? "Private" : "Public"}</h4>}
                        <p>Organized by: {group.Organizer.firstName} {group.Organizer.lastName}</p>
                    </div>
                    {user && user.id !== group.organizerId &&
                    (!group.Memberships[user.id] && <button id="join-group-btn" onClick={requestMembership}>Join this group</button>)
                    || (group.Memberships[user.id].status
                        === "pending" ?
                        <div className="pending-btns">
                            <button disabled={true} id="pending-btn">Pending...</button>
                            <button id="cancel-pending-btn" onClick={deleteOwnMembership}>Cancel</button>
                        </div>
                        : user.id !== group.organizerId && <button id="leave-group-btn" onClick={leaveGroup}>Leave Group</button>)
                        }
                    {user && user.id === group.organizerId &&
                        <div className="organizer-buttons-container">
                            <button onClick={() => history.push(`/groups/${groupId}/events/new`)} id="organizer-btn-create">Create Event</button>
                            <button onClick={() => history.push(`/groups/${groupId}/edit`)} id="organizer-btn-update">Update</button>
                            <DeleteButton groupId={groupId} />
                            <button id="organizer-btn-manage">Manage Group</button>

                        </div>
                    }
                </div>
            </div>
            <div className="group-details-lower-background">

                <div className="lower-details">
                    <div className="organizer-details">
                        <h3>Organizer</h3>
                        <p>{group.Organizer.firstName} {group.Organizer.lastName}</p>
                    </div>
                    <div className="details-block">
                        <h3>What we're about</h3>
                        <p>{group.about}</p>
                    </div>
                    <div className="current-group-events">
                        <div className="upcoming-events">
                            {orderedFutureEvents.length > 0 &&
                                <h2>Upcoming Events ({orderedFutureEvents.length})</h2>}
                            {orderedFutureEvents.length > 0 && orderedFutureEvents.map(event => {
                                return (
                                    <EventsCard id={event.id} event={event} group={group} />
                                )
                            })}
                        </div>
                        <div className="past-events">
                            {orderedPastEvents.length > 0 &&
                                <h2>Past Events ({orderedPastEvents.length})</h2>}
                            {orderedPastEvents.length > 0 &&
                                orderedPastEvents.map(event => {
                                    return (
                                        <EventsCard id={event.id} event={event} group={group} />
                                    )
                                })}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default GroupDetails;
