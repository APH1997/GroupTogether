import EventDetails from "./EventDetails";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { getGroupDetailsThunk } from "../../store/groups";
import { getOneEventThunk } from "../../store/events";
import EventForm from "./EventForm";

const EditEventForm = () => {
    const dispatch = useDispatch();
    const {groupId, eventId} = useParams();
    const group = useSelector(state => state.groups.singleGroup);
    const event = useSelector(state => state.events.singleEvent);

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId));
        dispatch (getOneEventThunk(eventId));
    }, [dispatch, groupId, eventId])

    if (!Object.values(group).length || !Object.values(event).length){
        return <h1>Loading...</h1>
    }

    return (
        <EventForm formType="Update" group={group} event={event} />
    )

}

export default EditEventForm;
