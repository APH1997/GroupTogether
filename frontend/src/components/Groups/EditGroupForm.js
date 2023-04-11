import GroupForm from "./GroupForm";
import {useParams} from "react-router-dom"
import {useSelector} from 'react-redux'

const EditGroupForm = () => {
    const {groupId} = useParams();
    const currGroup = useSelector(state => state.groups.allGroups[groupId])

    return (
        <GroupForm type="Update" group={currGroup} />
    )
}
export default EditGroupForm
