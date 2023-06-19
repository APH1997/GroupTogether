import '../Groups/GroupCard.css';
import {useHistory} from  'react-router-dom';

function EventsCard({event, group}){
    const history = useHistory();
    function navToEventDetails(e){
        history.push(`/events/${event.id}`)
    }

    const startDate = new Date(event.startDate).toLocaleString("en-US").split(',')[0]

    function convertMilTime(time){
        const [hours, minutes] = time.split(':')
        if (Number(hours < 1)){
            return `12:${minutes} AM`
        }
        if (Number(hours < 12)){
            return `${hours}:${minutes} AM`
        }
        return `${hours - 12}:${minutes} PM`
    }

    return (
        <div key={event.id} className="event-card-container" onClick={navToEventDetails} >
            <div className="event-card-top">
                <div className="cont-image">
                    <img src={`${event?.previewImage}`}></img>
                </div>
                <div className="cont-info">
                    <p>{startDate} · {convertMilTime(event.startTime)}</p>
                    <h2>{event.name}</h2>
                    <h3>{event.Group?.city || group?.city}, {event.Group?.state || group?.state}</h3>
                </div>
            </div>
                <p>{event.description}</p>
        </div>
    )
}

export default EventsCard;
