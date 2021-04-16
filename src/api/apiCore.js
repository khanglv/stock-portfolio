import axios from 'axios';
import NProgress from 'nprogress';
import * as storage from './storage';
import * as common from '../components/Common/Common';
import {BASE_URL} from './configURL';

const BASE_URL_CORE = process.env.REACT_APP_BASE_URL_CORE;

// const BASE_URL_CORE = process.env.REACT_APP_BASE_URL;
const BASE_URL_BUY_ABLE = `${BASE_URL_CORE}/equity/account/buyable`;
const BASE_URL_SELL_ABLE = `${BASE_URL_CORE}/equity/account/sellable`;
const BASE_URL_EQUITY_ORDER = `${BASE_URL_CORE}/equity/order`;
const BASE_URL_MARKET = `${BASE_URL_CORE}/market`;
const BASE_URL_EQUITY_ORDER_HISTORY = `${BASE_URL_CORE}/equity/order/history`;
const BASE_URL_EQUITY_ORDER_CANCEL = `${BASE_URL_CORE}/equity/order/cancel`;
const BASE_URL_EQUITY_ORDER_MODIFY = `${BASE_URL_CORE}/equity/order/modify`;
const BASE_URL_EQUITY_ACCOUNT_PROFITLOSS = `${BASE_URL_CORE}/equity/account/profitLoss`;
const BASE_URL_EQUITY_ACCOUNT_ASSET_INFO = `${BASE_URL_CORE}/equity/account/assetInfo`;

const TIME_OUT = 10000;

const doRequest = async (options) => {
    try{
        NProgress.start();
        options = {
            ...options,
            timeout: TIME_OUT,
            config: {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            },
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
                storage.removeStorageToken();
                window.location.href = "/login";
                common.notify('error', 'Your request in valid, try again !!!');
            }
            if(err.response.status === 501){
                common.notify('error', 'Request timeout, try again !!!');
                return;
            }
            if(err.response.status === 403){
                storage.removeStorageToken();
                window.location.href = "/login";
                common.notify('error', 'Bạn không có quyền truy cập, vui lòng đăng nhập lại !!!');
            }
            if(err.response.status === 404){
                return { ...err.response.data, error: true};
            }
            // common.notify("error", "Thao tác thất bại " + err.response.data.code);
            return { ...err.response.data, error: true};
        }else{
            common.notify('error', 'Server không phản hồi, thử lại !!!');
            return;
        }
    }
}

const callApi = (options, needToken = false, tokenCurrent = null)=>{
    if(tokenCurrent){
        options = {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `jwt ${tokenCurrent}`
            }
        }
    }
    if(needToken){
        const accessToken = storage.accessTokenCore();
        options = {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `jwt ${accessToken}`
            }
        }
    }
    return doRequest(options);
}


export const loginCore = (dataTmp)=>{
    const url = `${BASE_URL}/login`;
    const data = {
        "username": dataTmp.userName,
        "password": dataTmp.password
    };
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApi(options, false);
}

export const loginCoreInternal = (dataTmp)=>{
    const url = `${BASE_URL_CORE}/login`;
    const data = {
        "grant_type": "password", 
        "username": dataTmp.userName,
        "password": dataTmp.password
    };
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApi(options, false);
}

export const loginCoreOTP = (obj)=>{
    const url = `${BASE_URL_CORE}/login/sec/verifyOTP`;
    const data = {
        otp_value: obj.otp
    };
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApi(options, false, obj.token);
}

export const getCashBalance = (data)=>{
    const url = `${BASE_URL_CORE}/equity/account/cashBalance?accountNumber=${data.accountNumber}&subNumber=00`;
    const options = {
        url: url,
        method: "GET"
    }
    return callApi(options);
}

export const getUser = (data)=>{
    const url = `${BASE_URL_CORE}/equity/account/info?accountNumber=${data.accountNumber}`;
    const options = {
        url: url,
        method: "GET"
    }
    return callApi(options, true);
}

