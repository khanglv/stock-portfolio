import React, {Component} from 'react';
import {Col, Row, Input, List, Button, DatePicker, Upload, Switch, Form, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import readXlsxFile from 'read-excel-file';
import {connect} from 'react-redux';

import {
    actionIndex,
    deleteIndex,
    updateIndex
} from '../../../stores/actions/investor/indexAction';
import {actionUploadIcon} from '../../../stores/actions/investor/uploadIconAction';
import moment from 'moment';
import axios from 'axios';

import Loading from '../../../components/Loading/Loading';

import * as common from '../../../components/Common/Common';
// import BASE_URL from '../../../api/configURL';
import {css} from 'emotion';

const BASE_URL = process.env.REACT_APP_BASE_URL_INVEST;

const dateFormat = 'DD/MM/YYYY';
const { TextArea } = Input;
const newDate = new Date();
let color = window['colors'];

//const BASE_URL_CORE = "http://10.11.13.150:3000/api/v1";
const BASE_URL_CORE = "https://invest.vcsc.com.vn/api/v2";

const styles = {
    numberOtp: {
        fontSize: 14,
        color: '#67666e',
        fontWeight: 500
    },
    bodyModal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 0
    },
    modalCss: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    }
}
const rootModalDialog = css`
    .ant-modal-content{
        border-radius: 8px;
    }
    .ant-modal-content > .ant-modal-header{
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        background-color: ${color._GREY_LIGHT_1}
    }
    .ant-modal-body{
        padding: 0
    }
    .bodyMain{
        padding: 1em;
        .labelLeft{
            font-weight: 500;
            color: ${color._GREY_666};
        }
        .labelRight{
            font-weight: 600;
            color: ${color._BLACK};
        }
        .ant-list-item{
            padding: 7px 0
        }
    }
    .footerRoot{
        width: 100%;
        border-radius: 8px;
        .border-line{
            border: 1px solid ${color._GREY_LIGHT_2};
        }
        .footerOrder{
            color: ${color._BLACK};
            font-weight: 500;
        }
        .btnOrder{
            font-size: 13px;
            font-weight: 600;
            color: ${color._WHITE};
            height: auto;
            width: 100%;
            border-radius: 4px;
            padding: 8px 0;
            background-color: ${color._BLUE_VCSC};
            border: 1px solid ${color._BLUE_VCSC};
            &:hover{
                background-color: ${color._BLUE_VCSC_HOVER};
                border: 1px solid ${color._BLUE_VCSC_HOVER};
            }
        }
        .btnDone{
            font-size: 13px;
            font-weight: 600;
            background-color: ${color._BLUE_VCSC};
            color: ${color._WHITE};
            height: auto;
            width: 100%;
            padding: 8px 0;
            border-radius: 4px;
        }
        .btnReject{
            font-size: 13px;
            font-weight: 600;
            color: ${color._RED_VCSC};
            height: auto;
            width: 10em;
            padding: 8px 0;
            border-radius: 4px;
            border: 1px solid ${color._RED_VCSC};
        }
    }
`
const mainRoot = css`
    .labelHeader{
        color: ${color._BLACK};
        /* color: var(--blue);  */
        font-weight: 500;
        font-size: 1.7em;
        text-align: center;
    }
    .lableStatus {
        font-size: 13px;
        font-weight: 600;
        height: auto;
        width: 11em;
        padding: 8px 0;
        border-radius: 4px;
    }
    .lableSwitch {
        font-size: 13px;
        font-weight: 600;
        height: auto;
        padding: 8px 0;
        border-radius: 4px;
    }
    .ant-switch-checked {
        background-color: #008055
    }
    .btnImport{
        font-size: 13px;
        font-weight: 600;
        color: ${color._WHITE};
        height: auto;
        width: 8em;
        border-radius: 4px;
        padding: 9px 0;
        margin-left: 1em;
        background-color: ${color._ORANGE} !important;
        border: 1px solid ${color._ORANGE} !important;
    }
    
    .btnReject{
        font-size: 13px;
        font-weight: 600;
        color: ${color._RED_VCSC};
        height: auto;
        width: 10em;
        padding: 8px 0;
        border-radius: 4px;
        border: 1px solid ${color._RED_VCSC};
    }
    .main{
        height: 'auto';
        @media only screen and (max-width: 992px) {
            overflow: auto;
        }
        .header{
            background-color: ${color._GREY_LIGHT_2};
            padding: 1em;
            font-weight: 600;
            color: ${color._BLACK};
            border: 1px solid ${color._STROKE};
            border-top-left-radius: 0.3em;
            border-top-right-radius: 0.3em;
            @media only screen and (max-width: 992px) {
                width: 150%;
            }
        }
        .bodyRoot{
            background-color: ${color._WHITE};
            height: auto;
            border: 1px solid ${color._STROKE};
            border-top: 0;
            border-bottom-left-radius: 0.3em;
            border-bottom-right-radius: 0.3em;
            overflow: auto;
            @media only screen and (max-width: 992px) {
                width: 150%;
            }
            .styleListStock{
                border: 0;
                padding: 1rem;
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
                    padding: 1em;
                    &:hover{
                        background-color: ${color._HOVER};
                        color: ${color._BLACK}
                    }
                    .customInput{
                        border-radius: 0.3em;
                        border: 1px solid ${color._STROKE};
                    }
                    .ant-input-number-disabled{
                        background-color: ${color._GREY_LIGHT_1};
                        color: rgba(0, 0, 0, 0.65)
                    }
                }
            }
            .ant-list{
                padding: 0
            }
            .footerTotal{
                border-top: 1px solid ${color._STROKE};
                padding: 0.8em;
                .label{
                    font-size: 12px;
                    font-weight: 500;
                    color: ${color._GREY_666};
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }
                .total{
                    font-weight: 600;
                    color: ${color._BLACK};
                }
            }
        }
    }
    .body_1{
        background-color: ${color._WHITE};
        border-radius: 0.6em;
        height: auto;
        padding: 1rem;
        .left{
            width: 70%;
            float: left;
            .lable{
                font-size: 13px;
                font-weight: 600;
                color: ${color._GREY_666}
            }
            .styleInput{
                border-radius: 0.3rem;
                border: 1px solid ${color._STROKE}
            }
        }
        .right{
            width: calc(30% - 1rem);
            background-color: ${color._STROKE};
            float: right;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            height: 11.5rem;
            border-radius: 0.3rem;
            cursor: pointer;
            @media only screen and (max-width: 768px) {
                height: auto;
                padding: 1em;
                margin-top: 6em;
            }
            input[type="file"] {
                display: none!important;
            }
            &:hover{
                background-color: ${color._LIGHT_dce7f3};
            }
        }
        .clearBoth{
            clear: both;
        }
    }

    .body_2{
        .label{
            color: ${color._BLACK};
            font-weight: 600
        }
        .left{
            .rootStockCode{
                height: 70vh;
                .headerRoot{
                    background-color: ${color._GREY_LIGHT_2};
                    border: 1px solid ${color._STROKE};
                    width: 100%;
                    height: 7em;
                    padding: 1em;
                    border-top-left-radius: 0.3em;
                    border-top-right-radius: 0.3em;
                    @media only screen and (max-width: 768px) {
                        padding: 0.5em;
                        height: auto;
                    }
                    .radioOption{
                        padding: 1em;
                        padding-bottom: 0;
                        @media only screen and (max-width: 768px) {
                            padding: 0;
                            padding-top: 0.5em;
                        }
                        .ant-radio-inner{
                            border-color: ${color._STROKE};
                            &:after{
                                background-color: ${color._BLUE_VCSC};
                            }
                        }
                        .label{
                            font-weight: 500;
                        }
                    }
                }
                .styleSearch{
                    border-radius: 5em;
                    width: 100%;
                    border: 1px solid ${color._STROKE};
                    .ant-input-search-icon{
                        font-size: 1.4em;
                        color: ${color._GREY_999};
                    }
                }
                .bodyRoot{
                    background-color: ${color._WHITE};
                    height: calc(100% - 6em);
                    border: 1px solid ${color._STROKE};
                    border-top: 0;
                    border-bottom-left-radius: 0.3em;
                    border-bottom-right-radius: 0.3em;
                    padding: 1rem;
                    padding-bottom: 0;
                    overflow: auto;
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
                            &:hover{
                                background-color: ${color._HOVER};
                            }
                        }
                        .ant-pagination-item-active a{
                            color: ${color._BLUE_VCSC};
                        }
                        .ant-pagination-item-active{
                            border-color: ${color._BLUE_VCSC};
                        }
                        .ant-list-pagination{
                            margin-right: 0;
                        }
                    }
                }
            }
        }
        .swapStock{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 70vh;
            width: 100%;
            @media only screen and (max-width: 768px) {
                height: 5vh;
            }
            .iconSwap{
                color: ${color._GREY_999};
                font-size: 1.5em;
            }
        }
        .right{
            .mainLeft{
                height: 70vh;
                .headerRoot{
                    height: 3em;
                    padding-left: 1em;
                    display: flex;
                    align-items: center;
                    border-top-left-radius: 0.3em;
                    border-top-right-radius: 0.3em;
                    border: 1px solid ${color._STROKE};
                    background-color: ${color._GREY_LIGHT_2};
                    .label{
                        color: ${color._BLACK};
                        font-weight: 600
                    }
                }
                .bodyRoot{
                    background-color: ${color._WHITE};
                    height: calc(100% - 2.7em);
                    border: 1px solid ${color._STROKE};
                    border-top: 0;
                    border-bottom-left-radius: 0.3em;
                    border-bottom-right-radius: 0.3em;
                    overflow: auto;
                    .styleListStock{
                        border: 0;
                        padding: 1rem;
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
                            &:hover{
                                background-color: ${color._HOVER};
                            }
                        }
                    }
                }
            }
        }
    }

    .footer{
        display: flex;
        justify-content: flex-end;
        @media only screen and (max-width: 768px) {
            justify-content: center;
        }
        .btnOrder{
            font-size: 13px;
            font-weight: 600;
            color: ${color._WHITE};
            height: auto;
            width: 10em;
            border-radius: 4px;
            padding: 8px 0;
            margin-left: 1em;
            background-color: ${color._BLUE_VCSC};
            border: 1px solid ${color._BLUE_VCSC};
            &:hover{
                background-color: ${color._BLUE_VCSC_HOVER};
                border: 1px solid ${color._BLUE_VCSC_HOVER};
            }
        }
    }
`

