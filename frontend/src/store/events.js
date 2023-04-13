import {csrfFetch} from './csrf';

const LOAD_EVENTS = "events/loadGroups";
const LOAD_ONE_EVENT = "events/loadGroup";

const CREATE_EVENT = "events/createGroup";
const EDIT_EVENT = "events/editGroup";

const DELETE_EVENT = "events/deleteGroup";


export const getEventsAction = (events) => {
    return {
        type: LOAD_EVENTS,
        payload: events
    }
}
export const getEventsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/events');
    const data = await response.json();
    if (response.ok){
        dispatch(getEventsAction(data));
        return response;
    } else {
        return response;
    }
}

export const getOneEventAction = (event) => {
    return {
        type: LOAD_ONE_EVENT,
        payload: event
    }
}

export const getOneEventThunk = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`);
    const data = await response.json();
    if (response.ok){
        dispatch(getOneEventAction(data));
        return response;
    } else {
        return response;
    }
}

export const createEventAction = () => {
    return {
        type: CREATE_EVENT,
    }
}
export const createEventThunk = (event, groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/events`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    })
    const data = await response.json();
    if (response.ok){
        await dispatch(createEventAction());
        return data;
    } else return data;
}


const initialState = {allEvents: {}, singleEvent: {}};
const eventsReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_EVENTS: {
            const newState = {...state, allEvents:{...state.allEvents}, singleEvent:{...state.singleEvent}}
            action.payload.Events.forEach((event => {
                newState.allEvents[event.id] = event;
            }))
            return newState;
        }
        case LOAD_ONE_EVENT:{
            const newState = {...state, allEvents:{...state.allEvents}, singleEvent:{...state.singleEvent}}
            newState.singleEvent = action.payload;
            return newState;
        }
        case CREATE_EVENT:{
            const newState = {...state, allEvents:{...state.allEvents}, singleEvent:{...state.singleEvent}}
            return newState;
        }
        default:
            return state;
    }
}

export default eventsReducer;
