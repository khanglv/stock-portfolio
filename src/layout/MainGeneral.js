import React from 'react';
//import layout
import SiderBarMenu from './SiderBarMenu/SiderBarMenu';
import HeaderCom from './HeaderCom';

//import project
import MainTrading from '../project/TradingView/MainTrading';
//import OrderMain from '../project/Order/index';
import PortfolioCreate from '../project/Portfolio/Create/index';
import DetailPortfolio from '../project/Portfolio/DetailPortfolio/index';
import ListPortfolio from '../project/Portfolio/ListPortfolio/Index';
import CustomersOnline from '../project/Customers/CustomersOnline';
import CustomerDetail from '../project/Customers/CustomerDetail';
import ChangePassword from '../components/ChangePassword';
import Recommendations from '../project/Alert/Recommendations';

import {Event} from '../components/Common/Event';

import * as storage from '../api/storage';
import { UnorderedListOutlined, LeftOutlined } from '@ant-design/icons';
import "./styles.css"

//** Import các component **
import Home from '../components/Home/Home';

import { Layout } from 'antd';


function Main (View, props){
    
    const checkRole = JSON.parse(storage.userInfoRole());
    console.log(checkRole, "checkRole123213");
    const [isOpenMenu, setOpenMenu] = React.useState(false);
    
    let componentEvent = new Event();
    const openMennu = (status) => (event)=>{
        setOpenMenu(status);
    }

    const _onCloseMenu = ()=> {
        setOpenMenu(false);
    }

    return(
        <div style={{position: 'relative'}}>
            <Layout>
                <div style={styles.appIcon} onClick={openMennu(isOpenMenu ? false : true)}>
                    {
                        !isOpenMenu ? <UnorderedListOutlined/>
                        : <span>
                            <LeftOutlined className="iconHide"/>
                            <LeftOutlined className="iconHide_2"/>
                        </span>
                    }
                </div>
                <HeaderCom componentEvent={componentEvent}/>
                <Layout>
                    <SiderBarMenu isOpen={isOpenMenu} onCloseMenu={_onCloseMenu}/>
                    <Layout style={styles.layoutBody}>
                        <View style={styles.wrapper} {...props} componentEvent={componentEvent} />
                    </Layout>
                </Layout>
                <div style={{height: '50px', width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#222222'}}>
                    <span style={styles.footerContent}>
                        Bản quyền ©2020 Công Ty Cổ Phần Chứng Khoán Bản Việt. <br />
                        <span style={{paddingLeft: '50px'}}>Giấy phép số 15/GP-TTDT Bộ thông tin và truyền thông cấp ngày 29/07/2008</span>
                    </span>
                    <span style={{float: 'right', marginRight: '30px', marginTop: '-10px'}}>
                        <img alt="" src="/icon/logo.png" />
                    </span>
                </div>
            </Layout>

        </div>
    )
}

export const FHome = ()=> Main(Home)
export const FMainTrading = ()=> Main(MainTrading)

export const FPortfolioCreate = ()=> {
    const checkRole = JSON.parse(storage.userInfoRole());
    if(checkRole !== null && (checkRole[0].hash === "research" || checkRole[0].hash === "admin")) {
        return Main(PortfolioCreate)
    } else {
        return Main(Home);
    }
}

export const FDetailPortfolio = (props)=> {
    const checkRole = JSON.parse(storage.userInfoRole());
    if(checkRole !== null && (checkRole[0].hash === "research" || checkRole[0].hash === "admin")) {
        return Main(DetailPortfolio, props)
    } else {
        return Main(Home);
    }
}

export const FListPortfolio = ()=> {
    const checkRole = JSON.parse(storage.userInfoRole());
    let check_role_css = false
    storage.userInfoRole() !== null && JSON.parse(storage.userInfoRole()).forEach(element => {
        if (element.hash ===  'research' || element.hash === 'admin')
        {
            check_role_css = true
        }
        
    });
    if(check_role_css === true) {
        return Main(ListPortfolio)
    } else {
        return Main(Home);
    }
}

export const FCustomersOnline = () => {
    // const checkRole = JSON.parse(storage.userInfoRole());
    
    let check_role_css = false
    storage.userInfoRole() !== null && JSON.parse(storage.userInfoRole()).forEach(element => {
        if (
            element.hash === "customer_service" || 
            element.hash === "admin" ||  
            element.hash === 'CS_NGUYENHUE' || 
            element.hash === 'CS_236' || 
            element.hash === 'CS_ABS' || 
            element.hash === 'CS_HANOI' || 
            element.hash === 'CS_ADMIN' || 
            element.hash === 'moigioi' ||
            element.hash === 'LEAD_NGUYENHUE' || 
            element.hash === 'LEAD_236' || 
            element.hash === 'LEAD_ABS' || 
            element.hash === 'LEAD_HANOI' || 
            element.hash === 'LEAD_ADMIN' 
        )
        {
            check_role_css = true
        }
        
    });

    if(check_role_css) {
        return Main(CustomersOnline);
    } else {
        return Main(Home);
    }
}

export const FCustomerDetail = () => {
    // const checkRole = JSON.parse(storage.userInfoRole());
    let check_role_css = false
    storage.userInfoRole() !== null && JSON.parse(storage.userInfoRole()).forEach(element => {
        if (element.hash === "customer_service" ||
            element.hash === "admin" ||
            element.hash === 'CS_NGUYENHUE' ||
            element.hash === 'CS_236' || 
            element.hash === 'CS_ABS' || 
            element.hash === 'CS_HANOI' || 
            element.hash === 'CS_ADMIN' || 
            element.hash === 'moigioi' ||
            element.hash === 'LEAD_NGUYENHUE' || 
            element.hash === 'LEAD_236' || 
            element.hash === 'LEAD_ABS' || 
            element.hash === 'LEAD_HANOI' || 
            element.hash === 'LEAD_ADMIN' )
        {
            check_role_css = true
        }
        
    });
    if(check_role_css) {
        return Main(CustomerDetail);
    } else {
        return Main(Home);
    }
}

export const FRecommendations = () => {
    // const checkRole = JSON.parse(storage.userInfoRole());
    let check_role_css = false
    storage.userInfoRole() !== null && JSON.parse(storage.userInfoRole()).forEach(element => {
        if (element.hash === "customer_service" ||
            element.hash === "admin" ||
            element.hash === 'CS_NGUYENHUE' ||
            element.hash === 'CS_236' || 
            element.hash === 'CS_ABS' || 
            element.hash === 'CS_HANOI' || 
            element.hash === 'CS_ADMIN' || 
            element.hash === 'moigioi' ||
            element.hash === 'LEAD_NGUYENHUE' || 
            element.hash === 'LEAD_236' || 
            element.hash === 'LEAD_ABS' || 
            element.hash === 'LEAD_HANOI' || 
            element.hash === 'LEAD_ADMIN' || 
            element.hash === 'research' )
        {
            check_role_css = true
        }
        
    });
    if(check_role_css) {
        return Main(Recommendations);
    } else {
        return Main(Home);
    }
}

export const FChangePassword = () => {
    return Main(ChangePassword)
}

// export const FControlInvestor = ()=> {
//     const rolesUser = getRolesUser();
//     if(rolesUser.indexOf("all") > -1 || rolesUser.indexOf("investor") > -1){
//         return withSidebar(ControlInvestor)
//     }
//     return null;
// }

const styles = {
    appIcon: {
        position: 'absolute',
        width: 40,
        height: 40,
        color: '#00377b',
        cursor: 'pointer',
        backgroundColor: '#fafafa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16
    },
    layoutBody: {
        height: 'calc(100vh - 85px)',
        backgroundImage: `url(${'/images/background/bg_dashboard.jpg'})`,
        overflow: 'auto'
    },
    footerContent: {
        width: '417px',
        height: '26px',
        fontFamily: 'Montserrat',
        fontSize: '11px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        paddingLeft: '50px',
        color: '#999999'
    },
    wrapper: {
        height: '100%',
        width: '100%',
        overflow: 'auto'
    }
}
