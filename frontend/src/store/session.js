import {csrfFetch} from './csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const login = (user) => async (dispatch) => {
    const {credential, password} = user;
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = (user) => async (dispatch) => {
    //TODO: LOGOUT THUNK
}

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };


const initialState = {user: null};
const sessionReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER: {
            const newState = {...state};
            newState.user = action.payload;
            return newState;
        }
        case REMOVE_USER: {
            //TODO: UPDATE STATE TO LOGOUT USER
        }
        default: {
            return state;
        }
    }
}

export default sessionReducer
