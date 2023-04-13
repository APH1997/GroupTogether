import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function EventForm({formType, event, groupId}) {
    const history = useHistory();
    const dispatch = useDispatch();
    console.log(groupId);
    const sessionUser = useSelector(state => state.session.user)
    if (!sessionUser){
        history.push('/')
    };

    if (formType === "Update" && sessionUser.id !== event.hostId){
        history.push('/')
    };

    return (
        <h1>Event form</h1>
    )
}

export default EventForm;
