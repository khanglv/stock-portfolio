import React, { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import CommonKYC from "./CommonKYC";
import { css } from "emotion";
import { connect } from "react-redux";

import * as actions from "../../stores/actions/investor/customersAction";

import { Spin, Modal, Steps, notification, Empty, Carousel } from "antd";
import { withRouter } from "react-router";
import { STEPNUM, calculate_age, calculate_issue_date } from "../../utils";

import { api_get_confirm_contracts } from "../../api/api";

import { ModalUdate } from "./ModalUdate";

import Loading from "../../components/Loading/Loading";


import * as R from "ramda";

const { Step } = Steps;

const $ = css`
  height: 90vh;
  .ant-empty {
    height: 100%;
  }
  .ant-empty-image {
    height: 100%;
  }
`;
const $_MODAL = css`
  .personal-title-modal {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    /* line-height: 16px; */
    color: #999999;
  }
  .personal-desc-modal {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    /* line-height: 16px; */
    color: #333333;
  }
  .img-modal {
    width: 100%;
    border-radius: 4px;
  }

  .ant-steps-item-content {
    display: flex;
    justify-content: space-between;
  }
  .ant-steps-item-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;

    color: #999999;
  }
  .ant-steps-item-description {
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
  .right-side-modal {
  }
  .right-side-modal .ant-steps-vertical .ant-steps-item-content {
    min-height: 40px;
  }
  .right-side-modal .ant-steps-vertical {
    background: #fafafa;
    /* grey-light-2 */

    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px;
  }
  .button-Huy {
    background: #333333;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
  }
  .button-Huy .text {
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
  .button-duyet {
    background: #008055;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
  }
  .button-duyet .text {
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
  .validate-error {
    color: red;
  }
  .validate-success {
    color: #008055;
  }

  @media screen and (max-width: 480px) {
    .button-duyet .text {
      font-size: 9px;
    }
    .button-Huy .text {
      font-size: 9px;
    }
    .personal-title-modal {
      font-size: 9px;
    }
    .personal-desc-modal {
      font-size: 9px;
    }
    .ant-steps-item-title {
      font-size: 9px;
    }
    .ant-steps-item-description {
      font-size: 9px;
    }
  }

  @media screen and (min-width: 768px) {
    .button-duyet .text {
      font-size: 11px;
    }
    .button-Huy .text {
      font-size: 11px;
    }
    .personal-title-modal {
      font-size: 11px;
    }
    .personal-desc-modal {
      font-size: 11px;
    }
    .ant-steps-item-title {
      font-size: 11px;
    }
    .ant-steps-item-description {
      font-size: 11px;
    }
  }
  @media screen and (min-width: 992px) {
    .button-duyet .text {
      font-size: 13px;
    }
    .button-Huy .text {
      font-size: 13px;
    }
    .personal-title-modal {
      font-size: 14px;
    }
    .personal-desc-modal {
      font-size: 14px;
    }
    .ant-steps-item-title {
      font-size: 14px;
    }
    .ant-steps-item-description {
      font-size: 14px;
    }
  }
`;
function CustomerDetail(props) {
  let { _id } = props.match.params;
  const ref_carousel = useRef();
  const [visiable_duyet, set_visible_duyet] = useState(false);
  const [visible_update, set_visible_update] = useState(false);
  const [visible_confirm_contract, set_visible_confirm_contract] = useState(
    false
  );
  const [visible_resend_contract, set_visible_resend_contract] = useState(
    false
  );

  const [ is_Cancel, setCancel] = useState(false)
  const [size, set_size] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [region, set_region] = useState(null)
  const [brand, set_brand] = useState(null)

  let step_finish =
    (props.customer_detail &&
      props.customer_detail.step &&
      STEPNUM.indexOf(props.customer_detail.step)) ||
    -1;
  const updateWindowDimensions = () => {
    set_size({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    props.onGetCustomerDetail(_id);
    props.list_banks();
    props.getBrands('HOCHIMINH')
   
    console.log('Region Name ======', props.customer_detail && props.customer_detail.brand && props.customer_detail.brand)

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };

    
  }, []);

  const updateManageBy = (id, data) => {
    console.log('data', data);
    if (!data) {
      notification['error']({
        message: 'Th??ng tin ch??a ?????y ?????'
      });
      return;
    }
    let { broker } = data;
    if (!broker) {
      notification['error']({
        message: 'Th??ng tin ch??a ?????y ?????'
      });
      return;
    }
    props.updateManageBy(
      id,
      broker,
      (success) => {
        const openNotificationWithIcon = (type) => {
          notification[type]({
            message: "C???p nh???t nh??n vi??n m??i gi???i th??nh c??ng",
          });
        };

        openNotificationWithIcon("success");
        set_visible_update(false);
        props.onGetCustomerDetail(_id);
      },
      (error) => {
        const openNotificationWithIcon = (type) => {
          notification[type]({
            message: error,
          });
        };

        openNotificationWithIcon("error");
      }
      
    )
    
  }

  const updateCustomer = (id,customer ) => {
    props.update_customers(
      id,
      customer,
      (success) => {
        const openNotificationWithIcon = (type) => {
          notification[type]({
            message: "Kh??ch h??ng c???p nh???t th??nh c??ng",
          });
        };

        openNotificationWithIcon("success");
        set_visible_update(false);
        props.onGetCustomerDetail(_id);
      },
      (error) => {
        const openNotificationWithIcon = (type) => {
          notification[type]({
            message: error,
          });
        };

        openNotificationWithIcon("error");
      }
    );
  }

  return (
    <div className={$}>
      {(props.error === null && props.customer_detail !== null && (
        <Loading isLoading={props.loading_download}>
          <CommonKYC
            {...props}
            customer={props.customer_detail}
            handleDuyet={() => {
              set_visible_duyet(true);
            }}
            handleConfirmContract={() => {
              set_visible_confirm_contract(true);
            }}
            handleUpdate={() => {
              set_visible_update(true);
              set_region(props.customer_detail && props.customer_detail.manage_by && props.customer_detail.manage_by.region && props.customer_detail.manage_by.region.name)
              set_brand(props.customer_detail && props.customer_detail.manage_by && props.customer_detail.manage_by.brand && props.customer_detail.manage_by.brand.name)
              props.getBrokersCustomers(props.customer_detail && props.customer_detail.brand && props.customer_detail.brand, props.customer_detail && props.customer_detail.manage_by && props.customer_detail.manage_by.brand && props.customer_detail.manage_by.brand.name)
            }}
            getBrokersCustomers={() => {
              props.getBrokersCustomers(props.customer_detail && props.customer_detail.brand && props.customer_detail.brand, props.customer_detail && props.customer_detail.manage_by && props.customer_detail.manage_by.brand && props.customer_detail.manage_by.brand.name)
            }}
            deleteHandle={() => {
                setCancel(true)
            }}
            handleDownload={() => {
              props.download_contract(
                _id,
                (success) => {
              
                },
                (error) => {
                  const openNotificationWithIcon = (type) => {
                    notification[type]({
                      message: error,
                    });
                  };

                  openNotificationWithIcon("error");
                }
              );
            }}
            handleResendContract={() => {
              set_visible_resend_contract(true);
            }}
            handleUpdateBroker={(customer) => {
             
              if (customer !== null)
              {
                let brokerTemp = {
                  id:  customer._id,
                  email: customer.email,
                  name: customer.name,
                  brand: customer.brand,
                  region: customer.region,
                  user_name: customer.user_name                             
                 }
                let manage_by = {
                  ...props.customer_detail.manage_by,
                  broker: brokerTemp
                }
                let customerTemp = {
                  ...props.customer_detail,
                  manage_by: manage_by
                }
                updateCustomer(_id,customerTemp) 
              }
    
            }}
          />
          <Modal
            maskClosable={false}
            mask={true}
            title="X??c nh???n h???p ?????ng"
            visible={visible_confirm_contract}
            closable={false}
            centered={true}
            onCancel={() => {
              set_visible_confirm_contract(false);
            }}
            onOk={async () => {
              let ids = [_id];
              let result = await api_get_confirm_contracts(ids);

              if (result && result.status === 200) {
                set_visible_confirm_contract(false);
                props.onGetCustomerDetail(_id);
                const openNotificationWithIcon = (type) => {
                  notification[type]({
                    message: "x??c nh???n h???p ?????ng th??nh c??ng",
                  });
                };
                openNotificationWithIcon("success");
              } else {
                const openNotificationWithIcon = (type) => {
                  notification[type]({
                    message: "x??c nh???n h???p ?????ng kh??ng th??nh c??ng",
                  });
                };
                openNotificationWithIcon("error");
              }
            }}
          >
            <p style={{ textAlign: "center" }}>
              B???n x??c nh???n ???? nh???n ???????c h???p ?????ng
            </p>
          </Modal>
          <Modal
            maskClosable={false}
            mask={true}
            width={650}
            title="Ki???m tra v?? x??c nh???n th??ng tin"
            visible={visiable_duyet}
            closable={false}
            centered={true}
            footer={null}
            bodyStyle={{
              border: "none",
              padding: "16px",
            }}
          >
            <div
              className={["col-lg-12 col-md-12 col-sm-12 col-12", $_MODAL].join(
                " "
              )}
            >
              <div className="row mt-2">
                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                      <span className="personal-title-modal">H??? v?? t??n</span>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                      <span className="personal-desc-modal">
                        {props.customer_detail && props.customer_detail.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-4" style={{ textAlign: 'right'}}>
                      <span className="personal-title-modal">
                        Tu???i
                      </span>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                      <span className={["personal-desc-modal",  calculate_age(
                            props.customer_detail &&
                              props.customer_detail.date_of_birth
                          ) >= 15 ? 'validate-success' : 'validate-error' ].join(' ')}>
                        {props.customer_detail &&
                          props.customer_detail.date_of_birth } {' '}
                        (
                        { props.customer_detail &&
                          props.customer_detail.date_of_birth &&
                          calculate_age(
                            props.customer_detail &&
                              props.customer_detail.date_of_birth
                          ) + ' tu???i' }
                        )
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                      <span className="personal-title-modal">S??? CMND/CCCD</span>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                      <span className="personal-desc-modal">
                        {props.customer_detail &&
                          props.customer_detail.id_number}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-4" style={{
                      textAlign: 'right'
                    }}>
                      <span className="personal-title-modal">Ng??y c???p</span>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                      <span
                        className={[
                          "personal-desc-modal",
                          calculate_issue_date(
                            props.customer_detail.id_issue_date
                          ) === true
                            ? "validate-success"
                            : "validate-error",
                        ].join(' ')}
                      >
                        {props.customer_detail.id_issue_date + ' '}(
                        {calculate_issue_date(
                          props.customer_detail.id_issue_date
                        ) === true
                          ? "C??n h???n"
                          : "H???t h???n"}
                        )
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-lg-7 col-md-7 col-7 col-sm-7">
                  <Carousel afterChange={() => {}} ref={ref_carousel}>
                    <img
                      className="img-modal"
                      src={
                        props.customer_detail &&
                        props.customer_detail.files &&
                        props.customer_detail &&
                        props.customer_detail.files[0]
                      }
                    />
                    <img
                      className="img-modal"
                      src={
                        props.customer_detail &&
                        props.customer_detail.files &&
                        props.customer_detail &&
                        props.customer_detail.files[1]
                      }
                    />
                  </Carousel>

                  <div
                    class="carousel-control-prev"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      ref_carousel.current.prev();
                    }}
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Previous</span>
                  </div>
                  <div
                    class="carousel-control-next"
                    onClick={() => {
                      ref_carousel.current.next();
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only"> Next </span>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-5 col-sm-5 right-side-modal">
                  <Steps direction="vertical" size="small">
                    <Step
                      status={
                        props.customer_detail &&
                        props.customer_detail.otp_success === true
                          ? "finish"
                          : step_finish === 0
                          ? "error"
                          : "wait"
                      }
                      title="OTP"
                      description=""
                      icon={
                        <img
                          src={
                            props.customer_detail &&
                            props.customer_detail.otp_success === true
                              ? "/icon/ic_crm_check.png"
                              : step_finish === 0
                              ? "/icon/ic_error.png"
                              : "/icon/ic_crm_warning.png"
                          }
                        />
                      }
                    />
                    <Step
                      status={
                        props.customer_detail &&
                        props.customer_detail.ocr_success === true
                          ? "finish"
                          : step_finish === 1
                          ? "/icon/ic_error.png"
                          : "/icon/ic_crm_warning.png"
                      }
                      title="OCR"
                      description={
                        (props.customer_detail &&
                          props.customer_detail.ocr_score &&
                          props.customer_detail.ocr_score + " % tin c???y") ||
                        0 + "% tin c???y"
                      }
                      icon={
                        <img
                          src={
                            props.customer_detail &&
                            props.customer_detail.ocr_success === true
                              ? "/icon/ic_crm_check.png"
                              : step_finish === 1
                              ? "/icon/ic_error.png"
                              : "/icon/ic_crm_warning.png"
                          }
                        />
                      }
                    />
                    <Step
                      status={
                        props.customer_detail &&
                        props.customer_detail.live_detection_success === true
                          ? "finish"
                          : step_finish === 2
                          ? "/icon/ic_error.png"
                          : "/icon/ic_crm_warning.png"
                      }
                      title="Liveness Detection"
                      // description="90% tin c???y"
                      icon={
                        <img
                          src={
                            props.customer_detail &&
                            props.customer_detail.live_detection_success ===
                              true
                              ? "/icon/ic_crm_check.png"
                              : step_finish === 2
                              ? "/icon/ic_error.png"
                              : "/icon/ic_crm_warning.png"
                          }
                        />
                      }
                    />
                    <Step
                      status={
                        props.customer_detail &&
                        props.customer_detail.active_email === true
                          ? "finish"
                          : step_finish === 3
                          ? "/icon/ic_error.png"
                          : "/icon/ic_crm_warning.png"
                      }
                      title="Activate email"
                      description=""
                      icon={
                        <img
                          src={
                            props.customer_detail &&
                            props.customer_detail.active_email === true
                              ? "/icon/ic_crm_check.png"
                              : step_finish === 3
                              ? "/icon/ic_error.png"
                              : "/icon/ic_crm_warning.png"
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

                  <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div
                          className="button-Huy"
                          onClick={() => {
                            set_visible_duyet(false);
                          }}
                        >
                          <div className="text">H???y B???</div>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div
                          className="button-duyet"
                          onClick={() => {
                            let age =
                              props.customer_detail &&
                              props.customer_detail.date_of_birth &&
                              calculate_age(
                                props.customer_detail &&
                                  props.customer_detail.date_of_birth
                              );
                            let status_issue_date = calculate_issue_date(
                              props.customer_detail.id_issue_date
                            );
                            if (age >= 15 && status_issue_date === true) {
                              props.approved_customer(
                                _id,
                                (success) => {
                                  const openNotificationWithIcon = (type) => {
                                    notification[type]({
                                      message: "Ph?? duy???t th??nh c??ng",
                                    });
                                  };
                                  openNotificationWithIcon("success");
                                  set_visible_duyet(false);
                                  props.onGetCustomerDetail(_id);
                                },
                                (error) => {
                                  const openNotificationWithIcon = (type) => {
                                    notification[type]({
                                      message: error,
                                    });
                                  };
                                  openNotificationWithIcon("error");
                                }
                              );
                            } else if (age < 15) {
                              const openNotificationWithIcon = (type) => {
                                notification[type]({
                                  message: "Ch??a ????? tu???i m??? t??i kho???n",
                                });
                              };
                              openNotificationWithIcon("error");
                            } else if (status_issue_date === false) {
                              const openNotificationWithIcon = (type) => {
                                notification[type]({
                                  message: "CMND ???? h???t h???n",
                                });
                              };
                              openNotificationWithIcon("error");
                            }
                          }}
                        >
                          <div className="text">Duy???t</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <ModalUdate
            handleRegion={(value) => {
              set_region(value)
              props.getBrands(value)
             
            }}
            handleBrandName={(option) => {
              set_brand(option.title)
              console.log('region value =====', region)
              props.getBrokersCustomers(region, option.title)
            }}
            brokers={props.brokers}
            brandNames={props.brandNames}
            width={size.width}
            visible={visible_update}
            onHandleHuy={() => {
              set_visible_update(false);
            }}
            customer={props.customer_detail}
            banks={props.banks}
            handlChangeBanks={(value) => {
              props.list_branches_banks(value);
            }}
            branches={props.branches}
            onHandleLuu={(customer) => {
              updateCustomer(_id,customer)
            }}
            onHandleUpdateManageBy={(data) => {
              updateManageBy(_id,data)
            }}
          />
          <Modal
            maskClosable={false}
            mask={true}
            title="X??c nh???n g???i l???i h???p ?????ng"
            visible={visible_resend_contract}
            closable={false}
            centered={true}
            onCancel={() => {
              set_visible_resend_contract(false);
            }}
            onOk={async () => {
              props.resend_contract_by_email(
                _id,
                (success) => {
                  const openNotificationWithIcon = (type) => {
                    notification[type]({
                      message: "G???i email h???p ?????ng",
                    });
                  };
                  openNotificationWithIcon("success");
                  set_visible_resend_contract(false);
                  props.onGetCustomerDetail(_id);
                },
                (error) => {
                  const openNotificationWithIcon = (type) => {
                    notification[type]({
                      message: error,
                    });
                  };
                  openNotificationWithIcon("error");
                }
              );
            }}
          >
            <p style={{ textAlign: "center" }}>
              B???n x??c nh???n s??? g???i l???i h???p ?????ng
            </p>
          </Modal>

          <Modal
            maskClosable={false}
            mask={true}
            title="X??c nh???n H???y"
            visible={is_Cancel}
            closable={false}
            centered={true}
            onCancel={() => {
              setCancel(false);
            }}
            onOk={async () => {
                  props.cancelCustomer(_id, success => {
                    const openNotificationWithIcon = (type) => {
                      notification[type]({
                        message: "X??a t??i kho???n th??nh c??ng",
                      });
                      
                    };
                    openNotificationWithIcon("success");
                    props.onGetCustomerDetail(_id);
                    setCancel(false)

                  }, error => {

                  })
            }}
          >
            <p style={{ textAlign: "center" }}>
              B???n x??c nh???n s??? H???y
            </p>
          </Modal>
        </Loading>
      )) || <Empty description="Kh??ng t??m th???y kh??ch h??ng" />}
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    loading: state.customers.loading,
    customer_detail: state.customers.customer_detail,
    error: state.customers.error,
    banks: state.customers.banks,
    branches: state.customers.branches,
    loading_download: state.customers.loading_download,
    brandNames: state.customers.brandNames,
    brokers: state.customers.brokers,
    wrong_data: state.customers.wrong_data,
    draff: state.customers.draff,
    referral: state.customers.referral
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCustomerDetail: (id) => dispatch(actions.getCustomerDetail(id)),
    approved_customer: (id, success, error) =>
      dispatch(actions.approved_customer(id, success, error)),
    list_banks: () => dispatch(actions.list_banks()),
    list_branches_banks: (code) => dispatch(actions.list_branches_banks(code)),
    update_customers: (id, customer, success, error) =>
      dispatch(actions.update_customers(id, customer, success, error)),
    download_contract: (id, success, error) =>
      dispatch(actions.download_contract(id, success, error)),
    resend_contract_by_email: (id, success, error) =>
      dispatch(actions.resend_contract_by_email(id, success, error)),
    cancelCustomer: (id, success,error) => dispatch(actions.cancel(id, success, error)),
    getBrands: (region) => dispatch(actions.getBrands(region)),
    getBrokersCustomers: (region, brand) => dispatch(actions.getBrokersCustomers(region, brand)),
    updateManageBy: (id, data, success, error) => dispatch(actions.updateManageBy(id, data, success, error)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CustomerDetail));
