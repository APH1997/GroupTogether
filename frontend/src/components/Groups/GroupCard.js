import './GroupCard.css';
import {useHistory} from  'react-router-dom';

function GroupsCard({group}){
    const history = useHistory();
    function navToGroupDetails(e){
        history.push(`/groups/${group.id}`)
    }
    return (
        <div key={group.id} className="card-container" onClick={navToGroupDetails} >
            <div className="cont-image">
                <img src={`${group.previewImage}`}></img>
            </div>
            <div className="cont-info">
                <h2>{group.name}</h2>
                <h3>{group.city}, {group.state}</h3>
                <p>{group.about}</p>
                {Object.values(group).length > 0 && <h4>{group.Events.length} event{Math.abs(group.Events.length) > 1 ? 's' : ''} · {group.private ? "Private" : "Public"}</h4>}

            </div>
        </div>
    )
}

export default GroupsCard;
