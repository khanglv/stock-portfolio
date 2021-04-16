import * as actionTypes from "./actionTypes";

import {
  api_get_list_customers,
  api_get_customer,
  api_post_customer_approve,
  api_get_list_bank,
  api_get_branches_banks,
  api_update_data,
  api_update_manage_by,
  generate_contract,
  resend_contract,
  changePassword,
  cancelCustomer,
  getBrandNames,
  getBroker,
  apiGetBrokersByRole,
  apiGetBrandsByRole
} from "../../../api/api";

import * as R from 'ramda'
import moment from "moment";


export const set_list_brokers = data => {
  return {
    type: actionTypes.SET_LIST_BROKERS,
    data: data
  };
}
export const set_list_brand_names = data => {
  return {
    type: actionTypes.SET_BRANCH_NAMES,
    data: data
  };
}
export const start_branches_banks = () => {
  return {
    type: actionTypes.START_BRANCHES_BANKS,
  };
}

export const success_branches_banks = branches => {
  return {
    type: actionTypes.SUCESS_BRANCHES_BANKS,
    data: branches
  };
}

export const error_branches_banks = error => {
  return {
    type: actionTypes.ERROR_BRANCHES_BANKS,
    error: error
  };
}
export const start_list_banks = () => {
  return {
    type: actionTypes.START_LIST_BANKS,
  };
}
export const success_list_banks = banks => {
  return {
    type: actionTypes.SUCCESS_LIST_BANKS,
    data: banks
  };
}
export const error_list_banks = error => {
  return {
    type: actionTypes.ERROR_LIST_BANKS,
    error: error
  };
}
export const start_list_customer = () => {
  return {
    type: actionTypes.START_LIST_CUSTOMER_ONLINE,
  };
};

export const success_list_customer = (data) => {
  return {
    type: actionTypes.SUCCESS_LIST_CUSTOMER_ONLINE,
    data: data,
  };
};

export const success_pagination_customer = (data) => {
  return {
    type: actionTypes.SUCCESS_PAGINATION_CUSTOMER_ONLINE,
    data: data,
  };
};

export const error_list_customer = (error) => {
  return {
    type: actionTypes.ERROR_LIST_CUSTOMER_ONLINE,
    error: error,
  };
};

export const start_customer_detail = () => {
  return {
    type: actionTypes.CUSTOMER_DETAIL_START,
  };
};

export const success_customer_detail = ({customer, wrong_data, draff, referral}) => {
  return {
    type: actionTypes.CUSTOMER_DETAIL_SUCCESS,
    customer,
    wrong_data,
    draff,
    referral
  };
};

export const error_customer_detail = (error) => {
  return {
    type: actionTypes.CUSTOMER_DETAIL_ERROR,
    error: error,
  };
};

export const start_customer_approved = () => {
  return {
    type: actionTypes.START_CUSTOMER_APPROVE,
  };
};
export const success_customer_approved = (approve) => {
  return {
    type: actionTypes.SUCCESS_CUSTOMER_APPROVE,
    approve: approve,
  };
};

export const error_customer_approved = (error) => {
  return {
    type: actionTypes.ERROR_CUSTOMER_APPROVE,
    error: error,
  };
};

export const moi_gioi_list = (data) => {
    return {
      type: actionTypes.MG_LIST,
      data: data,
    };
  };

export const start_download_contract = () => {
  return {
    type: actionTypes.START_DOWNLOAD_CONTRACT
  };
}

export const success_download_contract = () => {
  return {
    type: actionTypes.SCUESS_DOWNLOAD_CONTRACT
  };
}

export const error_download_contract = (error) => {
  return {
    type: actionTypes.ERROR_DOWNLOAD_CONTRACT,
    error: error
  };
}
export const list_phong_gd = (rooms) => {
  return {
    type: actionTypes.LIST_PHONG_GD,
    rooms: rooms
  };
}

export const checkRole = (customers) => {
  return async (dispatch) => {
    
  }
}

