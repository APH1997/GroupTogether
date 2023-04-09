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
        dispatch(getGroupsAction(data));
        return response;
    }
}

export const getGroupDetailsAction = (group) => {
    return {
        type: LOAD_ONE_GROUP,
        payload: group
    }
}
export const getGroupDetailsThunk = (groupId) => async (dispatch)=> {
    const response = await csrfFetch(`/api/groups/${groupId}`);
    const data = await response.json();

    if (response.ok){
        dispatch(getGroupDetailsAction(data));
        return response;
    }
}

const initialState = {allGroups: {}, singleGroup: {},};
const groupsReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_GROUPS: {
            const newState = {...state, allGroups:{...state.allGroups}, singleGroup:{...state.singleGroup}};
            action.payload.Groups.forEach((group => {
                newState.allGroups[group.id] = group;
            }))
            return newState;
        }
        case LOAD_ONE_GROUP: {
            const newState = {...state, allGroups:{...state.allGroups}, singleGroup:{...state.singleGroup}};;
            newState.singleGroup = action.payload
            console.log(newState);
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default groupsReducer
