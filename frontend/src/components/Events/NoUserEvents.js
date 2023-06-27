import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './NoUserEvents.css'
function NoEvents({user}){
    const history = useHistory()
    return (
        <div className="no-things-container">
            <h1>Eep! No Events!</h1>
            <p>
                Browse our Events and attend one, or head over to Your Groups to create your own!
            </p>
            <div className="no-things-btn-container">
                <button onClick={(e) => history.push('/events/all')}>Find Events</button>
                <button onClick={(e) => history.push(`/users/${user.id}/groups`)}>Your Groups</button>
            </div>
        </div>
    )
}

export default NoEvents
