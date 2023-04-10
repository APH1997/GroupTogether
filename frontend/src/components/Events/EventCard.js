import '../Groups/GroupCard.css';
import {useHistory} from  'react-router-dom';

function EventsCard({event}){
    const history = useHistory();
    function navToEventDetails(e){
        history.push(`/events/${event.id}`)
    }
    
    return (
        <div key={event.id} className="card-container" onClick={navToEventDetails} >
            <div className="cont-image">
                <img src={`${event.previewImage}`}></img>
            </div>
            <div className="cont-info">
                <p>{event.startDate}</p>
                <h2>{event.name}</h2>
                <h3>{event.Venue.city}, {event.Venue.state}</h3>
                <p>{event.description}</p>
                {/* {Object.values(event).length > 0 && <h4>{group.Events.length} event{Math.abs(group.Events.length) > 1 ? 's' : ''} · {group.private ? "Private" : "Public"}</h4>} */}

            </div>
        </div>
    )
}

export default EventsCard;
