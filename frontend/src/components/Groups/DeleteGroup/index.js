import {useDispatch, useSelector} from "react-redux"
import { useModal } from "../../../context/Modal"
import {useHistory} from "react-router-dom";
import { deleteGroupThunk, deleteMembershipThunk } from "../../../store/groups";
import { getEventsThunk } from "../../../store/events";
import './DeleteGroupModal.css';


function DeleteConfirmModal ({groupId, membership, manage}){
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const {closeModal} = useModal();

    const handleDelete = async () => {
        const deleted = await dispatch(deleteGroupThunk(groupId));

        if (deleted.message){
            await dispatch(getEventsThunk())
            .then(closeModal())
            .then(!manage ? history.push('/groups/all') : null)
        } else return deleted;

    }

    async function leaveGroup(){
        await dispatch(deleteMembershipThunk(groupId, user.id))
        .then(closeModal())
    }

    if (!user) return null
    return (
        <div className="delete-form">
            <h2>{membership ? "Wait!" : "Confirm Delete"}</h2>
            <p>{membership ? "Are you sure you want to leave this group?" : "Are you sure you want to remove this group?"}</p>
            <div>
                {(membership &&
                <button id="delete-yes" onClick={leaveGroup}>Yes, let me out!</button>)
                ||
                <button id="delete-yes" onClick={handleDelete}>Yes (Delete Group)</button>
                }
                <button id="delete-no" onClick={closeModal}>No, I want to {membership ? "stay" : "Keep this group"}</button>
            </div>
        </div>
    )
}

export default DeleteConfirmModal