class FormCreate extends Component{
    constructor(props){
        super(props);
        this.state = {
            fromDate: moment(new Date(new Date(newDate).setMonth(newDate.getMonth())), dateFormat),
            isLoading: false,
            lstIndexs: [],
            totalValueReal: 0,
            path: '',
            status: '',
            indexsName: '',
            noted: '',
            isLoadingList: false,
            active: false,
            id: '',
            notRemoveIndex: false,
            idAdminCreate: '',
            arrIndexsDetailOld: [],
            isPopup: false,
            isRemoveSuccess: false,
            isRemoveIndex: false
        }
    }

    componentWillMount(){
        // this.loadData();
        // console.log(this.props.dataTmp);
    }

    componentDidMount(){
        if(Object.keys(this.props.dataEdit).length > 0) {
            const totalValueReal = this.props.dataEdit.indexsDetail.reduce((a, b) => {
                return  a + (b.value || 0);
            }, 0);
            this.setState({
                active: (this.props.dataEdit.active === 1 ? true : false),
                totalValueReal: totalValueReal,
                indexsName: this.props.dataEdit.indexsName,
                path: this.props.dataEdit.icon,
                status: this.props.dataEdit.status,
                noted: this.props.dataEdit.noted, 
                fromDate: moment(new Date(this.props.dataEdit.createDate), dateFormat),
                lstIndexs: this.props.dataEdit.indexsDetail,
                id: this.props.dataEdit.id,
                idAdminCreate: this.props.dataEdit.idAdminCreate,
                arrIndexsDetailOld: this.props.dataEdit.arrOld || []
            });
        }
    }

