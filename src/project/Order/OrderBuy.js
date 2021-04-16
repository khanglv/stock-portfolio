import React, {Component} from 'react';
import {Row, Col, List, Select, InputNumber, Button, Switch, Tooltip } from 'antd';
import {InfoCircleFilled} from '@ant-design/icons';

import * as common from '../../components/Common/Common';
import * as storage from '../../api/storage';

import {debounce} from 'lodash';
import {css} from 'emotion';

import {getAccountBuyAble} from '../../stores/actions/core/accountBuyAbleAction';
import {getAccountSellAble} from '../../stores/actions/core/accountSellAbleAction';
import {equityOrder} from '../../stores/actions/core/equityOrderAction';
import {getBankAccount} from '../../stores/actions/core/bankAccountAction';
import Dialog from './Dialog';
import * as socket from '../Socket/Socket';

import {connect} from 'react-redux';

const { Option } = Select;
let color = window['colors'];

const mainOrder = css`
    width: 100%;
	padding-left: 10px;
    height: 100%;
    /* @media only screen and (max-width: 768px) {
        margin-top: 20px;
        width: 100%;
        padding: 0 5px 10px 5px;
        height: 100%;
    } */
    @media only screen and (max-width: 992px) {
        margin-top: 20px;
        width: 100%;
        padding: 0 5px 10px 5px;
        height: 100%;
    }
    .btnHeaderComponent{
        .btn-tab-order{
            background-color: ${color._LIGHT_dce7f3};
            width: 100%;
            border-radius: 0;
            font-size: 13px;
            font-weight: 600;
            font-size: 13px;
            font-weight: 600;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            color: ${color._BLUE_VCSC};
            border: 1px solid ${color._BLUE_VCSC};
            &:hover {
                background-color: #cddef0;
                color: ${color._BLUE_VCSC};
                border: 1px solid ${color._BLUE_VCSC};
            }
            &.isActive {
                background-color: ${color._BLUE_VCSC};
                color: ${color._WHITE};
                border: 1px solid ${color._BLUE_VCSC};
                width: 100%;
                border-radius: 0;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
                &:focus{
                    background-color: ${color._BLUE_VCSC};
                    color: ${color._WHITE};
                    border: 1px solid ${color._BLUE_VCSC};
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                }
                &.sell {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    background-color: ${color._RED_VCSC};
                    border: 1px solid ${color._RED_VCSC};
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
            }
        }

        .btn-tab-sale{
            background-color: #fdf3f2;
            width: 100%;
            border-radius: 0;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            color: ${color._RED_VCSC};
            font-size: 13px;
            font-weight: 600;
            border: 1px solid ${color._RED_VCSC};
            &:hover{
                background-color: ${color._RED_VCSC_HOVER};
                border: 1px solid ${color._RED_VCSC};
                color: ${color._RED_VCSC};
            }
        }
    }
    .isWarning{
        color: ${color._RED_VCSC}!important;
    }
`;

const customSelectOrder = css`
    width: 100%;
	top: 5px;
	color: #333333;
	font-weight: 500;
	font-size: 13px;
    .ant-select-selector{
        border: 1px solid #e3e5ec!important;
        border-radius: 4px!important;
    }
`

const customSelectOrderNumber = css`
    position: relative;
    width: 100%;
	top: 6px;
	color: #333333;
	font-weight: 500;
    font-size: 13px;
    .ant-input-number{
        width: calc(100% - 20px);
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border: 1px solid #e3e5ec;
    }
    .btnMoney{
        left: 2px;
        border-radius: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        font-size: 11px;
        padding: 0 3px;
        top: -2px;
        background-color: #e3e5ec;
        font-weight: 500;
        color: #333333
    }
    .formInputNumber{
        position: absolute;
        top: 30px;
        right: 0;
        background-color: #fff;
        height: 'auto';
        width: 100%;
        border-radius: 5px;
        box-shadow: 0 4px 10px 0 rgba(0, 55, 123, 0.05);
        z-index: 1000;
        &.isBlock{
            display: none
        }
        .ant-list-footer{
            padding-top: 0;
            padding-bottom: 5px;
        }
        .ant-list-header{
            padding-top: 5px;
            padding-bottom: 0;
        }
    }
    .isWarning{
        border: 1px solid ${color._RED_VCSC}!important;
    }
    
`

