import {useDispatch} from "react-redux"
import { useModal } from "../../../context/Modal"
import {useHistory} from "react-router-dom";
import { deleteEventThunk } from "../../../store/events";
import { getGroupDetailsThunk } from "../../../store/groups";
import './DeleteEventModal.css'

function DeleteConfirmModal ({eventId, groupId}){
    const dispatch = useDispatch();
    const history = useHistory();

    const {closeModal} = useModal();

    const handleDelete = async () => {
        const deleted = await dispatch(deleteEventThunk(eventId))

        if (deleted.message){
            await dispatch(getGroupDetailsThunk(groupId))
                .then(closeModal())
                .then(history.push(`/groups/${groupId}`))
        } else {
            return deleted
        }

    }

    return (
        <div className="delete-form">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this event?</p>
            <div>
                <button id="event-delete-yes" onClick={handleDelete}>Yes (Delete Event)</button>
                <button id="event-delete-no" onClick={closeModal}>No (Keep Event)</button>
            </div>
        </div>
    )
}

export default DeleteConfirmModal