    onSwitchActive = (e) => {
        this.setState({active: e})
    }

    onSubmit = async(total)=>{
        try {
            const {
                lstIndexs,
                arrIndexsDetailOld,
                fromDate,
                indexsName,
                noted,
                active,
                path,
                id
            } = this.state;
            if(indexsName === null || indexsName === '') {
                common.notify("warning", "Tên danh mục không được để trống");
            } else {
                let found_1 = arrIndexsDetailOld.filter( ( el ) => lstIndexs.map(o2 => o2.stockCode).indexOf(el.stockCode) === -1 );
                let found_2 = lstIndexs.filter( ( el ) => arrIndexsDetailOld.map(o2 => o2.stockCode).indexOf(el.stockCode) === -1 );
                let found_3 = lstIndexs.filter( ( el ) => arrIndexsDetailOld.map(o2 => o2.stockCode).indexOf(el.stockCode) > -1 );
                let found_1_Convert = found_1.length > 0 ? found_1.map((item)=>{
                    return{
                        ...item,
                        actionType: 'remove'
                    }
                }) : [];
                let found_3_Convert = found_3.length > 0 ? found_3.map((item)=>{
                    return{
                        ...item,
                        actionType: 'edit'
                    }
                }) : [];
    
                let newArr = [...found_1_Convert, ...found_2, ...found_3_Convert];
    
                if(parseFloat(total) === 100) {
                    let data = {
                        arrIndexsDetail: JSON.stringify([...newArr]),
                        indexsName: indexsName || null,
                        createDate: fromDate,
                        noted: noted || '',
                        icon: path || '',
                        active: (active ? 1: 0),
                        id: id
                    }
                    this.setState({isLoading: true});
                    const res =  (id === '') ? await this.props.actionIndex(data) : await this.props.updateIndex(data);
    
                    if(res.type === 'INDEX.POST'){
                        this.setState({isPopup: true});
                        //common.notify("success", "Tạo danh mục thành công!!!");
                        // this.props.dispatch({
                        //     type: 'NUMBER.PORTFOLIO.PAGE',
                        //     data: 1
                        // });
                    } else if (res.type === 'INDEX.PUT') {
                        this.setState({isPopup: true});
                        // common.notify("success", "Cập nhật danh mục thành công!!!");
                        // this.props.dispatch({
                        //     type: 'NUMBER.PORTFOLIO.PAGE',
                        //     data: 1
                        // });
                    }
                    this.setState({isLoading: false});
                }else{
                    common.notify("warning", "Tổng tỉ trọng phải bằng 100%");
                }
            }
        } catch (error) {
            this.setState({isLoading: false});
        }
    }

