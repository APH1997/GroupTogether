import GroupForm from "./GroupForm";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { getGroupDetailsThunk } from "../../store/groups";
import {useEffect} from 'react';

const EditGroupForm = () => {
    const dispatch = useDispatch()
    const {groupId} = useParams();
    const group = useSelector(state => state.groups.singleGroup)

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId));

    }, [dispatch, groupId])


    if(!group) return <h1>Loading...</h1>
    return (
        <GroupForm formType="Update" group={group} />
    )
}
export default EditGroupForm
