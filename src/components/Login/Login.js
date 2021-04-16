import React, {Component} from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import * as common from '../Common/Common';

import {connect} from 'react-redux';
import {login, loginRequest} from '../../stores/actions/investor/loginAction';

import { getUserId } from '../../stores/actions/investor/loginAction';

import {LOGIN_SUCCESS, LOGIN_FAILED} from '../../stores/actions/investor/actionTypes';
// import * as socket from '../../project/Socket/Socket';
import Loading from '../Loading/Loading';

import {css} from 'emotion';

let color = window['colors'];

const loginForm = css`
    @media only screen and (max-width: 768px) {
        margin-left: 10px;
        margin-right: 10px;
    }
    .btnLogin{
        border-radius: 4px;
        background-color: ${color._BLUE_VCSC}!important;
        color: #fff!important;
        border: none;
        padding-top: 12px;
        padding-bottom: 12px;
        padding-left: 28px;
        padding-right: 28px;
        height: auto;
        font-size: 13px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        &:hover{
            background-color: #094794!important;
            color: #fff;
        }
        @media only screen and (max-width: 768px) {
            padding-left: 20px;
            padding-right: 20px;
        }
    }
`

class Login extends Component{

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            isRememberAccount: false,
            isSpinning: false,
            loadingOtp: false
        };
    }

    componentDidMount() {
        let obj = JSON.parse(localStorage.getItem('keyConfigLogin'));
        if (obj) {
            this.setState({ userName: obj.userName, isRememberAccount: true });
        }
        // TODOconsole.log(socket);
    }

    onChangeAccount = (event)=>{
        this.setState({userName: event.target.value});
    }

    onChangePassword = (event)=>{
        this.setState({password: event.target.value});
    }

    handleRememberAccount = ()=>{
        this.setState((prev)=>({isRememberAccount: !prev.isRememberAccount}));
    }

    onSubmit = async()=>{
        try {
            const { 
                userName, 
                password,
                isRememberAccount
            } = this.state;
            if(password && userName) {
                this.setState({isSpinning: true});
                let configLogin = {userName: '', stock: ''};
                if(isRememberAccount) {
                    configLogin.userName = userName;
                }
                localStorage.setItem("keyConfigLogin", JSON.stringify(configLogin));
                    try {
                        const res = await this.props.onLogin(userName, password);
                        this.setState({isSpinning: false});
                        switch(res.type) {
                            case LOGIN_SUCCESS:
                                const infoUser = await this.props.onGetUserId(res.data.userId);
                                if(infoUser.type === "USER.GET") {
                                    localStorage.setItem("keyRoleUser", JSON.stringify(infoUser.data.roles));
                                    localStorage.setItem("keyAuthInfoUser", JSON.stringify(infoUser.data.user));
                                    localStorage.setItem("userLogin", JSON.stringify(infoUser.data.userLogin));
                                    //console.log(infoUser, "infoUser");
                                    this.props.history.push('/home');
                                }
                                break;
                            case LOGIN_FAILED:
                                common.notify("error", 'Lỗi: ' + res.message);
                                break;
                            default:
                                break;
                        }
                    } catch (error) {
                        common.notify("error", 'Lỗi: ' + error);
                        this.setState({isSpinning: false});
                    }
            } else {
                common.notify("error", "Bạn chưa nhập tài khoản hoặc mật khẩu, vui lòng kiểm tra lại.");
            }
        } catch (error) {
            this.setState({isSpinning: false});
        }
    }

    // confirmOTP = async(event)=>{
    //     try {
    //         if(this.props.loginCoreData && event){
    //             const {
    //                 userName
    //             } = this.state;

    //             this.setState({loadingOtp: true});
    //             const res = await this.props.loginCoreOTP({otp: event, token: this.props.loginCoreData.accessToken});
                
    //             if(res.type === 'LOGIN_OTP_FAILED'){
    //                 this.setState({loadingOtp: false});
    //                 common.notify("error", 'Lỗi: ' + res.message)
    //             }else{
    //                 await this.props.getUser({"accountNumber": userName});
    //                 await this.props.getBanks({"accountNumber": userName});
    //                 await this.props.getAccountBank({"accountNumber": userName});
    //                 const data = {
    //                     "MSNDT": userName,
    //                     "TENNDT": this.props.infoUser.customerName,
    //                     "LOAINDT": this.props.infoUser.accountType,
    //                     "CMND_GPKD": this.props.infoUser.identifierNumber,
    //                     "NOICAP": this.props.infoUser.identifierIssuePlace,
    //                     "TK_BOND": userName || null,
    //                     "MS_NGUOIGIOITHIEU": this.props.infoUser.agencyCode,
    //                     "TEN_NGUOIGIOITHIEU": this.props.infoUser.agencyName,
    //                     "EMAIL": this.props.infoUser.email,
    //                     "DIACHI": this.props.infoUser.address,
    //                     "NGAYCAP": common.splitStringDate(this.props.infoUser.identifierIssueDate),
    //                     "PHANLOAINDT": this.props.infoUser.groupType || null,
    //                     "TK_NGANHANG": this.props.infoBank.length > 0 ? this.props.infoBank[0].bankAccountNumber : null,
    //                     "CHU_TK": this.props.infoBank.length > 0 ? this.props.infoBank[0].bankAccountName : null,
    //                     "CN_NGANHANG": this.props.infoBank.length > 0 ? this.props.infoBank[0].bankName : null,
    //                     "SDT": this.props.infoUser.phoneNumber || null,
    //                     "PHONGBAN_MOIGIOI": this.props.infoUser.agencyBranch || null,
    //                     "DD_CMND": this.props.infoUser.representativeIdentifierNumber || null,
    //                     "DD_HOTEN": this.props.infoUser.representativeName || null,
    //                     "DD_SDT": this.props.infoUser.representativePhoneNumber || null,
    //                     "DD_EMAIL": this.props.infoUser.representativeEmail || null,
    //                     "NOICAP_TKCK": this.props.infoUser.openBranchName || null,
    //                     "TOKEN_CORE": this.props.loginCoreOTPData.accessToken || ''
    //                 }

    //                 // console.log(data);
    //                 // this.props.history.push('/home');
    //                 const nextAuth =  await this.props.loginWithCore(data);
                    
    //                 // socket.initSocket();
    //                 // socket.emitLogin(this.props.loginCoreData.accessToken);
    //                 this.setState({loadingOtp: false});
    //                 if(nextAuth.type === 'LOGIN_WITH_CORE_FAILED'){
    //                     common.notify("error", "Đăng nhập thất bại :( " + nextAuth.message);
    //                 }else{
    //                     this.setState({isOpenDialog: false});
    //                     this.props.history.push('/home');
    //                 }
    //             }
    //         }
    //     } catch (error) {
    //         this.setState({loadingOtp: false});
    //         common.notify("error", "Đăng nhập thất bại! " + error);
    //     }
    // }

    render(){
        const {
            userName,
            password,
            isSpinning,
        } = this.state;

        return(
            <div style={styles.root}>
                <div>
                    <div type="flex" align="middle">
                        <img alt="" src="logos/logo.svg" style={{ width: '70%' }} />
                    </div>
                    <Loading isLoading={isSpinning}>
                        <Form onSubmit={this.handleSubmit} style={styles.MloginForm} className={loginForm}>
                            <Form.Item>
                                <div type="flex" align="middle" style={{fontSize: 26, color: '#67666e', fontWeight: 500}}>
                                    Đăng Nhập
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    size={'large'}
                                    value={userName} onChange={this.onChangeAccount}
                                    placeholder="Tài khoản"
                                    style={styles.inputLogin}
                                />
                            </Form.Item>
                            <Form.Item>    
                                <Input
                                    // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    size={'large'}
                                    value={password} onChange={this.onChangePassword}
                                    placeholder="Mật khẩu"
                                    style={styles.inputLogin}
                                />
                            </Form.Item>
                            <Form.Item>    
                                <Row>
                                    <Col span={12} style={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox onChange={this.handleRememberAccount} checked={this.state.isRememberAccount} style={styles.rememberAccount}>Ghi nhớ tài khoản?</Checkbox>                                
                                    </Col>
                                    <Col span={12} type="flex" align="end" >
                                        <Button loading={isSpinning} htmlType="submit" className="btnLogin" onClick={this.onSubmit}>
                                            ĐĂNG NHẬP
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Loading>
                </div>
            </div>
        )
    } 
}

