import { getGroupDetailsThunk } from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { useEffect } from "react";


function GroupDetails() {

    const dispatch = useDispatch()
    const { groupId } = useParams();
    const group = useSelector(state => state.groups.singleGroup);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId));
    }, [dispatch])



    if (!Object.values(group).length) return <h1>loading...</h1>

    return (
        <>
            <div className="upper-details">
                <div className="upper-left">
                    <NavLink to="/groups/all">Back to Groups</NavLink>
                    <img src={group.GroupImages[0].url}></img>
            </div>
                <div className="upper-right">
                    <div>
                        <h2>{group.name}</h2>
                        <p>{group.city}, {group.state}</p>
                        {Object.values(group).length > 0 && <h4>{group.Events.length} event{Math.abs(group.Events.length) > 1 ? 's' : ''} · {group.private ? "Private" : "Public"}</h4>}
                        <p>Organized by: {group.Organizer.firstName} {group.Organizer.lastName}</p>
                    </div>
                    {user && user.id !== group.organizerId &&
                    <button onClick={() => alert('Feature coming soon')}>Join this group</button>}
                    {user && user.id === group.organizerId &&
                        <>
                        <button id="organizer-btn-create">Create Event</button>
                        <button id="organizer-btn-update">Update</button>
                        <button id="organizer-btn-delete">Delete</button>
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

                    </div>
                    <div className="past-events"></div>
                </div>


            </div>
        </>
    )
}

export default GroupDetails;
