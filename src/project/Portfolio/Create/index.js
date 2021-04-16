import React from 'react';
// import * as common from '../../components/Common/Common';
import { Provider } from 'react-redux';
import store from '../reducer/configStorePortfolio';
import AppPortfolio from './App';

function PortfolioCreate(props) {
    return(
        <Provider store={store}>
            <AppPortfolio componentEvent={props.componentEvent}/>
        </Provider>
        
    )
}

export default PortfolioCreate;