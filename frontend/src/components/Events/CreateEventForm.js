import EventForm from "./EventForm";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { getGroupDetailsThunk } from "../../store/groups";
import {useEffect} from 'react';

const CreateEventForm = () => {
    const dispatch = useDispatch();
    const {groupId} = useParams();
    const group = useSelector(state => state.groups.singleGroup)

    const event = {
        venueId: "",
        hostId: group.organizerId || "",
        name: "",
        type: "",
        price: "",
        description: "",
        startDate: "",
        endDate: ""
    }

    useEffect(() => {
        dispatch(getGroupDetailsThunk(groupId));
    }, [dispatch, groupId])

    if (!Object.values(group).length) return <></>

    return (
        <EventForm formType="Create" event={event} group={group} />
    )
}

export default CreateEventForm;
