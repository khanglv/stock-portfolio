import React, {Component} from 'react';
import {Select, Col, Row, Table, Tabs, Popconfirm, Tag } from 'antd';
import { ExclamationCircleOutlined, ReloadOutlined } from '@ant-design/icons';

import DialogEditHistory from './DialogEditHistory';

import {connect} from 'react-redux';
import {
    getEquityOrderHistory, 
    equityOrderCancel, 
    equityOrderModify, 
    equityOrder
} from '../../stores/actions/core/equityOrderAction';

import {css} from 'emotion';
import * as common from '../../components/Common/Common';

const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
// const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

const { Option } = Select;
const { TabPane } = Tabs;

const rootMain = css`
    position: relative;
    .refreshIcon{
        position: absolute;
        right: 0;
        top: 1em;
        cursor: pointer;
        z-index: 100;
        &:hover{
            color: #00377b;
        }
        @media only screen and (max-width: 768px) {
            top: 5em;
        }
    }
`

const customSelectOrder = css`
    width: 100%;
	top: 5px;
	color: #333333;
	font-weight: 500;
	font-size: 13px;
    .ant-select-selector{
        border: 1px solid #e3e5ec;
        border-radius: 4px!important;
    }
    &.HeaderOrder{
        width: 25rem;
        top: 0;
    }
`

const headerTabTrading = css`
    .ant-tabs-nav-animated{
        font-size: 14px;
        color: #666;
        font-weight: 600;
        padding-top: 5px;
        height: 40px;
    }
    .ant-tabs-tab-active{
        color: #00377b!important;
        font-weight: 600!important;
    }
    .ant-tabs-tab{
        &:hover{
            color: #00377b!important;
        }
    }
    .ant-tabs-ink-bar{
        background-color: #00377b;
    }

    .tableOrder{
        .ant-table-thead{
            font-size: 12px;
            tr{
                th{
                    font-weight: 600;
                    color: #999999;
                    background-color: #f2f2f2;
                }
            }
        }
        .ant-table-tbody{
            tr{
                td{
                    border-bottom: 0;
                }
            }
        }
        .ant-checkbox-checked .ant-checkbox-inner{
            background-color: #00377b;
            border-color: #00377b;
        }
        .ant-checkbox-inner::after{
            background-color: #00377b;
        }
        @media only screen and (max-width: 992px) {
            .ant-table{
                font-size: 12px;
            }
        }
        .hide {
            display: none;
        }
        .available{
            display: inline-block!important;
            position: absolute;
            top: 0.5em
        }
        .ant-table-row{
            &:hover{
                .hide{
                    display: inline-block;
                    position: absolute;
                    top: 0.5em
                }
            }
        }
        .actionOrder{
            width: 5em;
            @media only screen and (max-width: 992px) {
                width: 4em;
            }
        }
    }
`

class OrderHistory extends Component{
    constructor(props){
        super(props);
        this.state = {
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey')),
            currentKey: null,
            intervalValue: null,
            openDiaLog: false,
            stockCode: null,
            sellBuyType: 'Tất cả',
            dataOrderHistory: [],
            isLoading: false
        }
    }

    componentDidMount(){
        this.loadDataOrderHistory();
        // this.setIntervalDataHistory();
    }

    componentDidUpdate(prev){
        if(this.props.isReloadOrderHistory){
            this.loadDataOrderHistory();
            this.props.reloadedComponent();
        }
    }


    loadDataOrderHistory = async()=>{
        const {
            accountInfo,
            stockCode,
            sellBuyType
        } = this.state;
        try {
            let obj = JSON.parse(localStorage.getItem('rememberSectionOrder'));
            // '2020-05-22T10:00:00.000Z'
            let fromDate = common.dateToYYYYMMDD(new Date());
            this.setState({isLoading: true});
            await this.props.getEquityOrderHistory({
                accountNumber: accountInfo.userInfo.username,
                fromDate: fromDate,
                subNumber: obj ? obj.SUB_NUMBER : '00',
                stockCode: stockCode === 'Tất cả' ? null : stockCode,
                sellBuyType: sellBuyType === 'Tất cả' ? null : sellBuyType,
                lastOrderDate: null,
                lastBranchCode: null,
                lastOrderNumber: null,
                lastMatchPrice: null
            });
            this.setState({isLoading: false, openDiaLog: false});
        } catch (error) {
            this.setState({isLoading: false});
        }
    }

