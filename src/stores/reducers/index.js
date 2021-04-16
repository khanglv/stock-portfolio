import { combineReducers } from 'redux';
import login from './login';
import indexCore from './indexCore';
import indexInvestor from './indexInvestor';
import indexMaster from './indexMaster';

//core
import loginCore from './loginCore';

import customersOnline from './customersOnline'

export default combineReducers({
    login: login,
    loginCore: loginCore,
    indexCore: indexCore,
    indexInvestor: indexInvestor,
    customers: customersOnline,
    indexMaster: indexMaster
});