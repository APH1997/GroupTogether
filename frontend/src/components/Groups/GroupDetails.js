import { getGroupDetailsThunk } from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { useEffect } from "react";

function GroupDetails() {

    const dispatch = useDispatch()
    const { groupId } = useParams();
    const group = useSelector(state => state.groups)[groupId];


    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId));
    }, [])

    return (
        <>
            <div className="upper-details">
                <div className="upper-left">
                    <NavLink to="/groups/all">Back to Groups</NavLink>
                    <img src=""></img>
                </div>

                {/* -right side
        ---Group name
        ---city, state
        ---Organize by firstName, lastName
        ---Join this Group Button */}
                <div className="upper-right">
                    <h2>{group.name}</h2>
                    <h4>{group.city}, {group.state}</h4>
                </div>

                {group.id}
            </div>
            <div className="lower-details">
                {/*
            -Organizer
            -firstName lastName
            -About (description)
            -Upcoming Events (#) (if applicable)
            -Past Events (#) (if applicable)
            */}
            </div>
        </>
    )
}

export default GroupDetails;
