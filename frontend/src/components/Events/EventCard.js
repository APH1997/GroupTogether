import { useDispatch, useSelector } from 'react-redux';
import '../Groups/GroupCard.css';
import { useHistory } from 'react-router-dom';
import { deleteAttendanceThunk } from '../../store/events';
import { useModal } from '../../context/Modal';
import DeleteConfirmModal from './DeleteEvent';
import ManageGroup from '../Groups/ManageGroupModal';

function EventsCard({ event, group, manage }) {
    const { setModalContent } = useModal()
    const history = useHistory();
    const dispatch = useDispatch()

    function navToEventDetails(e) {
        history.push(`/events/${event.id}`)
    }

    const startDate = new Date(event.startDate).toLocaleString("en-US").split(',')[0]

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

    const user = useSelector(state => state.session.user)
    if (!user) return null

    function handleUnattend(e) {
        e.stopPropagation()
        dispatch(deleteAttendanceThunk(event.id, user.id))
    }
    function deleteEvent(e) {
        e.stopPropagation()
        setModalContent(<DeleteConfirmModal eventId={event.id} groupId={event.Group.id} manage={manage} />)
    }
    function handleUpdate(e) {
        e.stopPropagation()
        history.push(`/groups/${event.Group.id}/events/${event.id}/edit`)
    }
    function handleManageAttendance(e) {
        e.stopPropagation()
        setModalContent(<ManageGroup event={event} />)
    }

    return (
        <div key={event.id} className="event-card-container" onClick={navToEventDetails} >
            <div className="event-card-top">
                <div style={{ display: "flex" }}>

                    <div className="cont-image">
                        <img src={`${event?.previewImgUrl}`}></img>
                    </div>
                    <div className="cont-info">
                        <p>{startDate} · {convertMilTime(event.startTime)}</p>
                        <h2>{event.name}</h2>
                        <h3>{event.Group?.city || group?.city}, {event.Group?.state || group?.state}</h3>
                    </div>
                </div>

                {manage && event.hostId === user.id &&
                    <div className='host-action-btns'>
                        <button onClick={(e) => handleUpdate(e)}>
                            Update
                        </button>
                        <button onClick={(e) => deleteEvent(e)}>
                            Delete
                        </button>
                    </div>
                }
                {manage && event.hostId !== user.id &&
                    <div className='host-action-btns'>
                        <button onClick={(e) => handleUnattend(e)}>
                            Unattend
                        </button>
                    </div>
                }

            </div>
            <p>{event.description}</p>
        </div>
    )
}

export default EventsCard;
