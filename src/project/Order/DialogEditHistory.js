import React, {useState, useEffect} from 'react';
import {Form, Modal, Button, Row, Col, Tag, List, InputNumber} from 'antd';
import * as common from '../../components/Common/Common';
import {css} from 'emotion';

let color = window['colors'];

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
        .btnReject{
            font-size: 13px;
            font-weight: 600;
            color: ${color._RED_VCSC};
            height: auto;
            width: 100%;
            padding: 8px 0;
            border-radius: 4px;
            border: 1px solid ${color._RED_VCSC};
            &:hover{
                background-color: ${color._RED_LIGHT_2};
            }
        }
    }
`

const customSelectOrderNumber = css`
    position: relative;
	top: 6px;
	color: #333333;
	font-weight: 500;
    font-size: 13px;
    .ant-input-number{
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border: 1px solid ${color._STROKE};
    }
    .btnMoney{
        left: 2px;
        border-radius: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        font-size: 11px;
        padding: 0 3px;
        top: -2px;
        background-color: ${color._STROKE};
        font-weight: 500;
        color: ${color._BLACK}
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
    
`

export default function Dialog(props) {
    // const [isVisibleMoney, setisVisibleMoney] = useState(false);
    const [priceOrder, setPriceOrder] = useState(0);

    useEffect(() => {
        setPriceOrder(props.data.orderPrice || 0);
    }, [props]);

    const handleCancel = () => {
        props.onClose();
    };

    const onActionOrderModify = (data)=>{
        props.onActionOrderModify({ ...data, priceEdit: priceOrder});
    }

    let setting = {
        ...props.config,
        ...props.data
    }

    const updateSelectValue = (event)=>{
        setPriceOrder(event);
    }

    return (
        <div>
            <Modal
                className={rootModalDialog}
                visible={setting.isOpen}
                centered={true}
                title={<div style={{fontSize: 14, color: '#333333', fontWeight: 600}}>
                            Sửa lệnh
                    </div>}
                footer={null}
                bodyStyle={styles.bodyModal}
                maskStyle={styles.modalCss}
                width='30em'
                closable={false}
            >
                <Form style={{width: '100%'}}>
                    <Form.Item>
                        <List split={false} className="bodyMain">
                            <List.Item style={{paddingLeft: 5, paddingRight: 5}}>
                                <Col span={8} className="labelLeft">
                                    Lệnh
                                </Col>
                                <Col span={16} className="labelRight">
                                    <Tag color={setting.sellBuyType === 'BUY' ? color._BLUE_VCSC_LIGHT : color._RED_VCSC_LIGHT}>
                                        <span style={{color: setting.sellBuyType === 'BUY' ? color._BLUE_VCSC : color._RED_VCSC}}>{setting.sellBuyType === 'BUY' ? 'Mua' : 'Bán'}</span>
                                    </Tag>
                                </Col>
                            </List.Item>
                            <List.Item style={{paddingLeft: 5, paddingRight: 5}}>
                                <Col span={8} className="labelLeft">
                                    Mã CP
                                </Col>
                                <Col span={16} className="labelRight">
                                    {setting.stockCode}
                                </Col>
                            </List.Item>
                            <List.Item style={{paddingLeft: 5, paddingRight: 5}}>
                                <Col span={8} className="labelLeft">
                                    Kiểu lệnh
                                </Col>
                                <Col span={16} className="labelRight">
                                    {setting.orderType}
                                </Col>
                            </List.Item>
                            <List.Item style={{paddingLeft: 5, paddingRight: 5}}>
                                <Col span={8} className="labelLeft">
                                    Số lượng
                                </Col>
                                <Col span={16} className="labelRight">
                                    {common.convertTextDecimal(setting.unmatchedQuantity)}
                                </Col>
                            </List.Item>
                            <List.Item style={{paddingLeft: 5, paddingRight: 5}}>
                                <Col span={8} className="labelLeft">
                                    Giá
                                </Col>
                                <Col span={16} className="labelRight">
                                    <span className={customSelectOrderNumber}>
                                        <InputNumber 
                                            min={0} 
                                            value={priceOrder}
                                            onChange={updateSelectValue}
                                            formatter={value => common.formatterNumber(value)}
                                            parser={value => common.parserNumber(value)}
                                        />
                                    </span>
                                </Col>
                            </List.Item>
                        </List>
                        <div className="footerRoot p-top10">
                            <div className="border-line"></div>
                            <div style={{paddingBottom: 15, textAlign: 'center'}} className="footerOrder p-top15">Quý khách có muốn sửa lệnh này không?</div>
                            <Row gutter={15} justify="center">
                                <Col md={8} xs={12}>
                                    <Button key="back" onClick={handleCancel} className="btnReject">
                                        HỦY BỎ
                                    </Button>
                                </Col>
                                <Col md={8} xs={12}>
                                    <Button key="submit" onClick={()=>onActionOrderModify(setting)} className="btnOrder">
                                        Xác nhận
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

const styles = {
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