

import { useModal } from "../../../context/Modal"

function DeleteConfirmModal (){
    const {closeModal} = useModal();

    const handleDelete = () => {
        //dispatch thunk, redirect to all groups
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
