import React, { useEffect, useState } from 'react';
import {css} from 'emotion';
import {Input, Tabs, Select, Row, Col, InputNumber, DatePicker, List, Tag, Upload, Button } from 'antd';
import { useLocalLocalStorage} from '../../hooks';
import {
    SwapLeftOutlined, 
    ImportOutlined, 
    PlusOutlined, 
    LoadingOutlined, 
    CheckOutlined, 
    CloseSquareOutlined,
    ReloadOutlined,
    CaretUpOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import {loginCoreInternal} from '../../stores/actions/core/loginCoreAction';
import {getStockList} from '../../stores/actions/core/stockListAction';
import {
    actionRemind, 
    getAlertHistory,
    sendRemind,
    updateRemind,
    sendRemindSell,
    getAssetRecommend,
    getStatistic
} from '../../stores/actions/core/alertMasterAction';
import {loadAllCustomer, removeRemind} from '../../api/apiMaster';
import {connect} from 'react-redux';
import * as common from '../../components/Common/Common';
import {getAlertStockCode} from '../../api/apiMaster';
import readXlsxFile from 'read-excel-file';
import moment from 'moment';

let color = window['colors'];
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const rootMain = css`
    display: flex;
    justify-content: center;
    height: calc(100vh - 95px);
    overflow-y: auto;
    .main{
        padding-top: 10px;
        padding-bottom: 1em!important;
        max-width: 1400px;
        width: 100%;
        height: calc(100% - 15px);
        @media only screen and (max-width: 1600px) {
            padding-top: 10px;
            max-width: 1200px;
        }

        @media only screen and (max-width: 1200px) {
            padding-top: 10px;
            max-width: 1000px;
        }
        
        @media only screen and (max-width: 992px) {
            padding-right: 0.5rem;
            padding-left: 0.5rem;
            width: 100%;
        }
        .header{
            background-color: ${color._GREY_LIGHT_1};
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            @media only screen and (max-width: 992px) {
                display: block;
            }
            .title{
                display: flex;
                align-items: center;
                color: ${color._BLACK};
                .info{
                    display: grid;
                    padding-left: 10px;
                    .name{
                        font-size: 20px;
                        font-weight: 500;
                    }
                    .email{
                        font-size: 14px;
                        color: ${color._GREY_666};
                    }
                }
            }
            .inputRight{
                padding-right: 10px;
                .btnAccuracy{
                    padding: 5px 25px;
                    border-radius: 4px;
                    background-color: ${color._BLUE};
                    outline: none;
                    border: none;
                    color: ${color._WHITE};
                    font-weight: 500;
                }
                .styleInput{
                    border-radius: 0.2rem;
                    font-size: 13px;
                    border: 1px solid ${color._STROKE};
                    width: auto;
                }
            }
            .setting{
                float: right;
                width: 50%;
                display: flex;
                justify-content: flex-end;
                .btnSetting{
                    padding: 5px 15px;
                    outline: none;
                    color: ${color._WHITE};
                    background-color: ${color._BLUE_VCSC};
                    border-radius: 4px;
                    border: 0;
                    font-weight: 500;
                    cursor: pointer;
                    :hover{
                        background-color: ${color._BLUE_VCSC_HOVER};
                    }
                }
            }
        }
        .rootBody{
            .ant-tabs-ink-bar{
                background-color: ${color._BLACK};
            }
            .ant-tabs-nav{
                padding-left: 20px;
            }
            .ant-tabs-bar{
                margin-bottom: 0;
            }
            .ant-tabs-tab{
                color: ${color._GREY_999};
                font-weight: 500;
                font-size: 14;
                margin-right: 8px!important;
                border-top-left-radius: 8px!important;
                border-top-right-radius: 8px!important;
                &:hover{
                    color: ${color._BLACK};
                }
            }
            .ant-tabs-tab-active{
                font-weight: 600;
                color: ${color._BLACK}!important;
            }
            .ant-tabs-content{
                background-color: ${color._WHITE};
                border-radius: 6px;
                padding: 10px;
            }
        }
        .importView{
            .headerIm{
                display: flex;
                justify-content: space-between;
                .leftIm{
                    font-weight: 500;
                    color: ${color._BLACK};
                    font-size: 22px;
                }
                .back{
                    color: ${color._BLUE};
                    font-weight: 600;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
            }
            .body{
                background-color: ${color._WHITE};
                border: 1px solid ${color._STROKE};
                border-radius: 6px;
                .headerList{
                    background-color: ${color._GREY_LIGHT_2};
                    color: ${color._GREY_999};
                    font-weight: 600;
                    font-size: 12px;
                    padding: 0.6em 1em;
                    .right{
                        text-align: right;
                    }
                }
                .styleListStock{
                    border: 0;
                    .ant-checkbox-inner{
                        border-color: ${color._STROKE};
                        border-radius: 0.2em
                    }
                    .ant-checkbox-checked .ant-checkbox-inner{
                        background-color: ${color._BLUE_VCSC};
                        border-color: ${color._STROKE};
                        border-radius: 0.2em;
                    }
                    .item{
                        padding: 0.7em 12px;
                        font-size: 13px;
                        font-weight: 500;
                        &:hover{
                            background-color: ${color._HOVER};
                            color: ${color._BLACK}
                        }
                        .right{
                            text-align: right;
                        }
                        .btnRemove{
                            padding: 5px 1.5rem;
                            border-radius: 4px;
                            background-color: ${color._RED};
                            outline: none;
                            border: none;
                            color: ${color._WHITE};
                            font-weight: 500;
                            display: inline-flex;
                            align-items: center;
                        }
                        .btnSend{
                            padding: 5px 1.5rem;
                            border-radius: 4px;
                            background-color: #18b740;
                            outline: none;
                            border: none;
                            color: ${color._WHITE};
                            font-weight: 500;
                            display: inline-flex;
                            align-items: center;
                        }
                        .btnClose{
                            padding: 5px 20px;
                            border-radius: 4px;
                            background-color: ${color._BLACK};
                            outline: none;
                            border: none;
                            color: ${color._WHITE};
                            font-weight: 500;
                            display: inline-flex;
                            align-items: center;
                        }
                    }
                }
            }
            .footer{
                display: flex;
                justify-content: space-between;
                .btnCancel{
                    padding: 5px 25px;
                    border-radius: 4px;
                    background-color: transparent;
                    outline: none;
                    border: 1px solid ${color._RED_VCSC};
                    color: ${color._RED_VCSC};
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                    &:hover{
                        background-color: ${color._RED_VCSC_HOVER};
                    }
                }
                .btnSave{
                    padding: 5px 25px;
                    border-radius: 4px;
                    background-color: ${color._BLUE};
                    outline: none;
                    border: 0;
                    color: ${color._WHITE};
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                    &:hover{
                        background-color: #4e9ef4;
                    }
                }
            }
        }
    }
    .createRecommentdations{
        padding-top: 10px;
        padding-bottom: 1em!important;
        max-width: 1400px;
        width: 100%;
        height: calc(100vh - 95px);
        @media only screen and (max-width: 1600px) {
            height: calc(100vh - 95px);
            padding-top: 10px;
            max-width: 1200px;
        }

        @media only screen and (max-width: 1200px) {
            height: calc(100vh - 95px);
            padding-top: 10px;
            max-width: 1000px;
        }
        
        @media only screen and (max-width: 992px) {
            padding-right: 0.5rem;
            padding-left: 0.5rem;
            width: 100%;
        }
        .header{
            .firstHeader{
                display: flex;
                justify-content: space-between;
                .label{
                    font-weight: 500;
                    font-size: 24px;
                    color: ${color._BLACK};
                }
                .back{
                    color: ${color._BLUE};
                    font-weight: 600;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
            }
            .main{
                .customSelect{
                    width: auto;
                    top: 5px;
                    color: #333333;
                    font-weight: 500;
                    font-size: 13px;
                    .ant-select-selector{
                        border: 1px solid #e3e5ec!important;
                        border-radius: 4px!important;
                    }
                }
            }
        }
        .body{
            height: auto;
            width: 100%;
            padding: 20px;
            background-color: ${color._WHITE};
            border-radius: 8px;
            .title{
                font-weight: 500;
                font-size: 13px;
            }
            .customSelect{
                width: calc(100% - 15px);
                top: 5px;
                color: #333333;
                font-weight: 500;
                font-size: 13px;
                .ant-select-selector{
                    border: 1px solid #e3e5ec!important;
                    border-radius: 4px!important;
                    background-color: transparent;
                    color: #333333;
                }
            }
            .inputNumber{
                border-radius: 3px;
                width: calc(100% - 15px);
            }
            .styleInput{
                border-radius: 0.3rem;
                border: 1px solid ${color._STROKE}
            }
        }
        .footer{
            display: flex;
            justify-content: space-between;
            .btnAddNew{
                padding: 5px 25px;
                border-radius: 4px;
                background-color: transparent;
                outline: none;
                border: 1px solid ${color._BLUE};
                color: ${color._BLUE};
                font-weight: 500;
                display: inline-flex;
                align-items: center;
                &:hover{
                    background-color: #e9edf2;
                }
            }
            .btnCancel{
                padding: 5px 25px;
                border-radius: 4px;
                background-color: transparent;
                outline: none;
                border: 1px solid ${color._RED_VCSC};
                color: ${color._RED_VCSC};
                font-weight: 500;
                display: inline-flex;
                align-items: center;
                &:hover{
                    background-color: ${color._RED_VCSC_HOVER};
                }
            }
            .btnSave{
                padding: 5px 25px;
                border-radius: 4px;
                background-color: ${color._BLUE};
                outline: none;
                border: 0;
                color: ${color._WHITE};
                font-weight: 500;
                display: inline-flex;
                align-items: center;
                &:hover{
                    background-color: #4e9ef4;
                }
            }
        }
    }
    .historyRecommendation{
        padding-top: 10px;
        padding-bottom: 1em!important;
        max-width: 1400px;
        width: 100%;
        @media only screen and (max-width: 1600px) {
            height: calc(100vh - 95px);
            padding-top: 10px;
            max-width: 1200px;
        }

        @media only screen and (max-width: 1200px) {
            height: calc(100vh - 95px);
            padding-top: 10px;
            max-width: 1000px;
        }
        
        @media only screen and (max-width: 992px) {
            padding-right: 0.5rem;
            padding-left: 0.5rem;
            width: 100%;
        }
        .header{
            .customSelectOrder{
                width: calc(100% - 10px);
                top: 5px;
                color: #333333;
                font-weight: 500;
                font-size: 13px;
                .ant-select-selector{
                    border: 1px solid #e3e5ec!important;
                    border-radius: 4px!important;
                }
            }
            .datePicker{
                .ant-picker-input{
                    input{
                        font-size: 14px;
                    }
                }
                .ant-picker-suffix{
                    display: flex;
                }
                border: 1px solid ${color._STROKE};
                border-radius: 0.3em;
                color: ${color._BLACK};
                font-weight: 500;
                svg{
                    color: ${color._BLACK};
                }
            }
            .right{
                float: right;
                .btnImport{
                    padding: 5px 25px;
                    border-radius: 4px;
                    background-color: ${color._ORANGE};
                    outline: none;
                    border: none;
                    color: ${color._WHITE};
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                }
                .btnCreate{
                    padding: 5px 25px;
                    border-radius: 4px;
                    background-color: ${color._BLUE};
                    outline: none;
                    border: none;
                    color: ${color._WHITE};
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                }
            }
        }
        .headerList{
            background-color: ${color._GREY_LIGHT_2};
            color: ${color._GREY_999};
            font-weight: 600;
            font-size: 12px;
            padding: 0.6em 1em;
            .right{
                text-align: right;
            }
        }
        .styleListStock{
            border: 0;
            .ant-checkbox-inner{
                border-color: ${color._STROKE};
                border-radius: 0.2em
            }
            .ant-checkbox-checked .ant-checkbox-inner{
                background-color: ${color._BLUE_VCSC};
                border-color: ${color._STROKE};
                border-radius: 0.2em;
            }
            .item{
                padding: 0.7em 12px;
                font-size: 13px;
                font-weight: 500;
                &:hover{
                    background-color: ${color._HOVER};
                    color: ${color._BLACK}
                }
                .right{
                    text-align: right;
                }
                .btnRemove{
                    padding: 5px 1.5rem;
                    border-radius: 4px;
                    background-color: ${color._RED};
                    outline: none;
                    border: none;
                    color: ${color._WHITE};
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                }
                .btnSend{
                    padding: 5px 1.5rem;
                    border-radius: 4px;
                    background-color: #18b740;
                    outline: none;
                    border: none;
                    color: ${color._WHITE};
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                }
                .btnClose{
                    padding: 5px 20px;
                    border-radius: 4px;
                    background-color: ${color._BLACK};
                    outline: none;
                    border: none;
                    color: ${color._WHITE};
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                }
            }
        }
    }
`

const recommandations = css`
    height: calc(100% - 10px);
    .header{
        display: flex;
        justify-content: space-between;
        background-color: #fff!important;
        .left{
            width: 50%;
            .customSelectOrder{
                width: 50%;
                top: 5px;
                color: #333333;
                font-weight: 500;
                font-size: 13px;
                .ant-select-selector{
                    border: 1px solid #e3e5ec!important;
                    border-radius: 4px!important;
                }
            }
            .datePicker{
                .ant-picker-input{
                    input{
                        font-size: 14px;
                    }
                }
                .ant-picker-suffix{
                    display: flex;
                }
                border: 1px solid ${color._STROKE};
                border-radius: 0.3em;
                color: ${color._BLACK};
                font-weight: 500;
                svg{
                    color: ${color._BLACK};
                }
            }
            .reloadAsset{
                cursor: pointer;
                color: ${color._BLUE};
                padding-left: 25px;
                &:hover{
                    color: ${color._BLUE_VCSC};
                }
            }
        }
        .right{
            .btnImport{
                padding: 5px 25px;
                border-radius: 4px;
                background-color: ${color._ORANGE};
                outline: none;
                border: none;
                color: ${color._WHITE};
                font-weight: 500;
                display: inline-flex;
                align-items: center;
            }
            .btnCreate{
                padding: 5px 25px;
                border-radius: 4px;
                background-color: ${color._BLUE};
                outline: none;
                border: none;
                color: ${color._WHITE};
                font-weight: 500;
                display: inline-flex;
                align-items: center;
            }
        }
    }
    .body{
        background-color: #fff!important;
        .itemPortfolio{
            background-color: ${color._WHITE};
            border-radius: 0.5em;
            overflow: auto;
            cursor: pointer;
            .updateMatchOrder{
                background-color: ${color._ORANGE};
                padding: 0.5em 0.6em;
                border-radius: 0.3em;
                color: ${color._WHITE};
                font-weight: 600;
                font-size: 13px;
                z-index: 100;
                &:hover{
                    background-color: #fab839;
                }
            }
            .titleLabel{
                padding: 1em 1em 0 1em;
                font-size: 1.5em;
                font-weight: 500;
                color: ${color._BLACK}
            }
            .scroll{
                @media only screen and (max-width: 992px) {
                    width: 300%;
                    height: auto;
                }
                .headerTotalStatistical{
                    border-radius: 8px;
                    padding: 0.8em 0;
                    background-color: ${color._WHITE};
                    .itemComp{
                        padding: 0 1.5em;
                        word-wrap: break-word;
                        .title{
                            font-weight: 600;
                            color: ${color._GREY_999};
                            font-size: 12px;
                            line-height: 2;
                        }
                        .content{
                            font-weight: 500;
                            color: ${color._BLUE_VCSC};
                            font-size: 22px
                        }
                        .contentWarning{
                            font-weight: 500;
                            color: ${color._RED_VCSC};
                            font-size: 22px
                        }
                    }
                    .rightEnd{
                        padding: 0 1.5em;
                        display: flex;
                        justify-content: flex-end;
                        color: ${color._BLUE_VCSC};
                        font-weight: 600;
                        cursor: pointer;
                        &:hover{
                            color: ${color._BLUE_LINK};
                        }
                    }
                    .borderRight{
                        border-right: 1px solid ${color._GREY_LIGHT_2};
                    }
                }
            }
        } 
    }
    .rootBody{
        @media only screen and (max-width: 992px) {
            width: 200%;
        }
        .itemPortfolio{
            background-color: ${color._WHITE};
            border: 1px solid ${color._STROKE};
            border-radius: 0.6em;
            height: auto;
            .left{
                padding: 1.2em;
                padding-right: 0;
                float: left;
                width: calc(100% - 6em);
                .main{
                    border-right: 1px solid ${color._STROKE};
                    padding-bottom: 10px!important;
                    .label{
                        color: ${color._GREY_999};
                        font-size: 12px;
                        font-weight: 600;
                    }
                    .title{
                        color: ${color._BLACK};
                        font-size: 1.3em;
                        font-weight: 600;
                    }
                }
            }
            .right{
                float: right;
                width: 6em;
                height: 6em;
                display: flex;
                justify-content: center;
                align-items: center;
                .iconDown{
                    font-size: 1.8em;
                }
            }
            .clearBoth{
                clear: both;
            }
            &:hover{
                cursor: pointer;
            }
            .collapseFirst{
                padding: 20px;
                padding-top: 0;
                .headerList{
                    background-color: ${color._GREY_LIGHT_2};
                    color: ${color._GREY_999};
                    font-weight: 600;
                    font-size: 12px;
                    padding: 0.6em 1em;
                    .right-1{
                        text-align: right;
                    }
                }
                .styleListStock{
                    border: 0;
                    .ant-checkbox-inner{
                        border-color: ${color._STROKE};
                        border-radius: 0.2em
                    }
                    .ant-checkbox-checked .ant-checkbox-inner{
                        background-color: ${color._BLUE_VCSC};
                        border-color: ${color._STROKE};
                        border-radius: 0.2em;
                    }
                    .item{
                        padding: 0.7em 12px;
                        font-size: 13px;
                        font-weight: 500;
                        &:hover{
                            background-color: ${color._HOVER};
                            color: ${color._BLACK}
                        }
                        .right-2{
                            text-align: right;
                        }
                        .btnClose{
                            padding: 5px 20px;
                            border-radius: 4px;
                            background-color: ${color._BLACK};
                            outline: none;
                            border: none;
                            color: ${color._WHITE};
                            font-weight: 500;
                            display: inline-flex;
                            align-items: center;
                        }
                    }
                }
            }
        }
        .isActive{
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
`

function Recommendations(props){
    const {
        loginCoreInternal,
        infoUserVbos,
        getStockList
    } = props;

    let [firstname, lastname, email] = useLocalLocalStorage("keyAuthInfoUser", ["firstName", "lastName", "email"], "");
    let [userName] = useLocalLocalStorage("userLogin", ["userName"], "");
    const [isViewTabs, setViewTabs] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const [isVerify, setVerify] = useState(false);
    const [stockCodeClose, setStockCodeClose] = useState(null);
    const [passwordVbos, setPasswordVbos] = useState('');
    const [_arrImport, setArrImport] = useState([]);
    
    useEffect(()=>{}, [isViewTabs]);
    function onNavigatorMaster(value, stockCode = null){
        setStockCodeClose(null);
        setViewTabs(value);
        if(stockCode){
            setStockCodeClose(stockCode); 
        }
    }

    function _setArrImport(arr){
        setArrImport(arr);
    }

    async function _onLoginVbosInternal(){
        try {
            setLoading(true);
            const res = await loginCoreInternal({
                userName: userName,
                password: passwordVbos
                // userName: 'kamolom',
                // password: 'ken1308'
            });
            if(res.type === 'LOGIN_CORE_INTERNAL'){
                setVerify(true);
                loadDataAfter(res.data || null);
                setPasswordVbos("");
            }else{
                common.notify("error", "Đăng nhập thất bại !!!");
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    function _onIgnoreLoginVbosInternal(){
        setVerify(true); //Xóa khi available
        loadDataAfter(); //Xóa khi available
    }

    function loadDataAfter(data = null){
        try {
            getStockList();
            if(data && data.accessToken){
                loadAllCustomer(userName, data.accessToken);
            }
        } catch (error) {
            
        }
    }

    function updateInputValue(event){
        if(event.target.name === 'passwordVbos'){
            setPasswordVbos(event.target.value);
        }
    }

    return (
        <div className={rootMain}>
            {
                {
                    2: <CreateRecommentdations 
                        _onNavigatorMaster={onNavigatorMaster}
                        stockCodeClose={stockCodeClose}
                        {...props}
                    />,
                    1: <div className="main">
                        <div className="header">
                            <div className="title">
                                <img alt="" width="22%" src="./images/icons/another/ic_avatar.svg"/>
                                <div className="info">
                                    <div className="name">
                                        {firstname} {lastname}
                                    </div>
                                    <span className="email">
                                        {email}
                                    </span>
                                </div>
                            </div>
                            <div className="inputRight">
                                <Input 
                                    className="styleInput" 
                                    type="password" 
                                    placeholder="Nhập mật khẩu Vbos"
                                    value={passwordVbos}
                                    name="passwordVbos"
                                    onChange={event => updateInputValue(event)}
                                    onPressEnter={_onLoginVbosInternal}
                                />
                                &nbsp;&nbsp;
                                <button className="btnAccuracy" onClick={_onLoginVbosInternal}>{isLoading ? <span style={{display: 'inline-flex', alignItems: 'center'}}><LoadingOutlined />&nbsp;</span> : null}XÁC THỰC</button>
                                &nbsp;&nbsp;<button className="btnAccuracy" style={{background: color._GREY_999}} onClick={_onIgnoreLoginVbosInternal}>BỎ QUA</button>
                                {infoUserVbos && (isVerify && Object.keys(infoUserVbos).length > 0) && 
                                    <div style={{color: color._GREEN, fontWeight: 500, paddingTop: 5, fontSize: 13, display: 'flex', alignItems: 'center'}}>
                                        <CheckOutlined /> &nbsp;Đã xác thực - TK: <span style={{color: color._RED_VCSC}}>&nbsp;{infoUserVbos.userInfo.username}</span>
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            isVerify && 
                            <div className="rootBody p-top20">
                                <Tabs type="card">
                                    <TabPane tab="SỐ DƯ DANH MỤC" key="1">
                                        <RecommendationsCom 
                                            _onNavigatorMaster={onNavigatorMaster}
                                            setArrImport={_setArrImport}
                                            {...props}
                                        />
                                    </TabPane>
                                    <TabPane tab="LỊCH SỬ" key="2">
                                        <HistoryRecommendation 
                                            _onNavigatorMaster={onNavigatorMaster} 
                                            {...props}
                                            setArrImport={_setArrImport}
                                        />
                                    </TabPane>
                                    <TabPane tab="THỐNG KÊ" key="3">
                                        <Statistics 
                                            _onNavigatorMaster={onNavigatorMaster}
                                            {...props}/>
                                    </TabPane>
                                </Tabs>
                            </div>
                        }
                    </div>,
                    3: <ImportView 
                        _onNavigatorMaster={onNavigatorMaster}
                        {...props}
                        arrImport={_arrImport}
                    />
                }[isViewTabs]
            }
        </div>
    )
}

function ImportView (props){
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const {arrImport, actionRemind, infoUserVbos} = props;

    useEffect(()=>{
        async function loadData(){
            try {
                if(arrImport && arrImport.length > 0){
                    arrImport.shift();
                    let tmpData = [];
                    tmpData = arrImport;
                    if(tmpData.length > 0){
                        const tmp =  await Promise.all(tmpData.map(async (item)=>{
                            let res = await checkPriceAlert(item[2]);
                            return[
                                ...item,
                                res
                            ]
                        }))
                        setData(tmp);
                    }
                }  
            } catch (error) {
                
            }
        }
        loadData();
    }, [arrImport]);

    function onBack (){
        props._onNavigatorMaster(1);
    }

    function cancelCreateRecommendation(){
        onBack();
    }

    async function checkPriceAlert(value){
        try {
            if(value){
                const res = await getAlertStockCode(value);
                if(res.success){
                    let data = res.data;
                    if(data){
                        return data.c;
                    }
                }
            }
        } catch (error) {
            
        }
    }

    async function handleCreateRecommendation(){
        try {
            if(data.length > 0){
                const listArr = data.map((item, idx)=>{
                    return{
                        _id: idx,
                        isTypeBuySell: item[0].toLowerCase() === 'mua' ? 1 : 2,
                        disbursement: null,
                        stockCode: item[2],
                        quantity: item[3],
                        priceRecommend: item[7],
                        priceCutLoss: item[4],
                        priceTarget: item[5],
                        description: item[6],
                    }
                });
                setLoading(true)
                let dataTmp = {
                    arrData: JSON.stringify(listArr),
                    userId : infoUserVbos && infoUserVbos.userInfo.username
                    // userId:'kamolom'
                }
                const res = await actionRemind(dataTmp);
                setLoading(false)
                props._onNavigatorMaster(1);
                if(res){
                    common.notify("success", "Tạo khuyến nghị thành công !!!");
                }
            }
        } catch (error) {
            setLoading(false)
            console.log("error ", error);
        }
    }
    return(
        <div className="main">
            <div className="importView">
                <div className="headerIm">
                    <div className="leftIm">
                        Tạo khuyến nghị mới từ file
                    </div>
                    <div className="back p-top10" onClick={onBack}>
                        <SwapLeftOutlined style={{fontSize: 15}}/>&nbsp;Quay lại
                    </div>
                </div>
                <div className="p-top20"></div>
                <div className="body">
                    <div className="headerList">
                        <Row>
                            <Col span={2}>
                                Khuyến nghị
                            </Col>
                            <Col span={2}>
                                Danh mục
                            </Col>
                            <Col span={2}>
                                Cổ phiếu
                            </Col>
                            <Col span={2} className="right">
                                SL
                            </Col>
                            <Col span={3} className="right">
                                Giá khuyến nghị
                            </Col>
                            <Col span={2} className="right">
                                Giá cắt lỗ
                            </Col>
                            <Col span={2} className="right">
                                Giá mục tiêu
                            </Col>
                            <Col span={9} style={{paddingLeft: 18}}>
                                Nội dung
                            </Col>
                        </Row>
                    </div>
                    <List
                        size="small"
                        bordered
                        dataSource={data}
                        className="styleListStock"
                        renderItem={(item, idx) => 
                        <List.Item className="item">
                            <Col span={2}>
                                <Tag color={(item[0].toLowerCase() === 'mua' ? '#c6dfff' : '#ffd7d8')}>
                                    <span 
                                        style={{color: item[0].toLowerCase() === 'mua' ? '#00377b' : '#c42127', fontWeight: 600}}
                                    >
                                        {item[0].toLowerCase() === 'mua' ? ' Mua' : 'Bán'}
                                    </span>
                                </Tag>
                            </Col>
                            <Col span={2}>
                                {item[1]}
                            </Col>
                            <Col span={2}>
                                {item[2]}
                            </Col>
                            <Col span={2} className="right">
                                {item[3]}
                            </Col>
                            <Col span={3} className="right">
                                {common.convertTextDecimal(item[7])}
                            </Col>
                            <Col span={2} className="right">
                                {common.convertTextDecimal(item[4])}
                            </Col>
                            <Col span={2} className="right">
                                {common.convertTextDecimal(item[5])}
                            </Col>
                            <Col span={9} style={{paddingLeft: 18}}>
                                {item[6]}
                            </Col>
                        </List.Item>}
                    >
                    </List>
                </div>
                <div className="footer p-top20">
                    <div/>
                    <div>
                        <button className="btnCancel" onClick={cancelCreateRecommendation}>HỦY BỎ</button>&nbsp;&nbsp;
                        <button className="btnSave" onClick={handleCreateRecommendation}>{isLoading && <span><LoadingOutlined />&nbsp;</span>}LƯU</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Statistics (props){
    const dateFormat = 'DD/MM/YYYY';
    const newDate = new Date();

    const [isCheck, setCheck] = useState(false);
    const [stockCode, setStockCode] = useState('all');
    const [date, setDate] = useState({
        fromDate: moment(new Date(new Date(newDate).setDate(newDate.getDate()-3)), dateFormat),
        toDate: moment(new Date(), dateFormat),
    });

    const {
        getStatistic, 
        infoUserVbos,
        lstStatistic,
        lstStock
    } = props;

    const lstStockType = lstStock && lstStock.filter(item => item.t === 'STOCK');

    useEffect(loadData, [stockCode, date]);

    function loadData(){
        loadDataAsset();
    }

    async function loadDataAsset(){
        try {
            getStatistic({
                userId: infoUserVbos.userInfo.username || null,
                // userId: 'kamolom',
                fromDate: new Date(date.fromDate).toISOString(),
                toDate: new Date(date.toDate).toISOString(),
                stockCode: stockCode !== 'all' ? stockCode : null
            });
        } catch (error) {
            
        }
    }

    function reloadHistory(){
        loadDataAsset();
    }

    function expandCollapse(){
        setCheck(!isCheck);
    }

    function updateInputDate(name, value){
        setDate({
            ...date,
            [name]: value
        });
    }

    function updateSelect(name, event){
        if(name === 'stockCode'){
            setStockCode(event);
        }
    }

    function renderListDataItem (item){
        return(
            <List.Item className="item">
                <Col span={3} style={{color: color._BLACK, fontWeight: 500}}>
                    {item.stockCode}
                </Col>
                <Col span={2} style={{textAlign: 'center'}}>
                    <Tag color={item.isTypeBuySell === 1 ? '#c6dfff' : '#ffd7d8'}>
                        <span 
                            style={{color: item.isTypeBuySell === 1 ? '#00377b' : '#c42127', fontWeight: 500}}
                        >
                            {item.isTypeBuySell === 1 ? 'Mua' : 'Bán'}
                        </span>
                    </Tag>
                </Col>
                <Col span={3} className="right-2">
                    {common.convertTextDecimal(item.quantity)}
                </Col>
                <Col span={4} className="right-2">
                    {common.convertTextDecimal(item.priceTarget)}
                </Col>
                <Col span={4} className="right-2">
                    {common.convertTextDecimal(item.priceClose)}
                </Col>
                <Col span={4} className="right-2">
                    <div style={{color: item.rateLossValue >= 0 ? color._GREEN : color._RED_VCSC}}>
                        {common.convertTextDecimal(item.rateLossValue)}
                    </div>
                </Col>
                <Col span={4} className="right-2">
                    {common.convertDDMMYYYY(item.createDateTime)}&nbsp;{common.convertTime(item.createDateTime)}
                </Col>
            </List.Item>
        )
    }

    return(
        <div className={recommandations}>
            <div className="header">
                <Row className="left" style={{width: '100%'}}>
                    <Col span={3}>
                        <DatePicker 
                            className="datePicker" 
                            onChange={(e)=> updateInputDate('fromDate', e)}
                            format={dateFormat} 
                            value={date.fromDate}
                        />
                    </Col>
                    <Col span={3}>
                        <DatePicker 
                            className="datePicker" 
                            onChange={(e)=> updateInputDate('toDate', e)}
                            format={dateFormat} 
                            value={date.toDate}
                        />
                    </Col>
                    <Col span={4}>
                        <Select
                            className="customSelectOrder"
                            style={{top: 0, width: '100%'}}
                            showSearch
                            defaultValue={1}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value={1}>Tất cả danh mục</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            className="customSelectOrder"
                            style={{top: 0, width: '100%', marginLeft: 10}}
                            showSearch
                            defaultValue={1}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value={1}>Tất cả khuyến nghị</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            className="customSelectOrder"
                            style={{top: 0, width: '100%', marginLeft: 20}}
                            showSearch
                            optionFilterProp="children"
                            value={stockCode}
                            onChange={(e)=>updateSelect('stockCode', e)}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option key="all" value="all">Tất cả CP</Option>
                            {
                                lstStockType && lstStockType.map((item, index)=>{
                                    return (
                                        <Option key={index} value={item.s}>{`${item.s} - ${item.n1}`}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Col>
                    <Col span={2}>
                        <ReloadOutlined 
                            onClick={reloadHistory} 
                            className="reloadAsset"
                        />
                    </Col>
                </Row>
            </div>
            <div className="rootBody p-top5">
                {
                    lstStatistic.length > 0 &&
                    lstStatistic.map((item, idx)=>{
                        return (
                            <div className="p-top20" key={idx}>
                                <div className={`itemPortfolio ${isCheck ? 'isActive' : ''}`} onClick={expandCollapse}>
                                    <div className="left">
                                        <div className="main">
                                            <Row>
                                                <Col span={15}>
                                                    <div className="label">
                                                        DANH MỤC
                                                    </div>
                                                </Col>
                                                <Col span={5}>
                                                    <div className="label" style={{textAlign: 'right'}}>
                                                        LÃI/LỖ ĐÃ THỰC HIỆN
                                                    </div>
                                                </Col>
                                                <Col span={4} style={{paddingRight: 20}}>
                                                    <div className="label" style={{textAlign: 'right'}}>
                                                       SỐ DEAL LÃI/LỖ
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={15}>
                                                    <div className="title">
                                                        {item.porfolioName}
                                                    </div>
                                                </Col>
                                                <Col span={5}>
                                                    <div className="title" 
                                                        style={{
                                                            color: item.rateLossValue >= 0 ? color._GREEN : color._RED_VCSC,
                                                            textAlign: 'right'
                                                        }}
                                                    >
                                                        {common.convertTextDecimal(item.rateLossValue)}
                                                    </div>
                                                </Col>
                                                <Col span={4} style={{paddingRight: 20}}>
                                                    <div className="title" style={{textAlign: 'right'}}>
                                                        <span style={{color: color._GREEN}}>
                                                            {item.countLengthRate}
                                                        </span>/
                                                        <span style={{color: color._RED_VCSC}}>
                                                            {item.countLengthLoss}
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="iconDown">
                                            {isCheck ? <CaretUpOutlined style={{color: color._BLUE}}/> : <CaretDownOutlined />}
                                        </div>
                                    </div>
                                    <div className="clearBoth"></div>
                                    {isCheck ? 
                                        <div className="collapseFirst">
                                            <div style={{border: `1px solid ${color._STROKE}`, borderRadius: 5}}>
                                                <div className="headerList">
                                                    <Row>
                                                        <Col span={3}>
                                                            Mã CP
                                                        </Col>
                                                        <Col span={2} style={{textAlign: 'center'}}>
                                                            Khuyến nghị 
                                                        </Col>
                                                        <Col span={3} className="right-1">
                                                            SL CP
                                                        </Col>
                                                        <Col span={4} className="right-1">
                                                            Giá vốn
                                                        </Col>
                                                        <Col span={4} className="right-1">
                                                            Giá thực hiện
                                                        </Col>
                                                        <Col span={4} className="right-1">
                                                            Lãi/Lỗ
                                                        </Col>
                                                        <Col span={4} className="right-1">
                                                           Ngày thực hiện
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <List
                                                    size="small"
                                                    bordered
                                                    dataSource={item.data || []}
                                                    className="styleListStock"
                                                    renderItem={(item, idx) => 
                                                        renderListDataItem(item)
                                                    }
                                                >
                                                </List>
                                            </div>
                                        </div>
                                    : null}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function RecommendationsCom (props){
    const [isCheck, setCheck] = useState(false);

    const {
        getAssetRecommend, 
        infoUserVbos,
        lstAssetRecommend
    } = props;

    useEffect(loadData, []);

    function loadData(){
        loadDataAsset();
    }

    async function loadDataAsset(){
        try {
            getAssetRecommend({
                userId: infoUserVbos.userInfo.username || null,
                // userId: 'kamolom',
            });
        } catch (error) {
            
        }
    }

    function reloadHistory(){
        loadDataAsset();
    }

    function onActionCreateNew(){
        onCreateNew();
    }

    function onCreateNew(stockCodeClose = null){
        props._onNavigatorMaster(2, stockCodeClose);
    }

    function expandCollapse(){
        setCheck(!isCheck);
    }

    async function onUploadFileProportion(e){
        props._onNavigatorMaster(3);
        readXlsxFile(e.file.originFileObj).then(async (rows) => {
            if(rows){
                props.setArrImport(rows);
            }
        });
    }

    async function onUpdateStatus(item, status){
        try {
            if(status === 2){
                onCreateNew(item);
            }
        } catch (error) {
            
        }
    }

    return(
        <div className={recommandations}>
            <div className="header">
                <div className="left">
                    <Row>
                        <Col span={8}>
                            <Select
                                className="customSelectOrder"
                                style={{top: 0, width: '100%'}}
                                showSearch
                                defaultValue={1}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value={1}>Tất cả danh mục</Option>
                            </Select>
                        </Col>
                        <Col span={8}>
                            <Select
                                className="customSelectOrder"
                                style={{top: 0, width: '100%', marginLeft: 10}}
                                showSearch
                                defaultValue={1}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value={1}>Tất cả khuyến nghị</Option>
                            </Select>
                        </Col>
                        <Col span={6}>
                            <ReloadOutlined 
                                onClick={reloadHistory} 
                                className="reloadAsset"
                            />
                        </Col>
                    </Row>
                    
                </div>
                <div className="right">
                    <Upload 
                        showUploadList={false}
                        onChange={onUploadFileProportion}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    >
                        <Button className="btnImport" >
                            <ImportOutlined style={{color: 'white'}} /> <span style={{color: 'white'}}>IMPORT</span>
                        </Button>
                    </Upload>&nbsp;&nbsp;
                    <button className="btnCreate" onClick={onActionCreateNew}><PlusOutlined  />&nbsp;TẠO KHUYẾN NGHỊ MỚI</button>
                </div>
            </div>
            <div className="rootBody p-top5">
                {
                    lstAssetRecommend.length > 0 &&
                    lstAssetRecommend.map((item, idx)=>{
                        return (
                            <div className="p-top20" key={idx}>
                                <div className={`itemPortfolio ${isCheck ? 'isActive' : ''}`} onClick={expandCollapse}>
                                    <div className="left">
                                        <div className="main">
                                            <Row>
                                                <Col span={6}>
                                                    <div className="label">
                                                        DANH MỤC
                                                    </div>
                                                </Col>
                                                <Col span={3}>
                                                    <div className="label">
                                                        SỐ CP
                                                    </div>
                                                </Col>
                                                <Col span={4}>
                                                    <div className="label">
                                                        GIÁ TRỊ ĐẦU TƯ
                                                    </div>
                                                </Col>
                                                <Col span={4}>
                                                    <div className="label">
                                                        GIÁ TRỊ HIỆN TẠI
                                                    </div>
                                                </Col>
                                                <Col span={4}>
                                                    <div className="label">
                                                        LÃI/LỖ
                                                    </div>
                                                </Col>
                                                <Col span={3}>
                                                    <div className="label">
                                                        % LÃI/LỖ
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={6}>
                                                    <div className="title">
                                                        {item.porfolioName}
                                                    </div>
                                                </Col>
                                                <Col span={3}>
                                                    <div className="title">
                                                        {common.convertTextDecimal(item.stockNumber)}
                                                    </div>
                                                </Col>
                                                <Col span={4}>
                                                    <div className="title">
                                                        {common.convertTextDecimal(item.totalValueInvest)}
                                                    </div>
                                                </Col>
                                                <Col span={4}>
                                                    <div className="title">
                                                        {common.convertTextDecimal(item.totalValueCurrent)}
                                                    </div>
                                                </Col>
                                                <Col span={4}>
                                                    <div className="title"  style={{color: item.totalValueRateLoss >= 0 ? color._GREEN : color._RED_VCSC}}>
                                                        {common.convertTextDecimal(item.totalValueRateLoss)}
                                                    </div>
                                                </Col>
                                                <Col span={3}>
                                                    <div className="title" style={{color: item.totalPercentRateLoss >= 0 ? color._GREEN : color._RED_VCSC}}>
                                                        {item.totalPercentRateLoss}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="iconDown">
                                            {isCheck ? <CaretUpOutlined style={{color: color._BLUE}}/> : <CaretDownOutlined />}
                                        </div>
                                    </div>
                                    <div className="clearBoth"></div>
                                    {isCheck ? 
                                        <div className="collapseFirst">
                                            <div style={{border: `1px solid ${color._STROKE}`, borderRadius: 5}}>
                                                <div className="headerList">
                                                    <Row>
                                                        <Col span={2}>
                                                            Mã CP
                                                        </Col>
                                                        <Col span={3} className="right-1">
                                                            Số lượng CP 
                                                        </Col>
                                                        <Col span={2} className="right-1">
                                                            Giá mua TB
                                                        </Col>
                                                        <Col span={2} className="right-1">
                                                            Thị giá
                                                        </Col>
                                                        <Col span={3} className="right-1">
                                                            Lãi/Lỗ
                                                        </Col>
                                                        <Col span={2} className="right-1">
                                                            % Lãi/Lỗ
                                                        </Col>
                                                        <Col span={2} className="right-1">
                                                            % Tỷ trọng
                                                        </Col>
                                                        <Col span={2} className="right-1">
                                                            % đóng góp
                                                        </Col>
                                                        <Col span={3} style={{paddingLeft: 15}}>
                                                            Ngày tạo khuyến nghị
                                                        </Col>
                                                        <Col span={3}>
                                                            
                                                        </Col>
                                                    </Row>
                                                </div>
                                                {/* <div style={{padding: '5px 12px', borderBottom: '1px solid #f0f0f0'}}>
                                                    <Row>
                                                        <Col span={14}>
                                                            <span style={{fontWeight: 600, color: color._BLACK}}>
                                                                Tiền mặt
                                                            </span>
                                                        </Col>
                                                        <Col span={2} style={{textAlign: 'right'}}>
                                                            <span style={{fontWeight: 600, color: color._BLACK}}>
                                                                {item.money}
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                </div> */}
                                                <List
                                                    size="small"
                                                    bordered
                                                    dataSource={item.data || []}
                                                    className="styleListStock"
                                                    renderItem={(item, idx) => 
                                                    <List.Item className="item">
                                                        <Col span={2} style={{color: color._BLACK, fontWeight: 500}}>
                                                            {item.stockCode}
                                                        </Col>
                                                        <Col span={3} className="right-2">
                                                            {common.convertTextDecimal(item.totalQuantity)} 
                                                        </Col>
                                                        <Col span={2} className="right-2">
                                                            {common.convertTextDecimal(item.avgPrice)}
                                                        </Col>
                                                        <Col span={2} className="right-2">
                                                            {common.convertTextDecimal(item.lastPrice)}
                                                        </Col>
                                                        <Col span={3} className="right-2" style={{color: item.rateLossValue >= 0 ? color._GREEN : color._RED_VCSC}}>
                                                            {common.convertTextDecimal(item.rateLossValue)}
                                                        </Col>
                                                        <Col span={2} className="right-2" style={{color: item.percentRateLoss >= 0 ? color._GREEN : color._RED_VCSC}}>
                                                            {item.percentRateLoss}
                                                        </Col>
                                                        <Col span={2} className="right-2">
                                                            {item.proportion}
                                                        </Col>
                                                        <Col span={2} className="right-2" style={{color: item.contribute >= 0 ? color._GREEN : color._RED_VCSC}}>
                                                            {item.contribute}
                                                        </Col>
                                                        <Col span={3} style={{paddingLeft: 15, textAlign: 'center'}}>
                                                            {common.convertDDMMYYYY(item.createDateTime)}&nbsp;{common.convertTime(item.createDateTime)}
                                                        </Col>
                                                        <Col span={3} style={{textAlign: 'center'}}>
                                                            <button className="btnClose" onClick={()=>onUpdateStatus(item, 2)}>Đóng trạng thái</button>
                                                        </Col>
                                                    </List.Item>}
                                                >
                                                </List>
                                            </div>
                                        </div>
                                    : null}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function CreateRecommentdations (props){
    const {lstStock, actionRemind, infoUserVbos, stockCodeClose, sendRemindSell} = props;
    const lstStockType = lstStock && lstStock.filter(item => item.t === 'STOCK');
    const totalCapital = 1000000000;
    const [listArr, setListArr] = useState([{
        _id: 1,
        __id: stockCodeClose ? stockCodeClose._id : 0,
        isTypeBuySell: stockCodeClose ? 2 : 1,
        disbursement: 10,
        stockCode: stockCodeClose ? stockCodeClose.stockCode : (lstStockType ? lstStockType[0].s : ''),
        quantity: stockCodeClose ? stockCodeClose.quantity : 0,
        priceRecommend: stockCodeClose ? stockCodeClose.priceRecommend : 0,
        priceCutLoss: 0,
        priceTarget: 0,
        description: stockCodeClose ? 
        `${stockCodeClose.stockCode} bán giá ${common.convertTextDecimal(stockCodeClose.priceRecommend)} trong phiên hôm nay, độ tin cậy 80%`
        : ''
    }]);
    const [isLoading, setLoading] = useState(false);
    useEffect(()=>{
        loadData();
    }, [listArr.length])

    function onBack (){
        props._onNavigatorMaster(1);
    }

    function loadData(){
        try {
            if(!stockCodeClose){
                for (const element of listArr) {
                    checkPriceAlert(element._id, element.stockCode);
                }
                listArr.map();
            }
        } catch (error) {
            
        }
    }

    function smootPrice(value){
        try {
            return Math.floor(value/100)*100;
        } catch (error) {
            
        }
    }

    function updateSelect(id, name, event){
        if(name === 'isTypeBuySell'){
            let data = listArr.map(item =>{
                let quantityTmp = item.quantity;
                if(item._id === id && event === 1){
                    quantityTmp = autoComplete(item.disbursement, item.priceRecommend, 2)
                }
                return item._id === id ? {
                    ...item,
                    isTypeBuySell: event,
                    quantity: quantityTmp,
                    description: setDescription(item.stockCode, item.priceRecommend, event, item.priceTarget, item.priceCutLoss),
                } : item
            })
            setListArr(data);
        }
        if(name === 'stockCode'){
            checkPriceAlert(id, event);
        }
    }

    async function checkPriceAlert(id = null, value, isRender = true){
        try {
            if(value){
                const res = await getAlertStockCode(value);
                if(res.success){
                    let data = res.data;
                    if(data){
                        if(isRender){
                            setListArr(listArr.map(item =>{
                                return item._id === id ? {
                                    ...item,
                                    stockCode: value,
                                    priceRecommend: data.c,
                                    priceCutLoss: smootPrice(data.c*0.95),
                                    priceTarget: smootPrice(data.c*1.05),
                                    description: setDescription(value, data.c, item.isTypeBuySell, smootPrice(data.c*1.05), smootPrice(data.c*0.95)),
                                    quantity: item.isTypeBuySell === 1 ? autoComplete(item.disbursement, data.c, 2) : 0
                                } : item
                            }));
                        }
                        return data.c;
                    }
                }
                return 0;
            }
        } catch (error) {
            
        }
    }

    function setDescription(code, price, isTypeBuySell, priceTarget, priceCutLoss){
        return `${code} ${isTypeBuySell === 1 ? 'mua' : 'bán'} giá: ${common.convertTextDecimal(price)} trong phiên hôm nay${isTypeBuySell === 1 ? `, giá mục tiêu: ${common.convertTextDecimal(priceTarget)}, giá cắt lỗ: ${common.convertTextDecimal(priceCutLoss)}` : ''}, độ tin cậy 80%`
    }


    function addMoreRecommend(){
        setListArr([
            ...listArr,
            {
                _id: listArr[listArr.length - 1]._id + 1,
                isTypeBuySell: 1,
                disbursement: 10,
                stockCode: lstStockType ? lstStockType[0].s : '',
                quantity: 0,
                priceRecommend: 0,
                priceCutLoss: 0,
                priceTarget: 0,
                description: ''
            }
        ]);
    }

    async function handleCreateRecommendation(){
        try {
            setLoading(true)
            let data = {
                arrData: JSON.stringify(listArr),
                userId : infoUserVbos && infoUserVbos.userInfo.username
                // userId: 'kamolom'
            }
            const res = await actionRemind(data);
            if(res.data){
                common.notify("success", "Tạo khuyến nghị thành công !!!");
                setListArr([
                    {
                        _id: 1,
                        isTypeBuySell: 1,
                        disbursement: 10,
                        stockCode: lstStockType ? lstStockType[0].s : '',
                        quantity: 0,
                        priceRecommend: 0,
                        priceCutLoss: 0,
                        priceTarget: 0,
                        description: ''
                    }
                ]);
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    function cancelCreateRecommendation(){
        setListArr([{
            _id: 1,
            isTypeBuySell: stockCodeClose ? 2 : 1,
            disbursement: 10,
            stockCode: stockCodeClose ? stockCodeClose : (lstStockType ? lstStockType[0].s : ''),
            quantity: stockCodeClose ? stockCodeClose.quantity : 0,
            priceRecommend: 0,
            priceCutLoss: 0,
            priceTarget: 0,
            description: ''
        }]);
    }

    function handleCloseRecommendation(id){
        const newArr = listArr.filter(item => item._id !== id);
        if (newArr) {
            setListArr(newArr);
        }
    }

    function updateInputNumber(id, name, event){
        if(name){
            setListArr(listArr.map(item =>{
                let data = item;
                if(item._id === id){
                    let disbursementA = item.disbursement;
                    let quantityA = item.quantity;
                    let descriptionA = item.description;
                    if(item.isTypeBuySell === 1){
                        if(name === 'quantity'){
                            disbursementA = autoComplete(event, item.priceRecommend);
                            quantityA = event;
                        }
                        if(name === 'disbursement'){
                            quantityA = autoComplete(event, item.priceRecommend, 2);
                            disbursementA = event;
                        }
                    }
                    if(item.isTypeBuySell === 2){
                        if(name === 'quantity'){
                            quantityA = event;
                        }
                    }
                    if(name === 'priceTarget'){
                        descriptionA = setDescription(
                            item.stockCode, 
                            item.priceRecommend, 
                            item.isTypeBuySell, 
                            event, 
                            item.priceCutLoss
                        )
                    }
                    if(name === 'priceCutLoss'){
                        descriptionA = setDescription(
                            item.stockCode, 
                            item.priceRecommend, 
                            item.isTypeBuySell, 
                            item.priceTarget, 
                            event
                        )
                    }
                    data = {
                        ...item,
                        [name]: event,
                        quantity: quantityA,
                        disbursement: disbursementA,
                        description: descriptionA
                    }
                }
                return data
            }));
        }
    }

    const autoComplete = (value, priceRecommend, isType = 1)=> { //isType = 1: quantity, isType = 2: disbursement (giải ngân)
        try {
            if(isType === 1){
                return (value*priceRecommend*100/totalCapital).toFixed(2)
            }
            if(isType === 2){
                let cal = Math.floor(totalCapital*value/(priceRecommend*100*100))*100;
                return  cal < 100 ? 100 : cal;
            }
            return 0;
        } catch (error) {
            
        }
    }

    function updateSelectValue (id, name, event){
        if(name){
            setListArr(listArr.map(item =>{
                return item._id === id ? {
                    ...item,
                    [name]: event.target.value
                } : item
            }));
        }
    }

    function onRefreshPrice(id, stockCode){
        checkPriceAlert(id, stockCode);
    }

    async function handleSendRemindSell(){
        try {
            if(listArr.length > 0){
                setLoading(true);
                const res = await sendRemindSell({
                    ...listArr[0],
                    userId : infoUserVbos && infoUserVbos.userInfo.username
                });
                setLoading(false);
                if(res.type === 'SEND.REMIND.SELL'){
                    common.notify("success", "Đóng khuyến nghị thành công !!!");
                    onBack();
                }
            }
        } catch (error) {
            setLoading(false);
        }
    }
            
    return(
        <div className="createRecommentdations">
            <div className="header">
                <div className="firstHeader">
                    <div className="label">
                        Tạo khuyến nghị mới
                    </div>
                    <div className="back p-top10" onClick={onBack}>
                        <SwapLeftOutlined style={{fontSize: 15}}/>&nbsp;Quay lại
                    </div>
                </div>
                <div className="main p-top10">
                    <span>
                        <span>Danh mục</span>
                        <Select
                            className="customSelect"
                            style={{marginLeft: 10, top: 0, width: '18em'}}
                            optionFilterProp="children"
                            defaultValue={1}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value={1}>Cơ bản</Option>
                        </Select>
                    </span>
                    <span style={{marginLeft: 30}}>
                        <span>Tổng vốn</span>
                        <InputNumber
                            style={{marginLeft: 10, borderRadius: 3, backgroundColor: 'transparent', color: color._BLACK, width: '10em'}}
                            min={0}
                            formatter={value => common.formatterNumber(value)}
                            parser={value => common.parserNumber(value)}
                            disabled={true}
                            value={1000000000}
                        />
                    </span>
                </div>
            </div>
            {
                listArr.map((item, idx)=>{
                    return(
                        <div key={idx} className={idx > 0 ?  "p-top10" : ""} style={{position: 'relative'}}>
                            <span style={{position: 'absolute', right: 5, cursor: 'pointer', color: color._RED_VCSC}}>
                                {listArr.length > 1 ? <CloseSquareOutlined onClick={()=> handleCloseRecommendation(item._id)}/> : null}
                            </span>
                            <div className="body p-top10">
                                <Row>
                                    <Col span={3} className="title">
                                        Hành động
                                    </Col>
                                    <Col span={3} className="title">
                                        {item.isTypeBuySell === 1 && 'Giải ngân (%)'}
                                    </Col>
                                    <Col span={6} className="title">
                                        Mã chứng khoán
                                    </Col>
                                    <Col span={3} className="title">
                                        Số lượng
                                    </Col>
                                    <Col span={3} className="title" style={{display: 'flex', alignItems: 'center'}}>
                                        Giá khuyến nghị &nbsp;{!stockCodeClose && 
                                        <ReloadOutlined 
                                            style={{color: color._BLUE_VCSC}} 
                                            onClick={()=> onRefreshPrice(item._id, item.stockCode)}
                                        />}
                                    </Col>
                                    <Col span={3} className="title">
                                        {item.isTypeBuySell === 1 && 'Giá cắt lỗ'}
                                    </Col>
                                    <Col span={3} className="title">
                                        {item.isTypeBuySell === 1 && 'Giá mục tiêu'}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={3}>
                                        <Select
                                            className="customSelect"
                                            style={{top: 0}}
                                            optionFilterProp="children"
                                            value={item.isTypeBuySell}
                                            name="isTypeBuySell"
                                            onChange={(e)=>updateSelect(item._id, 'isTypeBuySell', e)}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value={1} disabled={stockCodeClose}>Mua</Option>
                                            <Option value={2}>Bán</Option>
                                        </Select>
                                    </Col>
                                    <Col span={3}>
                                        {item.isTypeBuySell === 1 &&
                                            <InputNumber
                                                className="inputNumber"
                                                min={0}
                                                value={item.disbursement}
                                                formatter={value => common.formatterNumber(value)}
                                                parser={value => common.parserNumber(value)}
                                                onChange={event => updateInputNumber(item._id, 'disbursement', event)}
                                            />
                                        }
                                    </Col>
                                    <Col span={6}>
                                        <Select
                                            className="customSelect"
                                            style={{top: 0, backgroundColor: 'transparent'}}
                                            showSearch
                                            optionFilterProp="children"
                                            disabled={stockCodeClose}
                                            value={item.stockCode}
                                            onChange={(e)=>updateSelect(item._id, 'stockCode', e)}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {
                                                lstStockType && lstStockType.map((item, index)=>{
                                                    return (
                                                        <Option value={1} key={index} value={item.s}>{`${item.s} - ${item.n1}`}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Col>
                                    <Col span={3} className="title">
                                        <InputNumber
                                            className="inputNumber"
                                            style={{backgroundColor: 'transparent', color: color._BLACK}}
                                            min={0}
                                            formatter={value => common.formatterNumber(value)}
                                            parser={value => common.parserNumber(value)}
                                            value={item.quantity}
                                            disabled={stockCodeClose ? true : false}
                                            onChange={event => updateInputNumber(item._id, 'quantity', event)}
                                        />
                                    </Col>
                                    <Col span={3}>
                                        <InputNumber
                                            className="inputNumber"
                                            style={{backgroundColor: 'transparent', color: color._BLACK}}
                                            min={0}
                                            disabled={true}
                                            formatter={value => common.formatterNumber(value)}
                                            parser={value => common.parserNumber(value)}
                                            value={item.priceRecommend}
                                            onChange={event => updateInputNumber(item._id, 'priceRecommend', event)}
                                        />
                                    </Col>
                                    <Col span={3}>
                                        {item.isTypeBuySell === 1 &&
                                            <InputNumber
                                                className="inputNumber"
                                                min={0}
                                                formatter={value => common.formatterNumber(value)}
                                                parser={value => common.parserNumber(value)}
                                                value={item.priceCutLoss}
                                                onChange={event => updateInputNumber(item._id, 'priceCutLoss', event)}
                                                step={item.priceRecommend*0.1}
                                            />
                                        }
                                    </Col>
                                    <Col span={3}>
                                        {item.isTypeBuySell === 1 &&
                                            <InputNumber
                                                className="inputNumber"
                                                min={0}
                                                formatter={value => common.formatterNumber(value)}
                                                parser={value => common.parserNumber(value)}
                                                value={item.priceTarget}
                                                onChange={event => updateInputNumber(item._id, 'priceTarget', event)}
                                                step={item.priceRecommend*0.1}
                                            />
                                        }
                                    </Col>
                                </Row>
                                <Row className="p-top10">
                                    <Col span={24} className="title">
                                        Nội dung
                                    </Col>
                                    <Col span={24} className="title">
                                        <TextArea 
                                            rows={3}
                                            className="styleInput"
                                            // style={{background: 'transparent', color: color._BLACK}}
                                            value={item.description}
                                            onChange={event => updateSelectValue(item._id, 'description', event)}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    )
                })
            }
            {
                !stockCodeClose ?
                    <div className="footer p-top20">
                        <div>
                            <button className="btnAddNew" onClick={addMoreRecommend}><PlusOutlined />&nbsp;THÊM KHUYẾN NGHỊ</button>
                        </div>
                        <div>
                            <button className="btnCancel" onClick={cancelCreateRecommendation}>HỦY BỎ</button>&nbsp;&nbsp;
                            <button className="btnSave" onClick={handleCreateRecommendation}>{isLoading && <span><LoadingOutlined />&nbsp;</span>}LƯU</button>
                        </div>
                        
                    </div>
                :  <div className="footer p-top20">
                    <div></div>
                    <div>
                        <button className="btnSave" onClick={handleSendRemindSell}>{isLoading && <span><LoadingOutlined />&nbsp;</span>}GỬI</button>
                    </div>
                </div>
            }    
        </div>
    )
}

function HistoryRecommendation(props){
    const dateFormat = 'DD/MM/YYYY';
    const newDate = new Date();

    const {
        lstStock, 
        getAlertHistory, 
        lstAlertHistory, 
        infoUserVbos,
        sendRemind,
        updateRemind
    } = props;
    const lstStockType = lstStock && lstStock.filter(item => item.t === 'STOCK');
    const [stockCode, setStockCode] = useState(null);
    const [date, setDate] = useState({
        fromDate: moment(new Date(new Date(newDate).setDate(newDate.getDate()-3)), dateFormat),
        toDate: moment(new Date(), dateFormat),
    });

    useEffect(loadDataHistory, [stockCode, date]);

    function loadDataHistory(){
        actionLoadHisApi();
    }

    async function actionLoadHisApi(){
        try {
            await getAlertHistory({
                userId: infoUserVbos.userInfo.username,
                // userId: 'kamolom',
                fromDate: new Date(date.fromDate).toISOString(),
                toDate: new Date(date.toDate).toISOString(),
                stockCode: stockCode,
                skip: 0,
                limit: 1000
            });
        } catch (error) {
            
        }
    }

    function onCreateNew(stockCodeClose = null){
        props._onNavigatorMaster(2, stockCodeClose);
    }

    async function onSendNotify(item){
        try {
            const res = await sendRemind(item);
            if(res.type === 'SEND.REMIND'){
                loadDataHistory();
            }
        } catch (error) {
            
        }
    }

    async function onUpdateStatus(item, status){
        try {
            if(status === 1){
                const res = await updateRemind({
                    _id: item._id,
                    stockCode: item.stockCode,
                    status: status
                });
                if(res.type === 'UPDATE.REMIND'){
                    common.notify("success", "Cập nhật trạng thái thành công!!!");
                    loadDataHistory();
                }
            }
            if(status === 2){
                onCreateNew(item);
            }
        } catch (error) {
            
        }
    }

    async function onRemoveRecommendation(item){
        try {
            const res = await removeRemind({
                _id: item._id
            });
            if(res.success){
                common.notify("success", "Xóa thành công!!!");
                loadDataHistory();
            }
        } catch (error) {
            
        }
    }

    function updateSelect(name, event){
        if(name === 'stockCode'){
            setStockCode(event);
        }
    }

    function updateInputDate(name, value){
        setDate({
            ...date,
            [name]: value
        });
    }

    function reloadHistory(){
        actionLoadHisApi();
    }

    function disabledDate (current){
        let d = moment(new Date());
        let dStart = moment(new Date(date.fromDate)).add(-1, 'day');
        return current && current < dStart.endOf('day');
    }

    async function onUploadFileProportion(e){
        props._onNavigatorMaster(3);
        readXlsxFile(e.file.originFileObj).then(async (rows) => {
            if(rows){
                props.setArrImport(rows);
            }
        });
    }

    return(
        <div className="historyRecommendation">
            <div className="header">
                <Row style={{width: '100%'}}>
                    <Col md={3} xs={12}>
                        <Select
                            className="customSelectOrder"
                            style={{top: 0}}
                            showSearch
                            optionFilterProp="children"
                            value={1}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value={1}>Tất cả danh mục</Option>
                        </Select>
                    </Col>
                    <Col md={3} xs={12}>
                        <Select
                            className="customSelectOrder"
                            style={{top: 0}}
                            showSearch
                            optionFilterProp="children"
                            value={1}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value={1}>Tất cả khuyến nghị</Option>
                        </Select>
                    </Col>
                    <Col md={3} xs={12}>
                        <Select
                            className="customSelectOrder"
                            style={{top: 0}}
                            showSearch
                            optionFilterProp="children"
                            value={stockCode}
                            onChange={(e)=>updateSelect('stockCode', e)}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option key={"all"} value={null}>Tất cả mã CP</Option>
                            {
                                lstStockType && lstStockType.map((item, index)=>{
                                    return (
                                        <Option key={index} value={item.s}>{item.s}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Col>
                    <Col md={3} xs={12}>
                        <DatePicker 
                            className="datePicker" 
                            onChange={(e)=> updateInputDate('fromDate', e)}
                            format={dateFormat} 
                            value={date.fromDate}
                        />
                    </Col>
                    <Col md={3} xs={12}>
                        <DatePicker 
                            className="datePicker" 
                            onChange={(e)=> updateInputDate('toDate', e)}
                            format={dateFormat} 
                            value={date.toDate}
                            disabledDate={disabledDate}
                        />
                    </Col>
                    <Col md={9} xs={24}>
                        <div className="right">
                            <Upload 
                                showUploadList={false}
                                onChange={onUploadFileProportion}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            >
                                <Button className="btnImport" >
                                    <ImportOutlined style={{color: 'white'}} /> <span style={{color: 'white'}}>IMPORT</span>
                                </Button>
                            </Upload>&nbsp;&nbsp;
                            <button className="btnCreate" onClick={()=>onCreateNew()}><PlusOutlined  />&nbsp;TẠO KHUYẾN NGHỊ MỚI</button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="p-top20">
                <div style={{border: `1px solid ${color._STROKE}`, borderRadius: 4}}>
                    <div className="headerList">
                        <Row>
                            <Col span={1}>
                                STT
                            </Col>
                            <Col span={2}>
                                Khuyến nghị
                            </Col>
                            <Col span={2}>
                                Danh mục
                            </Col>
                            <Col span={2}>
                                Cổ phiếu
                            </Col>
                            <Col span={2}>
                                SL
                            </Col>
                            <Col span={2} className="right">
                                Giá khuyến nghị
                            </Col>
                            <Col span={2} className="right">
                                Thị giá (Lãi/Lỗ)
                            </Col>
                            <Col span={2} className="right">
                                Giá cắt lỗ
                            </Col>
                            <Col span={2} className="right">
                                Giá mục tiêu
                            </Col>
                            <Col span={2} style={{paddingLeft: 15}}>
                                Ngày tạo
                            </Col>
                            <Col span={2}>
                                Trạng thái
                            </Col>
                            <Col span={3}>
                                <ReloadOutlined 
                                    onClick={reloadHistory}
                                    style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', cursor: 'pointer'}}
                                />
                            </Col>
                        </Row>
                    </div>
                    <List
                        size="small"
                        bordered
                        dataSource={lstAlertHistory}
                        className="styleListStock"
                        pagination={{
                            position:"bottom"
                        }}
                        renderItem={(item, idx) => 
                        <List.Item className="item" key={idx}>
                            <Col span={1}>
                                {idx+1}
                            </Col>
                            <Col span={2}>
                                <Tag color={item.isTypeBuySell === 1 ? '#c6dfff' : '#ffd7d8'}>
                                    <span 
                                        style={{color: item.isTypeBuySell === 1 ? '#00377b' : '#c42127', fontWeight: 500}}
                                    >
                                        {item.isTypeBuySell === 1 ? 'Mua' : 'Bán'}
                                    </span>
                                </Tag>
                            </Col>
                            <Col span={2}>
                                {"Cơ bản"}
                            </Col>
                            <Col span={2}>
                                {item.stockCode}
                            </Col>
                            <Col span={2}>
                                {common.convertTextDecimal(item.quantity)}
                            </Col>
                            <Col span={2} className="right">
                                {common.convertTextDecimal(item.priceRecommend)}
                            </Col>
                            <Col span={2} className="right">
                                {item.isTypeBuySell === 1 ? 
                                <span>
                                    <span>{common.convertTextDecimal(item.lastPrice)}</span>
                                    <span style={{color: item.percentRateLoss >= 0 ? "#18b740" : '#ff3b30'}}>
                                        ({item.percentRateLoss}%)
                                    </span>
                                </span> : "-"}
                            </Col>
                            <Col span={2} className="right">
                                {item.isTypeBuySell === 1 ? common.convertTextDecimal(item.priceCutLoss) : "-"}
                            </Col>
                            <Col span={2} className="right">
                                {item.isTypeBuySell === 1 ? common.convertTextDecimal(item.priceTarget) : "-"}
                            </Col>
                            <Col span={2} style={{paddingLeft: 15}}>
                                {common.convertDDMMYYYY(item.createDateTime)}
                            </Col>
                            <Col span={2}>
                                {
                                    {
                                        0: <span style={{color: color._ORANGE}}>Mới</span>,
                                        1: <span style={{color: "#18b740"}}>Đã gửi</span>,
                                        2: <span style={{color: color._BLACK}}>Đã đóng</span>,
                                        3: <span style={{color: color._RED}}>Xóa</span>,
                                    }[item.status]
                                }
                            </Col>
                            <Col span={3} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                {
                                    item.status !== 2 && 
                                    (item.status === 1 ?
                                        item.isTypeBuySell === 1 && <button className="btnClose" onClick={()=>onUpdateStatus(item, 2)}>Đóng trạng thái</button>
                                    :
                                        <div>
                                            <button className="btnRemove" onClick={()=>onRemoveRecommendation(item)}>Xóa</button>&nbsp;&nbsp;
                                            <button className="btnSend" onClick={()=>onSendNotify(item)}>Gửi</button>
                                        </div>
                                    )
                                }
                            </Col>
                        </List.Item>}
                    >
                    </List>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        infoUserVbos: state.indexCore['LOGIN_CORE_INTERNAL'],
        lstStock: state.indexCore['STOCKS.LIST'],
        lstAlertHistory: state.indexMaster['ALERT.ALERT.HISTORY'],
        lstAssetRecommend: state.indexMaster['GET.ASSET.RECOMMEND'],
        lstStatistic: state.indexMaster['GET.STATISTIC']
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        loginCoreInternal: (data)=> dispatch(loginCoreInternal(data)),
        getStockList: (data)=> dispatch(getStockList(data, false)),
        actionRemind: (data)=> dispatch(actionRemind(data)),
        getAlertHistory: (data)=> dispatch(getAlertHistory(data)),
        updateRemind: (data)=> dispatch(updateRemind(data)),
        sendRemind: (data)=> dispatch(sendRemind(data)),
        sendRemindSell: (data)=> dispatch(sendRemindSell(data)),
        getAssetRecommend: (data)=> dispatch(getAssetRecommend(data)),
        getStatistic: (data)=> dispatch(getStatistic(data)),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Recommendations);