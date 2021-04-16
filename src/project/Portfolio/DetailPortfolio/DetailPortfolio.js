import React, {Component} from 'react';
import {Row, Col, InputNumber, Button, List, Tooltip, Input } from 'antd';
import {InfoCircleFilled} from '@ant-design/icons';
import Loading from '../../../components/Loading/Loading';

import {connect} from 'react-redux';

import {css} from 'emotion';
import * as common from '../../../components/Common/Common';

const { TextArea } = Input;

let color = window['colors'];

const rootMain = css`
    .title{
        font-weight: 500;
        font-size: 1.8em;
        color: ${color._BLACK}
    }
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
                .borderRight{
                    border-right: 1px solid ${color._GREY_LIGHT_2};
                }
            }
        }
        
    }
    .description{
        .label{
            font-weight: 600;
            color: ${color._GREY_666}
        }
        .rootBody{
            border-radius: 0.5em;
            background-color: ${color._WHITE};
            padding: 1em;
            height: 9em;
            overflow-y: auto;
        }
        .styleInput{
            border-radius: 0.5rem;
            border: 0;
            background-color: ${color._WHITE};
            color: ${color._BLACK};
            cursor: auto;
        }
    }
    .rootMain{
        .label{
            font-weight: 600;
            color: ${color._GREY_666}
        }
        .customInput{
            border-radius: 1px solid ${color._STROKE};
            border-radius: 0.3em;
            width: 12em;
            top: 1px;
        }
        .btnCheckSum{
            font-size: 13px;
            font-weight: 600;
            color: ${color._WHITE};
            height: auto;
            width: 8em;
            border-radius: 4px;
            padding: 9px 0;
            margin-left: 1em;
            background-color: ${color._ORANGE};
            border: 1px solid ${color._ORANGE};
            &:hover{
                background-color: ${color._ORANGE_HOVER};
                border: 1px solid ${color._ORANGE_HOVER};
            }
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
        .footer{
            .right{
                float: right;
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
            .clearBoth{
                clear: both;
            }
        }
    }
`

