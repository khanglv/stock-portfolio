import React from 'react';
import {Button, Row, Col} from 'antd';
import {DeleteOutlined, FormOutlined } from '@ant-design/icons';
import * as common from '../../../components/Common/Common';
import {css} from 'emotion';

const BASE_URL = 'http://10.11.0.113:4002/uploads/icon';
let color = window['colors'];

const rootCard = css`
    width: 100%;
    height: auto;
    border-radius: 0.6em;
    background-color: ${color._WHITE};
    position: relative;
    .bodyRoot{
        height: 18em;
        .imgCover{
            border-top-left-radius: 0.6em;
            border-top-right-radius: 0.6em;
        }
    }
    .footerRoot{
        height: auto;
        padding: 1em 1.5em;
        .content{
            color: ${color._BLACK};
            font-size: 1.3em;
            font-weight: 600
        }
        .date{
            font-size: 14px;
            font-weight: 500;
            color: ${color._BLACK}
        }
        .btnFooter{
            .btnEdit{
                border-radius: 0.3em;
                background-color: #fff2cf;
                color: ${color._ORANGE};
                width: 100%;
                padding: 0.5em;
                height: auto;
                font-weight: 600;
                border: 0;
                &:hover{
                    background-color: #faecc7;
                }
            }
            .btnDelete{
                border-radius: 0.3em;
                background-color: #f89e9e;
                color: ${color._RED_VCSC};
                width: 100%;
                padding: 0.5em;
                height: auto;
                font-weight: 600;
                border: 0;
                &:hover{
                    background-color: #f39696;
                }
            }
        }
    }
`

export function CardItemFortfolio(props){
    const data = props.data;
    return(

        <div className={rootCard}>
            <div className="bodyRoot">
                <img alt="" height="100%" width="100%" className="imgCover" src={`${BASE_URL}/${data.icon}`} />
            </div>
            <div className="footerRoot">
                <div className="content">
                    {data.indexsName}
                </div>
                <div className="p-top20">
                    <div>
                        Tạo ngày <span className="date">{common.convertDDMMYYYY(data.createDate)}</span>
                    </div>
                    <Row gutter={15} className="btnFooter p-top10">
                        <Col span={12}>
                            <Button
                                className="btnEdit"
                                icon={<FormOutlined />}
                            >
                                SỬA
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                className="btnDelete"
                                icon={<DeleteOutlined />}
                            >
                                XÓA
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
