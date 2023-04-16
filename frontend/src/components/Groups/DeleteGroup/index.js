import {useDispatch} from "react-redux"
import { useModal } from "../../../context/Modal"
import {useHistory} from "react-router-dom";
import { deleteGroupThunk } from "../../../store/groups";
import { getEventsThunk } from "../../../store/events";
import './DeleteGroupModal.css';

function DeleteConfirmModal ({groupId}){
    const dispatch = useDispatch();
    const history = useHistory();

    const {closeModal} = useModal();

    const handleDelete = async () => {
        const deleted = await dispatch(deleteGroupThunk(groupId));

        if (deleted.message){
            await dispatch(getEventsThunk())
            .then(closeModal())
            .then(history.push('/groups/all'))
        } else return deleted;

    }

    return (
        <div className="delete-form">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this group?</p>
            <div>
                <button id="delete-yes" onClick={handleDelete}>Yes (Delete Group)</button>
                <button id="delete-no" onClick={closeModal}>No (Keep Group)</button>
            </div>
        </div>
    )
}

export default DeleteConfirmModal
