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

    const groupsObj = useSelector(state => state.groups.allGroups);
    const groupsList = Object.values(groupsObj)


    useEffect(() => {
        dispatch(getGroupsThunk());
    }, [])

    return (
        <>
            <h2>
                <NavLink to="">Events</NavLink>
                <NavLink to="/groups/all">Groups</NavLink>
            </h2>
            <h3>Groups in Meetup</h3>
            <div className="groups-card-display">
                {groupsList.length > 0 &&
                    groupsList.map(group => {
                        console.log("groupsList", group);
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
