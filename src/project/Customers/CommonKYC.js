import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { css, Global } from "emotion";
import { Steps, Tabs, Button, Avatar } from "antd";

// import { Avatar_Img, IC_Check, IC_error, IC_warning, IC_Back } from "root/assets";
import { RATIO_STATE_CUSTOMER_ONLINE, GENDER,  STEPNUM } from "../../utils";
import Persional from "./Persional";
import InfomationAccount from './InfomationAccount'
import * as R from 'ramda'

const { Step } = Steps;
const { TabPane } = Tabs;

const $ = css`
  margin-top: 50px;
  margin-bottom: 24px;
  .card_step_raking {
    background: #ffffff;
    /* Middle Grey */

    border: 1px solid #e6ebf4;
    box-sizing: border-box;
    border-radius: 4px;
    margin-top: 12px;
    margin-bottom: 12px;
    padding: 16px;
  }
  .ant-avatar > img {
    object-fit: initial;
  }
  .card-left {
    width: 100%;
    background-color: #00377b;
    border-radius: 4px;
    padding: 16px;
  }
  .avatar-img {
    width: 100%;
    border-radius: 32px;
  }
  .avatar-dsc {
    padding-left: 8px;
  }
  .row-left-side {
    display: flex;
    justify-content: space-around;
  }
  .avatar-dsc {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .avatar-name {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    /* font-size: 16px; */
    /* line-height: 19px; */
    text-transform: uppercase;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 100%;

    color: #ffffff;
  }
  .avatar-status {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    /* font-size: 16px; */
    /* line-height: 19px; */
    color: #ffb11b;
  }
  .container-img {
  }
  .container-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    /* line-height: 16px; */

    /* fff */

    color: #ffffff;
    opacity: 0.6;
    flex: 0.5;
  }
  .container-discription {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    /* line-height: 16px; */
    text-align: right;
    flex: 1;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    padding-right: 5px;
  }
  .container-side {
    margin-top: 16px;
  }
  .row-left-side-detail {
    margin-top: 12px;
    display: flex;
    justify-content: space-around;
  }
  .horizontal-hr {
    background: #ffffff;
    opacity: 0.1;
    width: 100%;
    height: 1px;
    margin-top: 16px;
  }
  .ranking-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #333333;
    align-items: center;
    align-self: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .ranking-desc {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 42px;
    text-align: right;

    color: #1e8af9;
  }
  .raking-container {
    display: flex;
    justify-content: space-between;
  }
  .raking-step .ant-steps-item-content {
    display: flex;
    justify-content: space-between;
  }
  .raking-step .ant-steps-item-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;

    color: #999999;
  }
  .ranking-step .ant-steps-item-description {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: right;

    color: #333333;
  }
  .ant-steps-item-custom .ant-steps-item-icon > .ant-steps-icon {
    left: 4.5px;
  }
  .content-tab .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab,
  .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab {
    margin: 0px 8px 0px 0px;
    padding: 4px 12px;
  }
  .content-tab .ant-tabs-top > .ant-tabs-nav::before {
    border: none;
  }
  .content-tab .ant-tabs-top > .ant-tabs-nav {
    margin: 0px 16px;
  }
  .content-tab .ant-tabs-content-holder {
    background: #ffffff;
    /* Middle Grey */

    border: 1px solid #e6ebf4;
    box-sizing: border-box;
    border-radius: 4px;
    /* padding-top: 16px;
      padding-bottom: 16px; */
  }
  .content-tab .ant-tabs-tab-btn {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    /* line-height: 15px; */
    text-align: center;
    color: #666666;
  }
  .content-tab .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active {
    background-color: #1e8af9;
  }
  .content-tab .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: white;
  }
  .content-tab .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab {
    border: none;
  }
  .button-del {
    background: #c42127;
    border-radius: 4px;
    /* width: 120px; */
    height: 38px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    width: 120px;
  }
  .button-del .text {
    font-family: Roboto;
    align-items: center;
    align-self: center;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    /* identical to box height, or 123% */

    text-align: center;

    /* fff */

    color: #ffffff;
  }
  .button-duyet {
    border-radius: 4px;
    /* width: 120px; */
    height: 38px;
    display: flex;
    justify-content: center;
    background: #008055;
    cursor: pointer;
    width: 120px;
  }
  .button-duyet .text {
    font-family: Roboto;
    align-items: center;
    align-self: center;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    /* identical to box height, or 123% */

    text-align: center;

    /* fff */

    color: #ffffff;
  }
  .group-action-button {
    justify-content: flex-end;
  }
  .button-email {
    border-radius: 4px;
    /* width: 120px; */
    height: 38px;
    display: flex;
    justify-content: center;
    background: #333333;
    cursor: pointer;
    width: 120px;
  }
  .button-email .text {
    font-family: Roboto;
    align-items: center;
    align-self: center;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    /* identical to box height, or 123% */

    text-align: center;

    /* fff */

    color: #ffffff;
  }
  .button-update {
    border-radius: 4px;
    /* width: 120px; */
    height: 38px;
    display: flex;
    justify-content: center;
    background: #1e8af9;
    cursor: pointer;
    width: 120px;
  }
  .button-update .text {
    font-family: Roboto;
    align-items: center;
    align-self: center;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    /* identical to box height, or 123% */

    text-align: center;

    /* fff */

    color: #ffffff;
  }
  .container-back {
    position: absolute;
    top: 50px;
    right: 0px;
    margin-right: 16px;
    cursor: pointer;
   
  }
  .container-back .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height */

    text-align: right;
    text-transform: uppercase;

    /* Blue - VCSC */

    color: #00377B;
    padding-left: 8px;
    padding-right: 8px;
  }

  @media screen and (max-width: 845px) {
    .avatar-status {
      font-size: 11px;
    }
    .avatar-name {
      font-size: 11px;
    }
    .container-title {
      font-size: 11px;
    }
    .container-discription {
      font-size: 11px;
    }
    .ranking-step .ant-steps-item-description {
      font-size: 11px;
    }
    .content-tab .ant-tabs-tab-btn {
      font-size: 11px;
    }
  }
  @media screen and (max-width: 480px) {
    .avatar-status {
      font-size: 10px;
    }
    .avatar-name {
      font-size: 10px;
    }
    .container-title {
      font-size: 10px;
    }
    .container-discription {
      font-size: 10px;
    }
    .raking-step .ant-steps-item-title {
      font-size: 10px;
    }
    .ranking-step .ant-steps-item-description {
      font-size: 10px;
    }
    .content-tab .ant-tabs-tab-btn {
      font-size: 10px;
    }
  }

  @media screen and (min-width: 768px) {
    .avatar-status {
      font-size: 13x;
    }
    .avatar-name {
      font-size: 13px;
    }
    .container-title {
      font-size: 13px;
    }
    .container-discription {
      font-size: 13px;
    }
    .raking-step .ant-steps-item-title {
      font-size: 13px;
    }
    .ranking-step .ant-steps-item-description {
      font-size: 13px;
    }
    .content-tab .ant-tabs-tab-btn {
      font-size: 13px;
    }
  }
  @media screen and (min-width: 1020px) {
    .avatar-status {
      font-size: 16px;
    }
    .avatar-name {
      font-size: 16px;
    }
    .container-title {
      font-size: 16px;
    }
    .container-discription {
      font-size: 16px;
    }
    .raking-step .ant-steps-item-title {
      font-size: 14px;
    }

    .ranking-step .ant-steps-item-description {
      font-size: 14px;
    }
    .content-tab .ant-tabs-tab-btn {
      font-size: 14px;
    }
  }
`;

