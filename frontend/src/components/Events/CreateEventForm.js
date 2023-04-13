import EventForm from "./EventForm";
import {useParams} from "react-router-dom";

const CreateEventForm = () => {
    const groupId = useParams();
    
    const event = {
        venueId: "",
        name: "",
        type: "",
        capacity: "",
        price: "",
        description: "",
        startDate: "",
        endDate: "",
    }

    return (
        <EventForm formType="Create" event={event} groupId={groupId} />
    )
}

export default CreateEventForm;
