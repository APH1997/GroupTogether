import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NoEvents({user}){
    const history = useHistory()
    return (
        <div>
            <h1>Eep! No Events!</h1>
            <p>
                Browse our Events and attend one, or head over to Your Groups to create your own!
            </p>
            <div>
                <button onClick={(e) => history.push('/events/all')}>Find Events</button>
                <button onClick={(e) => history.push(`/users/${user.id}/groups`)}>Your Groups</button>
            </div>
        </div>
    )
}

export default NoEvents
