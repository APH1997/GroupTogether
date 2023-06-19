import { getOneEventThunk } from "../../store/events";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import './EventDetails.css';
import DeleteButton from "./DeleteEvent/DeleteEventButton";
import MapContainer from "../Maps";


function EventDetails() {
    const history = useHistory();
    const dispatch = useDispatch()
    const { eventId } = useParams();

    const user = useSelector(state => state.session.user);
    const event = useSelector(state => state.events.singleEvent);


    useEffect(() => {
        dispatch(getOneEventThunk(eventId))
    }, [dispatch])

    if (!event || !Object.values(event).length) return <></>

    const convertedStartDate = new Date(event.startDate).toLocaleString("en-US")
    const convertedEndDate = new Date(event.endDate).toLocaleString("en-US");

    const startTime = convertedStartDate.split(', ')[1]
    const endTime = convertedEndDate.split(', ')[1]

    const [noMsStart] = event.startDate.split('.')
    const [noMsEnd] = event.endDate.split('.')

    const [startDate, startMilTime] = noMsStart.split('T')
    const [endDate, endMilTime] = noMsEnd.split('T')


    let previewImage;
    for (let image of event.EventImages) {
        if (image.preview) {
            previewImage = image.url
        }
    }

    return (
        <>
            <main className="main-content-container">
                <div className="header-background-wrapper">
                    <div className="event-details-header">
                        <span><NavLink to="/events/all">Events</NavLink></span>
                        <h2>{event.name}</h2>
                        <p>Hosted by {event.Group.Organizer.firstName} {event.Group.Organizer.lastName}</p>
                    </div>
                </div>
                <div className="content-container-top">
                    <div className="event-image-container">
                        <img src={previewImage}></img>
                    </div>
                    <div className="group-and-event-info">
                        <div onClick={() => history.push(`/groups/${event.Group.id}`)} className="group-info-container">
                            <div className="group-info-image">
                                <img src={event.Group.imgUrl}></img>
                            </div>
                            <div className="group-info">
                                <h4 style={{ paddingRight: '10px' }}>{event.Group.name}</h4>
                                <p>{event.Group.private ? "Private" : "Public"}</p>
                            </div>
                        </div>
                        <div className="event-info">
                            <div className="event-times">
                                <i className="fas fa-stopwatch"></i>
                                <div className="start-end">
                                    <div>START</div>
                                    <div>END</div>
                                </div>
                                <div className="start-end-date">
                                    <div>{startDate}</div>
                                    <div>{endDate}</div>
                                </div>
                                <div className="dot-separator">
                                    <div> · </div>
                                    <div> · </div>
                                </div>
                                <div className="start-end-time">
                                    <div>{startTime}</div>
                                    <div>{endTime}</div>
                                </div>
                            </div>
                            <div className="event-price">
                                <i className="fas fa-dollar-sign"></i>
                                {Number(event.price) > 0 ? `$${Number(event.price).toFixed(2)}` : "FREE"}
                            </div>
                            <div className="event-type">
                                <i className="fas fa-map-pin"><span id="event-type">{event.type}</span></i>
                                {user?.id === event.Group.Organizer.id &&
                                    <span id="event-organizer-buttons">
                                        <button onClick={() => history.push(`/groups/${event.Group.id}/events/${eventId}/edit`)}>Update</button>
                                        <DeleteButton eventId={eventId} groupId={event.Group.id} />
                                    </span>}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="content-container-bottom">
                    <div>
                        <h2>Details</h2>
                        <div id="event-description-container">
                            {event.description}
                        </div>
                    </div>
                    <div className="gmap-container">
                        <MapContainer eventLoc={{
                            lat: event.lat,
                            lng: event.lng
                        }} />
                    </div>
                </div>
            </main>
        </>
    )
}

export default EventDetails;
