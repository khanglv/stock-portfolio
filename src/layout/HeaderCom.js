import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Layout, Avatar, Card, List } from 'antd';
import { UserOutlined, LogoutOutlined, QuestionOutlined } from '@ant-design/icons';
import * as storage from '../api/storage';
import "./styles.css"
// import {css} from 'emotion';

// const { Option } = Select;
const { Header } = Layout;

const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
// const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

// const customSelect = css`
//     width: 17em;
//     color: #333333;
//     font-size: 12px!important;
//     .ant-select-selector{
//         border: 0!important;
//         border-radius: 4px!important;
//         background-color: rgba(0, 0, 0, 0.2)!important;
//         color: #fff;
//     }
//     svg{
//         color: #fff;
//     }
// `

class HeaderCom extends Component{
    constructor(props){
        super(props);
        this.wrapperRef = React.createRef();
        this.state = {
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey')),
            dataTesst: [],
            isNotify: false,
            userInfo: JSON.parse(localStorage.getItem('userInfoKey')),
            subNumber: '',
            accountAvatar:  JSON.parse(localStorage.getItem('keyAuthInfoUser'))
        }

        props.componentEvent.on("changeSubNumber", (subNumber)=>{
            this.setState({subNumber: subNumber});
        });

        this.props_master = props;
    }

    componentWillMount(){
        let obj = JSON.parse(localStorage.getItem('rememberSectionOrder'));
        if(obj){
            this.setState({ subNumber: obj.SUB_NUMBER });
        }else{

        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }
    
    onHome = ()=>{
        window.location.href = "/home";
    }

    handleClick = (event) => {
        if(this.wrapperRef.current){
            const { target } = event;
            if (!this.wrapperRef.current.contains(target)) {
                this.setState({isShowInfoAccount: false});
            }
        }
    }

    showInfoAccount = ()=>{
        this.setState(previousState => (
            { isShowInfoAccount: !previousState.isShowInfoAccount }
        ))
    }

    showNotifyDisplay = async()=>{
        this.setState(previousState => (
            { isShowNotifyDisplay: !previousState.isShowNotifyDisplay }
        ));
    }

    run (event) {
        this.props_master.componentEvent.fire("changeSubNumber", true, event);
    }

    updateSubNumberValue = name => async(event)=>{
        this.run(event);
        let obj = JSON.parse(localStorage.getItem('rememberSectionOrder'));
        let code = null;
        if(obj){
            code = obj.CODE_STOCK || null;
            if(obj.SUB_NUMBER === '00' || obj.SUB_NUMBER === '01' || obj.SUB_NUMBER === '02'){
                if(event === '80'){
                    code = null;
                }
            }
            if(obj.SUB_NUMBER === '80'){
                if(event === '00' || event === '01' || event === '02'){
                    code = null;
                }
            }
        }
        
        storage.rememberSectionOrder(JSON.stringify({CODE_STOCK: code, SUB_NUMBER: event}));
        this.setState({[name]: event});
    }

    render(){
        const {
            isShowInfoAccount,
        } = this.state;

        // const lstSubNumber = accountInfo ? accountInfo.userInfo.accounts[0].accountSubs : [];

        // console.log(isShowNotifyDisplay);
      
        return (  
            <Header style={styles.rootHeader}>
                <span style={{display: 'flex'}}>
                    <span style={styles.gridNone}></span>
                    <span style={styles.gridLeft}>
                        <Link to="/home">
                            <img alt="" src='/images/logos/logos-layout/logo.svg' />
                        </Link>
                    </span>
                    <div style={styles.separator}>
                        <div style={styles.triangleArrow}></div>
                        <div style={styles.logo_arrow}></div>
                    </div>
                    <span style={styles.gridRight}>
                        <div style={{marginRight: '20px'}}>
                            <div className="midle-icon-ant pointer" style={{position: 'relative', cursor: 'pointer'}} onClick={this.showNotifyDisplay}>                             
                                <span style={styles.titleName}>{
                                    this.state.accountAvatar &&  this.state.accountAvatar.lastName + ' ' +  this.state.accountAvatar && this.state.accountAvatar.firstName
                                }</span>
                            </div>
                        </div>

                        {/* <span style={{marginRight: '1em'}}>
                            <Select
                                className={customSelect}
                                showSearch
                                value={subNumber}
                                onChange={this.updateSubNumberValue('subNumber')}
                                size={'small'}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {lstSubNumber.length > 0 ? lstSubNumber.map((item, idx)=>{
                                    return(
                                        <Option key={idx} value={item.subNumber}>
                                            {`${accountInfo.userInfo.username} - ${item.subNumber} (${item.subNumber === '00' ? 'Thường' : (item.subNumber === '01' ? 'Margin' : 'Phái sinh')})`}
                                        </Option>
                                    )
                                }) 
                                : null}
                            </Select>
                        </span> */}
                        <span className="rightUser" ref={this.wrapperRef} onClick={this.showInfoAccount}>
                            <Avatar
                                style={{
                                    backgroundColor: '#fff',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 5
                                }}
                                size={'small'}
                                icon={<UserOutlined style={{color: '#00377b'}}/>}
                            />
                            {/* <span style={styles.nameUser}>{userInfo.customerName}</span> */}
                        </span>
                    </span>
                    {/* {isShowNotifyDisplay ? <NotifyDisplay /> : null} */}
                    {isShowInfoAccount ? <CardAccount/> : null}
                </span>
            </Header>
        )
    }
}


class CardAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            openModal: false,
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey'))
        };
    }
    onLogout = async()=>{
        await storage.removeStorageToken();
        window.location.href = "/login";
    }

    editAccount = ()=>{
        this.setState({openModal: true});
    }

    handleReloadData = ()=>{
        this.setState({openModal: false});
        this.loadData();
    }

    handleCloseModal = ()=>{
        this.setState({openModal: false});
    }

    render(){
        return(
            <Card size="small" className="animate slideIn" style={styles.customFormAccount}>
                <List size="small" className="itemFormLogout">
                    <List.Item>
                        <QuestionOutlined style={{fontSize: 16, color: '#00377b'}}/> <span style={{paddingLeft: 10}}>About</span>
                    </List.Item>
                </List>
                <List size="small" className="itemFormLogout">
                    <List.Item>
                        <Link to="/change-password">
                            <LogoutOutlined style={{fontSize: 16, color: '#00377b'}}/> <span style={{paddingLeft: 10}}>Change password</span>
                        </Link>
                    </List.Item>
                </List>
                <List size="small" className="itemFormLogout">
                    <List.Item onClick={this.onLogout}>
                        <LogoutOutlined style={{fontSize: 16, color: '#00377b'}}/> <span style={{paddingLeft: 10}}>Đăng xuất</span>
                    </List.Item>
                </List>
              
            </Card>
        )
    }
}