    updateSelectValue = name => async(event)=>{
        await this.setState({[name]: event});
        this.loadDataOrderHistory();
    }

    confirmCancelOrder = async(data) => {
        try {
            this.setState({isLoading: true});
            const res = await this.actionOrderCancelApi(data);
            this.setState({isLoading: false});
            if(res.type === 'EQUITY_ORDER.CANCEL'){
                this.setState({currentKey: ''});
                this.loadDataOrderHistory();
            }
        } catch (error) {
            this.setState({isLoading: false});
        }
    }

    actionOrderCancelApi = async (data) => {
        return await this.props.equityOrderCancel({
            accountNumber: data.accountNumber,
            subNumber: data.subNumber,
            orderNumber: data.orderNumber,
            branchCode: data.branchCode
        });
    }

    onOrderModify = async(data)=>{
        try {
            const accountBank = this.props.bankAccount.length > 0 ? this.props.bankAccount[0] : [];
            this.setState({isLoading: true});
            const res = await this.props.equityOrderModify({
                accountNumber: data.accountNumber,
                subNumber: data.subNumber,
                orderQuantity: data.unmatchedQuantity,
                orderNumber: data.orderNumber,
                branchCode: data.branchCode,
                orderPrice: data.priceEdit,
                bankCode: accountBank.bankCode || '',
                bankName: accountBank.bankName || '',
                bankAccount: accountBank.bankAccount || '',
                sellBuyType: data.sellBuyType,
                orderType: data.orderType,
                marketType: data.exchange
            });
            if(res.type === 'EQUITY_ORDER.MODIFY'){
                this.loadDataOrderHistory();
                this._onCloseDialog();
            }else{
                this.loadDataOrderHistory();
            }
        } catch (error) {
            this.setState({isLoading: false});
        }
    }

    actionOrderApi = async(data) => {
        const {
            accountInfo
        } = this.state;

        try {
            const accountBank = this.props.bankAccount.length > 0 ? this.props.bankAccount[0] : [];
            const objData = {
                "accountNumber": accountInfo.userInfo.username,
                "subNumber": data.subNumber,
                "orderQuantity": data.unmatchedQuantity,
                "orderPrice": data.priceEdit,
                "stockCode": data.stockCode,
                "bankCode": accountBank.bankCode || '',
                "bankName": accountBank.bankName || '',
                "bankAccount": accountBank.bankAccount || '',
                "sellBuyType": data.sellBuyType,
                "orderType": data.orderType,
                "securitiesType": "STOCK"
            }
            const res = await this.props.equityOrder(objData);
            if(res.type === 'EQUITY_ORDER.LIST'){
                common.notify("success", `Đặt ${data.sellBuyType === "BUY" ? 'mua' : 'bán'} thành công, vui lòng chờ khớp lệnh!!!`);
                this.loadDataOrderHistory();
            }else{
                this.setState({isLoading: false});
            }
        } catch (error) {
            this.setState({isLoading: false});
        }
    }

    _onActionOrderModify = async(data)=>{
        try {
            this.setState({isLoading: true});
            if(data.exchange === 'HOSE'){ //Sàn HOSE thì khi edit lệnh default hủy lênh sau đó thực hiện đặt 1 lệnh mới
                const res = await this.actionOrderCancelApi(data);
                if(res.type === 'EQUITY_ORDER.CANCEL'){
                    await this.actionOrderApi(data);
                }
            }else{
                this.onOrderModify(data);
            }
        } catch (error) {
            this.setState({isLoading: false});
        }
    }

    // setIntervalDataHistory = ()=>{
    //     const value = setInterval(() => {
    //         this.loadDataOrderHistory();
    //     }, 15000);
    //     this.setState({intervalValue: value});
    // }

