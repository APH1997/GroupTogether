

import { useModal } from "../../../context/Modal"

function DeleteConfirmModal (){
    const {closeModal} = useModal();
    const handleClose = () => {
        //need to figure out how to close modal lol
        closeModal();
    }
    const handleDelete = () => {
        //dispatch thunk, redirect to all groups
    }

    return (
        <>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this group?</p>
            <div>
                <button onClick={handleDelete}>Yes (Delete Group)</button>
                <button onClick={handleClose}>No (Keep Group)</button>
            </div>
        </>
    )
}

export default DeleteConfirmModal