export default HeaderCom;

const styles = {
    rootHeader:{
        flexGrow: 1,
        width: '100vw',
        boxShadow: '0 4px 10px 0 rgba(0, 55, 123, 0.05)',
    },
    gridNone: {
        backgroundColor: '#fff',
        width: 25
    },
    gridLeft: {
        backgroundColor: '#fff',
        padding: 0,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 190
    },
    gridRight: {
        backgroundColor: '#00377b',
        padding: 0,
        height: 40,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 'calc(100% - 200px)',
        position: 'relative'
    },
    separator: {
        position: 'relative',
        backgroundColor: '#00377b',
    },
    triangleArrow: {
        position: 'relative',
        borderTop: '40px solid #fff',
        borderRight: '40px solid #00000000'
    },
    logo_arrow: {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundImage: `url(${'/images/logos/logos-layout/arrow.svg'})`,
        width: 40,
        height: 40
    },
    numberUser: {
        fontSize: 11,
        color: '#fff',
        borderRadius: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginRight: 10,
        padding: '12px 15px',
        display: windowWidth < 768 ? 'none' : 'block'
    },
    customFormAccount: {
        width: '17rem',
        position: 'absolute', 
        right: '1rem', 
        top: 40,
        zIndex: 10000,
        boxShadow: '0 5px 6px rgba(0,0,0,0.23)'
    },
    nameUser: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        paddingRight: 50,
        fontStretch: 'normal',
        fontStyle: 'normal',
        display: windowWidth < 768 ? 'none' : 'block'
    },
    titleName: {
        fontSize: 11,
        color: '#fff',
    }
}