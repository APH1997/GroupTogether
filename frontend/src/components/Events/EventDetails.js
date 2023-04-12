import { getOneEventThunk } from "../../store/events";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory} from "react-router-dom";
import { useEffect } from "react";

function EventDetails(){
    const history = useHistory();
    const dispatch = useDispatch()
    const {eventId} = useParams();

    const user = useSelector(state => state.session.user);
    const event = useSelector(state => state.events.singleEvent);


    useEffect(() => {
        dispatch(getOneEventThunk(eventId))
    }, [dispatch])
    console.log(event);


    if (!event) return <></>
    return(
        <>
            <header>
                <NavLink to="/events/all">Events</NavLink>
                <h2>{event.name}</h2>
                <p>Hosted by ?????</p>
            </header>
            <main className="main-content-container">
                <div className="content-container-top">
                    <div className="event-image-container"></div>
                    <div className="group-and-event-info">
                        <div className="group-info">
                            <div className="group-info-image"></div>
                            <div className="group-info-title">
                                <h4>{event.Group.name}</h4>
                                <p>{event.Group.private ? "Private": "Public"}</p>
                            </div>
                        </div>
                        <div className="event-info">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>

                <div className="content-container-bottom">{event.description}</div>
            </main>
        </>
    )
}

export default EventDetails;
