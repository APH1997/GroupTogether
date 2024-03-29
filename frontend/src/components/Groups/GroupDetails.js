import { deleteMembershipThunk, getGroupDetailsThunk, requestMembershipThunk } from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import EventsCard from "../Events/EventCard";
import DeleteButton from "./DeleteGroup/DeleteGroupButton";
import { useModal } from "../../context/Modal";
import DeleteConfirmModal from "./DeleteGroup";
import ManageGroup from "./ManageGroupModal";
import { getEventsThunk } from "../../store/events";

function GroupDetails() {
    const {setModalContent} = useModal()
    const history = useHistory();
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const group = useSelector(state => state.groups.singleGroup);
    const user = useSelector(state => state.session.user);
    const events = useSelector(state => state.events.allEvents);

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId));
        if (!Object.values(events).length){
            dispatch(getEventsThunk())
        }
    }, [dispatch])

    if (!Object.values(group).length) return <h1>loading...</h1>

    const eventsArr = Object.values(events).filter(ele => ele.groupId == groupId)


    const futureEvents = [];
    let orderedFutureEvents = [];

    const pastEvents = [];
    let orderedPastEvents = [];

    //Order the events
    if (eventsArr?.length) {
        for (let event of eventsArr) {
            if (new Date(event.startDate) > new Date()) {
                futureEvents.push(event)
            } else pastEvents.push(event)
        }
        orderedFutureEvents = futureEvents.sort((a,b) => new Date(a.startDate) - new Date(b.startDate))
        orderedPastEvents = pastEvents.sort((a,b) => new Date(b.startDate) - new Date(a.startDate))
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
    function manageGroup(){
        setModalContent(<ManageGroup group={group}/>)
    }

    if (!group) return <h1>Loading...</h1>

    return (
        <>
            <div className="upper-details">
                <div className="upper-left">
                    <span><NavLink to="/groups/all">Back to Groups</NavLink></span>
                    <img src={group.GroupImages?.length ? group.previewImgUrl : "https://group-together-pics.s3.us-east-2.amazonaws.com/defaultGroup.jpeg"}></img>
                </div>
                <div className="upper-right">
                    <div>
                        <h2>{group.name}</h2>
                        <p>{group.city}, {group.state}</p>
                        {Object.values(group)?.length > 0 && <h4>{group.Events?.length || 0} event{group.Events?.length > 1 ? 's' : group.Events?.length === 0 ? 's' : ''} · {group.private ? "Private" : "Public"}</h4>}
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
                            <button onClick={manageGroup} className="organizer-btn-manage">Manage</button>

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
