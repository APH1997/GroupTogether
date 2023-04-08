import { getGroupDetailsThunk } from "../../store/groups";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

function GroupDetails(){

    const dispatch = useDispatch()
    const {groupId} = useParams();

    const group = useSelector(state => state.groups)[1];

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId));
    }, [])

    return (
        <div>{group.id}</div>
    )
}

export default GroupDetails;
