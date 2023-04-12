import {csrfFetch} from './csrf';

const LOAD_GROUPS = "groups/loadGroups";
const LOAD_ONE_GROUP = "group/loadGroup";

const CREATE_GROUP = "groups/createGroup";
const EDIT_GROUP = "group/editGroup";

const DELETE_GROUP = "group/deleteGroup";

const CLEAR_SINGLE_GROUP = "group/clearGroup"

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

export const createGroupAction = (group) => {
    return {
        type: CREATE_GROUP,
        payload: group
    }
}
export const createGroupThunk = (group) => async (dispatch) => {
    const response = await csrfFetch('/api/groups', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(group)
    })
    const data = await response.json();
    if (response.ok){
        await dispatch(createGroupAction(data));
        return data;
    } else return response;
}

export const updateGroupAction = (group) => {
    return {
        type: EDIT_GROUP,
        payload: group
    }
}
export const updateGroupThunk = (group, groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(group)
    })
    const data = await response.json();
    if (response.ok){
        await dispatch(updateGroupAction(data));
        return data;
    } else return response;
}

export const deleteGroupAction = (groupId) => {
    return {
        type: DELETE_GROUP,
        payload: groupId
    }
}
export const deleteGroupThunk = (groupId) => async (disptach) => {

}

//Action for cleaning up singleGroup state
export const clearSingleGroupAction = () => {
    return{
        type: CLEAR_SINGLE_GROUP
    }
}

const initialState = {allGroups: {}, singleGroup: {}};
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
            return newState;
        }
        case CREATE_GROUP: {
            const newState = {...state, allGroups:{...state.allGroups}, singleGroup:{...state.singleGroup}}
            newState.allGroups[action.payload.id] = action.payload;
            newState.singleGroup = action.payload;
            return newState;
        }
        case EDIT_GROUP: {
            return state;
            //it redirects to a page that grabs new state
        }
        case DELETE_GROUP: {

        }
        case CLEAR_SINGLE_GROUP: {
            const newState = {...state, allGroups:{...state.allGroups}, singleGroup: {...initialState.singleGroup}}
            return newState
        }
        default: {
            return state;
        }
    }
}

export default groupsReducer
