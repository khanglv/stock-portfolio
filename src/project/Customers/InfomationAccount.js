import React, { useState } from "react";
import "antd/dist/antd.css";
import { Upload, Button, Select } from "antd";
import { css } from "emotion";
import { GENDER, CONFIRM_CONTRACT } from "../../utils";
import {
  UploadOutlined,
  FilePdfOutlined,
  EditOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import * as storage from "../../api/storage";
import * as R from "ramda";
import { checkRole } from "../../stores/actions/investor/customersAction";
import { RATIO_STATE_CUSTOMER_ONLINE } from "../../utils";
const { Option } = Select;

export function generateHTMStatus(status) {
  switch (status) {
    case "NEW_REGISTER":
      return (
        <div className="register">
          <div className="text">{RATIO_STATE_CUSTOMER_ONLINE[status]}</div>
        </div>
      );
    case "EKYC_FAILED":
      return (
        <div className="ekyc_failed">
          <div className="text">{RATIO_STATE_CUSTOMER_ONLINE[status]}</div>
        </div>
      );

    case "EKYC_SUCCESS":
      return (
        <div className="ekyc_success">
          <div className="text">{RATIO_STATE_CUSTOMER_ONLINE[status]}</div>
        </div>
      );

    case "CS_CONFIRM":
      return (
        <div className="cs_confirm">
          <div className="text">{RATIO_STATE_CUSTOMER_ONLINE[status]}</div>
        </div>
      );

    case "WAITING_COMPLETE":
      return (
        <div className="waiting_complete">
          <div className="text">{RATIO_STATE_CUSTOMER_ONLINE[status]}</div>
        </div>
      );

    case "COMPLETED_CONTRACT":
      return (
        <div className="complete_contract">
          <div className="text">{RATIO_STATE_CUSTOMER_ONLINE[status]}</div>
        </div>
      );

    case "CANCEL":
      return (
        <div className="cancel">
          <div className="text">{RATIO_STATE_CUSTOMER_ONLINE[status]}</div>
        </div>
      );
    case "COMPLETED":
      return (
        <div className="complete">
          <div className="text">{RATIO_STATE_CUSTOMER_ONLINE[status]}</div>
        </div>
      );
    default:
      return "foo";
  }
}

const $ = css`
  .part-personal-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #333333;
  }
  .personal-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    /* line-height: 16px; */

    /* 999 */

    color: #999999;
  }
  .personal-desc {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .title-upload {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    text-align: center;
    color: #666666;
  }
  .title-upload-or {
  }
  .upload-before .ant-upload-list-picture-card-container {
    width: 100%;
    height: 100%;
  }
  .upload-before .ant-upload.ant-upload-select-picture-card {
    width: 100%;
  }
  .btn-upload .ant-btn {
    background-color: black;
    color: white;
  }
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
    object-fit: fill;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
    padding: 0px;
    width: 100%;
    height: 100%;
  }
  .ant-upload-list-picture-card .ant-upload-list-item-actions {
    right: 0px;
    top: 0px;
    left: auto;
  }
  .upload-before .ant-upload-list-item-info::before {
    content: none;
  }
  .link_download {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    color: #1e8af9;
    cursor: pointer;
  }
  @media screen and (max-width: 845px) {
    .part-personal-title {
      font-size: 11px;
    }
    .personal-title {
      font-size: 11px;
    }
    .personal-desc {
      font-size: 11px;
    }
    .title-upload {
      font-size: 11px;
    }
  }
  @media screen and (max-width: 480px) {
    .part-personal-title {
      font-size: 10px;
    }
    .personal-title {
      font-size: 10px;
    }
    .personal-desc {
      font-size: 10px;
    }
    .title-upload {
      font-size: 10px;
    }
  }
  @media screen and (min-width: 768px) {
    .part-personal-title {
      font-size: 13px;
    }
    .personal-title {
      font-size: 10px;
    }
    .personal-desc {
      font-size: 10px;
    }
    .title-upload {
      font-size: 10px;
    }
  }
  @media screen and (min-width: 1020px) {
    .part-personal-title {
      font-size: 18px;
    }
    .personal-title {
      font-size: 14px;
    }
    .personal-desc {
      font-size: 14px;
    }
    .title-upload {
      font-size: 14px;
    }
  }
  .register {
    background: rgba(255, 189, 20, 0.1);
    border-radius: 2px;
  }
  .register .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #ffbe16;
    padding: 8px;
  }
  .ekyc_failed {
    background: #ffd7d8;
    border-radius: 2px;
  }
  .ekyc_failed .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #ff5858;
    padding: 8px;
  }
  .ekyc_success {
    background: #a6dfff;
    border-radius: 2px;
  }
  .ekyc_success .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height, or 117% */

    text-align: center;
    padding: 8px;

    /* blue */

    color: #3e97f7;
  }
  .cs_confirm {
    background: #a6dfff;
    border-radius: 2px;
  }
  .cs_confirm .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    padding: 8px;

    /* blue */

    color: #3e97f7;
  }

  .waiting_complete {
    background: rgba(29, 191, 164, 0.1);
    border-radius: 2px;
  }
  .waiting_complete .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    padding: 8px;
    color: #1cbfa3;
  }

  .complete_contract {
    background: rgba(29, 191, 164, 0.1);
    border-radius: 2px;
  }
  .complete_contract .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #1cbfa3;
    padding: 8px;
    flex-wrap: nowrap;
    width: 150px;
  }
  .cancel {
    background: rgba(102, 102, 102, 0.1);
    border-radius: 2px;
  }
  .cancel .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height, or 117% */

    text-align: center;

    color: #666666;
    padding: 8px;
  }
  .complete {
    background: rgba(29, 191, 164, 0.1);
    border-radius: 2px;
  }

  .complete .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #1cbfa3;
    padding: 8px;
  }
`;

export default function InfomationAccount(props) {
  const [isEdit, set_is_edit] = useState(false);

  const [isCustomer, set_Customer] = useState(null);

  const checkRoleMG = () => {
    let check_role_css = false;
    storage.userInfoRole() !== null &&
      JSON.parse(storage.userInfoRole()).forEach((element) => {
        if (element.hash === "moigioi") {
          check_role_css = true;
        }
      });
    return check_role_css;
  };

  const checkRoleOnlyPresent = () => {
    let check_role_css = false;
    storage.userInfoRole() !== null &&
      JSON.parse(storage.userInfoRole()).forEach((element) => {
        if (element.hash !== "moigioi") {
          check_role_css = true;
        }
      });
    return check_role_css;
  };

  const checkRoleBothPresentMG = () => {
    let check_role_css = false;
    storage.userInfoRole() !== null &&
      JSON.parse(storage.userInfoRole()).forEach((element) => {
        if (
            element.hash === "moigioi" || 
            element.hash === 'LEAD_NGUYENHUE' ||
            element.hash === 'LEAD_236' ||
            element.hash === 'LEAD_ABS' ||
            element.hash === 'LEAD_HANOI'
          ) {
          check_role_css = true;
        }
      });
    return check_role_css;
  };

  return (
    <div className={["col-lg-12 col-md-12 col-sm-12 col-12", $].join(" ")}>
      <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
        <div className="row">
          <div className="mt-2 ml-2">
            {(props.customer.status === "NEW_REGISTER" ||
              props.customer.status === "EKYC_FAILED") && (
              <div
                className="button-del"
                onClick={() => {
                  props.deleteHandle && props.deleteHandle();
                }}
              >
                <div className="text">XÓA</div>
              </div>
            )}
          </div>

          {props.customer &&
            (props.customer.status === "NEW_REGISTER" ||
              props.customer.status === "EKYC_FAILED" ||
              props.customer.status === "EKYC_SUCCESS") &&
              checkRoleBothPresentMG() === false && (
              <div className="mt-2 ml-2">
                <div
                  className="button-duyet"
                  onClick={() => {
                    props.handleDuyet && props.handleDuyet();
                  }}
                >
                  <div className="text">DUYỆT</div>
                </div>
              </div>
            )}

          <div className="mt-2 ml-2">
            <div
              className="button-email"
              onClick={() => {
                props.handleResendContract && props.handleResendContract();
              }}
            >
              <div className="text">GỬI EMAIL HD</div>
            </div>
          </div>

          {CONFIRM_CONTRACT.indexOf(props.customer.status) > -1 &&
            checkRoleBothPresentMG() === false && (
              <div className="mt-2 ml-2">
                <div
                  className="button-email"
                  onClick={() => {
                    props.handleConfirmContract &&
                      props.handleConfirmContract();
                  }}
                >
                  <div className="text">XÁC NHẬN HD</div>
                </div>
              </div>
            )}
          {(props.customer.status === "NEW_REGISTER" ||
            props.customer.status === "EKYC_FAILED") &&
            checkRoleMG() === true ? (
            <div className="mt-2 ml-2">
              <div
                className="button-update"
                onClick={() => {
                  props.handleUpdate && props.handleUpdate();
                }}
              >
                <div className="text">CẬP NHẬT</div>
              </div>
            </div>
          ) : (
            checkRoleBothPresentMG() === false && (
              <div className="mt-2 ml-2">
                <div
                  className="button-update"
                  onClick={() => {
                    props.handleUpdate && props.handleUpdate();
                  }}
                >
                  <div className="text">CẬP NHẬT</div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-2">
          <div className="col-lg-12 col-md-12 col-12 col-sm-12">
            <span className="part-personal-title">Thông tin tài khoản</span>
          </div>
          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Trạng thái</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer &&
                    props.customer.status &&
                    generateHTMStatus(props.customer.status)}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Số tài khoản</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer && props.customer.account_number}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Chi nhánh mở TK</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer &&
                  props.customer.brand &&
                  props.customer.brand === "HANOI"
                    ? "Hà Nội"
                    : "Hồ Chí Minh"}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Chi nhánh quản lý</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer &&
                    props.customer.manage_by &&
                    props.customer.manage_by.region &&
                    props.customer.manage_by.region.display_name}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">PGD quản lý</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer &&
                    props.customer.manage_by &&
                    props.customer.manage_by.brand &&
                    props.customer.manage_by.brand.display_name}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">NV chăm sóc</span>
              </div>
              <div
                className="col-lg-7 col-md-7 col-sm-7 col-7"
                style={{
                  display: "flex",
                }}
              >

                {isEdit === true && ( props.customer.status === "EKYC_SUCCESS" || props.customer.status === "NEW_REGISTER" || props.customer.status === "EKYC_FAILED"  ) && checkRoleOnlyPresent() === true ? (
                  <Select
                    style={{
                      padding: "0px",
                    }}
                    className="hoten"
                    defaultValue={
                      props.customer.manage_by &&
                      props.customer.manage_by.broker &&
                      props.customer.manage_by.broker.name
                    }
                    onChange={(value, option) => {
                      console.log('customer ==============', option)
                      set_Customer(option.item)
                    }}
                  >
                    {props.brokers.map((item) => {
                      return (
                        <Option
                          item={item}
                          key={item._id}
                          title={item.email}
                          value={item.name}
                        >
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                ) : (
                  <span className="personal-desc">
                    {props.customer &&
                      props.customer.manage_by &&
                      props.customer.manage_by.broker &&
                      props.customer.manage_by.broker.name}
                  </span>
                )}

                {isEdit === true &&  ( props.customer.status === "EKYC_SUCCESS" || props.customer.status === "NEW_REGISTER" || props.customer.status === "EKYC_FAILED"  ) && checkRoleOnlyPresent() === true ? (
                  <CheckOutlined
                    style={{
                      marginLeft: "20px",
                      marginRight: "20px",
                    }}
                    onClick={() => {
                      set_is_edit(false);
                      props.handleUpdateBroker && props.handleUpdateBroker(isCustomer)

                    }}
                  />
                ) :  ( props.customer.status === "EKYC_SUCCESS" || props.customer.status === "NEW_REGISTER" || props.customer.status === "EKYC_FAILED"  ) && checkRoleOnlyPresent() === true && (
                  <EditOutlined
                    style={{
                      marginLeft: "20px",
                      marginRight: "20px",
                    }}
                    onClick={() => {
                      set_is_edit(true);                    
                      props.getBrokersCustomers && props.getBrokersCustomers()
                    }}
                  />
                ) || null }
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Phí lưu phí</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer &&
                    props.customer.storeFree &&
                    props.customer.storeFree}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Nhóm phí</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer &&
                    props.customer.group_fee &&
                    props.customer.group_fee}
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Người giới thiệu</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                 {
                  props.referral && props.referral.code + ' - ' + props.referral.display_name
                 }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
