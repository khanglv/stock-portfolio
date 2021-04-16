import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Error404 } from "../components/Error404/Error404";
import Login from "../components/Login/Login";
import Loading from "../components/Loading/Loading";

import {
  FHome,
  FPortfolioCreate,
  FCustomersOnline,
  FCustomerDetail,
  FChangePassword,
  FRecommendations
} from "../layout/MainGeneral";
import * as api from '../api/api';

// import jwtDecode  from 'jwt-decode';
import * as storage from '../api/storage';

// const accessTokenAuth = localStorage.getItem('accessTokenCore');
const accessTokenAuthKey = localStorage.getItem("accessTokenAuthKey");
class RouteURL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowLoading: true,
        };
    }
    componentDidMount() {
        this.setState({ isShowLoading: false });
    }

    async shouldComponentUpdate(nextProps, nextState) {
        if(accessTokenAuthKey){
        let result = await api.api_check_token(accessTokenAuthKey)
                if ( result && result.data === true) { 
                let path =  window.location.pathname
                    if (path === '/login')
                    { 
                        window.location.href = '/'
                    }
                    return true;
                }
                else {
                    storage.removeStorageToken();
                    window.location.href = "/login";
                    return false;
                }
        } else {
            let currentRouteName = window.location.pathname;
            if(currentRouteName!=='/login'){
                window.location.href = "/login";
                return false;
            }
            return true;
        }
    }

    render() {
        let router = (
            <BrowserRouter>
                <Switch>
                <Route path="/login" component={Login} />
                <Route exact path="/" component={FHome} />
                <Route this path="/home" component={FHome} />
                <Route this path="/portfolio-create" component={FPortfolioCreate} />
                <Route exact path="/customers-online" component={FCustomersOnline} />
                <Route exact path="/change-password" component={FChangePassword} />
                <Route exact path="/recommendations" component={FRecommendations} />
                <Route
                        exact
                        path="/customers-online/:_id"
                        component={FCustomerDetail}
                    />
                <Route exact path="*" component={Error404} />
                </Switch>
            </BrowserRouter>);
        return (
            <Loading isLoading={this.state.isShowLoading}>
                {router}
            </Loading>
        );
    }
}

export default RouteURL;
