
import axios from 'axios';
import NProgress from 'nprogress';
import * as common from '../components/Common/Common';
import * as storage from './storage';

const BASE_URL_CORE_MASTER = process.env.REACT_APP_BASE_URL_CORE_MASTER;
const KEY_VERIFY = process.env.REACT_APP_BASE_URL_MASTER_KEY;

// ================= Alert ================
const BASE_URL_GET_ALERT_STOCK = `${BASE_URL_CORE_MASTER}/alert/stockCode`;
const BASE_URL_REMIND_ALERT = `${BASE_URL_CORE_MASTER}/alert/remind`;
const BASE_URL_HISTORY_ALERT = `${BASE_URL_CORE_MASTER}/alert/historyRecommend`;
const BASE_URL_UPDATE_REMIND = `${BASE_URL_CORE_MASTER}/alert/updateRemind`;
const BASE_URL_SEND_REMIND = `${BASE_URL_CORE_MASTER}/alert/sendRemind`;
const BASE_URL_SEND_REMIND_SELL = `${BASE_URL_CORE_MASTER}/alert/sendRemindSell`;
const BASE_URL_ASSET_RECOMMEND = `${BASE_URL_CORE_MASTER}/alert/assetRecommend`;
const BASE_URL_STATISTIC = `${BASE_URL_CORE_MASTER}/alert/statistic`;
const BASE_URL_REMOVE_REMIND = `${BASE_URL_CORE_MASTER}/alert/removeRemind`;

//load danh sách khách hàng của broker
const BASE_URL_LOAD_ALL_CUSTOMER = `${BASE_URL_CORE_MASTER}/alert/loadCustomer`;

const TIME_OUT = 50000;

const doRequest = async (options, isProgress = false) => {
    try {
        if(isProgress){
            NProgress.start();
        }
        options = {
            ...options,
            timeout: TIME_OUT,
            config: {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        }
        const response = await axios(options);
        if(response.status>= 200 && response.status < 300){
            NProgress.done();
            return response.data;
        }
    }catch(err){
        NProgress.done();
        if(err.response){
            if(err.response.status === 401){
                common.notify('error', 'Your request in valid, try again !!!');
                storage.removeStorageToken();
                window.location.href = "/login";
                return;
            }
            if(err.response.status === 501){
                common.notify('error', 'Request timeout, try again !!!');
                return;
            }
            if(err.response.status === 403){
                window.location.href = "/login";
                common.notify('error', 'Bạn không có quyền truy cập, vui lòng đăng nhập lại !!!');
                return;
            }
            return err.response.data;
        }else{
            // common.notify('error', 'Server không phản hồi, thử lại !!!'); //=> mopwr sau
            return;
        }
    }
}

const callApi = (options, needAuth = true, isProgress = false)=>{
    if(needAuth){
        if(KEY_VERIFY){
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    APIKEY: KEY_VERIFY
                }
            }
        }else{
            window.location.href = "/login";
            common.notify('error', 'Bạn không có quyền truy cập, vui lòng đăng nhập lại !!!');
            return;
        }
    }
    return doRequest(options, isProgress);
}

//=========================== Alert ==============================
export const actionRemind = (data)=>{
    const url = BASE_URL_REMIND_ALERT;
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApi(options, true);
}

export const getAlertHistory = (data)=>{
    const url = BASE_URL_HISTORY_ALERT;
    const options = {
        url: url,
        method: "GET",
        params: data
    }
    return callApi(options, true);
}

export const getAlertStockCode = (data)=>{
    const url = `${BASE_URL_GET_ALERT_STOCK}/${data}`;
    const options = {
        url: url,
        method: "GET"
    }
    return callApi(options, true);
}

export const updateRemind = (data)=>{
    const url = BASE_URL_UPDATE_REMIND;
    const options = {
        url: url,
        method: "PUT",
        data: data
    }
    return callApi(options, true);
}

export const sendRemind = (data)=>{
    const url = BASE_URL_SEND_REMIND;
    const options = {
        url: url,
        method: "PUT",
        data: data
    }
    return callApi(options, true);
}

export const sendRemindSell = (data)=>{
    const url = BASE_URL_SEND_REMIND_SELL;
    const options = {
        url: url,
        method: "PUT",
        data: data
    }
    return callApi(options, true);
}

export const removeRemind = (data)=>{
    const url = BASE_URL_REMOVE_REMIND;
    const options = {
        url: url,
        method: "PUT",
        data: data
    }
    return callApi(options, true);
}

export const getAssetRecommend = (data)=>{
    const url = `${BASE_URL_ASSET_RECOMMEND}`;
    const options = {
        url: url,
        method: "GET",
        params: data
    }
    return callApi(options, true);
}

export const getStatistic = (data)=>{
    const url = `${BASE_URL_STATISTIC}`;
    const options = {
        url: url,
        method: "GET",
        params: data
    }
    return callApi(options, true);
}

export const loadAllCustomer = (userName, token)=>{
    const url = `${BASE_URL_LOAD_ALL_CUSTOMER}?username=${userName}`;
    const options = {
        url: url,
        method: "GET",
        headers: {
            Authorization: token
        }
    }
    return callApi(options, true, false);
}
