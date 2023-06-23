import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getGroupsThunk } from '../../store/groups';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import GroupsCard from './GroupCard';
import "./GroupCard.css"
import NoGroups from './NoUserGroups';

function GroupsPage({ manage, user }) {
    const dispatch = useDispatch();
    const groupsObj = useSelector(state => state.groups.allGroups);
    const groupsList = (
        manage ? Object.values(groupsObj)
            .filter(group => !(!group.Members[user.id]))
            : Object.values(groupsObj)
    )

    useEffect(() => {
        dispatch(getGroupsThunk());
    }, [])
    if (!manage && !groupsList.length) return <h1>Loading...</h1>
    if (manage && !groupsList.length) {
        return <NoGroups />
    }
    return (
        <>
            <div className="all-groups-header">
                <div className='header-content-container'>
                    <h2>
                        {!manage &&
                            <div style={{ display: "flex", gap: "10px" }}>
                                <NavLink id="other-nav" to="/events/all">Events</NavLink>
                                <NavLink id="curr-nav" to="/groups/all">Groups</NavLink>
                            </div>

                        }
                        {manage && "Manage Groups"}
                    </h2>
                    <h3>{manage ? "Your Groups" : "Groups in GroupTogether"}</h3>
                </div>
            </div>
            <div className="groups-card-display">
                {groupsList.length > 0 &&
                    groupsList.map(group => {
                        return (
                            <GroupsCard id={group.id} group={group} manage={manage} />
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
