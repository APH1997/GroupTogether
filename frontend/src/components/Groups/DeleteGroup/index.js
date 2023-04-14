import {useDispatch} from "react-redux"
import { useModal } from "../../../context/Modal"
import {useHistory} from "react-router-dom";
import { deleteGroupThunk } from "../../../store/groups";
import { getEventsThunk } from "../../../store/events";

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
        <>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this group?</p>
            <div>
                <button onClick={handleDelete}>Yes (Delete Group)</button>
                <button onClick={closeModal}>No (Keep Group)</button>
            </div>
        </>
    )
}

export default DeleteConfirmModal
