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

    useEffect(() => {
        dispatch(getEventsThunk());
    }, [dispatch, eventsList.length])

    const futureEvents = [];
    const orderedFutureEvents = [];

    const pastEvents = [];
    const orderedPastEvents = [];
    //Order the events
    if (eventsList?.length) {
        for (let event of eventsList) {
            if (new Date(event.startDate) > new Date()) {
                futureEvents.push(event)
            } else pastEvents.push(event)
        }

        while (futureEvents.length) {
            let currMin = Infinity;
            let currEvent;
            let currMinIndex;
            for (let i = 0; i < futureEvents.length; i++) {
                const event = futureEvents[i];
                if (new Date(event.startDate) < currMin) {
                    currMin = new Date(event.startDate);
                    currEvent = event;
                    currMinIndex = i;
                }
            }
            orderedFutureEvents.push(currEvent);
            futureEvents.splice(currMinIndex, 1);
        }

        while (pastEvents.length) {
            let currMax = -Infinity;
            let currEvent;
            let currMaxIndex;
            for (let i = 0; i < pastEvents.length; i++){
                const event = pastEvents[i];
                if (new Date(event.startDate) > currMax){
                    currMax = new Date(event.startDate);
                    currEvent = event;
                    currMaxIndex = i;
                }
            }
            orderedPastEvents.push(currEvent);
            pastEvents.splice(currMaxIndex, 1);
        }
    }

    return (
        <>
            <div className="all-groups-header">
                <h2>
                    <NavLink id="curr-nav"to="/events/all">Events</NavLink>
                    <NavLink id="other-nav"to="/groups/all">Groups</NavLink>
                </h2>
                <h3>Events</h3>
            </div>
            <div className="groups-card-display">
                {orderedFutureEvents.length > 0 &&
                    orderedFutureEvents.map(event => {
                        return (
                            <EventsCard id={event.id} event={event}/>
                        )
                    })
                }
                {orderedPastEvents.length > 0 &&
                    orderedPastEvents.map(event => {
                        return (
                            <EventsCard id={event.id} event={event}/>
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

export default EventsPage;