export const getCustomer = (id,role = [], query,callback) => {
  console.log(query);
  return async (dispatch) => {
   dispatch(start_list_customer());
    let resonse = await api_get_list_customers(id,role, query);
    if (resonse && resonse.data && resonse.data.customers) {
      dispatch(success_list_customer(resonse.data.customers));
      dispatch(success_pagination_customer(resonse.data.pagination));
      callback(resonse.data.customers);
    } else {
      dispatch(error_list_customer(resonse));
    }
  };
};

export const seacrch = (params,  callback) => {
  return async (dispatch, getState) => {
    let list = getState().customers.list_online || [];
    if (params.id_number !== '') {
       
        let list_cuss = list.filter((customer) => {
          return (
            String(customer.id_number)
              .toLowerCase()
              .includes(params && params.id_number.toLowerCase()) ||
            String(customer.phone)
              .toLowerCase()
              .includes(params && params.id_number.toLowerCase()) ||
              String(customer.account_number)
                .toLowerCase()
                .includes(params && params.id_number.toLowerCase())
          );
        });
        const by_create_at = R.descend(R.prop('createdAt'));
        const customers = R.sort(by_create_at, list_cuss);

        list = customers
       
    }
    if (params.status !== 'all')
    {
      let list_cuss = list.filter((customer) => {
        return (
          String(customer.status) === params.status
        );
      });
      const by_create_at = R.descend(R.prop('createdAt'));
      const customers = R.sort(by_create_at, list_cuss);

      list = customers
     
    }
    if (params.moigioi !== 'Tất cả môi giới')
    {
       let username = params.moigioi.split(' - ')
       console.log('username =========', username)
        let list_cuss = list.filter((customer) => {
            return (
                customer.manage_by && customer.manage_by.broker.user_name && String(customer.manage_by.broker.user_name).includes(username[0])
            );
          });
          const by_create_at = R.descend(R.prop('createdAt'));
          const customers = R.sort(by_create_at, list_cuss);
  
          list = customers
         
    }
    if ( params && params.start_date !== '' && params.start_date !== null )
    {
      let list_cuss = list.filter((customer) => {
        let create_at = customer.createdAt && customer.createdAt &&  moment(customer.createdAt).format("YYYY-MM-DD")
        let time_02 = params.start_date.format("YYYY-MM-DD")
          return (
              customer && customer.createdAt && create_at >= time_02
          );
        });
        const by_create_at = R.descend(R.prop('createdAt'));
        const customers = R.sort(by_create_at, list_cuss);

        list = customers
    }

    if ( params && params.end_date !== '' && params.end_date !== null)
    {
      let list_cuss = list.filter((customer) => {
        let create_at = customer.createdAt && customer.createdAt &&  moment(customer.createdAt).format("YYYY-MM-DD")
        let time_02 = params.end_date.format("YYYY-MM-DD")
          return (
              customer && customer.createdAt && create_at <= time_02
          );
        });
        const by_create_at = R.descend(R.prop('createdAt'));
        const customers = R.sort(by_create_at, list_cuss);

        list = customers
    }
    if ( params && params.room !== 'all' && params.room !== '')
    {
      let list_cuss = list.filter((customer) => {
       
          return (
              customer && customer.manage_by && customer.manage_by.brand.display_name  && customer.manage_by.brand.display_name.includes(params.room)
          );
        });
        const by_create_at = R.descend(R.prop('createdAt'));
        const customers = R.sort(by_create_at, list_cuss);

        list = customers

    }

    callback(list)
  };
};
export const getCustomerDetail = (id) => {
  return async (dispatch, getState) => {
    dispatch(start_customer_detail());
    let resonse = await api_get_customer(id);
    if (resonse && resonse.data && resonse.data.customer) {
      dispatch(success_customer_detail(resonse.data));
    } else {
      dispatch(error_customer_detail());
    }
  };
};

export const approved_customer = (id, success, error) => {
  return async (dispatch, getState) => {
    try {
      let response = await api_post_customer_approve(id);
      if (response.status === 200) {
        success("ok");
      }
      else {
        error(response.error);
      }
    } catch (error) {}
  };
};