class DetailPortfolio extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoading: false,
            lstIndexs: [],
            priceInvest: 0,
            isLoadingList: false,
            totalExpected: 0
        }
    }

    componentDidMount(){
        if(this.props._indexID){
            this.loadData();
        }
    }

    loadData = async ()=>{
        try {
            let obj = JSON.parse(localStorage.getItem('rememberSectionOrder'));
            let data = this.props.lstIndexsInvest;
            if(Object.keys(data).length > 0){
                this.setState({
                    lstIndexs: data.indexsDetail,
                    totalExpected: data.moneyInvestMin,
                    priceInvest: data.priceInvest
                });
            }else{
                if(obj){
                    if(obj.SUB_NUMBER){
                        this.setState({isLoading: true});
                        const res = await this.props.getIndexsId({
                            indexsId: this.props._indexID,
                            subNumber: obj.SUB_NUMBER
                        });
                        this.setState({isLoading: false});
                        if(res.type === 'INDEX.ID'){
                            if(res.data && res.data.indexsDetail.length > 0){
                                this.setState({lstIndexs: res.data.indexsDetail, totalExpected: res.data.moneyInvestMin, priceInvest: res.data.moneyInvestMin});
                            }
                        }
                    }
                }
            }
        } catch (error) {
            this.setState({isLoading: false});
        }
    }

    updateSelectValue = name => async(event) =>{
        this.setState({[name]: event});
    }

    onActionCheckInvest = async()=>{
        const {
            lstIndexs,
            priceInvest
        } = this.state;
        
        try {
            this.setState({isLoadingList: true});
            const res = await this.props.getFillMoney({
                money: priceInvest,
                indexsDetail: JSON.stringify(lstIndexs)
            });
            this.setState({isLoadingList: false});
            if(res.type === 'INDEX.FILL_MONEY'){
                if(res.data && res.data.indexsDetail.length > 0){
                    this.setState({lstIndexs: res.data.indexsDetail, totalExpected: res.data.moneyInvestMin});
                }
            }
        } catch (error) {
            this.setState({isLoadingList: false});
        }
    }

    onActionInvest = ()=>{
        const {
            lstIndexs,
            totalExpected,
            priceInvest
        } = this.state;

        this.props.dispatch({
            type: 'NUMBER.DETAIL.PAGE',
            data: 2
        });
        this.props.dispatch({
            type: 'LIST.INDEXS.INVEST',
            data: {
                indexsDetail: lstIndexs,
                moneyInvestMin: totalExpected,
                priceInvest: priceInvest,
                indexsId: this.props.indexIdInfo.id || '',
                status: this.props.indexIdInfo.status || 0
            }
        });
    }

    render(){
        const {
            isLoading,
            isLoadingList,
            lstIndexs,
            priceInvest,
            totalExpected
        } = this.state;

        const data = this.props.indexIdInfo;

        return(
            <Loading isLoading={isLoading}>
                <div className={rootMain}>
                    <div className="title p-top20">
                        {data.indexsName}
                    </div>
                    <div className="comHeaderRoot p-top20">
                        <div className="scroll">
                            <Row className="headerTotalStatistical">
                                <Col span={6} className="itemComp borderRight">
                                    <div className="title">SỐ TIỀN ĐẦU TƯ TỐI THIỂU</div>
                                    <div className="content">{common.convertTextDecimal(data.moneyInvestMin || 0)}</div>
                                </Col>
                                <Col span={6} className="itemComp borderRight">
                                    <div className="title">SỨC MUA TỐI THIỂU <Tooltip
                                        title={<span style={{fontSize: '0.8em'}}>
                                            Sức mua tối thiếu được tính trên cổ phiếu không được giao dịch ký quỹ (margin) tại tiểu khoản 01 - Margin
                                            Tuy nhiên, không áp dụng cho trường hợp: <br />
                                            • Hết hạn mức cho vay cổ phiếu đang có trong danh mục. <br />
                                            • Hết hạn mức margin của 1 tài khoản.
                                        </span>}
                                    >
                                            <InfoCircleFilled style={{color: color._GREY_666}}/>
                                        </Tooltip></div>
                                    <div className="content" style={{color: data.buyingPowerMin > data.moneyInvestMin ? color._GREEN: color._RED_VCSC}}>{common.convertTextDecimal(data.buyingPowerMin || 0)}</div>
                                </Col>
                                <Col span={6} className="itemComp borderRight">
                                    <div className="title">MARGIN TỐI ĐA <InfoCircleFilled style={{color: color._GREY_666}}/></div>
                                    <div className="content">{common.convertTextDecimal(data.marginMax || 0)}</div>
                                </Col>
                                <Col span={6} className="itemComp">
                                    <div className="title">SỐ CỔ PHIẾU</div>
                                    <div className="content">{common.convertTextDecimal(data.totalStock)}</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="description p-top20">
                        <div className="label">
                            Mô tả
                        </div>
                        <div className="p-top10">
                            <TextArea 
                                value={data.noted} 
                                rows={5}
                                className="styleInput"
                                disabled
                            />
                            {/* <div className="rootBody">
                                {data.noted}
                            </div> */}
                        </div>
                    </div>
                    <div className="rootMain p-top20">
                        <div className="label">
                            Số tiền bạn muốn đầu tư
                        </div>
                        <div className="p-top5">
                            <InputNumber 
                                min={0} 
                                className="customInput"
                                size="large"
                                value={priceInvest}
                                onChange={this.updateSelectValue("priceInvest")}
                                formatter={value => common.formatterNumber(value)}
                                parser={value => common.parserNumber(value)}
                                step={10}
                            />
                            <Button key="submit" className="btnCheckSum" onClick={this.onActionCheckInvest}>
                                TÍNH TOÁN
                            </Button>
                        </div>

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

                            <Loading isLoading={isLoadingList}>
                                <div className="bodyRoot">
                                    {lstIndexs.length > 0 ?
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
                                                    <span style={{fontWeight: 500}}>{item.proportionTarget}</span>
                                                </Col>
                                                <Col span={4} style={{textAlign: 'right'}}>
                                                    <span style={{fontWeight: 500}}>{common.convertTextDecimal(item.value)}</span>
                                                </Col>
                                            </List.Item>}
                                        />
                                    : null}
                                    <div className="footerTotal">
                                        <Row>
                                            <Col span={20} className="label" style={{textAlign: 'right'}}>
                                                TỔNG
                                            </Col>
                                            <Col span={4} className="total" style={{textAlign: 'right'}}>
                                                {common.convertTextDecimal(totalExpected)}
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Loading>
                        </div>
                        <div className="footer p-top20">
                            <div className="right">
                                <Button key="submit" className="btnOrder" onClick={this.onActionInvest}>
                                    {data.status === 1 ? 'ĐẦU TƯ THÊM' : 'ĐẦU TƯ NGAY'}
                                </Button>
                            </div>
                            <div className="clearBoth"></div>
                        </div>
                    </div>
                </div>
            </Loading>
        )
    }
}

const mapStateToProps = state =>{
    return{
        indexIdInfo: state.portFolio['INDEX.ID'],
        indexFillMoney: state.portFolio['INDEX.FILL_MONEY'],
        lstIndexsInvest: state.portFolio['LIST.INDEXS.INVEST'],
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (DetailPortfolio);