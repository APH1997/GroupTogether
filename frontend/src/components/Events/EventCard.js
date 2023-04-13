import '../Groups/GroupCard.css';
import {useHistory} from  'react-router-dom';

function EventsCard({event, group}){
    const history = useHistory();
    function navToEventDetails(e){
        history.push(`/events/${event.id}`)
    }

    const splitDate = event.startDate.split('T');
    const date = splitDate[0];
    const time = splitDate[1];
    console.log("In EventCard",time);
    console.log("event card group prop:", group)
    return (
        <div key={event.id} className="event-card-container" onClick={navToEventDetails} >
            <div className="event-card-top">
                <div className="cont-image">
                    <img src={`${event.previewImage}`}></img>
                </div>
                <div className="cont-info">
                    <p>{date} · {time}</p>
                    <h2>{event.name}</h2>
                    <h3>{event.Group?.city || group?.city}, {event.Group?.state || group?.state}</h3>
                </div>
            </div>
                <p>{event.description}</p>
        </div>
    )
}

export default EventsCard;
