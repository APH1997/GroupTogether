import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getGroupsThunk } from '../../store/groups';
import { useDispatch } from "react-redux";
import {useEffect} from 'react';
import GroupsCard from './GroupCard';
import "./GroupCard.css"

function GroupsPage(){
    const dispatch = useDispatch();

    const groupsObj = useSelector(state => state.groups);
    const groupsList = Object.values(groupsObj)


    useEffect(() => {
        dispatch(getGroupsThunk());
    }, [])

    return (
        <>
            <h1>It's the groups page!</h1>
            <div className="groups-card-display">
                {groupsList.length > 0 &&
                    groupsList.map(group => {
                        return (
                            <GroupsCard group={group}/>
                            )
                        })
                    }
            </div>
            <NavLink exact to="/">Home</NavLink>
        </>
    )
}

export default GroupsPage;
