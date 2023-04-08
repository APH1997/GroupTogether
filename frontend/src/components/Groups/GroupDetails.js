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
            <div className="upperDetails">
                <div className="upperLeft">
                    <NavLink to="/groups/all">Back to Groups</NavLink>
                    <img src=""></img>
                </div>

                {/* -right side
        ---Group name
        ---city, state
        ---Organize by firstName, lastName
        ---Join this Group Button */}
                <div className="upperRight">

                </div>

                {group.id}
            </div>
            <div className="lowerDetails">
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
