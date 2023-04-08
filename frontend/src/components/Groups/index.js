import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getGroupsThunk } from '../../store/groups';
import { useDispatch } from "react-redux";
import {useEffect} from 'react';

function GroupsPage(){
    const dispatch = useDispatch();

    const groups = useSelector(state => state.groups);
    console.log(groups);

    useEffect(() => {
        dispatch(getGroupsThunk());
    }, [])

    return (
        <>
            <h1>It's the groups page!</h1>
            {Object.values(groups).length > 0 &&
                <div>GroupCard Compoent w/ group as prop</div>
            }
            <NavLink exact to="/">Home</NavLink>
        </>
    )
}

export default GroupsPage;