    closeModalCreateIndexSuccess = () => {
        this.setState({isPopup: false});
        this.props.dispatch({
            type: 'NUMBER.PORTFOLIO.PAGE',
            data: 1
        });
    }
    
    updateInputValue = (event)=>{
        this.setState({[event.target.name]: event.target.value});
    }

    updataInputArea = (event)=>{
        if (event.keyCode === 13) {

        }
    }

    onCancelCreate = ()=>{
        this.props.cancelCreate();
        this.props.dispatch({
            type: 'DATA_PORTFOLIO',
            data: {}
        });
    }

    onUploadImageLocal = async(e)=> {
        try {
            // this.setState({loadingUpload: true});
            const file = await e.target.files[0];
            const formData = new FormData();
            formData.append('icon', file);
            const rs = await this.props.actionUploadIcon(formData);
            // this.setState({loadingUpload: false});
            if(rs.type === 'UPLOAD.ICON') {
                this.setState({path: rs.data.path});
            }
        } catch (error) {
            
        }
    }

    checkIfDuplicateExists(v) {
        return new Set(v).size !== v.length 
    }
    
    onUploadFileProportion = async(e)=> {
        try {
            this.setState({isLoadingList: true});
            let arrData = [];
            let arrDataCheck = [];
            let arrDataCheckDuplicateStockCode = [];
            readXlsxFile(e.file.originFileObj).then(async (rows) => {
                let checkCol = {};
                let rowStock = 0;
                let checkPropotion = true;
                for (let i = 0; i < rows.length; i++) {
                    for(let y = 0; y < rows[i].length; y++) {
                        if(rows[i][y] === '#stock') {
                            checkCol.stock = y;
                            rowStock = i;
                        }
                        if(rows[i][y] === '#tyle') {
                            checkCol.tyle = y;
                        }
                    }
                    // if(typeof rows[i][0] === 'number') {
                    //     arrData.push({
                    //         stockCode: rows[i][checkCol.stock],
                    //         proportionTarget: rows[i][checkCol.tyle] * 100,
                    //     });
                    // }
                    if(rows[i][checkCol.stock] !== 'null' || typeof rows[i][checkCol.stock] !== 'undefined') {
                        if(parseFloat(rows[i][checkCol.tyle]) <= 0) {
                            checkPropotion = false;
                        } else {
                            arrDataCheckDuplicateStockCode.push(rows[i][checkCol.stock]);
                            arrDataCheck.push({
                                stockCode: rows[i][checkCol.stock],
                                proportionTarget: rows[i][checkCol.tyle] * 100,
                            });
                        }
                    }
                }

                if(!this.checkIfDuplicateExists(arrDataCheckDuplicateStockCode)) {
                    if(checkPropotion) {
                        for (let i = rowStock; i < arrDataCheck.length; i++) {
                            if(arrDataCheck[i].stockCode !== '#stock') {
                                arrData.push(arrDataCheck[i]);
                            }
                        }
                        let valueProportion = 0;
                        for (let i = 0; i < arrData.length; i++) {
                            let infoStockCode = await axios.get(`${BASE_URL_CORE}/market/stock/${arrData[i].stockCode}`);
                            arrData[i].market = infoStockCode.data.market;
                            arrData[i].companyName = infoStockCode.data.companyName;
                            arrData[i].last = infoStockCode.data.last;
                            if(arrData[i].market === 'HNX' || arrData[i].market === 'UPCOM') {
                                valueProportion = infoStockCode.data.last * 100;
                            } else {
                                valueProportion = infoStockCode.data.last * 100;
                            }
                            const rsValueProportion = valueProportion / arrData[i].proportionTarget * 100;
                            arrData[i].valueProportion = isFinite(rsValueProportion) ? rsValueProportion : 0;
                        }
                        let sortedArr = arrData.sort((a, b) => b.valueProportion - a.valueProportion);
                        let maxValueProportion = sortedArr[0].valueProportion;
                        let totalValueReal = 0;
                        for (let i = 0; i < arrData.length; i++) {
                            let value = maxValueProportion * arrData[i].proportionTarget / 100;
                            let quantity = 0;
                            if(arrData[i].market === 'HNX' || arrData[i].market === 'UPCOM') {// sàn Hà nội
                                quantity = parseInt(value / arrData[i].last / 100) *100; // làm tròn xuống 100 200 300 
                                if(quantity < 100) {
                                    quantity = 100;
                                }
                            } else { // sàn Sài gòn
                                quantity = parseInt(value / arrData[i].last / 100) *100; // làm tròn xuống 10 20 30 
                                if(quantity < 100) {
                                    quantity = 100;
                                }
                            }
                            arrData[i].quantity = quantity;
                            arrData[i].value = quantity * arrData[i].last;
                            totalValueReal += quantity * arrData[i].last;
                        }
                        this.setState({
                            lstIndexs: arrData,
                            totalValueReal: totalValueReal,
                            isLoadingList: false
                        });
                    } else {
                        this.setState({isLoadingList: false});
                        common.notify("warning", "Tỉ trọng cổ phiếu không được bằng 0");
                    }
                } else {
                    this.setState({isLoadingList: false});
                    common.notify("warning", "Cổ phiếu bị trùng");
                }
            });
        } catch (error) {
            console.log(error, "error");
        }
    }

