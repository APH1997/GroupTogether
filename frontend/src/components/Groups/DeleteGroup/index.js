import {useDispatch} from "react-redux"
import { useModal } from "../../../context/Modal"
import {useHistory} from "react-router-dom";
import { deleteGroupThunk } from "../../../store/groups";

function DeleteConfirmModal ({groupId}){
    const dispatch = useDispatch();
    const history = useHistory();

    const {closeModal} = useModal();

    const handleDelete = () => {
        dispatch(deleteGroupThunk(groupId));
        closeModal();
        history.push('/groups/all')
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
