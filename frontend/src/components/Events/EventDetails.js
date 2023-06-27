import { deleteAttendanceThunk, getOneEventThunk, postAttendanceThunk } from "../../store/events";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import './EventDetails.css';
import DeleteButton from "./DeleteEvent/DeleteEventButton";
import MapContainer from "../Maps";
import { useModal } from "../../context/Modal";
import ManageGroup from "../Groups/ManageGroupModal";


function EventDetails() {
    const history = useHistory();
    const dispatch = useDispatch()
    const { eventId } = useParams();
    const { setModalContent } = useModal()
    const user = useSelector(state => state.session.user);
    const event = useSelector(state => state.events.singleEvent);


    useEffect(() => {
        dispatch(getOneEventThunk(eventId))
    }, [dispatch])

    if (!event || !Object.values(event).length) return <></>

    const startDate = new Date(event.startDate).toLocaleString("en-US").split(',')[0]
    const endDate = new Date(event.endDate).toLocaleString("en-US").split(',')[0]

    function convertMilTime(time) {
        const [hours, minutes] = time.split(':')
        if (Number(hours < 1)) {
            return `12:${minutes} AM`
        }
        if (Number(hours < 12)) {
            return `${hours}:${minutes} AM`
        }
        if (Number(hours == 12)) {
            return `${hours}:${minutes} PM`
        }
        return `${hours - 12}:${minutes} PM`
    }

    function postAttendance() {
        dispatch(postAttendanceThunk(event.id))
    }

    function deleteAttendance() {
        dispatch(deleteAttendanceThunk(event.id, user.id))
    }

    function manageEvent() {
        setModalContent(<ManageGroup event={event} />)
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
                <div className="content-container-left">
                    <div className="event-image-container">
                        <img src={event.previewImgUrl || "https://group-together-pics.s3.us-east-2.amazonaws.com/defaultEvent.png"}></img>
                    </div>
                    <div className="description-header-and-text">
                        <h2>Details</h2>
                        <div id="event-description-container">
                            {event.description}
                        </div>
                    </div>
                </div>

                <div className="content-container-right">
                    <div className="gmap-container">
                        <MapContainer eventLoc={{
                            lat: event.lat,
                            lng: event.lng
                        }} />
                    </div>
                    <div className="group-and-event-info">
                        <div onClick={() => history.push(`/groups/${event.Group.id}`)} className="group-info-container">
                            <div className="group-info-image">
                                <img src={event.Group.imgUrl || "https://group-together-pics.s3.us-east-2.amazonaws.com/defaultGroup.jpeg"}></img>
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
                                    <div>{convertMilTime(event.startTime)}</div>
                                    <div>{convertMilTime(event.endTime)}</div>
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
                                        <button onClick={manageEvent} className="event-organizer-btn-manage">Manage</button>
                                    </span>}
                            </div>
                            {user &&
                            !event.attendances[user.id] &&
                            user.id !== event.hostId &&
                            !!event.members[user.id] &&
                                <button onClick={postAttendance} id="attend-event-btn">Attend</button>
                            }
                            {user && event.attendances[user.id] && user.id !== event.hostId &&
                                <button onClick={deleteAttendance} id="unatttend-event-btn">Unattend</button>
                            }
                            {!event.members[user.id] &&
                                <p className="errors" style={{marginLeft: "15px"}}>You must be a member of {event.Group.name} to attend this event</p>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default EventDetails;
