import * as api from '../../../api/apiCore';
import {
    LOGIN_CORE_REQUEST,
    LOGIN_CORE_SUCCESS,
    LOGIN_CORE_FAILED,
    LOGIN_OTP_REQUEST,
    LOGIN_OTP_SUCCESS,
    LOGIN_OTP_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    GET_ACCOUNT_BANK_REQUEST,
    GET_ACCOUNT_BANK_SUCCESS,
    GET_ACCOUNT_BANK_FAILED,
    GET_BANK_CORE_REQUEST,
    GET_BANK_CORE_SUCCESS,
    GET_BANK_CORE_FAILED
} from './actionCoreType';

export const loginCore = fetchData => async (dispatch) => {
    dispatch({
        type: LOGIN_CORE_REQUEST,
    })
    try {
        const res = await api.loginCore(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: LOGIN_CORE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: LOGIN_CORE_FAILED,
                message: res.code,
            })
        }
    } catch (er) {
        return dispatch({
            type: LOGIN_CORE_FAILED,
            message: er,
        })
    }
}

export const loginCoreInternal = fetchData => async (dispatch) => {
    dispatch({
        type: 'LOGIN_CORE_INTERNAL',
    })
    try {
        const res = await api.loginCoreInternal(fetchData);
        if (res && !res.error) {
            localStorage.setItem('accessTokenCore', res.accessToken);
            return dispatch({
                type: 'LOGIN_CORE_INTERNAL',
                data: res
            })
        } else {
            return dispatch({
                type: 'LOGIN_CORE_INTERNAL_FAILED',
                message: res.code,
            })
        }
    } catch (er) {
        return dispatch({
            type: 'LOGIN_CORE_INTERNAL_FAILED',
            message: er,
        })
    }
}

export const loginCoreOTP = fetchData => async (dispatch) => {
    dispatch({
        type: LOGIN_OTP_REQUEST,
    })
    try {
        const res = await api.loginCoreOTP(fetchData);
        if (res && !res.error) {
            localStorage.setItem('accessTokenCore', res.accessToken);
            localStorage.setItem('accountInfoKey', JSON.stringify(res));
            let lstSubNumber = res.userInfo.accounts[0].accountSubs || [];
            let obj = JSON.parse(localStorage.getItem('rememberSectionOrder'));
            if(obj){
                if(obj.SUB_NUMBER){
                    console.log(lstSubNumber.map(item => item.subNumber) + " lst subnumber");
                    console.log(obj.SUB_NUMBER);
                    if(lstSubNumber.map(item => item.subNumber).indexOf(obj.SUB_NUMBER) <= -1){
                        localStorage.setItem('rememberSectionOrder', JSON.stringify({CODE_STOCK: null, SUB_NUMBER: '00'}))
                    }
                }
            }
            return dispatch({
                type: LOGIN_OTP_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: LOGIN_OTP_FAILED,
                message: res.code,
            })
        }
    } catch (er) {
        return dispatch({
            type: LOGIN_OTP_FAILED,
            message: er,
        })
    }
}

export const getUser = fetchData => async (dispatch) => {
    dispatch({
        type: GET_USER_REQUEST,
    })
    try {
        const res = await api.getUser(fetchData);
        if (res && !res.error) {
            localStorage.setItem('userInfoKey', JSON.stringify(res))
            return dispatch({
                type: GET_USER_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: GET_USER_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: GET_USER_FAILED,
            message: er,
        })
    }
}

export const getAccountBank = fetchData => async (dispatch) => {
    dispatch({
        type: GET_ACCOUNT_BANK_REQUEST,
    })
    try {
        const res = await api.getAccountBank(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: GET_ACCOUNT_BANK_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: GET_ACCOUNT_BANK_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: GET_ACCOUNT_BANK_FAILED,
            message: er,
        })
    }
}

export const getBanks = fetchData => async (dispatch) => {
    dispatch({
        type: GET_BANK_CORE_REQUEST,
    })
    try {
        const res = await api.getBanks(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: GET_BANK_CORE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: GET_BANK_CORE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: GET_BANK_CORE_FAILED,
            message: er,
        })
    }
}