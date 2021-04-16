import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from '../reducer/configStorePortfolio';
import AppListPortfolio from './App';

class IndexListPortfolio extends Component{
    render(){
        return(
            <Provider store={store}>
                <AppListPortfolio />
            </Provider>
        )
    }
}


export default (IndexListPortfolio);