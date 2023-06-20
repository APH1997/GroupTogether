import { useSelector } from 'react-redux';
import './GroupCard.css';
import {useHistory} from  'react-router-dom';

function GroupsCard({group, manage}){
    const history = useHistory();
    function navToGroupDetails(e){
        history.push(`/groups/${group.id}`)
    }

    const user = useSelector(state => state.session.user)

    if (!user) return <h1>Loading...</h1>
    console.log(group)
    return (
        <div key={group.id} className="card-container" onClick={navToGroupDetails} >
            <div className="cont-image">
                <img src={`${group.previewImage}`}></img>
            </div>
            <div className="cont-info">
                <h2>{group.name}</h2>
                <h3>{group.city}, {group.state}</h3>
                <p className='group-about'>{group.about}</p>
                <div className='card-bottom'>
                    {Object.values(group).length > 0 && <h4>{group.Events.length} event{Math.abs(group.Events.length) > 1 ? 's' : ''} · {group.private ? "Private" : "Public"}</h4>}
                    {manage &&
                        (group.organizerId !== user.id && <button>Leave Group</button>)
                        || group.organizerId === user.id &&
                        <div>
                            <button>Update</button>
                            <button>Delete</button>
                        </div>

                    }
                </div>
            </div>

        </div>
    )
}

export default GroupsCard;
