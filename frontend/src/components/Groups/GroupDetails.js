import { getGroupDetailsThunk } from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory} from "react-router-dom";
import { useEffect } from "react";
import EventsCard from "../Events/EventCard";
import DeleteButton from "./DeleteGroup/DeleteGroupButton";

function GroupDetails() {
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
    const pastEvents = [];
    if (eventsArr?.length){
        for (let event of eventsArr){
            if (new Date(event.startDate) > new Date()){
                futureEvents.push(event)
            } else pastEvents.push(event)
        }
    }

    if (!group) return <h1>Loading...</h1>

    console.log("this is the group:",group)
    return (
        <>
            <div className="upper-details">
                <div className="upper-left">
                    <NavLink to="/groups/all">Back to Groups</NavLink>
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
                    <button onClick={() => alert('Feature coming soon')}>Join this group</button>}
                    {user && user.id === group.organizerId &&
                        <>
                        <button id="organizer-btn-create">Create Event</button>
                        <button onClick={() => history.push(`/groups/${groupId}/edit`)}id="organizer-btn-update">Update</button>
                        <DeleteButton groupId={groupId} />
                        </>
                    }
                </div>
            </div>
            <div className="lower-details">
                <div className="organizer-details">
                    <h3>Organizer</h3>
                    <p>{group.Organizer.firstName} {group.Organizer.lastName}</p>
                </div>
                <div className="details-block">
                    <h3>What's all this, then?</h3>
                    <p>{group.about}</p>
                </div>
                {/* TODO: PAST AND FUTURE EVENTS----------------------------------- */}
                <div className="current-group-events">
                    <div className="upcoming-events">
                        {futureEvents.length > 0 &&
                        <h2>Upcoming Events ({futureEvents.length})</h2>}
                        {futureEvents.length > 0 && futureEvents.map(event => {
                            return (
                                <EventsCard id={event.id} event={event}/>
                            )
                        })}
                    </div>
                    <div className="past-events">
                        {pastEvents.length > 0 &&
                        <h2>Past Events ({pastEvents.length})</h2>}
                        {pastEvents.length > 0 &&
                            pastEvents.map(event => {
                                return (
                                    <EventsCard id={event.id} event={event}/>
                                )
                            })}
                    </div>
                </div>


            </div>
        </>
    )
}

export default GroupDetails;
