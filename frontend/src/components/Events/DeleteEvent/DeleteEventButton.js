import React from "react";
import DeleteConfirmModal from "./index";
import { useModal } from "../../../context/Modal";

function DeleteButton({eventId}) {
    const {setModalContent} = useModal()

    const onClick = () => {
        setModalContent(<DeleteConfirmModal eventId={eventId}/>)
    }
    return (
            <button onClick={onClick}>
                Delete
            </button>
    )
}

export default DeleteButton;
