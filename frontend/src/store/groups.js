import {csrfFetch} from './csrf';

const LOAD_GROUPS = "groups/loadGroups";
const LOAD_ONE_GROUP = "group/loadGroup";
const CREATE_GROUP = "groups/createGroup";
const CREATE_GROUP_IMAGE = "groups/createImage";
const EDIT_GROUP = "group/editGroup";
const DELETE_GROUP = "group/deleteGroup";
const REQUEST_MEMBERSHIP = "group/membership/post"
const DELETE_MEMBERSHIP = "group/membership/delete"
const EDIT_MEMBERSHIP = "groups/memberships/edit"

// CREATE MEMBERSHIP
const updateMembershipsAction = (membership) => {
    return {
        type: REQUEST_MEMBERSHIP,
        payload: membership
    }
}

export const requestMembershipThunk = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: "POST"
    })
    const data = await response.json()
    if (response.ok){
        dispatch(updateMembershipsAction(data))
        return data
    } else {
        return data
    }
}

// DELETE MEMBERSHIP
const deleteMembershipAction = (userId, groupId) => {
    return {
        type: DELETE_MEMBERSHIP,
        payload: {userId, groupId}
    }
}

export const deleteMembershipThunk = (groupId, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({memberId: userId})
    })
    const data = await response.json()
    if (response.ok){
        dispatch(deleteMembershipAction(userId, groupId))
        return data
    } else {
        return data
    }
}

// ACCEPT MEMBER
const editMembershipAction = (membership) => {
    return {
        type: EDIT_MEMBERSHIP,
        payload: membership
    }
}

export const editMembershipThunk = (groupId, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({memberId: userId, status: "member"})
    })
    const data = await response.json()
    if (response.ok){
        dispatch(editMembershipAction(data))
        return data
    } else {
        return data
    }
}

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

export const deleteGroupThunk = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: "DELETE",
    });
    const data = await response.json();
    if (response.ok){
        await dispatch(deleteGroupAction(groupId));
        return data
    } else return response;
}

export const createGroupImageAction = (image) => {
    return {
        type: CREATE_GROUP_IMAGE,
        payload: image
    }
}
export const createGroupImageThunk = (groupId, image) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/images`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(image)
    });
    const data = await response.json();
    if (response.ok){
        await dispatch(createGroupImageAction(image));
        return data;
    } else return response;
}


const initialState = {allGroups: {}, singleGroup: {}};
const groupsReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_GROUPS: {
            const newState = {...state, allGroups:{...state.allGroups}, singleGroup:{...state.singleGroup}};
            action.payload.Groups.forEach((group => {
                newState.allGroups[group.id] = group;
            }))
            newState.singleGroup = {};
            return newState;
        }
        case LOAD_ONE_GROUP: {
            const newState = {...state, allGroups:{...state.allGroups}, singleGroup:{...state.singleGroup}};;
            newState.singleGroup = action.payload
            return newState;
        }
        case CREATE_GROUP: {
            const newState = {...state, allGroups:{...state.allGroups}, singleGroup:{...state.singleGroup}}
            return newState;
        }
        case EDIT_GROUP: {
            return state;
            //it redirects to a page that grabs new state
        }
        case DELETE_GROUP: {
            const newState = {...state, allGroups:{...state.allGroups}, singleGroup:{...state.singleGroup}}
            delete newState.allGroups[action.payload]
            return newState;
        }
        case REQUEST_MEMBERSHIP: {
            const newState = {...state, allGroups:{...state.allGroups}, singleGroup:{...state.singleGroup}}
            newState.singleGroup.Memberships[action.payload.userId] = action.payload
            return newState
        }
        case DELETE_MEMBERSHIP: {
            const {userId, groupId} = action.payload
            const newState = {...state, allGroups:{...state.allGroups}, singleGroup:{...state.singleGroup}}

            if (Object.values(newState.singleGroup).length){
                delete newState.singleGroup.Memberships[userId]
            }
            delete newState.allGroups[groupId].Members[userId]
            return newState
        }

        case EDIT_MEMBERSHIP: {
            const newState = {...state, allGroups:{...state.allGroups}, singleGroup:{...state.singleGroup}}
            newState.singleGroup.Memberships[action.payload.userId] = action.payload
            return newState
        }

        default: {
            return state;
        }
    }
}

export default groupsReducer
