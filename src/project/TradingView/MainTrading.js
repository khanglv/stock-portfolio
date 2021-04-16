import React, {Component} from 'react';
import {Col, Row, List} from 'antd';
import {css} from 'emotion';
// import * as common from '../../components/Common/Common';

import {getStockList} from '../../stores/actions/core/stockListAction';
import {connect} from 'react-redux';

import {TVChartContainer} from './TradingView';
import OrderBuy from '../Order/OrderBuy';
import FirstHeaderChil from '../FirstHeaderChil';

const mainTrading_trading = css`
    height: calc(100vh - 85px);
	padding: 0;
`

const rightTrading = css`
    display: flex!important;
    @media only screen and (max-width: 992px) {
        display: block!important;
    }
    .mainOrder{
        width: calc(100% - 45px);
        @media only screen and (max-width: 992px) {
            width: 100%;
        }
    }
    .leftOptionOrder{
        width: 45px;
        background-color: #fff;
        height: calc(100vh - 85px);
        @media only screen and (max-width: 992px) {
            width: 100%;
            background-color: #fff;
            height: 45px;
        }
        .itemOptionOrder{
            display: flex!important;
            justify-content: center!important;
            align-items: center!important;
            cursor: pointer;
            width: 100%;
            height: 100%;
            @media only screen and (max-width: 992px) {
                width: 25%;
            }
            &.isActive{
                background-color: #c6dfff;
                .svg{
                    filter: invert(8%) sepia(20%) saturate(878%) hue-rotate(140deg) brightness(504%) contrast(690%);
                }
            }
            &:hover{
                background-color: #c6dfff;
            }
        }
    }
`

class MainTrading extends Component{
    constructor(props){
        super(props);
        this.state = {
            key: 0,
            codeStock: '',
            lstStockIndex: []
        }
    }
    
    componentWillMount(){
        this.loadData();
    }

    loadData = async ()=>{
        try {
            const res = await this.props.getStockList();
            if(res.data){
                if(res.data.length > 0){
                    let lstStockTmp = res.data.filter(item => item.t === 'STOCK');
                    let codeStockTmp = lstStockTmp[0].s;
                    let obj = JSON.parse(localStorage.getItem('rememberSectionOrder'));
                        if (obj) {
                            if(obj.CODE_STOCK){
                                codeStockTmp = obj.CODE_STOCK;
                            }
                            if(obj.SUB_NUMBER && obj.SUB_NUMBER === '80'){
                                lstStockTmp = res.data.filter(item => item.t === 'FUTURES');
                            }
                        }
                    if(lstStockTmp.length > 0){
                        
                        this.setState({codeStock: codeStockTmp, lstStockIndex: lstStockTmp});
                    }
                }
            }
        } catch (error) {
            
        }
    }

    onChangeCodeStock = (codeStock)=>{
        this.setState({codeStock: codeStock});
    }

    onChangeListStock = (lstStock)=>{
        this.setState({lstStockIndex: lstStock});
    }

    onClickIconAction = (stt)=> {
        this.setState({key: stt});
    }

    onReloadOrderHistory = ()=>{

    }

    render(){
        const {
            key,
            codeStock,
            lstStockIndex
        } = this.state;

        return(
            <div>
                <FirstHeaderChil />
                <Row className={mainTrading_trading}>
                    <Col xxl={18} md={17} sm={24} xs={24}>
                        <TVChartContainer />
                    </Col>
                    <Col xxl={6} md={7} sm={24} xs={24} className={rightTrading}>
                        <div className="mainOrder">
                            <OrderBuy 
                                codeStock={codeStock} 
                                lstStockIndex={lstStockIndex} 
                                _onChangeCodeStock={this.onChangeCodeStock} 
                                _onChangeListStock={this.onChangeListStock}
                                componentEvent={this.props.componentEvent}
                                _onReloadOrderHistory={this.onReloadOrderHistory}
                            />
                        </div>
                        <div className="leftOptionOrder">
                            <List>
                                <Row>
                                    <List.Item 
                                        className={key === 0 ? "itemOptionOrder isActive" : "itemOptionOrder"}
                                        onClick={()=> this.onClickIconAction(0)}
                                    >
                                        <img alt="" className="svg" src="./images/toolbar/ic_watchlist.svg" />
                                    </List.Item>
                                    <List.Item
                                        className={key === 1 ? "itemOptionOrder isActive" : "itemOptionOrder"}
                                        onClick={()=> this.onClickIconAction(1)}
                                    >
                                        <img alt="" className="svg" src="./images/toolbar/ic_alert.svg" />
                                    </List.Item>
                                    <List.Item 
                                        className={key === 2 ? "itemOptionOrder isActive" : "itemOptionOrder"}
                                        onClick={()=> this.onClickIconAction(2)}
                                    >
                                        <img alt="" className="svg" src="./images/toolbar/ic_info.svg" />
                                    </List.Item>
                                    <List.Item 
                                        className={key === 3 ? "itemOptionOrder isActive" : "itemOptionOrder"}
                                        onClick={()=> this.onClickIconAction(3)}
                                    >
                                        <img alt="" className="svg" src="./images/toolbar/ic_khop_lenh.svg" />
                                    </List.Item>
                                </Row>
                            </List>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        lstStock: state.indexCore['STOCKS.LIST']
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getStockList: ()=> dispatch(getStockList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (MainTrading);