import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getGroupsThunk } from '../../store/groups';
import { useDispatch } from "react-redux";
import {useEffect} from 'react';
import GroupsCard from './GroupCard';
import "./GroupCard.css"

function GroupsPage({manage, user}){
    const dispatch = useDispatch();
    const groupsObj = useSelector(state => state.groups.allGroups);
    const groupsList = Object.values(groupsObj)
  

        console.log(groupsList)



    useEffect(() => {
        dispatch(getGroupsThunk());
    }, [])
    if (!groupsList.length) return <h1>Loading...</h1>
    return (
        <>
            <div className="all-groups-header">
                <h2>
                    <NavLink id="other-nav"to="/events/all">Events</NavLink>
                    <NavLink id="curr-nav"to="/groups/all">Groups</NavLink>
                </h2>
                <h3>Groups in Meetup</h3>
            </div>
            <div className="groups-card-display">
                {groupsList.length > 0 &&
                    groupsList.map(group => {
                        return (
                            <GroupsCard id={group.id} group={group}/>
                        )
                    })
                }
            </div>
            <div className='home-bread-crumb'>
                <NavLink exact to="/">Home</NavLink>
            </div>
        </>
    )
}

export default GroupsPage;
