import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getEventsThunk } from '../../store/events';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import "../Groups/GroupCard.css";
import EventsCard from './EventCard';
import NoEvents from './NoUserEvents';

function EventsPage({ manage, user }) {
    const dispatch = useDispatch();
    const eventsObj = useSelector(state => state.events.allEvents);
    const eventsList = (
        manage ? Object.values(eventsObj)
            .filter(eve => !(!eve.attendances[user.id]) || eve.hostId === user.id)
            : Object.values(eventsObj)
    )



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
            for (let i = 0; i < pastEvents.length; i++) {
                const event = pastEvents[i];
                if (new Date(event.startDate) > currMax) {
                    currMax = new Date(event.startDate);
                    currEvent = event;
                    currMaxIndex = i;
                }
            }
            orderedPastEvents.push(currEvent);
            pastEvents.splice(currMaxIndex, 1);
        }
    }

    if (manage && !eventsList.length) {
        return <NoEvents user={user} />
    }
    return (
        <>
            <div className="all-groups-header">
                <div className='header-content-container'>
                    <h2>
                        {!manage &&
                            <div style={{ display: "flex", gap: "10px" }}>
                                <NavLink id="curr-nav" to="/events/all">Events</NavLink>
                                <NavLink id="other-nav" to="/groups/all">Groups</NavLink>
                            </div>

                        }
                        {manage && "Manage Events"}
                    </h2>
                    <h3>{manage ? "Your " : ""}Events</h3>
                </div>
            </div>
            <div className="groups-card-display">
                {orderedFutureEvents.length > 0 &&
                    orderedFutureEvents.map(event => {
                        return (
                            <EventsCard id={event.id} event={event} manage={manage} />
                        )
                    })
                }
                {orderedPastEvents.length > 0 &&
                    orderedPastEvents.map(event => {
                        return (
                            <EventsCard id={event.id} event={event} manage={false} user={user} />
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
