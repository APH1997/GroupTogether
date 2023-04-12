import React, { useState, useEffect, useRef } from "react";
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteConfirmModal from "./index";

function DeleteButton() {
    const history = useHistory();
    const dispatch = useDispatch();
    //I think I'll need these:
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    //Function to set showMenu = true
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    //On menu open, define function
    //and event listeners  for closing when clicking outside
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

    //The button that is displayed on group details
    //it will wrap OpenModalMenuItem which takes the text and modal component
    //Need to figure out what modal component does
    return (
        <button>
            <OpenModalMenuItem
            itemText="Delete"
            modalComponent={<DeleteConfirmModal />}
            />
        </button>
    )
}

export default DeleteButton;