export const getAccountBank = (data)=>{
    const url = `${BASE_URL_CORE}/equity/withdraw/banks?accountNumber=${data.accountNumber}`;
    const options = {
        url: url,
        method: "GET"
    }
    return callApi(options, true);
}

export const getBanks = (data)=>{
    const url = `${BASE_URL_CORE}/equity/account/banks?accountNumber=${data.accountNumber}&subNumber=00`;
    const options = {
        url: url,
        method: "GET"
    }
    return callApi(options, true);
}

export const sendOTPMobile = (token)=>{
    const url = `${BASE_URL_CORE}/notifyMobileOtp`;
    const options = {
        url: url,
        method: "POST"
    }
    return callApi(options, false, token);
}

export const getBankAccount = (data)=>{
    const url = `${BASE_URL_CORE}/equity/account/banks?accountNumber=${data.accountNumber}&subNumber=${data.subNumber}`;
    const options = {
        url: url,
        method: "GET"
    }
    return callApi(options, true);
}

//************ API - Order **************

//GET danh sách C.Phiếu
export const getStockList = ()=>{
    const url = 'https://tradex-vn.s3.ap-southeast-1.amazonaws.com/market_data/market_data_gzip.json';
    const options = {
        url: url,
        method: "GET"
    }
    return callApi(options);
}

//Sử dụng api core 

//GET SL khả dụng, sức mua
export const getAccountBuyAble = (data)=>{
    const url = `${BASE_URL_BUY_ABLE}?accountNumber=${data.accountNumber}&orderPrice=${data.orderPrice}&orderQuantity=${data.orderQuantity}&subNumber=${data.subNumber}`;
    const options = {
        url: url,
        method: "GET"
    }
    return callApi(options, true);
}

//GET SL bán
export const getAccountSellAble = (data)=>{
    const url = `${BASE_URL_SELL_ABLE}?accountNumber=${data.accountNumber}&orderPrice=${data.orderPrice}&subNumber=${data.subNumber}`;
    const options = {
        url: url,
        method: "GET"
    }
    return callApi(options, true);
}

//Mua thường (/equity/order)
export const equityOrder = (data)=>{
    const url = BASE_URL_EQUITY_ORDER;
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApi(options, true);
}

//get info stock code & futures
export const getMarketStock = (stockCode)=>{
    const url = `${BASE_URL_MARKET}/stock/${stockCode}`;
    const options = {
        url: url,
        method: "GET"
    }
    return callApi(options, true);
}

export const getMarketFutures = (futuresCode)=>{
    const url = `${BASE_URL_MARKET}/futures/${futuresCode}`;
    const options = {
        url: url,
        method: "GET"
    }
    return callApi(options, true);
}

//get equity order history
export const getEquityOrderHistory = (data)=>{
    const url = BASE_URL_EQUITY_ORDER_HISTORY;
    const options = {
        url: url,
        method: "GET",
        params: data
    }
    return callApi(options, true);
}

//equity order cancel
export const equityOrderCancel = (data)=>{
    const url = BASE_URL_EQUITY_ORDER_CANCEL;
    const options = {
        url: url,
        method: "PUT",
        data: data
    }
    return callApi(options, true);
}

//equity order modify
export const equityOrderModify = (data)=>{
    const url = BASE_URL_EQUITY_ORDER_MODIFY;
    const options = {
        url: url,
        method: "PUT",
        data: data
    }
    return callApi(options, true);
}

//equity account profitLoss
export const equityAccountProfitLoss = (data)=>{
    const url = BASE_URL_EQUITY_ACCOUNT_PROFITLOSS;
    const options = {
        url: url,
        method: "GET",
        params: data
    }
    return callApi(options, true);
}

//equity account asset info
export const equityAccountAssetInfo = (data)=>{
    const url = BASE_URL_EQUITY_ACCOUNT_ASSET_INFO;
    const options = {
        url: url,
        method: "GET",
        params: data
    }
    return callApi(options, true);
}
