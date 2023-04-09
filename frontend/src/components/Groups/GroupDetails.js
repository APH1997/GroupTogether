import { getGroupDetailsThunk } from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./GroupDetails.css";

function GroupDetails() {

    const dispatch = useDispatch()
    const { groupId } = useParams();
    const group = useSelector(state => state.groups.singleGroup);
    console.log(group);
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

                {/* -right side
        ---Group name
        ---city, state
        ---Organize by firstName, lastName
        ---Join this Group Button */}
                <div className="upper-right">
                    <div>
                        <h2>{group.name}</h2>
                        <p>{group.city}, {group.state}</p>
                        {Object.values(group).length > 0 && <h4>{group.Events.length} event{Math.abs(group.Events.length) > 1 ? 's' : ''} · {group.private ? "Private" : "Public"}</h4>}
                        <p>Organized by {group.Organizer.firstName} {group.Organizer.lastName}</p>
                    </div>
                    <button onClick={() => alert('Feature coming soon')}>Join this group</button>
                </div>
            </div>
            <div className="lower-details">
                <div className="organizer-details">
                    <h3>Organizer</h3>
                    <p>{group.Organizer.firstName} {group.Organizer.lastName}</p>
                </div>
                <div className="details-block">

                </div>
                <div className="current-group-events">
                    <div className="upcoming-events"></div>
                    <div className="past-events"></div>
                </div>
                {/*
            -About (description)
            -Upcoming Events (#) (if applicable)
            -Past Events (#) (if applicable)
            */}

            </div>
        </>
    )
}

export default GroupDetails;
