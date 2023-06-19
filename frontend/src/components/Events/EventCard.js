import '../Groups/GroupCard.css';
import {useHistory} from  'react-router-dom';

function EventsCard({event, group}){
    const history = useHistory();
    function navToEventDetails(e){
        history.push(`/events/${event.id}`)
    }

    //time formatting
    const convertedStartDate = new Date(event.startDate).toLocaleString("en-US")
    const startTime = convertedStartDate.split(', ')[1]
    const [noMsStart] = event.startDate.split('.')
    const [startDate, startMilTime] = noMsStart.split('T')

    return (
        <div key={event.id} className="event-card-container" onClick={navToEventDetails} >
            <div className="event-card-top">
                <div className="cont-image">
                    <img src={`${event?.previewImage}`}></img>
                </div>
                <div className="cont-info">
                    <p>{startDate} · {startTime}</p>
                    <h2>{event.name}</h2>
                    <h3>{event.Group?.city || group?.city}, {event.Group?.state || group?.state}</h3>
                </div>
            </div>
                <p>{event.description}</p>
        </div>
    )
}

export default EventsCard;
