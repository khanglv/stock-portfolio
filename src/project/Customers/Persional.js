import React, { useState } from "react";
import "antd/dist/antd.css";
import { Upload, Button } from "antd";
import { css } from "emotion";
import { GENDER, CONFIRM_CONTRACT } from "../../utils";
import { UploadOutlined, FilePdfOutlined } from "@ant-design/icons";
import * as storage from "../../api/storage";
import * as R from "ramda";
import { checkRole } from "../../stores/actions/investor/customersAction";
import { WrongData } from "./WrongData";

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
`;

export default function Persional(props) {
  const [fileList, set_fileList] = useState([
    {
      uid: 1,
      name: props.customer.files[0],
      status: "done",
      url: props.customer && props.customer.files && props.customer.files[0],
    },
  ]);
  const [fileList_After, set_fileList_After] = useState([
    {
      uid: 2,
      name: props.customer.files[1],
      status: "done",
      url: props.customer && props.customer.files && props.customer.files[1],
    },
  ]);

  const handleChange = ({ fileList }) => set_fileList(fileList);

  const handleChange_after = ({ fileList }) => set_fileList_After(fileList);

  const checkRoleMG = () => {
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
            checkRoleMG() === false && (
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
            checkRoleMG() === false && (
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
            checkRoleMG() === false && (
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
            <span className="part-personal-title">Thông tin cá nhân</span>
          </div>
          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Họ và tên</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer && props.customer.name}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Ngày sinh</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer && props.customer.date_of_birth}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Giới tính</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer &&
                    props.customer.gender &&
                    GENDER[props.customer.gender]}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Số CMND/CCCD</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer && props.customer.id_number}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Ngày cấp</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer && props.customer.id_issue_date}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Nơi cấp</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer && props.customer.id_issue_place}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <span className="part-personal-title">Thông tin liên lạc</span>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Địa chỉ</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer && props.customer.address}
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Địa chỉ thường trú</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer && props.customer.address_permermanent}
                </span>
              </div>
            </div>

          </div>
          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Email</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer && props.customer.email}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2 mb-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Số điện thoại</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer && props.customer.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-2">
          <div className="col-lg-12 col-md-12 col-12 col-sm-12">
            <span className="part-personal-title">Hình CMND/CCCD</span>
          </div>
          <div className="col-lg-12 col-md-12 col-12 col-sm-12">
            <span className="personal-title">Mặt trước</span>
          </div>
          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2 upload-before">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              showUploadList={{
                showPreviewIcon: false,
                removeIcon: <img src="/icon/ic_remove.png" />,
              }}
              fileList={
                (props.customer && props.customer.files && fileList) || []
              }
              multiple={false}
              onChange={handleChange}
            >
              {fileList.length === 0 && (
                <div>
                  <div>
                    <span className="title-upload">Kéo thả ảnh vào đây</span>
                  </div>
                  <div>
                    <span className="title-upload-or">hoặc</span>
                  </div>
                  <div className="btn-upload">
                    <Button type="default" size="small">
                      Tải ảnh
                    </Button>
                  </div>
                </div>
              )}
            </Upload>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12">
            <span className="personal-title">Mặt sau</span>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2 upload-before">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={
                (props.customer && props.customer.files && fileList_After) || []
              }
              showUploadList={{
                showPreviewIcon: false,
                removeIcon: <img src="/icon/ic_remove.png" />,
              }}
              onChange={handleChange_after}
            >
              {fileList_After.length === 0 && (
                <div>
                  <div>
                    <span className="title-upload">Kéo thả ảnh vào đây</span>
                  </div>
                  <div>
                    <span className="title-upload-or">hoặc</span>
                  </div>
                  <div className="btn-upload">
                    <Button type="default" size="small">
                      Tải ảnh
                    </Button>
                  </div>
                </div>
              )}
            </Upload>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-2">
          <div className="col-lg-12 col-md-12 col-12 col-sm-12">
            <span className="part-personal-title">Hợp đồng</span>
          </div>

          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">Danh sách hợp đồng</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  <span
                    className="link_download"
                    onClick={() => {
                      props.handleDownload && props.handleDownload();
                    }}
                  >
                    ( Tạo hợp đồng )
                  </span>
                </span>
              </div>
            </div>
          </div>

          {props.customer.contracts &&
            R.isEmpty(props.customer.contracts) === false &&
            props.customer.contracts.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2"
                >
                  <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                      <a href={item.link_pdf}>
                        <FilePdfOutlined />
                        <span className="link_download">{item.file_name}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {props.wrong_data ? 
        <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-2">
          <WrongData notes={props.wrong_data} />
        </div>
        : null}
      </div>
      <div className="row mt-3">
        <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-2">
          <div className="col-lg-12 col-md-12 col-12 col-sm-12">
            <span className="part-personal-title">Ngân hàng</span>
          </div>
          <div className="col-lg-12 col-md-12 col-12 col-sm-12 mt-2">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <span className="personal-title">STK Ngân hàng</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                <span className="personal-desc">
                  {props.customer && props.customer.bank_account}
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5 mt-2">
                <span className="personal-title">Tên người thụ hưởng</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7 mt-2">
                <span className="personal-desc">
                  {props.customer && props.customer.bank_owner}
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5 mt-2">
                <span className="personal-title">Tên ngân hàng</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7 mt-2">
                <span className="personal-desc"></span>
              </div>
            </div>

            <div className="row mb-5">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5 mt-2">
                <span className="personal-title">CN Ngân hàng</span>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7 mt-2">
                <span className="personal-desc">
                  {props.customer && props.customer.bank_brand}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
