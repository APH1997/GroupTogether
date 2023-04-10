import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getEventsThunk } from '../../store/events';
import { useDispatch } from "react-redux";
import {useEffect} from 'react';
import "../Groups/GroupCard.css";
import EventsCard from './EventCard';

function EventsPage(){
    const dispatch = useDispatch();
    const eventsObj = useSelector(state => state.events.allEvents);

    const eventsList = Object.values(eventsObj)
    console.log(eventsList)

    useEffect(() => {
        dispatch(getEventsThunk());
    }, [])

    return (
        <>
            <div className="all-groups-header">
                <h2>
                    <NavLink id="curr-nav"to="/events/all">Events</NavLink>
                    <NavLink id="other-nav"to="/groups/all">Groups</NavLink>
                </h2>
                <h3>Events in Meetup</h3>
            </div>
            <div className="groups-card-display">
                {eventsList.length > 0 &&
                    eventsList.map(event => {
                        return (
                            <EventsCard id={event.id} event={event}/>
                        )
                    })
                }
            </div>
            <NavLink exact to="/">Home</NavLink>
        </>
    )
}

export default EventsPage;
