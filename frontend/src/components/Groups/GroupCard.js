import './GroupCard.css';

function GroupsCard({group}){
    return (
        <div className="card-container">
            <div className="cont-image">
                <img src={`${group.previewImage}`}></img>
            </div>
            <div className="cont-info">
                <h2>{group.name}</h2>
                <h3>{group.city}, {group.state}</h3>
                <p>{group.about}</p>
                {/* TODO: ADD # EVENTS TO BACKEND ROUTE */}
                <h3># Events - {group.private ? "Private" : "Public"}</h3>

            </div>
        </div>
    )
}

export default GroupsCard;
