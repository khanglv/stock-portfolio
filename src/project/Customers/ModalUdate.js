import React, { useState } from "react";
import "antd/dist/antd.css";
import { css } from "emotion";
import { Modal, Radio, DatePicker, Input, Select, Form, Checkbox } from "antd";
import moment from "moment";
import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { RATIO_STATE_CUSTOMER_ONLINE } from "../../utils";
import * as storage from '../../api/storage';

const { TextArea } = Input;
const { Option } = Select;

const $ = css`
  .container-material {
    height: 100%;
    display: flex;
  }

  .container-material .material-textfield {
    position: relative;
    width: 100%;
  }

  .container-material .material-textfield label {
    position: absolute;
    font-size: 1rem;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: white;
    color: gray;
    padding: 0 0.3rem;
    margin: 0 0.5rem;
    transition: 0.1s ease-out;
    transform-origin: left top;
    pointer-events: none;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;

    /* 999 */

    color: #999999;
  }
  .container-material .material-textfield .hoten {
    outline: none;
    border: 1px solid #e6ebf4;
    /* border-radius: 5px; */
    padding: 10px;
    transition: 0.1s ease-out;
    width: 100%;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;

    /* 333 */

    color: #333333;
  }
  .hoten:focus {
    border-color: #6200ee;
  }
  .container-material .material-textfield .hoten + label {
    /* color: #6200ee; */
    top: 0;
    transform: translateY(-50%) scale(0.9);
  }
  .container-material
    .material-textfield
    .hoten:not(:placeholder-shown)
    + label {
    top: 0;
    transform: translateY(-50%) scale(0.9);
  }
  .lbl_desc {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #999999;
  }
  .lbl-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height, or 122% */

    /* 333 */

    color: #333333;
  }
  .button-huy {
    background: #333333;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
  }
  .button-agree {
    background: #1e8af9;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    border: none;
    width: 120px;
  }
  .button-update {
    background: #f44336;
    margin-left: 10px;
    width: 120px;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    border: none;
  }
  .button-agree:focus, .button-update:focus {
    border: none;
    outline: none;
  }
  .button-agree .text, .button-update .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    /* identical to box height, or 123% */

    text-align: center;

    /* fff */

    color: #ffffff;
  }
  .button-huy .text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    /* identical to box height, or 123% */

    text-align: center;

    /* fff */

    color: #ffffff;
  }
  .container-button-modal {
    display: flex;
    justify-content: center;
  }
`;
export function ModalUdate(props) {
  const [ value_brand, set_value_brand] = useState(props.customer.manage_by && props.customer.manage_by.brand && props.customer.manage_by.brand.display_name || null)
  const [ value_broker, set_value_broker] = useState(props.customer.manage_by && props.customer.manage_by.broker && props.customer.manage_by.broker.name || null)
  const [isFirst, set_is_first] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState({
    name:
      props.customer && props.customer.name && props.customer.name !== null
        ? false
        : true,
    email:
      props.customer && props.customer.email && props.customer.email !== null
        ? false
        : true,
    bank_brand:
      props.customer &&
      props.customer.bank_brand &&
      props.customer.bank_brand !== null
        ? false
        : props.customer &&
          props.customer.allow_banking &&
          props.customer.allow_banking === true
        ? true
        : false,
    id_issue_place:
      props.customer &&
      props.customer.id_issue_place &&
      props.customer.id_issue_place !== null
        ? false
        : true,
    id_issue_date:
      props.customer &&
      props.customer.id_issue_date &&
      props.customer.id_issue_date !== null
        ? false
        : true,
    id_number:
      props.customer &&
      props.customer.id_number &&
      props.customer.id_number !== null
        ? false
        : true,
    date_of_birth:
      props.customer &&
      props.customer.date_of_birth &&
      props.customer.date_of_birth !== null
        ? false
        : true,
    bank_account:
      props.customer &&
      props.customer.bank_account &&
      props.customer.bank_account !== null
        ? false
        : props.customer &&
          props.customer.allow_banking &&
          props.customer.allow_banking === true
        ? true
        : false,
    address:
      props.customer &&
      props.customer.address &&
      props.customer.address !== null
        ? false
        : true,

    brand: props.customer.manage_by && props.customer.manage_by.brand && props.customer.manage_by.brand.display_name !== null ? false : true,
    broker: props.customer.manage_by && props.customer.manage_by.broker && props.customer.manage_by.broker.name !== null ? false : true
  });
  const [customer_online, set_customer_online] = useState({
    name:
      (props.customer && props.customer.name && props.customer.name) || null,
    email:
      (props.customer && props.customer.email && props.customer.email) || null,
    gender: (props.customer && props.customer.gender) || "MALE",
    allow_margin_trade: false,
    allow_derivative_trade: false,
    allow_banking:
      props.customer &&
      props.customer.bank_brand &&
      props.customer.bank_brand &&
      props.customer &&
      props.customer.bank_account &&
      props.customer.bank_account
        ? true
        : false,
    bank_brand:
      (props.customer &&
        props.customer.bank_brand &&
        props.customer.bank_brand) ||
      null,
    id_issue_place:
      (props.customer &&
        props.customer.id_issue_place &&
        props.customer.id_issue_place) ||
      null,
    id_issue_date:
      (props.customer &&
        props.customer.id_issue_date &&
        props.customer.id_issue_date &&
        moment(props.customer.id_issue_date, "DD/MM/YYYY").isValid() === true &&
        props.customer.id_issue_date) ||
      null,
    id_number:
      (props.customer &&
        props.customer.id_number &&
        props.customer.id_number) ||
      null,
    date_of_birth:
      (props.customer &&
        props.customer.date_of_birth &&
        props.customer.date_of_birth &&
        moment(props.customer.date_of_birth, "DD/MM/YYYY").isValid() === true &&
        props.customer.date_of_birth) ||
      null,
    address:
      (props.customer && props.customer.address) ||
      (props.customer.address && props.customer.address) ||
      null,
    address_permermanent:
      (props.customer && props.customer.address_permermanent) ||
      (props.customer.address_permermanent &&
        props.customer.address_permermanent) ||
      null,
    bank_owner:
      (props.customer && props.customer.name && props.customer.name) || null,
    bank_account:
      (props.customer &&
        props.customer.bank_account &&
        props.customer.bank_account) ||
      null,
    bank_name: null,
    note:
      (props.customer && props.customer.note && props.customer.note) || null,

    broker: (props.customer && props.customer.broker && props.customer.broker) || null,
    manage_by: (props.customer && props.customer.manage_by && props.customer.manage_by) || null,
    brand: (props.customer && props.customer.brand) || null
  });
  const onFinish = () => {
    setErrorSubmit({
      ...errorSubmit,
      name: customer_online.name !== null ? false : true,
      date_of_birth: customer_online.date_of_birth !== null ? false : true,
      id_number: customer_online.id_number !== null ? false : true,
      id_issue_date: customer_online.id_issue_date !== null ? false : true,
      id_issue_place: customer_online.id_issue_place !== null ? false : true,
      bank_brand:
        customer_online.bank_brand !== null
          ? false
          : customer_online.allow_banking === true
          ? true
          : false,
      bank_owner:
        customer_online.bank_owner !== null &&
        customer_online.allow_banking === true
          ? false
          : true,
      bank_account:
        customer_online.bank_account !== null
          ? false
          : customer_online.allow_banking === true
          ? true
          : false,
      email: customer_online.email !== null ? false : true,
      address: customer_online.address !== null ? false : true,
    });
  };

  let check_role_css = false
  storage.userInfoRole() !== null && JSON.parse(storage.userInfoRole()).forEach(element => {
      if (
          element.hash !== 'moigioi'
         )
      {
          check_role_css = true
      }
      
  });

  return (
    <Modal
      maskClosable={false}
      width={898}
      mask={true}
      title={null}
      visible={props.visible}
      closable={false}
      centered={true}
      footer={null}
      bodyStyle={{
        border: "none",
        padding: "16px",
      }}
    >
      <Form className={$} onFinish={onFinish}>
        <div className="lbl-title  mb-3">Thông tin cá nhân</div>
        <div className="col-lg-12 col-md-12 col-12 col-sm-12">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <Form.Item name="name">
                  <div className="container-material">
                    <div className="material-textfield">
                      <input
                        placeholder=" "
                        type="text"
                        className="hoten"
                        value={
                          customer_online.name !== null
                            ? customer_online.name
                            : ""
                        }
                        onChange={(e) => {
                          set_customer_online({
                            ...customer_online,
                            name: e.target.value !== "" ? e.target.value : null,
                          });
                          setErrorSubmit({
                            ...errorSubmit,
                            name: e.target.value !== "" ? false : true,
                          });
                        }}
                        style={{
                          border:
                            errorSubmit.name == true && isFirst === true
                              ? "1px solid red"
                              : "1px solid #e6ebf4",
                        }}
                      />
                      <label> Họ và tên</label>
                    </div>
                  </div>
                </Form.Item>
              </div>
              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <Form.Item>
                      <div className="container-material">
                        <div className="material-textfield">
                          <DatePicker
                            style={{
                              border:
                                errorSubmit.date_of_birth == true &&
                                isFirst === true
                                  ? "1px solid red"
                                  : "1px solid #e6ebf4",
                            }}
                            className="hoten"
                            format="DD/MM/YYYY"
                            locale={locale}
                            defaultValue={
                              customer_online.date_of_birth &&
                              moment(
                                customer_online.date_of_birth,
                                "DD/MM/YYYY"
                              )
                            }
                            onChange={(date, dateString) => {
                              set_customer_online({
                                ...customer_online,
                                date_of_birth:
                                  dateString !== "" ? dateString : null,
                              });

                              setErrorSubmit({
                                ...errorSubmit,
                                date_of_birth: dateString !== "" ? false : true,
                              });
                            }}
                          />
                          <label>Ngày sinh</label>
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <Form.Item>
                  <div className="container-material">
                    <div className="material-textfield">
                      <input
                        style={{
                          border:
                            errorSubmit.id_number == true && isFirst === true
                              ? "1px solid red"
                              : "1px solid #e6ebf4",
                        }}
                        placeholder=" "
                        type="text"
                        className="hoten"
                        value={
                          (customer_online.id_number &&
                            customer_online.id_number) ||
                          ""
                        }
                        onChange={(e) => {
                          set_customer_online({
                            ...customer_online,
                            id_number:
                              e.target.value !== "" ? e.target.value : null,
                          });

                          setErrorSubmit({
                            ...errorSubmit,
                            id_number: e.target.value !== "" ? false : true,
                          });
                        }}
                      />
                      <label>Số CMND/CCCD</label>
                    </div>
                  </div>
                </Form.Item>
              </div>
              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12 col-sm-12">
                    <Form.Item>
                      <div className="container-material">
                        <div className="material-textfield">
                          <DatePicker
                            style={{
                              border:
                                errorSubmit.id_issue_date == true &&
                                isFirst === true
                                  ? "1px solid red"
                                  : "1px solid #e6ebf4",
                            }}
                            className="hoten"
                            locale={locale}
                            format="DD/MM/YYYY"
                            locale={locale}
                            defaultValue={
                              customer_online.id_issue_date &&
                              moment(
                                customer_online.id_issue_date,
                                "DD/MM/YYYY"
                              )
                            }
                            onChange={(date, dateString) => {
                              set_customer_online({
                                ...customer_online,
                                id_issue_date:
                                  dateString !== "" ? dateString : null,
                              });

                              setErrorSubmit({
                                ...errorSubmit,
                                id_issue_date: dateString !== "" ? false : true,
                              });
                            }}
                          />
                          <label>Ngày cấp</label>
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                  <div className="col-lg-6 com-md-6 col-12 col-sm-12">
                    <Form.Item>
                      <div className="container-material">
                        <div className="material-textfield">
                          <input
                            style={{
                              border:
                                errorSubmit.id_issue_place == true &&
                                isFirst === true
                                  ? "1px solid red"
                                  : "1px solid #e6ebf4",
                            }}
                            placeholder=" "
                            type="text"
                            className="hoten"
                            value={
                              (customer_online.id_issue_place &&
                                customer_online.id_issue_place) ||
                              ""
                            }
                            onChange={(e) => {
                              set_customer_online({
                                ...customer_online,
                                id_issue_place:
                                  e.target.value !== "" ? e.target.value : null,
                              });

                              setErrorSubmit({
                                ...errorSubmit,
                                id_issue_place:
                                  e.target.value !== "" ? false : true,
                              });
                            }}
                          />
                          <label>Nơi cấp</label>
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <Form.Item>
                  <div
                    className="container-material"
                    style={{
                      height: "90px",
                    }}
                  >
                    <div className="material-textfield">
                      <TextArea
                        maxLength={100}
                        className="hoten"
                        style={{
                          height: "100%",
                        }}
                        value={
                          (customer_online.note && customer_online.note) || ""
                        }
                        onChange={(e) => {
                          set_customer_online({
                            ...customer_online,
                            note: e.target.value !== "" ? e.target.value : null,
                          });
                        }}
                      />
                      <label>Ghi chú</label>
                    </div>
                  </div>
                </Form.Item>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <Form.Item>
                <div
                  className="col-lg-12 col-md-12 col-12 col-sm-12"
                  style={{
                    height: "42.53px",
                  }}
                >
                  <div className="lbl_desc">Giới tính</div>
                  <Radio.Group
                    value={customer_online.gender}
                    onChange={(e) => {
                      set_customer_online({
                        ...customer_online,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <Radio value="MALE">Nam</Radio>
                    <Radio value="FEMALE">Nữ</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>

              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <Form.Item>
                      <div className="container-material">
                        <div className="material-textfield">
                          <input
                            placeholder=" "
                            type="text"
                            className="hoten"
                            value={
                              (customer_online.email &&
                                customer_online.email) ||
                              ""
                            }
                            onChange={(e) => {
                              set_customer_online({
                                ...customer_online,
                                email:
                                  e.target.value !== "" ? e.target.value : null,
                              });

                              setErrorSubmit({
                                ...errorSubmit,
                                email: e.target.value !== "" ? false : true,
                              });
                            }}
                            style={{
                              border:
                                errorSubmit.email == true && isFirst === true
                                  ? "1px solid red"
                                  : "1px solid #e6ebf4",
                            }}
                          />
                          <label>Email</label>
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <Form.Item>
                      <div className="container-material">
                        <div className="material-textfield">
                          <input
                            placeholder=" "
                            value={props.customer.phone}
                            disabled
                            className="hoten"
                          />
                          <label>Số điện thoại</label>
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <Form.Item>
                  <div
                    className="container-material"
                    style={{
                      height: "90px",
                    }}
                  >
                    <div className="material-textfield">
                      <TextArea
                        maxLength={100}
                        className="hoten"
                        style={{
                          height: "100%",
                          border:
                            errorSubmit.address == true && isFirst === true
                              ? "1px solid red"
                              : "1px solid #e6ebf4",
                        }}
                        value={
                          (customer_online.address &&
                            customer_online.address) ||
                          ""
                        }
                        onChange={(e) => {
                          set_customer_online({
                            ...customer_online,
                            address:
                              e.target.value !== "" ? e.target.value : null,
                          });

                          setErrorSubmit({
                            ...errorSubmit,
                            address: e.target.value !== "" ? false : true,
                          });
                        }}
                      />
                      <label>Địa chỉ</label>
                    </div>
                  </div>
                </Form.Item>
              </div>

              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <Form.Item>
                  <div
                    className="container-material"
                    style={{
                      height: "90px",
                    }}
                  >
                    <div className="material-textfield">
                      <TextArea
                        maxLength={100}
                        className="hoten"
                        style={{
                          height: "100%",
                        }}
                        value={
                          (customer_online.address_permermanent &&
                            customer_online.address_permermanent) ||
                          ""
                        }
                        onChange={(e) => {
                          set_customer_online({
                            ...customer_online,
                            address_permermanent:
                              e.target.value !== "" ? e.target.value : null,
                          });
                        }}
                      />
                      <label>Địa chỉ thường trú</label>
                    </div>
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        <div className="lbl-title  mb-3">Ngân hàng</div>
        <div className="col-lg-12 col-md-12 col-12 col-sm-12">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <Form.Item>
                      <div className="container-material">
                        <div className="material-textfield">
                          <input
                            placeholder=" "
                            type="text"
                            className="hoten"
                            value={
                              (customer_online.bank_account &&
                                customer_online.bank_account) ||
                              ""
                            }
                            onChange={(e) => {
                              set_customer_online({
                                ...customer_online,
                                bank_account:
                                  e.target.value !== "" ? e.target.value : null,
                                allow_banking:
                                  e.target.value !== ""
                                    ? true
                                    : customer_online.bank_account !== null
                                    ? true
                                    : false,
                              });

                              setErrorSubmit({
                                ...errorSubmit,
                                bank_account:
                                  e.target.value !== "" ? false : true,
                                bank_account:
                                  customer_online.bank_account !== null &&
                                  e.target.value !== ""
                                    ? false
                                    : true,
                                bank_brand:
                                  customer_online.bank_brand !== null &&
                                  e.target.value !== ""
                                    ? false
                                    : true,
                              });
                            }}
                            style={{
                              border:
                                errorSubmit.bank_account == true &&
                                isFirst === true
                                  ? "1px solid red"
                                  : "1px solid #e6ebf4",
                            }}
                          />
                          <label>STK Ngân hàng</label>
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                    <Form.Item>
                      <div className="container-material">
                        <div className="material-textfield">
                          <input
                            disabled={true}
                            placeholder=" "
                            type="text"
                            className="hoten"
                            value={
                              (customer_online.name && customer_online.name) ||
                              ""
                            }
                            onChange={(e) => {
                              set_customer_online({
                                ...customer_online,
                                bank_owner:
                                  e.target.value !== "" ? e.target.value : null,
                              });
                            }}
                          />
                          <label>Tên người thụ hưởng</label>
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                    <Form.Item>
                      <div className="container-material">
                        <div className="material-textfield">
                          <Select
                            className="hoten"
                            style={{
                              padding: "0px",
                              border: "none",
                            }}
                            defaultValue={
                              (customer_online.bank_name &&
                                customer_online.bank_name) ||
                              null
                            }
                            onChange={(value, e) => {
                              set_customer_online({
                                ...customer_online,
                                bank_name: value,
                                allow_banking:
                                  value !== null
                                    ? true
                                    : customer_online.bank_account !== null
                                    ? true
                                    : false,
                              });

                              setErrorSubmit({
                                ...errorSubmit,
                                bank_name: value !== null ? false : true,
                                // bank_account: customer_online.bank_account !== null &&   value !== null ? false : true,
                                // bank_brand: customer_online.bank_brand !== null &&   value !== null ? false : true,
                              });
                              props.handlChangeBanks &&
                                value !== null &&
                                props.handlChangeBanks(value);
                            }}
                          >
                            <Option value={null}>Tất cả tên ngân hàng</Option>
                            {props.banks.length > 0 &&
                              props.banks.map((item, index) => {
                                return (
                                  <Option key={item.value} value={item.value}>
                                    {item.text}
                                  </Option>
                                );
                              })}
                          </Select>
                          <label>Tên ngân hàng</label>
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                    <Form.Item>
                      <div className="container-material">
                        <div className="material-textfield">
                          <Select
                            className="hoten"
                            style={{
                              padding: "0px",
                              border:
                                errorSubmit.bank_brand == true &&
                                isFirst === true
                                  ? "1px solid red"
                                  : "none",
                            }}
                            defaultValue={
                              (customer_online.bank_brand &&
                                customer_online.bank_brand) ||
                              null
                            }
                            onChange={(value, e) => {
                              set_customer_online({
                                ...customer_online,
                                bank_brand: value,
                                allow_banking: true,
                              });
                              setErrorSubmit({
                                ...errorSubmit,
                                bank_brand: value !== null ? false : true,
                              });
                            }}
                          >
                            <Option value={null}>
                              Tất cả chi nhánh ngân hàng
                            </Option>
                            {props.branches.length > 0 &&
                              props.branches.map((item, index) => {
                                return (
                                  <Option key={item.value} value={item.value}>
                                    {item.text}
                                  </Option>
                                );
                              })}
                          </Select>
                          <label>Chi nhánh ngân hàng</label>
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lbl-title  mb-3">Thông tin tài khoản</div>
        <div className="col-lg-12 col-md-12 col-12 col-sm-12">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <Form.Item>
                      <div className="container-material">
                        <div className="material-textfield">
                          <Select
                            style={{
                              padding: "0px",
                              border: "none",
                            }}
                            className="hoten"
                            defaultValue={props.customer.status}
                            onChange={() => {}}
                            disabled
                          >
                            {Object.keys(RATIO_STATE_CUSTOMER_ONLINE).map(
                              (item, index) => {
                                return (
                                  <Option key={item} value={item}>
                                    {RATIO_STATE_CUSTOMER_ONLINE[item]}
                                  </Option>
                                );
                              }
                            )}
                          </Select>
                          <label>Trạng thái</label>
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                    <Form.Item>
                      <div className="container-material">
                        <div className="material-textfield">
                          <input
                            disabled={true}
                            placeholder="Số tài khoản"
                            type="text"
                            className="hoten"
                          />
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                    <Form.Item>
                      <div className="container-material">
                        <div className="material-textfield">
                          <input
                            disabled={true}
                            placeholder="Số serial OTP"
                            type="text"
                            className="hoten"
                          />
                        </div>
                      </div>
                    </Form.Item>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                        <Checkbox disabled checked={props.customer.storeFree}>
                          <span>Phí lưu ký</span>
                        </Checkbox>
                      </div>
                      <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                        <Form.Item>
                          <div className="container-material">
                            <div className="material-textfield">
                              <Select
                                style={{
                                  padding: "0px",
                                  border: "none",
                                }}
                                className="hoten"
                                defaultValue={props.customer.group_fee}
                                onChange={() => {}}
                                disabled
                              ></Select>
                              <label>Nhóm phí</label>
                            </div>
                          </div>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <Form.Item>
                  <div className="container-material">
                    <div className="material-textfield">
                      <Select
                        style={{
                          padding: "0px",
                          border: "none",
                        }}
                        className="hoten"
                        defaultValue={props.customer.brand && props.customer.brand}
                        disabled={ check_role_css === true ? false : true}
                        onChange={(value, option) => {


                          set_customer_online({
                            ...customer_online,
                            brand: value
                          })
                        }}>
                         <Option value="HOCHIMINH" title="Hồ Chí Minh">
                            HOCHIMINH
                         </Option>
                         <Option value="HANOI" title="Hà Nội">
                            HANOI
                         </Option>

                      </Select>
                      <label>Chi nhánh mở tài khoản</label>
                    </div>
                  </div>
                </Form.Item>
              </div>

              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <Form.Item>
                  <div className="container-material">
                    <div className="material-textfield">
                      <Select
                        style={{
                          padding: "0px",
                          border: "none",
                        }}
                        className="hoten"
                        defaultValue={props.customer.manage_by && props.customer.manage_by.region && props.customer.manage_by.region.name}
                        disabled={ check_role_css === true ? false : true}
                        onChange={(value, option) => {
                          let region = {
                            name: value,
                            display_name: option.title,
                            code: value === 'HOCHIMINH' ? '001': '002'
                          }
                          let manage_by = {
                            ...customer_online.manage_by,
                            region: region
                          }
                          set_customer_online({
                            ...customer_online,
                            manage_by: manage_by
                          })
                          set_value_brand(null)
                          set_value_broker(null)
                          props.handleRegion && props.handleRegion(value)
                        }}>
                         <Option value="HOCHIMINH" title="Hồ Chí Minh">
                            HOCHIMINH
                         </Option>
                         <Option value="HANOI" title="Hà Nội">
                            HANOI
                         </Option>

                      </Select>
                      <label>Chi nhánh quản lý</label>
                    </div>
                  </div>
                </Form.Item>
              </div>

              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <Form.Item>
                  <div className="container-material">
                    <div className="material-textfield">
                      <Select
                        style={{
                          padding: "0px",
                          border:
                          errorSubmit.brand == true ? "1px solid red" : "none",
                        }}
                        className="hoten"
                        defaultValue={props.customer.manage_by && props.customer.manage_by.brand && props.customer.manage_by.brand.display_name}
                        value={value_brand}
                        disabled={ check_role_css === true ? false : true}
                        onChange={(value, option) => {
                          let brandTemp = {
                            id:  option.item._id,
                            code: option.item.code,
                            display_name: option.item.display_name                             
                           }
                           let manage_by = {
                            ...customer_online.manage_by,
                            brand: brandTemp
                          }
                          set_customer_online({
                            ...customer_online,
                            manage_by: manage_by
                          })
                          set_value_brand(value)
                          set_value_broker(null)

                            props.handleBrandName && props.handleBrandName(option)
                        }}>
                         {
                          props.brandNames.map(item => {
                            return <Option item={item} key={item._id} title={item.name} value={item.display_name}>
                                {item.display_name}
                            </Option>
                          })
                        }
                      </Select>
                      <label>PGD quản lý</label>
                    </div>
                  </div>
                </Form.Item>
              </div>
              <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                <Form.Item>
                  <div className="container-material">
                    <div className="material-textfield">
                      <Select
                        style={{
                          padding: "0px",
                          border:  errorSubmit.broker == true ? "1px solid red" : "none",
                        }}
                        className="hoten"
                        defaultValue={props.customer.manage_by && props.customer.manage_by.broker && props.customer.manage_by.broker.name}
                        value={value_broker}
                        disabled={ check_role_css === true ? false : true}
                        onChange={(value, option) => {
                          let brokerTemp = {
                            id:  option.item._id,
                            email: option.item.email,
                            name: option.item.name,
                            brand: option.item.brand,
                            region: option.item.region,
                            user_name: option.item.user_name                             
                           }
                           let manage_by = {
                            ...customer_online.manage_by,
                            broker: brokerTemp
                          }
                          set_value_broker(value)
                          set_customer_online({
                            ...customer_online,
                            manage_by: manage_by
                          })


                        }}
                      >
                        {
                          props.brokers.map(item => {
                            return <Option item={item} key={item._id} title={item.email} value={item.name}>
                                {item.name}
                            </Option>
                          })
                        } 
                      </Select>
                      <label>NV chăm sóc</label>
                    </div>
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-12 col-sm-12">
          <div className="container-button-modal">
            <div
              className="button-huy"
              onClick={() => {
                props.onHandleHuy && props.onHandleHuy();
              }}
            >
              <div className="text">Hủy Bỏ</div>
            </div>
            <button
              type="submit"
              className="button-agree"
              onClick={() => {
                let data_customers = customer_online;
                set_is_first(true);
                if (value_broker !== null || value_broker !== null)
                {
                  setErrorSubmit({
                    ...errorSubmit,
                    brand: false,
                   })
                   setErrorSubmit({
                    ...errorSubmit,
                    broker: false,
                   })
                  props.onHandleLuu && props.onHandleLuu(data_customers)
                }
                else {
                   if (value_broker === null)
                   {
                     setErrorSubmit({
                      ...errorSubmit,
                      broker: true,
                     })
                   }
                   if (value_brand === null)
                   {
                    setErrorSubmit({
                      ...errorSubmit,
                      brand: true,
                     })
                   }
                }               
              }}
            >
              <div className="text">Lưu</div>
            </button>
              <button 
                className="button-update"
                type="button"
                onClick={() => {props.onHandleUpdateManageBy && props.onHandleUpdateManageBy(customer_online.manage_by)}}
              >
                <span className="text">Cập nhật môi giới</span>
              </button>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