const mapStateToProps = state =>{
    return{
        messageAlert: state.login.message,
        token: state.login.accessToken,
        isFetching: state.login.isFetching,
        isAuthenticated: state.login.isAuthenticated,
        loginCoreData: state.loginCore.data,
        loginCoreOTPData: state.loginCore.dataOTP,
        infoUser: state.loginCore.dataUser,
        infoCore: state.loginCore.data,
        coreBank: state.loginCore.coreBank,
        infoBank: state.loginCore.databank,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onLogin: (userName, password)=> dispatch(login(userName, password)),
        onLoginRequest: (userName)=> dispatch(loginRequest(userName)),
        onGetUserId: (id) => dispatch(getUserId(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);

const styles = {
    root: {
        width: '100vw',
        height: '100vh',
        background: `url(${'images/background/bg_dashboard.jpg'})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    MloginForm:{
        marginTop: '2rem',
        display: 'block',
        backgroundColor: color._WHITE,
        padding: 40,
        paddingTop: 35,
        borderRadius: 8,
    },
    inputLogin:{
        borderRadius: 5, 
        border: `1px solid ${color._STROKE}`,
        fontSize: 14
    },
    rememberAccount:{
        fontSize: 12,
        color: color._GREY_666,
        fontWeight: 500,
        fontStyle: 'normal',
        fontStretch: 'normal'
    },
    btnSelect: {
        fontSize: 13,
        color: color._GREY_666,
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal'
    }
}