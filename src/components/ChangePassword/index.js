import React, {Component} from 'react';
import { Form, Input, Button, Checkbox, Row, Col  } from 'antd';
import  { EyeOutlined, EyeInvisibleOutlined }  from '@ant-design/icons'
import * as common from '../Common/Common';

import {connect} from 'react-redux';
import {login, loginRequest} from '../../stores/actions/investor/loginAction';

import { getUserId } from '../../stores/actions/investor/loginAction';

import { change_Password } from '../../stores/actions/investor/customersAction'

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
        width: 100%;
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

class ChangePassword extends Component{

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            new_password: "",
            isSpinning: false,
            isPassword: true,
            isPasswordNew: true
        };
    }

    componentDidMount() {
        
    }

    onChangeAccount = (event)=>{
        this.setState({userName: event.target.value});
    }

    onChangePassword = (event)=>{
        this.setState({password: event.target.value});
    } 
    onChangePasswordNew = (event) => {
        this.setState({new_password: event.target.value});
    }
    onSubmit = async()=>{
        try {
            const { 
                password, 
                new_password,
            } = this.state;
            console.log('password ========', password)
            console.log('new_password ========', this.state.new_password.trim() == this.state.password.trim())
            if (password !== '' && new_password !== '' &&  this.state.new_password.trim() == this.state.password.trim() )
            {
                    this.props.changePassword(password.trim(), success => {
                        common.notify("success", "Thay đổi mật khẩu thành công");
                        window.open(`/customers-online`,'_self');
                    }, error => {
                        common.notify("error", error);
                    })
            }
            else {
                common.notify("error", "Mật khẩu mới của bạn chưa đúng");
            }
            // if(password && userName) {
            //     this.setState({isSpinning: true});
            //     let configLogin = {userName: '', stock: ''};
               
            //     localStorage.setItem("keyConfigLogin", JSON.stringify(configLogin));
            //         try {
            //             const res = await this.props.onLogin(userName, password);
            //             this.setState({isSpinning: false});
            //             switch(res.type) {
            //                 case LOGIN_SUCCESS:
            //                     const infoUser = await this.props.onGetUserId(res.data.userId);
            //                     if(infoUser.type === "USER.GET") {
            //                         localStorage.setItem("keyRoleUser", JSON.stringify(infoUser.data.roles));
            //                         localStorage.setItem("keyAuthInfoUser", JSON.stringify(infoUser.data.user));
            //                         //console.log(infoUser, "infoUser");
            //                         this.props.history.push('/home');
            //                     }
            //                     break;
            //                 case LOGIN_FAILED:
            //                     common.notify("error", 'Lỗi: ' + res.message);
            //                     break;
            //                 default:
            //                     break;
            //             }
            //         } catch (error) {
            //             common.notify("error", 'Lỗi: ' + error);
            //             this.setState({isSpinning: false});
            //         }
            // } else {
            //     common.notify("error", "Bạn chưa nhập tài khoản hoặc mật khẩu, vui lòng kiểm tra lại.");
            // }
        } catch (error) {
            this.setState({isSpinning: false});
        }
    }
    render(){
        const {
            new_password,
            password,
            isSpinning,
            isPassword,
            isPasswordNew
        } = this.state;

        return(
            <div style={styles.root}>
                <div>
                    <Loading isLoading={isSpinning}>
                        <Form onSubmit={this.handleSubmit} style={styles.MloginForm} className={loginForm}>
                            <Form.Item>
                                <div type="flex" align="middle" style={{fontSize: 26, color: '#67666e', fontWeight: 500}}>
                                   Thay Đổi Mật Khẩu
                                </div>
                            </Form.Item>
                            <Form.Item>    
                                <Input
                                    
                                    suffix={ isPassword === true ?  <EyeOutlined style={{
                                       
                                    }} onClick={() => {
                                        
                                        this.setState({
                                            isPassword: !this.state.isPassword
                                        })
                                    }} /> : <EyeInvisibleOutlined style={{
                                        zIndex: 8888888
                                    }}  onClick={() => {
                                        
                                        this.setState({
                                            isPassword: !this.state.isPassword
                                        })
                                    }}/>}
                                    type={ isPassword === true ? 'password' : 'text'}
                                    size={'large'}
                                    value={ password} onChange={this.onChangePassword}
                                    placeholder="Mật khẩu mới"
                                    style={styles.inputLogin}
                                />
                            </Form.Item>
                            <Form.Item>    
                                <Input
                                    suffix={ isPasswordNew === true ? <EyeOutlined style={{
                                        zIndex: 8888888
                                    }} onClick={() => {
                                        this.setState({
                                            isPasswordNew: !this.state.isPasswordNew
                                        })
                                    }} /> : <EyeInvisibleOutlined style={{
                                        zIndex: 8888888
                                    }} onClick={() => {
                                        this.setState({
                                            isPasswordNew: !this.state.isPasswordNew
                                        })
                                    }} /> }
                                    type={ isPasswordNew === true ? 'password' : 'text'}
                                    size={'large'}
                                    value={new_password} onChange={this.onChangePasswordNew}
                                    placeholder="Xác nhận mật khẩu"
                                    style={styles.inputLogin}
                                />
                            </Form.Item>
                            <Form.Item>                                                                       
                                <Button loading={isSpinning} htmlType="submit" className="btnLogin" onClick={this.onSubmit}>
                                  Thay đổi mật khẩu
                                </Button>
                                   
                               
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
        changePassword: (new_password, success, error) => dispatch(change_Password( new_password, success, error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ChangePassword);

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