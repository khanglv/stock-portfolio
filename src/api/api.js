import axios from 'axios';
import * as storage from './storage';
import NProgress from 'nprogress';
import * as common from '../components/Common/Common';

import { BASE_URL } from './configURL';

const LOGIN = `${BASE_URL}/login`;

const URL_INDEX =`${BASE_URL}/indexs`;

const URL_UPLOAD_ICON =`${URL_INDEX}/uploadIcon`;



//check token is available
const URL_CHECK_TOKEN = `${BASE_URL}/indexs/testToken`;
const URL_AUTH = process.env.REACT_APP_BASE_URL_AUTH;
const BASE_URL_CUSTOMERS = process.env.REACT_APP_BASE_URL_CUSTOMER;

const REACT_APP_X_API_KEY = process.env.REACT_APP_X_API_KEY;

const TIME_OUT = 10000;

const doRequestCustomer = async (options) => {
    try {
        NProgress.start();
        options = {
            ...options,
            timeout: TIME_OUT
        };
        console.log('option from customers =======', options )
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
                return;
            }
            if(err.response.status === 501){
                common.notify('error', 'Request timeout, try again !!!');
                return;
            }
            if(err.response.status === 403){
                //window.location.href = "/login";
                common.notify('error', 'Bạn không có quyền truy cập, vui lòng đăng nhập lại !!!');
            }
            if(err.response.status === 404){
                common.notify('error', 'URL not found');
                return;
            }
            return err.response.data;
        }else{
            common.notify('error', 'Server không phản hồi, thử lại !!!');
            return;
        }
    }

}

