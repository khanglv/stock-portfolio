import React, {Component} from 'react';
import {Col, Row, Button, Form, Switch, List, Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import * as common from '../../../components/Common/Common';

//import moment from 'moment';
import { withRouter } from "react-router";
import {connect} from 'react-redux';
import {getListIndex, activeIndex} from '../../../stores/actions/investor/indexAction';

import Loading from '../../../components/Loading/Loading';

import {css} from 'emotion';

let color = window['colors'];
//const newDate = new Date();
//const dateFormat = 'DD/MM/YYYY';
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
        }
        .btnReject{
            font-size: 13px;
            font-weight: 600;
            color: ${color._RED_VCSC};
            height: auto;
            width: 100%;
            padding: 8px 0;
            border-radius: 4px;
            border: 1px solid ${color._RED_VCSC};
        }
    }
`

const mainTrading = css`
    .comHeaderRoot{
        @media only screen and (max-width: 992px) {
            overflow: auto;
        }
        .scroll{
            @media only screen and (max-width: 992px) {
                width: 300%;
                height: auto;
            }
            .headerTotalStatistical{
                border-radius: 8px;
                padding: 20px 0;
                background-color: ${color._WHITE};
                .itemComp{
                    padding: 0 20px;
                    word-wrap: break-word;
                    .title{
                        font-weight: 600;
                        color: ${color._GREY_999};
                        font-size: 12px
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
                .borderRight{
                    border-right: 1px solid ${color._GREY_LIGHT_2};
                }
            }
        }
        
    }
    .actionRoot{
        .left{
            float: left;
            .title{
                color: ${color._BLACK};
                font-weight: 500;
                font-size: 24px;
                @media only screen and (max-width: 992px) {
                    font-size: 18px;
                }
            }
        }
        .right{
            float: right;
            .btnCustom{
                border-radius: 4px;
                background-color: ${color._BLUE_VCSC};
                border: 1px solid ${color._BLUE_VCSC};
                padding: 0.7em;
                height: auto;
                &:hover{
                    background-color: ${color._BLUE_VCSC_HOVER};
                    border: 1px solid ${color._BLUE_VCSC_HOVER};
                }
            }
        }
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
            @media only screen and (max-width: 992px) {
                width: 150%;
            }
            .styleListStock{
                .ant-pagination-item-active a {
                    background-color: #00377b;
                    color: #ffffff;
                }
                .ant-list-pagination {
                    text-align: center;
                }
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
    .detail {
        width: 48px;
        height: 16px;
        font-family: Montserrat;
        font-size: 13px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.23;
        letter-spacing: normal;
        color: var(--blue-vcsc);
    }
    .pagination{
        display: flex;
        justify-content: center;
        align-items: center;
        .ant-pagination-item-active a{
            color: ${color._BLUE_VCSC};
        }
        .ant-pagination-item-active{
            border-color: ${color._BLUE_VCSC};
        }
        .ant-pagination-item{
            &:hover{
                border-color: ${color._BLUE_VCSC};
            }
            a{
                &:hover{
                    color: ${color._BLUE_VCSC};
                }
            }
        }
        .ant-pagination-prev, .ant-pagination-next{
            .ant-pagination-item-link{
                &:hover{
                    border-color: ${color._BLUE_VCSC};
                }
                .anticon-left, .anticon-right{
                    color: ${color._BLUE_VCSC};
                }
            }
            
        }
    }
`

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

class Portfolio extends Component{
    constructor(props){
        super(props);
        this.state = {
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey')),
            numberPage: 0,
            isOpenActive: false,
            indexsId: 0,
            isActive: 0
        }

        props.componentEvent.on("changeSubNumber", (subNumber)=>{
            this.loadData(subNumber);
        });
    }
    componentWillMount(){
        this.removeStores();
        this.loadData();
    }

    componentWillUnmount(){
        this.props.dispatch({
            type: 'DATA_PORTFOLIO',
            data: {}
        });
    }

    removeStores = ()=>{
        let arrData = ['PORTFOLIO.INFO', 'PORTFOLIO.DATA', 'UPLOAD.ICON'];
        arrData.map(item => {
            let data = {};
            if(item === 'PORTFOLIO.DATA'){
                data = [];
            }
            return this.props.dispatch({
                type: item,
                data: data
            });
        });
    }

    loadData = async()=>{
        try {
            this.setState({isLoading: true});
            await this.loadListIndexPage(0);
            this.setState({isLoading: false});
        } catch (error) {
            this.setState({isLoading: false});
        }
    }

    loadListIndexPage = async(numberPage)=> {
        try {
            this.setState({isLoading: true});
            await this.props.getListIndex(numberPage);
            this.setState({isLoading: false});
        } catch (error) {
            this.setState({isLoading: false});
        }
    }

    openFormDetail = (data) => {
        this.props.createPortfolio();
        this.props.dispatch({
            type: 'DATA_PORTFOLIO',
            data: {
                ...data,
                arrOld: data.indexsDetail.length > 0 ? data.indexsDetail.map((item)=>{
                    return{
                        ...item,
                        actionType: 'edit'
                    }
                }) : []
            }
        });
    }

    onCreatePortfolio = ()=>{
        this.props.createPortfolio();
    }
    
    openActive = (id, active) => {
        this.setState({
            isOpenActive: true,
            indexsId: id, 
            isActive: active
        });
    }

    onIndexActive = async (id, active) => {
        this.setState({isLoading: true});
        let data = {
            id: id,
            active: (active === 1 ? 0: 1)
        };
        const res = await this.props.activeIndex(data);
        if(res.type === 'INDEX.PUT'){
            this.loadData();
            common.notify("success", "Thao tác thành công!!!");
            this.setState({
                isOpenActive: false
            });
            this.props.dispatch({
                type: 'NUMBER.PORTFOLIO.PAGE',
                data: 1
            });
        }
    }

    onChangePagination = async(page, pageSize)=>{
        let numberPage = (page - 1)*pageSize;
        if(page === 1){
            numberPage = 0;
        }
        await this.setState({numberPage: numberPage});
        this.loadListIndexPage(parseInt(numberPage));
    }

    onDetailPortfolio = (info)=>{
        if(info){
            this.props.history.push(`/detail-portfolio/${info.id}`);
        }
    }

    handleCancel = () => {
        this.setState({
            isOpenActive: false,
        });
    }

    render() {
        const {
            indexsId,
            isActive,
            isLoading,
            isOpenActive
        } = this.state;

        const lstIndex = this.props.lstIndex;
        const lstDataOnlyIndex = Object.keys(lstIndex).length > 0 ? lstIndex.data : [];
        //const totalPage = Object.keys(lstIndex).length > 0 ? lstIndex.length : 0;
        return(
            <div className={mainTrading}>
                <Loading isLoading={isLoading}>
                    
                <div className="actionRoot p-top20">
                    <div className="left">
                        <span className="title">
                            {/* Danh mục đầu tư */}
                        </span>
                    </div>
                    <div className="right">
                        <Button 
                            type="primary" 
                            className="btnCustom" 
                            icon={<PlusOutlined />}
                            onClick={this.onCreatePortfolio}
                        >
                            TẠO MỚI DANH MỤC
                        </Button>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>
                {lstDataOnlyIndex.length > 0 ?
                    <div>
                        <div className="main p-top20">
                            <Row className="header">
                                <Col span={1} style={{fontWeight: 'bold'}}>
                                    ID
                                </Col>
                                <Col span={4} style={{fontWeight: 'bold'}}>
                                    Tên danh mục
                                </Col>
                                <Col span={2} style={{fontWeight: 'bold', textAlign: 'center'}}>
                                    Số CP
                                </Col>
                                <Col span={3} style={{fontWeight: 'bold'}}>
                                    Số tiền đầu tư tối thiểu
                                </Col>
                                <Col span={3} style={{fontWeight: 'bold'}}>
                                    Người tạo
                                </Col>
                                <Col span={3} style={{fontWeight: 'bold'}}>
                                    Bộ phận
                                </Col>
                                <Col span={3} style={{fontWeight: 'bold'}}>
                                    Ngày cập nhật
                                </Col>
                                <Col span={3} style={{fontWeight: 'bold'}}>
                                    Trạng thái
                                </Col>
                                <Col span={5}>

                                </Col>
                            </Row>

                            <div className="bodyRoot">
                                <List
                                    size="default"
                                    bordered
                                    pagination={{defaultPageSize: 10, size: 'small'}}
                                    dataSource={lstDataOnlyIndex}
                                    className="styleListStock"
                                    renderItem={(item, idx) => 
                                    <List.Item className="item">
                                        <Col span={1}>
                                            <span style={{fontWeight: 600}}>{common.padWithZeroes(item.id, 3)}</span>
                                        </Col>
                                        <Col span={4}>
                                            <span style={{fontWeight: 500}}>{item.indexsName}</span>
                                        </Col>
                                        <Col span={2} style={{textAlign: 'center'}}>
                                            <span style={{fontWeight: 500}}>{item.countStockCode}</span>
                                        </Col>
                                        <Col span={3} style={{textAlign: 'right'}}>
                                            <span style={{fontWeight: 500, marginRight: '15px'}}>{common.convertTextDecimal(item.moneyInvestMin)}</span>
                                        </Col>
                                        <Col span={3}>
                                            <span style={{fontWeight: 500}}>admin</span>
                                        </Col>
                                        <Col span={3}>
                                            <span style={{fontWeight: 500}}>admin</span>
                                        </Col>
                                        <Col span={3}>
                                            <span style={{fontWeight: 500}}>{common.convertDDMMYYYY(item.createDate)}</span>
                                        </Col>
                                        <Col span={3}>
                                            <span style={{fontWeight: 500}}>
                                                <span className="lableSwitch">
                                                    <Switch checked={item.active === 1 ? true: false} onChange={() => this.openActive(item.id, item.active)} />&nbsp;
                                                </span>
                                                <span className="lableStatus">
                                                    {item.active === 1 && (<span style={{color: '#008055'}}>Active</span>)}
                                                    {item.active === 0 && 'Inactive'}
                                                </span>
                                            </span>
                                        </Col>
                                        <Col span={5} style={{cursor: 'pointer'}} onClick={() => this.openFormDetail(item)}>
                                            <span className="detail" style={{fontWeight: 500, color: '#00377b'}}>
                                                Chi tiết
                                            </span>
                                            <img style={{marginLeft: '10px', marginTop: '-2px'}} alt=''  src='/icon/ic_arrow.png' />
                                        </Col>
                                    </List.Item>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                : null
                }
                </Loading>

                <Modal
                    className={rootModalDialog}
                    visible={isOpenActive}
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
                                Bạn có chắc muốn đổi trạng thái này sang <br />
                                <b>{isActive === 0 ? 'Active': 'Inactive'}</b> không?
                            </div>
                            </List>
                            <div className="footerRoot p-top10">
                                <Row gutter={15} justify="center">
                                    <Col md={8} xs={12}>
                                        <Button key="back" onClick={this.handleCancel} className="btnReject">
                                            HỦY BỎ
                                        </Button>
                                    </Col>
                                    <Col md={8} xs={12}>
                                        <Button key="submit" onClick={()=> this.onIndexActive(indexsId, isActive)} className="btnOrder">
                                            Cập nhật
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
        lstStock: state.portFolio['STOCKS.LIST'],
        bankAccount: state.portFolio['BANK_ACCOUNT.LIST'],
        dataProfitLoss: state.portFolio['EQUITY_ACCOUNT.PROFIT_LOSS'],
        //dataAssetInfo: state.portFolio['EQUITY_ACCOUNT.ASSET_INFO'],
        lstIndex: state.portFolio['INDEX.GET'],
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        activeIndex: (data)=> dispatch(activeIndex(data)),
        getListIndex: (data)=> dispatch(getListIndex(data)),
        createPortfolio: ()=> dispatch({
            type: 'NUMBER.PORTFOLIO.PAGE',
            data: 2
        }),
        dispatch
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Portfolio));