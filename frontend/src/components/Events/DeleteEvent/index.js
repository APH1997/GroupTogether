import {useDispatch} from "react-redux"
import { useModal } from "../../../context/Modal"
import {useHistory} from "react-router-dom";
// import { deleteGroupThunk } from "../../../store/groups";

function DeleteConfirmModal ({groupId}){
    const dispatch = useDispatch();
    const history = useHistory();

    const {closeModal} = useModal();

    const handleDelete = () => {
        // dispatch(deleteGroupThunk(groupId));
        closeModal();
        history.push('/events/all')
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