    cancelConfirm = ()=>{
        this.setState({currentKey: ''});
    }

    setAvailable = (key)=>{
        this.setState({currentKey: key});
    }

    _onCloseDialog = ()=>{
        this.setState({openDiaLog: false});
    }

    setEditOrderHistory = (data)=>{
        let checkExchange = this._isCheckExchange(data.stockCode, this.props.lstStock);
        this.setState({openDiaLog: true, dataOrderHistory: {...data, exchange: checkExchange}});
    }

    _isCheckExchange = (stockCode, lstStock)=>{
        const idx = lstStock.findIndex(item => item.s === stockCode);
        if(idx > -1){
            return lstStock[idx].m;
        }
        return null;
    }

    render(){
        const {
            currentKey,
            openDiaLog,
            isLoading,
            dataOrderHistory
        } = this.state;

        const columns = [
            {
                title: 'Thời gian',
                dataIndex: 'orderTime',
                render: (id, record) => {
                    let isTimeValid = common.compareTimeTradeValid();
                    return(
                        <div>
                            <div>{common.stringToTimeHHMMSS(record.orderTime)}</div>
                            {(record.unmatchedQuantity > 0 && isTimeValid ) ? 
                            <span className={`hide ${currentKey === record.key ? 'available' : ''}`}>
                                <img 
                                    style={{width: '1.5em', cursor: 'pointer'}} 
                                    alt="" src="icon/ic_edit.svg"
                                    onClick={()=> this.setEditOrderHistory(record)}
                                />&nbsp;&nbsp;
                                <Popconfirm 
                                    title="Xác nhận hủy lệnh này ?" 
                                    icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                                    okText="Đồng ý" 
                                    cancelText="Hủy bỏ"
                                    onConfirm={()=> this.confirmCancelOrder(record)}
                                    onCancel={this.cancelConfirm}
                                    visible={currentKey === record.key}
                                >
                                    <span onClick={()=> this.setAvailable(record.key)}>
                                        <img style={{width: '1.5em', cursor: 'pointer'}} alt="" src="icon/ic_delete.svg"/>
                                    </span>
                                </Popconfirm>
                            </span> : null}
                        </div>
                        
                    )
                }
            },
            {
                title: 'Mã CP',
                dataIndex: 'stockCode',
            },
            {
                title: 'Mua, Bán',
                dataIndex: 'sellBuyType',
                render: sellBuyType => {
                    return(
                        <Tag color={sellBuyType === 'BUY' ? '#c6dfff' : '#ffd7d8'}><span style={{color: sellBuyType === 'BUY' ? '#00377b' : '#c42127', fontWeight: 600}}>{sellBuyType === 'BUY' ? ' Mua' : 'Bán'}</span></Tag>
                    )
                }
            },
            {
                title: 'SL Đặt',
                dataIndex: 'orderQuantity',
                render: orderQuantity => {
                    return(
                        <div>{common.convertTextDecimal(orderQuantity)}</div>
                    )
                }
            },
            {
                title: 'Giá Đặt',
                dataIndex: 'orderPrice',
                render: orderPrice => {
                    return(
                        <div>{common.convertTextDecimal(orderPrice)}</div>
                    )
                }
            },
            {
                title: 'SL Khớp',
                dataIndex: 'matchedQuantity',
                render: matchedQuantity => {
                    return(
                        <div>{common.convertTextDecimal(matchedQuantity)}</div>
                    )
                }
            },
            {
                title: 'Giá Khớp',
                dataIndex: 'matchedPrice',
                render: matchedPrice => {
                    return(
                        <div>{common.convertTextDecimal(matchedPrice)}</div>
                    )
                }
            },
            {
                title: 'Chờ khớp',
                dataIndex: 'unmatchedQuantity',
                render: unmatchedQuantity => {
                    return(
                        <div>{common.convertTextDecimal(unmatchedQuantity)}</div>
                    )
                }
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                render: (tmp, record)=>{
                    let returnStatus = common.statusOrderHistory({orderStatus: record.orderStatus, unmatchedQuantity: record.unmatchedQuantity});
                    return(
                        <div style={{color: returnStatus.color, fontWeight: 500}}>{returnStatus.status}</div>
                    )
                }
            },
        ];

        const dataTable = this.props.lstEquityHistory.length > 0 ?
            this.props.lstEquityHistory.map((item, idx)=>{
                return{
                    ...item,
                    key: idx
                }
            })
        : [];

        const lstStock = [{key: 'Tất cả', s: 'Tất cả'}, ...this.props.lstStock]

        // const rowSelection = {
        //     onChange: (selectedRowKeys, selectedRows) => {
        //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //     },
        //     onSelect: (record, selected, selectedRows) => {
        //         console.log(record, selected, selectedRows);
        //     },
        //     onSelectAll: (selected, selectedRows, changeRows) => {
        //         console.log(selected, selectedRows, changeRows);
        //     },
        //     columnWidth: 30
        // };

        return(
            <div className={rootMain}>
                <DialogEditHistory 
                    data={dataOrderHistory}
                    config={{
                        isOpen: openDiaLog
                    }}
                    onClose={this._onCloseDialog}
                    onActionOrderModify={this._onActionOrderModify}
                />
                <ReloadOutlined className="refreshIcon" onClick={this.loadDataOrderHistory}/>
                <Tabs 
                    defaultActiveKey="1" 
                    size="small" 
                    animated={false}
                    className={headerTabTrading}
                >
                    <TabPane tab="Số lệnh trong ngày" key="1">
                        <Row gutter={10}>
                            <Col xxl={4} md={8} xs={8}>
                                <Select
                                    className={customSelectOrder}
                                    showSearch
                                    placeholder="Nhập mã CP"
                                    onChange={this.updateSelectValue('stockCode')}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {lstStock.length > 0 ? lstStock.map((item, idx)=>{
                                        return(
                                            <Option key={idx} value={item.s}>
                                                {item.s}
                                            </Option>
                                        )
                                    }) 
                                    : null}
                                </Select>
                            </Col>
                            <Col xxl={4} md={8} xs={8}>
                                <Select
                                    className={customSelectOrder}
                                    showSearch
                                    placeholder="Tất cả lệnh"
                                    onChange={this.updateSelectValue('sellBuyType')}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="Tất cả">Tất cả</Option>
                                    <Option value="BUY">Mua</Option>
                                    <Option value="SELL">Bán</Option>
                                </Select>
                            </Col>
                            {/* <Col xxl={6} md={8} xs={8}>
                                <Select
                                    className={customSelectOrder}
                                    showSearch
                                    placeholder="Tất cả trạng thái"
                                    onChange={this.updateSelectValue('orderSatus')}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="full_filled">Khớp hết</Option>
                                    <Option value="wait">Chờ khớp</Option>
                                    <Option value="receipt">Tiếp nhận</Option>
                                    <Option value="reject">Đã hủy</Option>
                                    <Option value="all">Tất cả</Option>
                                </Select>
                            </Col> */}
                        </Row>
                        <div className="p-top20">
                            <Table
                                className="tableOrder"
                                columns={columns} 
                                dataSource={dataTable}
                                size={'small'}
                                // rowSelection={rowSelection}
                                scroll={{x: windowWidth < 768 ? 800 : null, y: '20em'}}
                                pagination={false}
                                loading={isLoading}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="Lịch sử lệnh dừng" key="2">
                        Content of tab 2
                    </TabPane>
                    <TabPane tab="Lịch sử đặt lệnh trước" key="3">
                        Content of tab 3
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        lstEquityHistory: state.indexCore['EQUITY_ORDER.HISTORY'],
        bankAccount: state.indexCore['BANK_ACCOUNT.LIST'],
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getEquityOrderHistory: (data)=> dispatch(getEquityOrderHistory(data)),
        equityOrderCancel: (data)=> dispatch(equityOrderCancel(data)),
        equityOrderModify: (data)=> dispatch(equityOrderModify(data)),
        equityOrder: (data)=> dispatch(equityOrder(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (OrderHistory);
