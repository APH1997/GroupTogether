import React, { useState, useEffect, useRef } from "react";
import DeleteConfirmModal from "./index";
import { useModal } from "../../../context/Modal";

function DeleteButton() {
    const {setModalContent} = useModal()

    const onClick = () => {
        setModalContent(<DeleteConfirmModal />)
    }
    return (
            <button onClick={onClick} id="organizer-btn-delete">
                Delete
            </button>
    )
}

export default DeleteButton;
