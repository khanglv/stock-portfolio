import React, {Component} from 'react';
import {Row, Col, Tabs, Pagination } from 'antd';
import {CardItemFortfolio} from './Card';
import {SwapRightOutlined} from '@ant-design/icons';
import * as common from '../../../components/Common/Common';

import {connect} from 'react-redux';

import Loading from '../../../components/Loading/Loading';

import {css} from 'emotion';

const { TabPane } = Tabs;
let color = window['colors'];
// const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;

const rootMain = css`
    height: auto;
    .header{
        .titleHead{
            font-size: 1.6em;
            font-weight: 500;
            color: ${color._BLACK};
            float: left;
        }
        .pagination{
            float: right;
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
        .clearBoth{
            clear: both;
        }
    }
    
    .rootBody{
        .ant-tabs-ink-bar{
            background-color: ${color._BLUE_VCSC};
        }
        .ant-tabs-tab{
            color: ${color._GREY_999};
            font-weight: 500;
            font-size: 1.3em;
            &:hover{
                color: ${color._BLUE_VCSC};
            }
        }
        .ant-tabs-tab-active{
            font-weight: 600;
            color: ${color._BLUE_VCSC};
        }
        .ant-tabs-content{
            .paddingItem{
                padding: 1em;
                font-weight: 500;
            }
            .itemPortfolio{
                background-color: ${color._WHITE};
                border-radius: 0.5em;
                overflow: auto;
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
    }
`

class ListPortfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            indexPage: 0,
            isLoading: false
        }
    }

    componentDidMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            await this.loadListIndexPage(0);
        } catch (error) {
            
        }
    }
    onChangePagination = async(page, pageSize)=>{
        let indexPage = (page - 1)*pageSize;
        if(page === 1){
            indexPage = 0;
        }
        await this.setState({indexPage: indexPage});
        this.loadListIndexPage(parseInt(indexPage));
    }

    render(){
        const{
            isLoading
        } = this.state;

        const data = this.props.lstIndexManagement;
        let total = Object.keys(data).length > 0 ? data.lengthIndexs : 0;
        let lstIndexs = Object.keys(data).length > 0 ? data.data.indexs : [];
        let lstInvesting = Object.keys(data).length > 0 ? data.data.investing : [];
        let lstInvested = Object.keys(data).length > 0 ? data.data.invested : [];

        return(
            <div className={rootMain}>
                <Loading isLoading={isLoading}>
                    <div className="header">
                        <div className="titleHead p-top20">
                            Danh mục đã tạo
                        </div>
                        <div className="pagination p-top20">
                            <Pagination 
                                total={total} 
                                onChange={this.onChangePagination}
                                size="small"
                                hideOnSinglePage={true}
                                pageSize={3}
                                responsive={true}
                            />
                        </div>
                        <div className="clearBoth"></div>
                    </div>
                    
                    <div className="p-top20">
                        <Row gutter={[20, 20]}>
                            {lstIndexs.length > 0 ?
                                lstIndexs.map((item, idx)=>{
                                    return(
                                        <Col key={idx} xxl={6} xl={8} md={12} xs={24}>
                                            <CardItemFortfolio data={item}/>
                                        </Col>
                                    )
                                })
                            : null}
                        </Row>
                    </div>
                    <div className="rootBody p-top20">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={`DM đang đầu tư (${lstInvesting.length})`} key="1">
                                {
                                    lstInvesting.length > 0 ?
                                        lstInvesting.map((item, idx)=>{
                                            return(
                                                <div key={idx} style={{paddingTop: idx !== 0 ? '1em' : 0}}>
                                                    <div className="itemPortfolio">
                                                        <div className="titleLabel">
                                                            {item.indexsName}
                                                        </div>
                                                        <div className="scroll">
                                                            <Row className="headerTotalStatistical">
                                                                <Col span={6} className="itemComp borderRight">
                                                                    <div className="title">TỔNG ĐẦU TƯ</div>
                                                                    <div className="content">{common.convertTextDecimal(item.value)}</div>
                                                                </Col>
                                                                <Col span={6} className="itemComp borderRight">
                                                                    <div className="title">GIÁ TT HIỆN TẠI</div>
                                                                    <div className="content">{common.convertTextDecimal(item.currentValue)}</div>
                                                                </Col>
                                                                <Col span={6} className="itemComp">
                                                                    <div className="title">GIÁ TRỊ LÃI/LỖ</div>
                                                                    <div className="content" style={{color: item.rateLossValue > 0 ? color._GREEN : color._RED_VCSC}}>{common.convertTextDecimal(item.rateLossValue)}&nbsp;({item.percentRateLoss}%)</div>
                                                                </Col>
                                                                <Col span={6} className="rightEnd">
                                                                    XEM CHI TIẾT&nbsp;<SwapRightOutlined style={{fontSize: '1.5em'}} />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    : <div className="itemPortfolio paddingItem">Chưa có mục nào!!!</div>
                                }
                            </TabPane>
                            <TabPane tab={`DM đã đầu tư (${lstInvested.length})`} key="2">
                                {
                                    lstInvested.length > 0 ?
                                        lstInvested.map((item, idx)=>{
                                            return(
                                                <div key={idx} style={{paddingTop: idx !== 0 ? '1em' : 0}}>
                                                    <div className="itemPortfolio">
                                                        <div className="titleLabel">
                                                            {item.indexsName}
                                                        </div>
                                                        <div className="scroll">
                                                            <Row className="headerTotalStatistical">
                                                                <Col span={6} className="itemComp borderRight">
                                                                    <div className="title">TỔNG ĐẦU TƯ</div>
                                                                    <div className="content">{common.convertTextDecimal(item.value)}</div>
                                                                </Col>
                                                                <Col span={6} className="itemComp borderRight">
                                                                    <div className="title">GIÁ TT HIỆN TẠI</div>
                                                                    <div className="content">{common.convertTextDecimal(item.currentValue)}</div>
                                                                </Col>
                                                                <Col span={6} className="itemComp">
                                                                    <div className="title">GIÁ TRỊ LÃI/LỖ</div>
                                                                    <div className="content" style={{color: item.rateLossValue > 0 ? color._GREEN : color._RED_VCSC}}>{common.convertTextDecimal(item.rateLossValue)}&nbsp;({item.percentRateLoss}%)</div>
                                                                </Col>
                                                                <Col span={6} className="rightEnd">
                                                                    XEM CHI TIẾT&nbsp;<SwapRightOutlined style={{fontSize: '1.5em'}} />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    : <div className="itemPortfolio paddingItem">Chưa có mục nào!!!</div>
                                }
                            </TabPane>
                        </Tabs>
                    </div>
                </Loading>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        lstIndexManagement: state.portFolio['INDEX.MANAGEMENT'],
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ListPortfolio);