    closeModalNotRemove = () => {
        this.setState({
            notRemoveIndex: false
        });
    }
    rejectRemove = () => {
        this.setState({
            isRemoveIndex: false
        });
    }
    onPopupRemoveIndex = (id, status) => {
        if(status === 1) {
            this.setState({
                notRemoveIndex: true
            });
        } else {
            this.setState({
                isRemoveIndex: true,
                id: id
            });
        }
    }
    
    closeModalRemoveSuccess = () => {
        this.setState({
            isRemoveSuccess: false
        });
        this.props.dispatch({
            type: 'NUMBER.PORTFOLIO.PAGE',
            data: 1
        });
    }

    onRemoveIndex = async (id) => {
        const res = await this.props.deleteIndex({id: id});
        if(res.type === 'INDEX.DELETE'){
            this.setState({
                isRemoveSuccess: true,
                isRemoveIndex: false
            });
        }
    }
    
    updateInputDate = name => async(value)=>{
        await this.setState({[name]: value});
    }

    render(){
        const {
            id,
            status,
            fromDate,
            lstIndexs,
            totalValueReal,
            isLoading,
            isLoadingList,
            noted,
            indexsName,
            active,
            isPopup,
            notRemoveIndex,
            isRemoveIndex,
            isRemoveSuccess,
            path
        } = this.state;

        const total = (lstIndexs.length > 0 ? lstIndexs.reduce((accumulator, currentValue) => {
            return accumulator + (typeof currentValue.proportionTarget === "number" ? currentValue.proportionTarget : 0);
        }, 0) : 0).toFixed(0);
        console.log(id, "id");
        return(
            <div>
                <Loading isLoading={isLoading}>
                    <div className={mainRoot}>
                        <div className="labelHeader">
                            {id === '' ? 'Tạo mới danh mục đầu tư' : 'Chi tiết danh mục'}
                        </div>
                        <div className="p-top15">
                            <div className="body_1">
                                <div className="left">
                                    <Row gutter={[10, 10]}>
                                        <Col md={5} xs={24}>
                                            <span className="lable">Tên danh mục</span>
                                        </Col>
                                        <Col md={19} xs={24}>
                                            <Input 
                                                placeholder="Danh mục đầu tư"
                                                name="indexsName"
                                                className="styleInput"
                                                value={indexsName}
                                                onChange={event => this.updateInputValue(event)}
                                            />
                                        </Col>
                                        <Col md={5} xs={24}>
                                            <span className="lable">Mô tả</span>
                                        </Col>
                                        <Col md={19} xs={24}>
                                            <TextArea 
                                                value={noted}
                                                rows={6}
                                                className="styleInput"
                                                name="noted"
                                                onChange={event => this.updateInputValue(event)}
                                                onPressEnter={event => this.updataInputArea(event)}
                                            />
                                        </Col>
                                        <Col md={5} xs={24}>
                                            <span className="lable">Ngày cập nhật</span>
                                        </Col>
                                        <Col md={19} xs={24}>
                                            <DatePicker 
                                                className="datePicker" 
                                                onChange={this.updateInputDate('fromDate')} 
                                                format={dateFormat} 
                                                value={fromDate}
                                                popupStyle={{backgroundColor: 'red'}}
                                            />
                                            
                                            <Upload 
                                                showUploadList={false}
                                                onChange={this.onUploadFileProportion}
                                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                            >
                                                <Button className="btnImport" >
                                                    <UploadOutlined style={{color: 'white'}} /> <span style={{color: 'white'}}>IMPORT</span>
                                                </Button>
                                            </Upload>
                                        </Col>
                                    </Row>
                                </div>
                                <label id="file-upload-excel" style={{ marginBottom: 16, display: 'inherit' }}>
                                    {Object.keys(path).length === 0 ? 
                                        <div className="right" >
                                            <img alt="" src="images/icons/another/ic_img.svg" />
                                            <div style={{color: color._BLUE_VCSC}}>Tải lên hình ảnh</div>
                                            <Input id="file-upload-excel" type="file" onChange={this.onUploadImageLocal} />
                                        </div>
                                        :
                                        <div className="right">
                                            <img alt="" style={{maxWidth: '100%', maxHeight: '100%'}} src={`${BASE_URL}/uploads/icon/${path}`} />
                                            <Input id="file-upload-excel" type="file" onChange={this.onUploadImageLocal} />
                                        </div>
                                    }
                                </label>
                                <div className="clearBoth"></div>
                            </div>
                        </div>
                        
                        <Loading isLoading={isLoadingList}>
                            {lstIndexs.length > 0 ?
                                <div>
                                    <div className="main p-top20">
                                        <Row className="header">
                                            <Col span={3}>
                                                Mã CP
                                            </Col>
                                            <Col span={13}>
                                                Tên cổ phiếu
                                            </Col>
                                            <Col span={4} style={{textAlign: 'right'}}>
                                                Tỷ trọng mục tiêu(%)
                                            </Col>
                                            <Col span={4} style={{textAlign: 'right'}}>
                                                Giá trị dự kiến
                                            </Col>
                                        </Row>

                                        <div className="bodyRoot">
                                            <List
                                                size="default"
                                                bordered
                                                dataSource={lstIndexs}
                                                className="styleListStock"
                                                renderItem={(item, idx) => 
                                                <List.Item className="item">
                                                    <Col span={3}>
                                                        <span style={{fontWeight: 600}}>{item.stockCode}</span>
                                                    </Col>
                                                    <Col span={13}>
                                                        <span style={{fontWeight: 500}}>{item.companyName}</span>
                                                    </Col>
                                                    <Col span={4} style={{textAlign: 'right'}}>
                                                        <span style={{fontWeight: 500}}>{(item.proportionTarget).toFixed(2)}%</span>
                                                    </Col>
                                                    <Col span={4} style={{textAlign: 'right'}}>
                                                        <span style={{fontWeight: 500}}>{common.convertTextDecimal(item.value)}</span>
                                                    </Col>
                                                </List.Item>}
                                            />
                                            <div className="footerTotal">
                                                <Row>
                                                    <Col span={16} className="label" style={{textAlign: 'right'}}>
                                                        TỔNG
                                                    </Col>
                                                    <Col span={4} className="total" style={{textAlign: 'right'}}>
                                                        {common.convertTextDecimal(total)}
                                                    </Col>
                                                    <Col span={4} className="total" style={{textAlign: 'right', fontWeight: '600', fontSize: '18px'}}>
                                                        {common.convertTextDecimal(totalValueReal)}
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="footer p-top20" style={{marginRight: '-60px'}}>
                                        <span className="lableStatus">Trạng thái</span>
                                        <span className="lableSwitch">
                                            <Switch checked={active} onChange={this.onSwitchActive} />&nbsp;
                                        </span>
                                        <span className="lableStatus">
                                            {active && 'Active'}
                                            {!active && 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            : null
                        }
                        <div onClick={this.onCancelCreate} className="footer p-top20" style={{float: 'left', cursor: 'pointer'}}>
                            <img alt=''  src='/icon/ic_arrow_back.png' />
                            <span className="detail" style={{fontWeight: 500, marginLeft: '5px', color: '#00377b'}}>
                                QUAY LẠI
                            </span>
                        </div>
                        <div className="footer p-top20">
                            {id !== '' && 
                                <Button key="back" className="btnReject" onClick={()=> this.onPopupRemoveIndex(id, status)}>
                                    XÓA
                                </Button>
                            }
                            {(lstIndexs.length > 0 || (Object.keys(this.props.dataEdit).length > 0)) &&
                                <Button key="submit" className="btnOrder" onClick={()=> this.onSubmit(total)}>
                                    Xác nhận
                                </Button>
                            }
                        </div>
                        </Loading>
                    </div>
                </Loading>

                <Modal
                    className={rootModalDialog}
                    visible={notRemoveIndex}
                    centered={true}
                    footer={null}
                    bodyStyle={styles.bodyModal}
                    maskStyle={styles.modalCss}
                    width='40em'
                    closable={false}
                >
                    <Form style={{width: '100%'}}>
                        <Form.Item>
                            <List split={false} className="bodyMain">
                                <div style={{paddingBottom: 15, textAlign: 'center', fontSize: '18px', fontWeight: '500'}} className="footerOrder p-top15">
                                    <img style={{width: '2.5em'}} alt="" src="icon/ic_warning.png"/> <br /><br />
                                    <b>{indexsName}</b> đang được đầu tư.
                                    Bạn không thể xóa danh mục này.! <br />
                                </div>
                            </List>
                            <div className="footerRoot p-top10">
                                <Row gutter={15} justify="center">
                                    <Col md={8} xs={12}>
                                        <Button key="back" onClick={this.closeModalNotRemove} className="btnDone">
                                            Đóng
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    className={rootModalDialog}
                    visible={isPopup}
                    centered={true}
                    footer={null}
                    bodyStyle={styles.bodyModal}
                    maskStyle={styles.modalCss}
                    width='40em'
                    closable={false}
                >
                    <Form style={{width: '100%'}}>
                        <Form.Item>
                            <List split={false} className="bodyMain">
                                <div style={{paddingBottom: 15, textAlign: 'center', fontSize: '18px', fontWeight: '500'}} className="footerOrder p-top15">
                                    <img style={{width: '2.5em'}} alt="" src="icon/ic_check@3x.png"/> <br /><br />
                                    
                                    {id === '' ? 'Tạo mới' : 'Cập nhật'} danh mục đầu tư thành công! <br />
                                </div>
                            </List>
                            <div className="footerRoot p-top10">
                                <Row gutter={15} justify="center">
                                    <Col md={8} xs={12}>
                                        <Button key="back" onClick={this.closeModalCreateIndexSuccess} className="btnDone">
                                            Đóng
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    className={rootModalDialog}
                    visible={isRemoveSuccess}
                    centered={true}
                    footer={null}
                    bodyStyle={styles.bodyModal}
                    maskStyle={styles.modalCss}
                    width='40em'
                    closable={false}
                >
                    <Form style={{width: '100%'}}>
                        <Form.Item>
                            <List split={false} className="bodyMain">
                                <div style={{paddingBottom: 15, textAlign: 'center', fontSize: '18px', fontWeight: '500'}} className="footerOrder p-top15">
                                    <img style={{width: '2.5em'}} alt="" src="icon/ic_delete.png"/> <br /><br />
                                    Xóa danh mục đầu tư thành công! <br />
                                </div>
                            </List>
                            <div className="footerRoot p-top10">
                                <Row gutter={15} justify="center">
                                    <Col md={8} xs={12}>
                                        <Button key="back" onClick={this.closeModalRemoveSuccess} className="btnDone">
                                            Đóng
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    className={rootModalDialog}
                    visible={isRemoveIndex}
                    centered={true}
                    footer={null}
                    bodyStyle={styles.bodyModal}
                    maskStyle={styles.modalCss}
                    width='40em'
                    closable={false}
                >
                    <Form style={{width: '100%'}}>
                        <Form.Item>
                            <List split={false} className="bodyMain">
                            <div style={{paddingBottom: 15, textAlign: 'center', fontSize: '18px', fontWeight: '500'}} className="footerOrder p-top15">
                                Bạn có chắc muốn xóa <br />
                                <b>{indexsName}</b>? <br />
                            </div>
                            </List>
                            <div className="footerRoot p-top10">
                                <Row gutter={15} justify="center">
                                    <Col md={8} xs={12}>
                                        <Button key="back" onClick={this.rejectRemove} className="btnReject">
                                            HỦY BỎ
                                        </Button>
                                    </Col>
                                    <Col md={8} xs={12}>
                                        <Button key="submit" onClick={()=> this.onRemoveIndex(id)} className="btnOrder">
                                            XÁC NHẬN
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        // indexIcon: state.portFolio['UPLOAD.ICON'],
        dataEdit: state.portFolio['DATA_PORTFOLIO']
    }
}
 
const mapDispatchToProps = dispatch =>{
    return{
        actionIndex: (data)=> dispatch(actionIndex(data)),
        deleteIndex: (data)=> dispatch(deleteIndex(data)),
        updateIndex: (data)=> dispatch(updateIndex(data)),
        actionUploadIcon: (data)=> dispatch(actionUploadIcon(data)),
        cancelCreate: ()=> dispatch({
            type: 'NUMBER.PORTFOLIO.PAGE',
            data: 1
        }),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (FormCreate);
