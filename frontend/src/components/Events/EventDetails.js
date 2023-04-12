import { getOneEventThunk } from "../../store/events";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory} from "react-router-dom";
import { useEffect } from "react";
import './EventDetails.css';

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


    if (!event || !Object.values(event).length) return <></>
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
                        <div className="group-info">
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
                                    <div>START</div>
                                    <div>END</div>
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
