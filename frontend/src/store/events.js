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
    }
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
        default:
            return state;
    }
}

export default eventsReducer;
