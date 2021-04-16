import * as api from '../../../api/api';
import {
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILED,
    LOGIN_WITH_CORE_REQUEST,
    LOGIN_WITH_CORE_SUCCESS,
    LOGIN_WITH_CORE_FAILED,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_ERROR
} from './actionTypes';

export const changePassword = () => {
    return {
        type: CHANGE_PASSWORD
    }
}
export const changePasswordSuccess = (data) => {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        data: data
    }
}
export const changePasswordError = (error) => {
    return {
        type: CHANGE_PASSWORD_ERROR,
        error: error
    }
}

export const loginRequest = (username)=>{
    return {
        type: LOGIN_REQUEST,
        username
    }
}

const loginSuccess= (info)=>{
    return {
        type: LOGIN_SUCCESS,
        data: info
    }
}

const loginFailed = (errorMessage, status)=>{
    return {
        type: LOGIN_FAILED,
        message: errorMessage,
    }
}

export const login = (username, password)=> (dispatch)=> {
    dispatch(loginRequest(username));
    return api.loginApi(username, password).then((response)=>{
        if(response.data){
            localStorage.setItem('accessTokenAuthKey', response.data.token);
            return dispatch(loginSuccess(response.data));
        } else {
            return dispatch(loginFailed(response.message));
        }
    }).catch(err=>{
        console.log("login err 234 " + JSON.stringify(err));
    });
}

export const loginWithCore = fetchData => async (dispatch) => {
    dispatch({
        type: LOGIN_WITH_CORE_REQUEST,
    })
    try {
        const res = await api.loginWithCore(fetchData);
        if (res && res.success) {
            localStorage.setItem('accessTokenAuthKey', res.data.TOKEN);
            return dispatch({
                type: LOGIN_WITH_CORE_SUCCESS,
                data: res.data
            })
        } else {
            return dispatch({
                type: LOGIN_WITH_CORE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: LOGIN_WITH_CORE_FAILED,
            message: er,
        })
    }
}

export const getUserId = fetchData => async (dispatch) => {
    try {
        const res = await api.getUserId(fetchData);
        if (res) {
            return dispatch({
                type: 'USER.GET',
                data: res.data
            })
        } 
        // else {
        //     common.notify('error', 'Thao tác thất bại :( , ' + res.message);
        // }
    } catch (er) {
        // common.notify("error", "Thao tác thất bại" + er);
    }
}