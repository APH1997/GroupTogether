import React, { useState, useEffect, useRef } from "react";
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";

function DeleteButton() {
    const history = useHistory();
    const dispatch = useDispatch();
    //I think I'll need these:
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    return (
        <button></button>
    )
}

export default DeleteButton;