const doRequest = async (options) => {
    try {
        NProgress.start();
        options = {
            ...options,
            timeout: TIME_OUT,
            config: {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        };
        const response = await axios(options);
        if(response.status>= 200 && response.status < 300){
            NProgress.done();
            return response.data;
        }
    }catch(err){
        NProgress.done();
        if(err.response){
            common.notify('error', err.response.error);
            return;
            // if(err.response.status === 401){
            //     common.notify('error', 'Your request in valid, try again !!!');
            //     return;
            // }
            // if(err.response.status === 501){
            //     common.notify('error', 'Request timeout, try again !!!');
            //     return;
            // }
            // if(err.response.status === 403){
            //     //window.location.href = "/login";
            //     common.notify('error', 'Bạn không có quyền truy cập, vui lòng đăng nhập lại !!!');
            // }
            // if(err.response.status === 404){
            //     common.notify('error', 'URL not found');
            //     return;
            // }
            //return err.response.data;
        }else{
            common.notify('error', 'Server không phản hồi, thử lại !!!');
            return;
        }
    }
}

const doRequestFile = async (options) => {
    try{
        //NProgress.start();
        options = {
            ...options,
            timeout: TIME_OUT,
            config: {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        }
        const response = await axios(options);
        if(response.status>= 200 && response.status < 300){
            //NProgress.done();
            return response.data;
        }
    }catch(err){
        //NProgress.done();
        console.log(err.response);
        if(err.response){
            if(err.response.status === 401){
            }
            if(err.response.status === 501){
            }
            if(err.response.status === 403){
                window.location.href = "/login";
            }
        
            return err.response.data;
        }else{
            return;
        }
    }
}

const callApiLogin = (options) => {
    options = {
        ...options
    }
    return doRequest(options);
}

const callApi = (options, needAuth = true, isFile = false, isCustomer = false)=>{
    if(needAuth){
        const accessTokenAuth = storage.accessTokenAuth();
        if(accessTokenAuth){
            options = {
                ...options,
                headers: {
                    Authorization: `Bearer ${accessTokenAuth}`
                }
            }
        }else{
            window.location.href = "/login";
            common.notify('error', 'Bạn không có quyền truy cập, vui lòng đăng nhập lại !!!');
        }
    }
    if(isFile){
        return doRequestFile(options);
    }
    if (isCustomer){
        return doRequestCustomer(options);
    }
    else {
        return doRequest(options);
    }

}

export const loginApi = (username, password) => {
    const url = `${URL_AUTH}/login`;
    const data = {
        "userName": username,
        "password": password
    };
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApiLogin(options);
}

export const loginWithCore = (data)=>{
    const url = LOGIN;
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApi(options, false);
}


export const actionUploadIcon = (data)=>{
    const options = {
        url: URL_UPLOAD_ICON,
        method: "POST",
        data: data
    }
    return callApi(options, true, true);
}

export const actionCheckToken = (data)=>{
    const options = {
        url: URL_CHECK_TOKEN,
        method: "GET"
    }
    return callApi(options, true);
}

export const deleteIndex = (data)=>{
    const options = {
        url: URL_INDEX,
        method: "DELETE",
        data: data
    }
    return callApi(options, true);
}

export const actionIndex = (data)=>{
    const options = {
        url: URL_INDEX,
        method: "POST",
        data: data
    }
    return callApi(options, true);
}
export const updateIndex = (data)=>{
    const options = {
        url: URL_INDEX,
        method: "PUT",
        data: data
    }
    return callApi(options, true);
}

export const getListIndex = (numberPage)=>{
    const options = {
        url: `${URL_INDEX}/${numberPage}`,
        method: "GET"
    }
    return callApi(options, true);
}

export const activeIndex = (data)=>{
    const options = {
        url: `${URL_INDEX}/active`,
        method: "PUT",
        data: data
    }
    return callApi(options, true);
}
export const api_get_list_customers =  (id,role, query = {}) => {
    try {
        let options = {
            method: "GET",
            url:  BASE_URL_CUSTOMERS + '/customers',
            params: {
                role: role,
                id: id,
                ...query
            }
        }


    return callApi(options, false, false, true);
 
        
    } catch (error) {
        console.log(error)
    }
}
export const api_get_customer =  (id) => {
    try {
        let options = {
            method: "GET",
            url:  BASE_URL_CUSTOMERS + '/customers/' + id,
        }


      return  callApi(options, false, false, true);
 
        
    } catch (error) {
        console.log(error)
    }
}

export const api_post_customer_approve =   (id) => {
    try {
        let options = {
            method: "POST",
            url:  BASE_URL_CUSTOMERS + '/customers/' + id + '/approve',
        }


      return  callApi(options, false, false, true);
 
        
    } catch (error) {
        console.log(error)
    }

}
export const api_check_token = (token) => {
    try {
        let options = {
            method: "POST",
            url:  URL_AUTH + '/checkToken',
            data: {
                token: token
            }
        }

    return callApi(options, false);
 
    } catch (error) {
        console.log(error)
    }
}

export const getUserId = (id) => {
    try {
        let options = {
            method: "GET",
            url: `${URL_AUTH}/users/${id}`,
        }
        return callApi(options, false);
    } catch (error) {
        console.log(error)
    }
}
export const api_get_confirm_contracts = ids => {
    try {
        let options = {
            method: "POST",
            url:  BASE_URL_CUSTOMERS + '/customers/get-contract',
            data: {
                ids: ids
            }
        }


      return  callApi(options, false, false, true);
 
        
    } catch (error) {
        console.log(error)
    }
}
export const api_get_list_bank = () => {
    try {
        let options = {
            method: "GET",
            url:  BASE_URL_CUSTOMERS + '/banks',
        }
      return  callApi(options, false, false, true);  
    } catch (error) {
        console.log(error)
    }
}
export const api_get_branches_banks = code => {
    try {
        let options = {
            method: "GET",
            url:  BASE_URL_CUSTOMERS + `/bank/${code}/branches` ,
        }
      return  callApi(options, false, false, true);  
    } catch (error) {
        console.log(error)
    }
}
export const api_update_data = (id, customer )  => {
    try {
        let options = {
            method: "POST",
            url:  BASE_URL_CUSTOMERS + `/customers/${id}/update` ,
            data: customer
        }
      return  callApi(options, false, false, true);  
    } catch (error) {
        console.log(error) 
    }
}
export const api_update_manage_by = (id, data) => {
    try {
        let options = {
            method: "POST",
            url:  BASE_URL_CUSTOMERS + `/customers/${id}/update-manage-by` ,
            data
        }
      return callApi(options, false, false, true);  
    } catch (error) {
        console.log(error) 
    }
}

export const generate_contract = (id) => {
    try {
        let options = {
            method: "POST",
            url:  BASE_URL_CUSTOMERS + `/customers/${id}/generate-contract` 
           
        }
      return  callApi(options, false, false, true);  
    } catch (error) {
        console.log(error) 
    }
}
export const resend_contract = (id) => {
    try {
        let options = {
            method: "POST",
            url:  BASE_URL_CUSTOMERS + `/customers/${id}/resend-contract` 
           
        }
      return  callApi(options, false, false, true);  
    } catch (error) {
        console.log(error) 
    }
}

export const changePassword = (newPassword) => {
    try {
        let user = JSON.parse(localStorage.getItem('keyAuthInfoUser'))
        let options = {
            method: "POST",
            url:  BASE_URL_CUSTOMERS + `/users/${user.id}/change-password`,
            data: {
                newPassword: newPassword
            }
           
        }
      return  callApi(options, false, false, true);  
    } catch (error) {
        console.log(error) 
    }
}
export const cancelCustomer = (id) => {
    try {
        let options = {
            method: "POST",
            url:  BASE_URL_CUSTOMERS + `/customers/${id}/cancel` 
           
        }
        return  callApi(options, false, false, true); 
        
    } catch (error) {
        console.log(error) 
    }
}
export const getBrandNames = (region) => {
    try {
        let options = {
            method: "POST",
            url:  BASE_URL_CUSTOMERS + `/customers/brand-transaction`,
            data: {
                region: region 
            }
           
        }
        return  callApi(options, false, false, true); 
        
    } catch (error) {
        console.log(error) 
    }
}
export const getBroker = (region, brand) => {
    try {
        let options = {
            method: "POST",
            url:  BASE_URL_CUSTOMERS + `/customers/broker-transaction`,
            data: {
                region: region,
                brand: brand
            }
           
        }
        return  callApi(options, false, false, true); 
        
    } catch (error) {
        console.log(error) 
    }
}
export const apiGetBrokersByRole = (role, id, query = {}) => {
    try {
        let options = {
            method: "GET",
            url:  BASE_URL_CUSTOMERS + `/brokers`,
            params: {
                role: role,
                id: id,
                ...query
            }
           
        }
        return  callApi(options, false, false, true); 
        
    } catch (error) {
        console.log(error) 
    }
}

export const apiGetBrandsByRole = (role, id) => {
    try {
        let options = {
            method: "GET",
            url:  BASE_URL_CUSTOMERS + `/brands`,
            params: {
                role: role,
                id: id
            }
           
        }
        return  callApi(options, false, false, true); 
        
    } catch (error) {
        console.log(error) 
    }
}