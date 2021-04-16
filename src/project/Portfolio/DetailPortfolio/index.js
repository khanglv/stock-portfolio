import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from '../reducer/configStorePortfolio';
import AppDetailPortfolio from './App';

class IndexDetailPortfolio extends Component{
    render(){
        return(
            <Provider store={store}>
                <AppDetailPortfolio {...this.props}/>
            </Provider>
        )
    }
}


export default (IndexDetailPortfolio);