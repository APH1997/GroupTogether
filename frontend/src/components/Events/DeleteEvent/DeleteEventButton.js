import React from "react";
import DeleteConfirmModal from "./index";
import { useModal } from "../../../context/Modal";

function DeleteButton({eventId, groupId}) {
    const {setModalContent} = useModal()

    const onClick = () => {
        setModalContent(<DeleteConfirmModal eventId={eventId} groupId={groupId}/>)
    }
    return (
            <button onClick={onClick}>
                Delete
            </button>
    )
}

export default DeleteButton;
