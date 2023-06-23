import { useDispatch, useSelector } from 'react-redux';
import './GroupCard.css';
import {useHistory} from  'react-router-dom';
import { useModal } from '../../context/Modal';
import DeleteConfirmModal from './DeleteGroup';
import ManageGroup from './ManageGroupModal';

function GroupsCard({group, manage}){
    const history = useHistory();
    const {setModalContent} = useModal();
    const dispatch = useDispatch()

    function navToGroupDetails(e){
        history.push(`/groups/${group.id}`)
    }


    function leaveGroup(e){
        e.stopPropagation()
        setModalContent(<DeleteConfirmModal groupId={group.id} membership={true}/>)
    }
    function deleteGroup(e){
        e.stopPropagation()
        setModalContent(<DeleteConfirmModal groupId={group.id} manage={true}/>)
    }

    function handleUpdate(e){
        e.stopPropagation()
        history.push(`/groups/${group.id}/edit`)
    }

    const user = useSelector(state => state.session.user)
    if (!user) return <h1>Loading...</h1>

    return (
        <div key={group.id} className="card-container" onClick={navToGroupDetails} >
            <div className="cont-image">
                <img src={`${group.previewImgUrl}`}></img>
            </div>
            <div className="cont-info">
                <h2>{group.name}</h2>
                <h3>{group.city}, {group.state}</h3>
                <p className='group-about'>{group.about}</p>
                <div className='card-bottom'>
                    {Object.values(group).length > 0 && <h4>{group.Events.length} event{Math.abs(group.Events.length) > 1 ? 's' : ''} · {group.private ? "Private" : "Public"}</h4>}
                    {manage &&
                        (group.organizerId !== user.id &&
                            <button className="organizer-btn-manage" style={{alignSelf: "center"}} onClick={(e) => leaveGroup(e)}>Leave Group</button>)
                        || (manage && group.organizerId === user.id &&
                        <div style={{display: "flex"}}>
                            <button className="organizer-btn-manage" onClick={(e) => handleUpdate(e)}>Update</button>
                            <button className="organizer-btn-manage" onClick={(e) => deleteGroup(e)}>Delete</button>
                        </div>)

                    }
                </div>
            </div>

        </div>
    )
}

export default GroupsCard;
