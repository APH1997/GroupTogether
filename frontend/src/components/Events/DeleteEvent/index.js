import {useDispatch} from "react-redux"
import { useModal } from "../../../context/Modal"
import {useHistory} from "react-router-dom";
import { deleteEventThunk } from "../../../store/events";
import { getGroupDetailsThunk } from "../../../store/groups";

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
        <>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this event?</p>
            <div>
                <button onClick={handleDelete}>Yes (Delete Event)</button>
                <button onClick={closeModal}>No (Keep Event)</button>
            </div>
        </>
    )
}

export default DeleteConfirmModal
