import React from 'react';
import './style.css';
import { Menu, Drawer } from 'antd';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import * as storage from '../../api/storage';

const { SubMenu } = Menu;

// const LIST_ROUTE_EXTENTION = ['/web-trading', '/order-stock', '/portfolio-create']
// const LIST_ROUTE_ANALYSIS = ['/analysis_technical', '/analysis_normal', 'analysis_report'];
// const LIST_ROUTE_NEWS = ['/news_market', 'news_companys', '/news_other'];

// const checkRouteOpenDefaultKey = ()=> {
//     for(let i = 0; i < LIST_ROUTE_EXTENTION.length; i++){
//         if(LIST_ROUTE_EXTENTION[i] === window.location.pathname){
//             return 'openExtention';
//         }
//     }
//     for(let i = 0; i < LIST_ROUTE_ANALYSIS.length; i++){
//         if(LIST_ROUTE_ANALYSIS[i] === window.location.pathname){
//             return 'openAnalysis';
//         }
//     }
//     for(let i = 0; i < LIST_ROUTE_NEWS.length; i++){
//         if(LIST_ROUTE_NEWS[i] === window.location.pathname){
//             return 'openNews';
//         }
//     }
// }

function SiderBarMenu(props){
    const [current, setStateCurrent] = React.useState(window.location.pathname);
    let check_role_css = false
    storage.userInfoRole() !== null && JSON.parse(storage.userInfoRole()).forEach(element => {
        if (element.hash ===  'customer_service' ||
            element.hash === 'admin' || 
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
    // const [openDefaultKey] = React.useState(checkRouteOpenDefaultKey());
    const checkRole = storage.userInfoRole() === null ? '' : JSON.parse(storage.userInfoRole())[0].hash ;
    const handleClick = (e) => {
        setStateCurrent(e.key);
        switch(e.key){
            //Tiện ích
            case "/order-stock":
                props.history.push('/order-stock');
                break;
            case "/web-trading":
                props.history.push('/web-trading');
                break;
            case "/portfolio-create":
                props.history.push('/portfolio-create');
                break;
            case "/recommendations":
                props.history.push('/recommendations');
                break;
            case "orderBonds":
                window.open("https://bond.vcsc.com.vn/login")
                break;
            //Phân tích
            case "/analysis_technical":
                props.history.push('/analysis_technical');
                break;
            case "/analysis_normal":
                props.history.push('/analysis_normal');
                break;
            case "/analysis_report":
                props.history.push('/analysis_report');
                break;
            //Tin tức
            case "/payment-term":
                props.history.push('/payment-term');
                break;
            case "/bank-interest":
                props.history.push('/bank-interest');
                break;
            case "/fee-trade":
                props.history.push('/fee-trade');
                break;
            default:
                break;
        }
    };
    
    return(
        <Drawer
            placement="left"
            closable={false}
            visible={props.isOpen}
            style={styles.drawerRoot}
            bodyStyle={styles.drawerBody}
            maskStyle={{background: 'none'}}
        >
            <Menu
                onClick={handleClick}
                // defaultSelectedKeys={[current]}
                defaultOpenKeys={['openExtention', 'openAnalysis', 'openNews']}
                selectedKeys={[current]}
                mode="inline"
                theme="dark"
            >
                <SubMenu
                    key="openExtention"
                    title={
                        <span>
                            <span style={{fontSize: 13, color: 'rgba(255, 255, 255, 0.4)', fontWeight: 600}}>TIỆN ÍCH</span>
                        </span>
                    }
                >
                    {(checkRole === 'research' || checkRole === 'admin') &&
                        <Menu.Item key="/portfolio-create">
                            <Link to="/portfolio-create"></Link>
                            <img alt='' className='svg' src='/images/icons/side-bar/ic_dat_lenh_cp_small.svg' />
                            <span style={{paddingLeft: 10}}>Danh mục đầu tư</span>
                        </Menu.Item>
                    }
 
                    { check_role_css === true   &&
                        <Menu.Item key="/customers-online">
                            <Link to="/customers-online"></Link>
                            <img alt='' className='svg' src='/images/icons/side-bar/ic_dat_lenh_cp_small.svg' />
                            <span style={{paddingLeft: 10}}>Thông tin DKTK Online</span>
                        </Menu.Item>
                    }

                    { (check_role_css === true || checkRole === 'research') &&
                        <Menu.Item key="/recommendations">
                            <Link to="/recommendations"></Link>
                            <img alt='' className='svg' src='/images/icons/side-bar/ic_khuyen_nghi_mua_ban_small.svg' />
                            <span style={{paddingLeft: 10}}>Thông báo khuyến nghị</span>
                        </Menu.Item>
                    }
                </SubMenu>

            </Menu>
        </Drawer>
    )
}

export default withRouter(SiderBarMenu);

const styles = {
    drawerRoot: {
        top: 40,
    },
    drawerBody: {
        backgroundColor: '#3b6195',
        color: 'rgba(255, 255, 255, 0.6)',
        padding: 0
    }
}