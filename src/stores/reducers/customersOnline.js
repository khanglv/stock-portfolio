import * as actionTypes from '../actions/investor/actionTypes';


let initialState = {
    loading: false,
    error: null,
    list_online: [],
    pagination: {
        totalRecord: 0,
        totalPage: 1,
        currentPage: 1,
        itemsPerPage: 10
    },
    customer_detail: null,
    error_approve: null,
    loading_approve: false,
    approve: null,
    mg_list: [],
    banks: [],
    branches: [],
    error_download: null,
    loading_download: false,
    rooms: [],
    brandNames: [],
    brokers: [],
    wrong_data: null,
    draff: null,
    referral: null

}
const set_pagination = ( state, action ) => {
    return updateObject( state, { pagination: action.data } );
};

const start_customers = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};
const success_customers = (state, action) => {
    return updateObject( state, { 
        list_online: action.data,
        error: null,
        loading: false
     } );
};
const error_customers = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const start_customer_detail = (state, action) => {
    return updateObject( state, { error: null, loading: true, customer_detail: null } );
}

const success_customer_detail = (state, action) => {
    console.log('action', action)
    return updateObject( state, { 
        customer_detail: action.customer,
        wrong_data: action.wrong_data,
        draff: action.draff,
        referral: action.referral,
        error: null,
        loading: false
     } );
}

const error_customer_detail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const start_customer_approve = (state,action) => {
    return updateObject( state, { error_approve: null, loading_approve: true } );
}

const success_customer_approve = (state,action) => {
    return updateObject( state, { 
        error_approve: null,
        loading_approve: false,
        approve: action.approve
    });
}

const error_customer_approve = (state, action) => {
    return updateObject( state, {
        error_approve: action.error,
        loading_approve: false
    });
}

const moi_gioi_list = (state, action) => {
    return updateObject( state, {
        mg_list: action.data
    })
}

const start_list_banks = (state, action) => {
    return updateObject( state, {
        loading: true
    });
}
const success_list_banks = (state, action) => {
    return updateObject( state, {
        banks: action.data,
        loading: false
    });
}

const error_list_banks = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const start_branches_banks = (state, action) => {
    return updateObject( state, {
        loading: true
    });
}
const success_branches_banks = (state, action) => {
    return updateObject( state, {
        loading: false,
        branches: action.data
    });
}

const error_branches_banks = (state, action) => {
    return updateObject( state, {
        loading: false,
        error: action.error
    });
}

const start_download_contract = (state, action) => {
    return updateObject( state, {
        loading_download: true,
        error_download: null
    });
}

const success_download_contract = (state, action) => {
    return updateObject( state, {
        loading_download: false
    });
}

const error_download_contract = (state, action) => {
    return updateObject( state, {
        loading_download: false,
        error_download: action.error
    });
}

const list_rooms = (state, action) => {
    return updateObject( state, {
        rooms: action.rooms,
    });
}
const list_branches_name = (state, action) => {
    return updateObject( state, {
        brandNames: action.data,
    });
}

const list_brokers = (state,action) => {
    return updateObject( state, {
        brokers: action.data,
    });
}


let customers = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.START_LIST_CUSTOMER_ONLINE: return start_customers(state, action);
        case actionTypes.SUCCESS_LIST_CUSTOMER_ONLINE: return success_customers(state, action);
        case actionTypes.SUCCESS_PAGINATION_CUSTOMER_ONLINE: return set_pagination(state, action);
        case actionTypes.ERROR_LIST_CUSTOMER_ONLINE: return error_customers(state, action);

        case actionTypes.CUSTOMER_DETAIL_START: return start_customer_detail(state, action);
        case actionTypes.CUSTOMER_DETAIL_SUCCESS: return success_customer_detail(state, action);
        case actionTypes.CUSTOMER_DETAIL_ERROR: return error_customer_detail(state, action);


        case actionTypes.START_CUSTOMER_APPROVE: return start_customer_approve(state,action);
        case actionTypes.SUCCESS_CUSTOMER_APPROVE: return success_customer_approve(state,action);

        case actionTypes.ERROR_CUSTOMER_APPROVE: return error_customer_approve(state,action);

        case actionTypes.MG_LIST :  return moi_gioi_list(state,action);

        
        case actionTypes.START_LIST_BANKS: return start_list_banks(state,action);

        case actionTypes.SUCCESS_LIST_BANKS: return success_list_banks(state, action);

        case actionTypes.ERROR_LIST_BANKS: return error_list_banks(state, action);

        case actionTypes.START_BRANCHES_BANKS : return start_branches_banks(state, action);

        case actionTypes.SUCESS_BRANCHES_BANKS : return success_branches_banks(state, action);
        
        case actionTypes.ERROR_BRANCHES_BANKS : return error_branches_banks(state, action);


        case actionTypes.START_DOWNLOAD_CONTRACT : return start_download_contract(state,action);

        case actionTypes.SCUESS_DOWNLOAD_CONTRACT : return success_download_contract(state,action);

        case actionTypes.ERROR_DOWNLOAD_CONTRACT : return error_download_contract(state,action);

        case actionTypes.LIST_PHONG_GD : return list_rooms(state,action)

        case actionTypes.SET_BRANCH_NAMES: return list_branches_name(state,action)

        case actionTypes.SET_LIST_BROKERS: return list_brokers(state,action)

        default:
            return state;
    }
};

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export default customers;