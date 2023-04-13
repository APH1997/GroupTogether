import { getOneEventThunk } from "../../store/events";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory} from "react-router-dom";
import { useEffect } from "react";
import './EventDetails.css';
import DeleteButton from "./DeleteEvent/DeleteEventButton";

function EventDetails(){
    const history = useHistory();
    const dispatch = useDispatch()
    const {eventId} = useParams();

    const user = useSelector(state => state.session.user);
    const event = useSelector(state => state.events.singleEvent);


    useEffect(() => {
        dispatch(getOneEventThunk(eventId))
    }, [dispatch])

    console.log(event);
    console.log(user);
    if (!event || !Object.values(event).length) return <></>

    const [noMsStart] = event.startDate.split('.')
    const [noMsEnd] = event.endDate.split('.')

    const [startDate, startTime] = noMsStart.split('T')
    const [endDate, endTime] = noMsEnd.split('T')

    return (
        <>
            <header>
                <NavLink to="/events/all">Events</NavLink>
                <h2>{event.name}</h2>
                <p>Hosted by {event.Group.Organizer.firstName} {event.Group.Organizer.lastName}</p>
            </header>
            <main className="main-content-container">
                <div className="content-container-top">
                    <div className="event-image-container">
                        <img></img>
                    </div>
                    <div className="group-and-event-info">
                        <div className="group-info-container">
                            <div className="group-info-image">
                                <img src={event.Group.imgUrl}></img>
                            </div>
                            <div className="group-info">
                                <h4>{event.Group.name}</h4>
                                <p>{event.Group.private ? "Private": "Public"}</p>
                            </div>
                        </div>
                        <div className="event-info">
                            <div className="event-times">
                                <i className="fas fa-stopwatch"></i>
                                <div className="start-end">
                                    <div>START {startDate} · {startTime}</div>
                                    <div>END {endDate} · {endTime}</div>
                                </div>
                            </div>
                            <div className="event-price">
                                <i className="fas fa-dollar-sign"></i>
                                {event.price > 0 ? `$${event.price}` : "FREE"}
                            </div>
                            <div className="event-type">
                            <i className="fas fa-map-pin"></i>
                                {event.type}
                            </div>
                        </div>
                    </div>
                    {user.id === event.Group.Organizer.id && <div className="host-buttons">
                        <button onClick={() => history.push(`/groups/${event.Group.id}/events/${eventId}/edit`)}>Update</button>
                        <DeleteButton eventId={eventId}/>
                    </div>}
                </div>

                <div className="content-container-bottom">
                    <h2>Details</h2>
                    <div>
                        {event.description}
                    </div>
                </div>
            </main>
        </>
    )
}

export default EventDetails;