export const list_banks = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(start_list_banks())
      let response = await api_get_list_bank();
      console.log('response banks ========', response)
      if (response && response.data) {
        dispatch(success_list_banks(response.data))
      }
      else {
        dispatch(error_list_banks())
      }
      
      
    

    } catch (error) {
       dispatch(error_list_banks(error))
    }
  }
}

export const list_branches_banks = (code) => {
    return async (dispatch, getState) => {
      try {
        dispatch(start_branches_banks())
        let response = await api_get_branches_banks(code);
        if (response && response.data)
        {
          dispatch(success_branches_banks(response.data))
        }
        else {
          dispatch(error_branches_banks())
        }
       
        
      } catch (error) {
        dispatch(error_branches_banks(error))
      }
    }
}
export const updateManageBy = (id, data, success, error) => {
  return async (dispatch, getState) => {
    try {
      let response = await api_update_manage_by(id, data);
      console.log(response)
      if ( response && response.status === 200) {
        success("ok");
      }
      else {
        error('Đã có lỗi xảy ra');
      }
    } catch (err) {
      console.error(err)
      error('Thông tin chưa đầy đủ');
    }
  }
}
export const update_customers = (id, customer, success, error) => {
  return async (dispatch, getState) => {
    try {
      let response = await api_update_data(id, customer);
      if ( response && response.status === 200) {
        success("ok");
      }
      else {
        error( response && response.errors ? 'Thông tin chưa đầy đủ' :  response.error && response.error || '');
      }
      
    } catch (error) {
      console.log(error)
    }
  }
}
let t = 1;
let timerId
export const download_contract = (id, success, error) => {
  return async (dispatch, getState) => {
        dispatch(start_download_contract())
        let response = await generate_contract(id)
       
        if (response && response.status === 200)
        {

          timerId = setInterval( async () => {
            
            let resonse = await api_get_customer(id);
            t = t + 1
           
            console.log('t =====', t)
            if (t === 10)
            {
              if (resonse && resonse.data && resonse.data.customer && R.isEmpty(resonse.data.customer.contracts) === false ) {
                dispatch(success_download_contract())
                dispatch(getCustomerDetail(id))               
                success(t)       
              }
              else {
                error('Không thể tạo hợp đồng')
                dispatch(error_download_contract('Không thể tạo hợp đồng'))
              }
                 
              clearInterval(timerId)
             
            }
          }, 5000);
        }
        else {
          dispatch(error_download_contract(response.error))
          error(response.error)
        }
  }
}
export const  resend_contract_by_email =  (id, success, error) => {
  return async (dispatch, getState) => {
    let response = await resend_contract(id)
    if (response && response.status === 200)
    {
      success('OK')
    }
    else {
      error(response.error)
    }
  }
}
export const change_Password = (newPassword, success, error) => {
  return async (dispatch, getState) => {
    let response = await changePassword(newPassword)
    if (response && response.status === 200)
    {
      success('OK')
    }
    else {
      error(response && response.error && response.error)
    }
  }
}
export const cancel = (id, success, error) => {
  return async (dispatch, getState) => {
    let response = await cancelCustomer(id)
    if (response && response.status === 200)
    {
      success('OK')
    }
    else {
      error(response && response.error && response.error)
    }
  }
}
export const getBrands = region => {
  return async (dispatch, getState) => {
    let response = await getBrandNames(region)
    console.log('status response ===========', response)
    if (response && response.status === 200)
    {
      dispatch(set_list_brand_names(response.data))
    }
   
  }
}
export const getBrokersCustomers = (region, brand) =>  {
  return async (dispatch, getState) => {
    let response = await getBroker(region, brand)
    if (response && response.status === 200)
    {
      dispatch(set_list_brokers(response.data))
    }
   
  }
}

export const getBrokersByRole = (role, id, query = {}) =>  {
  return async (dispatch, getState) => {
    let response = await apiGetBrokersByRole(role, id, query)
    if (Array.isArray(response))
    {
      dispatch(moi_gioi_list(response))
    }
   
  }
}

export const getBrandsByRole = (role, id) =>  {
  return async (dispatch, getState) => {
    let response = await apiGetBrandsByRole(role, id);
    if (Array.isArray(response))
    {
      dispatch(list_phong_gd(response))
    }
   
  }
}