export default function CommonKYC(props) {
  console.log('props', props)

  let step_finish =  props.customer &&   props.customer.step && STEPNUM.indexOf(props.customer.step) || -1; 
  console.log('step finish ==============', step_finish)
  return (
    <div className={["container-fluid", $].join(" ")}>
      <div className="container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="card-left">
                <div className="row-left-side">
                  <div className="container-img">
                    <Avatar
                      size={{
                        xs: 80,
                        sm: 80,
                        md: 80,
                        lg: 80,
                        xl: 80,
                        xxl: 80,
                      }}
                      src={
                        (props.customer && props.customer.file_auth) ||
                        "/icon/avatar_img.png"
                      }
                    />
                  </div>
                  <div className="avatar-dsc">
                    <div className="avatar-name">
                      {props.customer && props.customer.name}
                    </div>
                    <div className="avatar-status">
                      {props.customer &&
                        props.customer.status &&
                        RATIO_STATE_CUSTOMER_ONLINE[props.customer.status]}
                    </div>
                  </div>
                </div>

                <div className="row-left-side-detail">
                  <div className="container-title">Email</div>
                  <div className="container-discription">
                    {props.customer && props.customer.email}
                  </div>
                </div>
                <div className="horizontal-hr"></div>
                <div className="row-left-side-detail">
                  <div className="container-title">Số điện thoại</div>
                  <div className="container-discription">
                    {props.customer && props.customer.phone}
                  </div>
                </div>

                <div className="row-left-side-detail">
                  <div className="container-title">Số CMND/CCCD</div>
                  <div className="container-discription">
                    {props.customer && props.customer.id_number}
                  </div>
                </div>

                <div className="row-left-side-detail">
                  <div className="container-title">Giới tính</div>
                  <div className="container-discription">
                    {props.customer &&
                      props.customer.gender &&
                      GENDER[props.customer.gender]}
                  </div>
                </div>

                <div className="row-left-side-detail">
                  <div className="container-title">Ngày sinh</div>
                  <div className="container-discription">
                    {props.customer && props.customer.date_of_birth}
                  </div>
                </div>

                <div className="row-left-side-detail">
                  <div className="container-title">Địa chỉ</div>
                  <div className="container-discription">
                    {props.customer && props.customer.address}
                  </div>
                </div>
                <div className="horizontal-hr"></div>

                <div className="row-left-side-detail">
                  <div className="container-title">NV chăm sóc</div>
                  <div className="container-discription">
                    {props.customer && props.customer.broker}
                  </div>
                </div>
              </div>
              <div className="card_step_raking">
                <div className="raking-container">
                  <div className="ranking-title">Kết quả eKYC</div>
                  {/* <div className="ranking-desc"></div> */}
                </div>
                <div className="raking-step">
                  <Steps direction="vertical" size="small">
                    <Step
                      status={
                        props.customer &&
                          props.customer.otp_success === true ?
                          "finish" :
                          step_finish === 0 ? "error" : 'wait'
                      }
                      title="OTP"
                      description=""
                      icon={
                        <img
                          src={
                            props.customer &&
                              props.customer.otp_success === true ?
                              "/icon/ic_crm_check.png" :
                              step_finish === 0 ? "/icon/ic_error.png" :  "/icon/ic_crm_warning.png"
                          }
                        />
                      }
                    />
                    <Step
                      status={
                        props.customer &&
                          props.customer.ocr_success === true ?
                          "finish" :
                          step_finish === 1 ? "/icon/ic_error.png" :  "/icon/ic_crm_warning.png"
                      }
                      title="OCR"
                      description={
                        (props.customer &&  props.customer.ocr_score && 
                          props.customer.ocr_score + " % tin cậy") ||
                        0 + "% tin cậy" ||
                        ""
                      }
                      icon={
                        <img
                          src={
                            props.customer &&
                              props.customer.ocr_success === true ?
                              "/icon/ic_crm_check.png" :
                              step_finish === 1 ? "/icon/ic_error.png" :  "/icon/ic_crm_warning.png"
                          }
                        />
                      }
                    />
                    <Step
                      status={
                        props.customer &&
                          props.customer.live_detection_success === true ?
                          "finish" : 
                          step_finish === 2 ? "/icon/ic_error.png" :  "/icon/ic_crm_warning.png"
                      }
                      title="Liveness Detection"
                      // description="90% tin cậy"
                      icon={
                        <img
                          src={
                            props.customer &&
                              props.customer.live_detection_success === true ?
                              "/icon/ic_crm_check.png" :
                              step_finish === 2 ? "/icon/ic_error.png" :  "/icon/ic_crm_warning.png"
                          }
                        />
                      }
                    />
                    <Step
                      status={
                        props.customer &&
                          props.customer.active_email === true ?
                          "finish" :
                          step_finish === 3 ? "/icon/ic_error.png" :  "/icon/ic_crm_warning.png"
                      }
                      title="Activate email"
                      description=""
                      icon={
                        <img
                          src={
                            props.customer &&
                              props.customer.active_email === true ?
                              "/icon/ic_crm_check.png" :
                              step_finish === 3 ? "/icon/ic_error.png" :  "/icon/ic_crm_warning.png"
                          }
                        />
                      }
                    />
                    <Step
                      status="wait"
                      title="Phone number check"
                      description=""
                      icon={<img src="/icon/ic_crm_warning.png" />}
                    />
                  </Steps>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-12 content-tab">
              <Tabs defaultActiveKey="1" type="card" size="middle">
                <TabPane tab="Thông tin cá nhân" key="1">
                  <Persional {...props} />
                </TabPane>

                <TabPane tab="Thông tin tài khoản" key="2">
                  <InfomationAccount {...props} />
                </TabPane>
              </Tabs>
            
              <div className="container-back" onClick={() => {
                  props.history.replace('/customers-online')
              }}>
                <img src="/icon/ic_crm_arrow.png"/>
                <span className="text">QUAY LẠI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
