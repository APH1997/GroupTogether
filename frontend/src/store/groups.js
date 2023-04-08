//TODO: GROUPS: REDUCER
//CREATE, READ, UPDATE, DELETE
import {csrfFetch} from './csrf';


const LOAD_GROUPS = "groups/loadGroups";
const LOAD_ONE_GROUP = "group/loadGroup";

const CREATE_GROUP = "groups/createGroup";
const EDIT_GROUP = "group/editGroup";

const DELETE_GROUP = "group/deleteGroup";

export const getGroupsAction = (groups) => {
    return {
        type: LOAD_GROUPS,
        payload: groups
    }
}

export const getGroupsThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/groups");

    const data = await response.json();

    if (response.ok){
        dispatch(getGroupsAction(data))
        return response
    }
}

const initialState = {};
const groupsReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_GROUPS: {
            const newState = {...state};
            action.payload.Groups.forEach((group => {
                newState[group.id] = group;
            }))
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default groupsReducer