const customSelectOrderNumberRoot = css`
    position: relative;
    width: 100%;
	top: 6px;
	color: #333333;
	font-weight: 500;
    font-size: 13px;
    .ant-input-number{
        width: 100%;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border: 1px solid #e3e5ec;
    }
    .isWarning{
        border: 1px solid ${color._RED_VCSC}!important;
    }
`

const lstTypeOfCommand = (exchange)=>{
    switch(exchange){
        case 'HOSE':
            return ['LO', 'ATO', 'MP', 'ATC'];
        case 'HNX':
            return ['LO', 'MTL', 'ATC', 'MAK', 'MOK', 'PLO'];
        case 'UPCOM':
            return ['LO'];
        default:
            return [];
    }
}

class OrderBuy extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 0,
            isSelected: 1,
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey')),
            isVisibleMoney: false,
            codeStock: '',
            lstStock: [],
            subNumber: '',
            typeOfOrder: 1,
            typeCommand: '',
            lstTypeOfCommand: [],
            priceOrder: 0,
            quantity: 0,
            isLoadingBuy: false,
            isWarning: 0,
            openDiaLog: false,
            stockSellObj: {},
            isOrderQuick: true,
            ceilingPrice: 0,
            floorPrice: 0
        }

        props.componentEvent.on("changeSubNumber", (subNumber)=>{
            this.actionUpdateSubNumber(subNumber);
        });
        props.componentEvent.on("changeStockCode", (obj)=>{
            this.setState({
                priceOrder: obj.last,
                ceilingPrice: obj.ceilingPrice,
                floorPrice: obj.floorPrice,
            });
            this.checkAccountBuySellAble();
        });

        this.props_master = this.props;
    }

    componentWillMount(){
        const op = JSON.parse(localStorage.getItem('rememberOrderQuick'));
        if(op !== null){
            this.setState({isOrderQuick: op});
        }
    }

    async componentDidMount(){
        const{
            accountInfo
        } = this.state;

        if(accountInfo){
            await this.setState({subNumber: accountInfo.userInfo.accounts[0].accountSubs[0].subNumber});
            await this.getBankAccountInv();
        }

        let obj = JSON.parse(localStorage.getItem('rememberSectionOrder'));
        if (obj) {
            if(obj.CODE_STOCKo){
                this.setState({ codeStock: obj.CODE_STOCK});
            }
            if(obj.SUB_NUMBER){
                this.setState({ subNumber: obj.SUB_NUMBER });
            }
        }
    }

    componentDidUpdate(prev){
        try {
            if(prev.codeStock !== this.props.codeStock){
                const lstStock = [...this.props.lstStockIndex];
                const idx = lstStock.findIndex(x => x.s === this.props.codeStock);
                if(idx > -1){
                    const lstTmp = lstTypeOfCommand(lstStock[idx].m);
                    this.setState({lstTypeOfCommand : lstTmp, typeCommand: lstTmp[0]});
                }
                this.setState({codeStock: this.props.codeStock, lstStock: this.props.lstStockIndex});
            }
        } catch (error) {
            
        }
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    onClickIconAction = (stt)=> {
        this.setState({key: stt});
    }

    optionOrder = async(option)=>{
        const {
            isSelected
        } = this.state;
        if(option !== isSelected){
            await this.setState({isSelected: option});
            this.checkAccountBuySellAble();
        }
    }

    activeModalMoney = ()=>{
        this.setState( prevState => ({
            isVisibleMoney: prevState.isVisibleMoney
        }));
    }

    updateSelectValue = name => async(event)=>{
        const {
            subNumber,
            codeStock
        } = this.state;
        this.setState({isWarning: 0});
        if(name === 'codeStock'){
            socket.disconectChanel(codeStock);
            this.props._onChangeCodeStock(event);
            storage.rememberSectionOrder(JSON.stringify({CODE_STOCK: event, SUB_NUMBER: subNumber}));
        }

        //check account buy able
        if(name === 'subNumber' || name === 'codeStock' || name === 'priceOrder' || name === 'quantity'){
            this.checkAccountBuySellAble();
        }
        if(name === 'priceOrder'){
            this.checkPriceOrder(event);
        }
        await this.setState({[name]: event});
    }

    checkSellAble = (stockCode)=>{
        this.setState({stockSellObj: {}});
        const lstStockSell = [...this.props.accountSellAble];
        const idx = lstStockSell.findIndex(item => item.stockCode === stockCode);
        if(idx > -1){
            this.setState({stockSellObj: lstStockSell[idx]});
        }
    }

    onChangeOrderQuick = (checked)=>{
        this.setState({isOrderQuick: !checked});
        storage.rememberOrderQuick(JSON.stringify(!checked));
    }

    updateSubNumberValue = async(event)=>{
        //Gửi sự kiện change subNumber
        
        this.props_master.componentEvent.fire("changeSubNumber", true, event);
        await this.actionUpdateSubNumber(event);
        //reload lại lịch sử giao dịch của tiểu khoản
        this.props._onReloadOrderHistory();
        this.checkAccountBuySellAble();
    }

    actionUpdateSubNumber = async (event)=>{
        const {
            subNumber,
            codeStock
        } = this.state;

        if(subNumber === '00' || subNumber === '01' || subNumber === '02'){
            if(event === '80'){
                let lstDerivative = this.props.lstStock.length > 0 ? this.props.lstStock.filter(item => item.t === 'FUTURES') : [];
                if(lstDerivative.length > 0){
                    this.props._onChangeCodeStock(lstDerivative[0].s);
                    storage.rememberSectionOrder(JSON.stringify({CODE_STOCK: lstDerivative[0].s, SUB_NUMBER: event}));
                }
                this.props._onChangeListStock(lstDerivative);
            }else{
                storage.rememberSectionOrder(JSON.stringify({CODE_STOCK: codeStock, SUB_NUMBER: event}));
            }
        }else{
            if(event === '00' || event === '01' || subNumber === '02'){
                let lstDerivative = this.props.lstStock.length > 0 ? this.props.lstStock.filter(item => item.t === 'STOCK') : [];
                if(lstDerivative.length > 0){
                    this.props._onChangeCodeStock(lstDerivative[0].s);
                    storage.rememberSectionOrder(JSON.stringify({CODE_STOCK: lstDerivative[0].s, SUB_NUMBER: event}));
                }
                this.props._onChangeListStock(lstDerivative);
            }else{
                storage.rememberSectionOrder(JSON.stringify({CODE_STOCK: codeStock, SUB_NUMBER: event}));
            }
        }
        await this.setState({subNumber: event, isWarning: 0});
    }

    getBankAccountInv = async()=> {
        const {
            accountInfo,
            subNumber
        } = this.state;
        try {
            await this.props.getBankAccount({
                accountNumber: accountInfo.userInfo.username,
                subNumber: subNumber
            });
        } catch (error) {
            
        }
    }

    checkPriceOrder = debounce(async(event)=> {
        try {
            const{
                ceilingPrice,
                floorPrice
            } = this.state;

            if(parseFloat(event) < floorPrice){
                this.setState({isWarning: 2}); //Giá thấp hơn giá sàn
            }
            if(parseFloat(event) > ceilingPrice){
                this.setState({isWarning: 3}); //Giá cao hơn giá trần
            }
        } catch (error) {
            
        }
    }, 500);

    checkAccountBuySellAble = debounce(async()=> {
        try {
            const {
                accountInfo,
                subNumber,
                priceOrder,
                quantity,
                isSelected,
                codeStock
            } = this.state;

            if(subNumber && priceOrder > 0){
                if(isSelected === 1){
                    await this.props.getAccountBuyAble({
                        accountNumber: accountInfo.userInfo.username,
                        orderPrice: priceOrder,
                        orderQuantity: quantity,
                        subNumber: subNumber
                    });
                }
                if(isSelected === 2){
                    await this.props.getAccountSellAble({
                        accountNumber: accountInfo.userInfo.username,
                        orderPrice: priceOrder,
                        subNumber: subNumber
                    });
                    this.checkSellAble(codeStock);
                }
            }
        } catch (error) {
            
        }
    }, 500);

    onHandleBuy = async(typeSelect)=>{
        const {
            quantity,
            stockSellObj,
            isOrderQuick,
            isWarning
        } = this.state;

        const accountBuyAble = this.props.accountBuyAble;
        let maxQuantity = 0;
        if(typeSelect === 1 && accountBuyAble.buyableQuantity){
            maxQuantity = accountBuyAble.buyableQuantity;
        }
        if(typeSelect === 2 && stockSellObj){
            maxQuantity = stockSellObj.sellableQuantity;
        }

        if(quantity <= 0 || quantity >= maxQuantity){
            this.setState({isWarning: 1});
        }else{
            if(isWarning === 0){
                if(isOrderQuick){ //cần xác nhận mới được đặt mua, bán
                    this.setState({openDiaLog: true});
                }else{
                    this.actionOrderApi();
                }
            }
        }
    }

    actionOrderApi = async() => {
        const {
            accountInfo,
            codeStock,
            subNumber,
            quantity,
            priceOrder,
            typeCommand,
            isSelected
        } = this.state;

        try {
            const accountBank = this.props.bankAccount.length > 0 ? this.props.bankAccount[0] : [];
            let typeBuySell = 'BUY';
            if(isSelected === 2){
                typeBuySell = 'SELL';
            }
            this.setState({isLoadingBuy: true});
            const data = {
                "accountNumber": accountInfo.userInfo.username,
                "subNumber": subNumber,
                "orderQuantity":quantity,
                "orderPrice": priceOrder,
                "stockCode": codeStock,
                "bankCode": accountBank.bankCode || '',
                "bankName": accountBank.bankName || '',
                "bankAccount": accountBank.bankAccount || '',
                "sellBuyType": typeBuySell,
                "orderType": typeCommand,
                "securitiesType": "STOCK"
            }
            const res = await this.props.equityOrder(data);
            if(res.type === 'EQUITY_ORDER.LIST'){
                this.setState(
                    {
                        isLoadingBuy: false,
                        openDiaLog: false,
                        quantity: 0
                    });
                    this.props._onReloadOrderHistory();
                common.notify("success", `Đặt ${typeBuySell === 'BUY' ? 'mua' : 'bán'} thành công, vui lòng chờ khớp lệnh!!!`);
            }
        } catch (error) {
            this.setState({isLoadingBuy: false});
        }
    }

    _onCloseDialog = ()=>{
        this.setState({openDiaLog: false});
    }

    render(){
        const {
            isSelected,
            accountInfo,
            isVisibleMoney,
            codeStock,
            subNumber,
            typeOfOrder,
            typeCommand,
            lstTypeOfCommand,
            priceOrder,
            lstStock,
            quantity,
            isLoadingBuy,
            isWarning,
            openDiaLog,
            stockSellObj,
            isOrderQuick
        } = this.state;

        //00: -TK: thường, 01: TK margin, 80: TK phái sinh
        const lstSubNumber = accountInfo ? accountInfo.userInfo.accounts[0].accountSubs : [];

        const accountBuyAble = this.props.accountBuyAble;
        const accountSellAble = this.props.accountSellAble;

        const data = [
            {
                key: 0,
                price: 12.1242,
                index: '7%'
            },
            {
                key: 1,
                price: 17.122,
                index: '7%'
            },
            {
                key: 2,
                price: 17.122,
                index: '7%'
            },
            {
                key: 3,
                price: 17.122,
                index: '7%'
            },
            {
                key: 4,
                price: 17.122,
                index: '7%'
            }
        ]

        return(
            <Row>
                <Dialog 
                    data={{
                        COMMAND: isSelected,
                        STOCK_CODE: codeStock,
                        TYPE_COMMAND: typeCommand,
                        QUANTITY: quantity,
                        PRICE_ORDER: priceOrder
                    }}
                    config={{
                        isOpen: openDiaLog,
                        isLoading: isLoadingBuy
                    }}
                    onActionBuy={this.actionOrderApi}
                    onClose={this._onCloseDialog}
                />
                <div className={mainOrder}>
                    <Row style={styles.rootOrder} gutter={10}>
                        <Col span={12} className="p-top5">
                            <Select
                                className={customSelectOrder}
                                style={{top: 0}}
                                showSearch
                                value={typeOfOrder}
                                optionFilterProp="children"
                                onChange={this.updateSelectValue('typeOfOrder')}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value={1}>Lệnh thường</Option>
                                <Option value={2}>Lệnh dừng MP</Option>
                                <Option value={3}>Lệnh dừng G.Hạn</Option>
                                <Option value={4}>Lệnh đặt trước</Option>
                            </Select>
                        </Col>
                        <Col span={12} className="btnHeaderComponent p-top5">
                            <Row>
                                <Col span={12}>
                                    <Button className={isSelected === 1 ? "btn-tab-order isActive" : "btn-tab-order"} onClick={()=>this.optionOrder(1)}>
                                        MUA
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button className={isSelected === 2 ? "btn-tab-order isActive sell" : "btn-tab-sale"} onClick={()=>this.optionOrder(2)}>
                                        BÁN
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                       
                        <List style={{width: '100%'}} split={false}>

                            {
                                isSelected === 1 ? 
                                    <List.Item style={{paddingLeft: 5, paddingRight: 5}}>
                                        <span style={styles.labelTitle}>
                                            Mã Cổ phiếu
                                        </span> <br />
                                        <Select
                                            className={customSelectOrder}
                                            showSearch
                                            placeholder="Chọn mã cổ phiếu"
                                            onChange={this.updateSelectValue('codeStock')}
                                            value={codeStock}
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {lstStock.length > 0 ? lstStock.map((item, idx)=>{
                                                return(
                                                    <Option key={idx} value={item.s}>
                                                        {`${item.s} - ${item.n1}`}
                                                    </Option>
                                                )
                                            }) 
                                            : null}
                                        </Select>
                                    </List.Item>
                                :
                                    <List.Item style={{paddingLeft: 5, paddingRight: 5}}>
                                        <span style={styles.labelTitle}>
                                            Mã Cổ phiếu
                                        </span> <br />
                                        <Select
                                            className={customSelectOrder}
                                            showSearch
                                            placeholder="Chọn mã cổ phiếu"
                                            onChange={this.updateSelectValue('codeStock')}
                                            value={codeStock}
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {accountSellAble.length > 0 ? accountSellAble.map((item, idx)=>{
                                                return(
                                                    <Option key={idx} value={item.stockCode}>
                                                        {item.stockCode}
                                                    </Option>
                                                )
                                            }) 
                                            : null}
                                        </Select>
                                    </List.Item>
                            }
                            
                                
                            <List.Item className="p-top10">
                                <Col span={12}>
                                    <span style={styles.labelTitle}>
                                        Tiểu khoản
                                    </span> <br />
                                    <Select
                                        className={customSelectOrder}
                                        showSearch
                                        placeholder="Chọn tiểu khoản"
                                        value={subNumber}
                                        onChange={this.updateSubNumberValue}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {lstSubNumber.length > 0 ? lstSubNumber.map((item, idx)=>{
                                            return(
                                                <Option key={idx} value={item.subNumber}>
                                                    {`${item.subNumber} (${item.subNumber === '00' ? 'Thường' : (item.subNumber === '01' ? 'Margin' : 'Phái sinh')})`}
                                                </Option>
                                            )
                                        }) 
                                    : null}
                                    </Select>
                                </Col>
                                <Col span={12}>
                                    {
                                        isSelected === 1 ? 
                                            <div>
                                                <span style={{...styles.labelTitle, ...{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}}>
                                                    Sức mua&nbsp;
                                                    <Tooltip placement="bottomRight" overlayStyle={{width: '100%'}} title={<span style={{fontSize: '0.8em'}}>
                                                        <div style={{fontWeight: 600}}>
                                                            Thông tin sức mua
                                                        </div>
                                                        <div className="p-top10">
                                                            <Row>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    Tài sản định giá
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(accountBuyAble.assetValuationAmount)}
                                                                </Col>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    Tiền gửi
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(accountBuyAble.depositAmount)}
                                                                </Col>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    Sức mua
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(accountBuyAble.buyingPower)}
                                                                </Col>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    Bảo lãnh
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(accountBuyAble.virtualDepositAmount)}
                                                                </Col>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    Hạn mức margin
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(accountBuyAble.marginLimitation)}
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        </span>}
                                                    >
                                                        <InfoCircleFilled style={{color: color._GREY_666}}/>
                                                    </Tooltip>
                                                </span>
                                                <span style={{color: color._BLACK, fontSize: 15, fontWeight: 600, display: 'flex', justifyContent: 'flex-end'}}>
                                                    {common.convertTextDecimal(accountBuyAble.buyingPower || 0)}
                                                </span>
                                            </div>
                                        :
                                            <div>
                                                <span style={{...styles.labelTitle, ...{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}}>
                                                    SL có thể bán&nbsp;
                                                    <Tooltip placement="bottomRight" overlayStyle={{width: '100%'}} title={<span style={{fontSize: '0.8em'}}>
                                                        <div style={{fontWeight: 600}}>
                                                            Thông tin Tài Khoản
                                                        </div>
                                                        <div className="p-top10">
                                                            <Row>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    Mã CK
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {codeStock}
                                                                </Col>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    Số dư CK
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(stockSellObj.balanceQuantity)}
                                                                </Col>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    KL có thể bán
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(stockSellObj.sellableQuantity)}
                                                                </Col>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    CK mua T1
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(stockSellObj.todayBuy)}
                                                                </Col>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    CK bán T1
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(stockSellObj.todaySell)}
                                                                </Col>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    CK mua T2
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(stockSellObj.t1Buy)}
                                                                </Col>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    CK bán T2
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(stockSellObj.t1Sell)}
                                                                </Col>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    CK mua T3
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(stockSellObj.t2Buy)}
                                                                </Col>
                                                                <Col span={12} style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                                                    CK bán T3
                                                                </Col>
                                                                <Col span={12} style={{textAlign: 'right'}}>
                                                                    {common.convertTextDecimal(stockSellObj.t2Sell)}
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        </span>}
                                                    >
                                                        <InfoCircleFilled style={{color: color._GREY_666}}/>
                                                    </Tooltip>
                                                </span>
                                                <span style={{color: color._BLACK, fontSize: 15, fontWeight: 600, display: 'flex', justifyContent: 'flex-end'}}>
                                                    {common.convertTextDecimal(stockSellObj.sellableQuantity || 0)}
                                                </span>
                                            </div>
                                    }
                                </Col>
                            </List.Item>

                            <List.Item>
                                <Col span={12}>
                                    <span style={styles.labelTitle} className={(isWarning === 2 || isWarning === 3) ? "isWarning" : ""}>
                                        Giá
                                    </span> <br />
                                    <span className={customSelectOrderNumber}>
                                        <InputNumber 
                                            className={(isWarning === 2 || isWarning === 3) ? "isWarning" : ""}
                                            min={0} 
                                            value={priceOrder}
                                            onChange={this.updateSelectValue("priceOrder")}
                                            formatter={value => common.formatterNumber(value)}
                                            parser={value => common.parserNumber(value)}
                                            step={10}
                                        />
                                        <Button className="btnMoney" onClick={this.activeModalMoney}>đ</Button>
                                        <div style={{position: 'relative'}}>
                                            {<span style={{fontSize: 12, color: color._RED_VCSC, position: 'absolute', left: 0}}>
                                                {isWarning === 2 ? 'Giá phải lớn hơn giá sàn' : (isWarning === 3 ? 'Giá phải thấp hơn giá trần' : null)}
                                            </span>}
                                        </div>
                                        <div className={`formInputNumber ${!isVisibleMoney ? 'isBlock' : ''}`}>
                                            <List
                                                header={<div style={{textAlign: 'center', color: color._GREEN}}>17.555</div>}
                                                footer={<div style={{textAlign: 'center', color: color._RED_VCSC}}>17.0000</div>}
                                                dataSource={data}
                                                size="small"
                                                split={false}
                                                renderItem={item => 
                                                    <List.Item>
                                                        <Col span={14}>
                                                            <span style={{color: color._GREEN}}>{item.price}</span>
                                                        </Col>
                                                        <Col span={10}>
                                                            {item.index}
                                                        </Col>
                                                    </List.Item>}
                                            />
                                        </div>
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <span style={styles.labelTitle}>
                                        Kiểu lệnh
                                    </span> <br />
                                    <Select
                                        className={customSelectOrder}
                                        showSearch
                                        value={typeCommand}
                                        onChange={this.updateSelectValue('typeCommand')}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {lstTypeOfCommand.length > 0 ? lstTypeOfCommand.map((item, idx)=>{
                                            return(
                                                <Option key={idx} value={item}>
                                                    {item}
                                                </Option>
                                            )
                                        }) 
                                    : null}
                                    </Select>
                                </Col>
                            </List.Item>
                            
                            <List.Item>
                                <Col span={12}>
                                    <span style={styles.labelTitle} className={isWarning === 1 ? "isWarning" : ''}>
                                        Số lượng
                                    </span> <span style={{fontSize: 13}} className={isWarning === 1 ? "isWarning" : ''}>(Tối đa {isSelected === 1 ? 
                                        common.convertTextDecimal(accountBuyAble.buyableQuantity || 0)
                                        : common.convertTextDecimal(stockSellObj.sellableQuantity || 0)
                                    })</span><br />
                                    <span className={customSelectOrderNumberRoot}>
                                        <InputNumber 
                                            min={0}
                                            value={quantity}
                                            className={isWarning === 1 ? "isWarning" : ''}
                                            onChange={this.updateSelectValue("quantity")}
                                            formatter={value => common.formatterNumber(value)}
                                            parser={value => common.parserNumber(value)}
                                            step={10}
                                        />
                                        {isWarning === 1 ? <span style={{fontSize: 12, color: color._RED_VCSC}}>Số lượng mua chưa hợp lệ</span> : null}
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <span style={{...styles.labelTitle, ...{display: 'flex', justifyContent: 'flex-end'}}}>
                                        Giá trị giao dịch
                                    </span>
                                    <span 
                                        style={{color: color._BLACK, fontSize: 15, fontWeight: 600, display: 'flex', justifyContent: 'flex-end'}}
                                    >
                                        {common.convertTextDecimal(priceOrder*quantity)}
                                    </span>
                                </Col>
                            </List.Item>
                            
                            <List.Item>
                                <Col span={12} className="customSwitch">
                                    <span style={{fontWeight: 600}}>Xác nhận</span>&nbsp;&nbsp;<Switch size="small" checked={isOrderQuick} onChange={()=>this.onChangeOrderQuick(isOrderQuick)}/>
                                </Col>
                                <Col span={12} className="p-left10">
                                    {
                                        isSelected === 1 ?
                                            <Button loading={isLoadingBuy} className="btn-order-buy" onClick={()=> this.onHandleBuy(1)}>
                                                ĐẶT MUA
                                            </Button>
                                        : 
                                            <Button loading={isLoadingBuy} className="btn-order-edit" onClick={()=> this.onHandleBuy(2)}>
                                                ĐẶT BÁN
                                            </Button>
                                    }
                                    
                                </Col>
                            </List.Item>
                        </List>
                    </Row>
                </div>
            </Row>
        )
    }
}

const mapStateToProps = state =>{
    return{
        lstStock: state.indexCore['STOCKS.LIST'],
        accountBuyAble: state.indexCore['BUY_ABLE.LIST'],
        accountSellAble: state.indexCore['SELL_ABLE.LIST'],
        bankAccount: state.indexCore['BANK_ACCOUNT.LIST'],
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getAccountBuyAble: (data)=> dispatch(getAccountBuyAble(data)),
        getAccountSellAble: (data)=> dispatch(getAccountSellAble(data)),
        equityOrder: (data)=> dispatch(equityOrder(data)),
        getBankAccount: (data)=> dispatch(getBankAccount(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (OrderBuy);

const styles = {
    rootTabs: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        margin: 0,
    },
    rootOrder: {
        marginLeft: 0,
        marginRight: 0,
        padding: 10,
        backgroundColor: color._WHITE,
        borderRadius: 8,
        height: 'auto'
    },
    labelTitle: {
        fontSize: 13,
        fontWeight: 600,
        color: color._GREY_666
    }
}