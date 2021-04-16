import React, { useCallback, useEffect, useState, useRef } from "react";

import { css } from "emotion";

import moment from "moment";
import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import * as R from "ramda";
import { connect } from "react-redux";
import * as storage from '../../api/storage';

import {
  Button,
  Radio,
  Input,
  Select,
  DatePicker,
  Table,
  Tooltip,
  Pagination,
  AutoComplete,
} from "antd";

import "antd/dist/antd.css";
import {
  PlusOutlined,
  FileTextOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import * as actions from "../../stores/actions/investor/customersAction";

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
  min-height: 100%;
  .description-text {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 22px;
    color: #333333;
  }
  .conatainer_DS {
    margin-top: 20px;
  }
  .container_description_text {
    align-self: center;
  }
  .container_button_dskh {
    margin-left: 24px;
  }
  .container_button_dskh .ant-btn {
    justify-content: center;
    display: flex;
  }
  .container_button_export .ant-btn {
    justify-content: center;
    display: flex;
    z-index: 9999;
  }
  .container_button_dskh .ant-btn-primary {
    background-color: #00377b;
    border-color: #00377b;
  }
  .container_button_export .ant-btn-primary {
    background-color: #333333;
    border-color: #333333;
  }
  .container-button-action {
    display: flex;
    justify-content: flex-end;
  }
  .container_button_export > button span:nth-child(2) {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    /* line-height: 16px; */
    /* identical to box height, or 123% */

    color: #ffffff;
  }
  .container_button_dskh > button span:nth-child(2) {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    color: #ffffff;
  }
  .tab_container_select .ant-radio-button-wrapper {
    padding-left: 43px;
    padding-right: 43px;
    margin-top: 41px;
    background: #e6ebf4;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: #666666;
  }
  .tab_container_select .ant-radio-button-wrapper-checked {
    background: #1e8af9;
  }
  .tab_container_select .ant-radio-button-wrapper-checked > span {
    color: white;
  }
  .tab_container_input {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .container-combox-MG .ant-select {
    width: 100%;
  }
  .container-combox-TT .ant-select {
    width: 100%;
  }
  .NO_PADDING {
    margin-top: 8px;
    margin-bottom: 8px;

    //padding: 8px 0px 8px 16px;
  }
  .container-combox-DATE .ant-picker {
    width: 100%;
  }
  .content-table .ant-table-content {
    width: 100%;
    overflow: auto;
    height: 100%;
  }
  .content-table .ant-table-wrapper,
  .content-table .ant-table-wrapper .ant-spin-nested-loading,
  .content-table .ant-table-wrapper .ant-spin-container,
  .content-table .ant-table-has-fix-left,
  .content-table .ant-table-container,
  .content-table .ant-table-content {
    height: 100%;
  }
  .content-table .ant-table-thead > tr > th {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #999999;
  }
  .content-table .ant-table-cell {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #333333;
  }
  .content-table .ant-table-row {
    cursor: pointer;
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

  @media screen and (max-width: 845px) {
    .container-button-action {
      margin-top: 16px;
      display: flex;
      justify-content: end;
    }
    .content-table .ant-table-thead > tr > th {
      font-size: 11px;
    }
  }
  @media screen and (max-width: 480px) {
    .description-text {
      font-size: 10px;
    }
    .content-table .ant-table-thead > tr > th {
      font-size: 9px;
    }
  }
  @media screen and (max-width: 768px) {
    .description-text {
      font-size: 10px;
    }
    .content-table .ant-table-thead > tr > th {
      font-size: 10px;
    }
  }
  @media screen and (min-width: 992px) {
    .description-text {
      font-size: 24px;
    }
    .content-table .ant-table-thead > tr > th {
      font-size: 12px;
    }
  }
  .content-table .ant-pagination-item {
    background: #ffffff;
    /* Middle Grey */

    border: 1px solid #e6ebf4;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .content-table .ant-pagination-item-active a {
    color: white;
  }
  .content-table .ant-pagination-item-active {
    background-color: #1e8af9;
  }
  .pagination-wrapper {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
`;

const columns = [
  {
    title: "#",
    dataIndex: "_id",
    key: "_id",
    fixed: "left",
    render: (text, record, index) => {
      return index + 1
    },
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
    key: "nam",
    fixed: "left",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Số CMND",
    dataIndex: "id_number",
    key: "id_number",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
    render: (text) => {
      let phone_first = text.substring(0, 3);

      let phone_last = text.substring(text.length, text.length - 3);
      //  let phone_string = text.substring(0,6)

      return <span>{phone_first + "*****" + phone_last}</span>;
    },
  },
  {
    title: "Số TK",
    dataIndex: "account_number",
    key: "account_number",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text) => {
      let email = text.split("@");
      let email_temp = email[0].substring(0, 3);
      return <span>{email_temp + "*******" + email[1]}</span>;
    },
  },
  {
    title: "NV chăm sóc",
    dataIndex: "manage_by",
    key: "manage_by",
    sorter: false,
    render: (text) => {
      return text && text.broker && text.broker.user_name + " - " + text.broker.name;
    },
  },
  {
    title: "Phòng GD",
    dataIndex: "manage_by",
    key: "manage_by",
    sorter: false,
    render: (text) => {
      return (
        text && text.brand && text.brand.display_name && text.brand.display_name
      );
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a, b) => {
      return moment(a.createdAt).unix() - moment(b.createdAt).unix();
    },
    render: (text) => {
      return moment(text).format("DD/MM/YYYY");
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    sorter: true,
    fixed: "right",
    render: (text) => {
      return generateHTMStatus(text);
    },
  },
];
const CustomersOnline = (props) => {
  const [tab, setTab] = useState("0");
  const [selectedRowKeys_value, set_selectedRowKeys] = useState({
    _id: [],
    start_date: moment(new Date(), "DD/MM/YYYY").subtract(1,"d").format('YYYY-MM-DD'),
    end_date:  moment(new Date(), "DD/MM/YYYY").format('YYYY-MM-DD')
  });
  const [dataFiter, set_data_fiter] = useState([]);
  const [params, set_params] = useState({
    id_number: "",
    status: "all",
    moigioi: "Tất cả môi giới",
    start_date: moment().subtract(1, "d"),
    end_date: moment(),
    room: "all",
  });
  const [userStorage, setUserStorage] = useState({
    profile: {},
    role: null
  })


  const [paramsExport, setParamsExport] = useState({
    search: '',
    status: '',
    broker: '',
    start_date: moment().subtract(1, "d").format('YYYY-MM-DD'),
    end_date: moment().format('YYYY-MM-DD'),
    brand: '',
  })

  const [options, setOptions] = useState([]);
  const [searchText, set_search_text] = useState("");

  const combobox_mg = useRef();
  let array_mgs =
    (props.mg_list.length > 0 &&
      props.mg_list.map((item, index) => {
        return {
          value: item.user_name + " - " + item.name,
          label: item.user_name + " - " + item.name,
          email: item.email
        };
      })) ||
    [];
  let array_mg_all = [
    ...[{ value: "Tất cả môi giới", label: "Tất cả môi giới" }],
    ...array_mgs,
  ];

  useEffect(() => {
    let role = storage.userInfoRole() === null ? [] : JSON.parse(storage.userInfoRole()).map((el) => {
        return el.hash
    })
    let profile = JSON.parse(localStorage.getItem('keyAuthInfoUser'));

    setUserStorage({
      profile,
      role
    });

    if (role && profile) {
      props.getBrandsByRole(role, profile.id);
      props.getBrokersByRole(role, profile.id);
      requestGetCustomers({profile, role}, {})
    }
    return () => {};
  }, []);

  function requestGetCustomers({profile, role}, query) {
    set_selectedRowKeys({
      ...selectedRowKeys_value,
      _id: []
    });
    props.onGetCustomer(profile.id,role, makeRequestParams(query),(data) => {
      set_data_fiter(data);
    });
  }
  function makeRequestParams(obj) {
    let params = {...paramsExport};
    params.from = paramsExport.start_date;
    params.to = paramsExport.end_date;
    params.status = params.status == 'all' ? '' : params.status;
    delete params.start_date;
    delete params.end_date;
    return {
      ...params,
      ...obj,
    }
  }

  const handleSeachSDT = () => {
    requestGetCustomers(userStorage, {
      page: 1,
      size: props.pagination.itemsPerPage
    })
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      set_selectedRowKeys({
        ...selectedRowKeys_value,
        _id: selectedRowKeys
      });
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };
  const handlChangeStatus = (value, event) => {
    let json = {
      ...params,
      ...{
        status: value,
      },
    };
    set_params({
      ...params,
      ...{
        status: value,
      },
    });
    set_selectedRowKeys(
      {
        ...selectedRowKeys_value,
        status: value
      }
    );
    setParamsExport({
      ...paramsExport,
      status: value
    });
    requestGetCustomers(userStorage, {
      status: value == 'all' ? '' : value,
      page: 1,
      size: props.pagination.itemsPerPage
    })
    
  };
  const handleSeachMGFrom = (value) => {
    let broker = array_mgs.find(br => br.value === value);
     setParamsExport({
      ...paramsExport,
      broker: broker ? broker.email : ''
    });

    
    requestGetCustomers(userStorage, {
      broker: broker ? broker.email : '',
      page: 1,
      size: props.pagination.itemsPerPage
    })
    // set_search_text(value);

    // let list_cuss = array_mg_all.filter((mg) => {
    //   return mg.value.includes(value);
    // });
    // setOptions(list_cuss);
  };

  const handlChangeRoom = (value, even) => {
    // let json_params = {
    //   ...params,
    //   ...{ room: value },
    // };

    let brand = value === 'all' ? '' : value;
   
    props.getBrokersByRole(userStorage.role, userStorage.profile.id, {
      brand
    });
    setParamsExport({
      ...paramsExport,
      brand,
    });
    requestGetCustomers(userStorage, {
      brand,
      page: 1,
      size: props.pagination.itemsPerPage
    })
    // set_params(json_params);
    // props.seacrch(json_params, (data) => {
    //   set_data_fiter(data);
    // });
  };
  const checkRoleMG = () => {
    let check_role_css = false;
    storage.userInfoRole() !== null && JSON.parse(storage.userInfoRole()).forEach(element => {
      if (element.hash === 'moigioi' )
      {
          check_role_css = true
      }
      
    });
    return check_role_css
  }
  const onClickExport = () => {
    let params = Object.keys(paramsExport).map(p => `${p}=${paramsExport[p]}`).join('&');
    console.log(params);
    window.open(
      `${process.env.REACT_APP_BASE_URL_CUSTOMER}/customers/export?${params}`
    );
  }
  const onChangeDate = (type, value) => {
    let params = {
      ...paramsExport,
      [type]: value
    };
    set_selectedRowKeys({
      ...selectedRowKeys_value,
      [type]: value
    });
    setParamsExport(params);
    
    requestGetCustomers(userStorage, {
      [type == 'start_date' ? 'from' : 'to']: value,
      page: 1,
      size: props.pagination.itemsPerPage
    })
  }

  const onChangePage = (page, pageSize) => {
    requestGetCustomers(userStorage, {
      page: page,
      size: pageSize
    })
  }

  const onShowSizeChange = (current, size) => {
    requestGetCustomers(userStorage, {
      page: 1,
      size
    })
  }

  return (
    <div className={["container-fluid", $].join(" ")}>
      <div className="container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 conatainer_DS">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 container_description_text">
              <span className="description-text">
                Danh sách KH đăng ký online
              </span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 container-button-action">
              {
                checkRoleMG() === false && 
                <div className="container_button_export">
                <Button
                  type="primary"
                  icon={<FileTextOutlined />}
                  size="default"
                  onClick={(e) => onClickExport()}
                >
                  Export
                </Button>
              </div>
              }
              <div className="container_button_export" style={{ marginLeft: '5px'}}>
                <Button
                  type="primary"
                  icon={<FileTextOutlined />}
                  size="default"
                  disabled={ R.isEmpty(selectedRowKeys_value._id) ? true : false}
                  onClick={(e) => {
                 
                    var queryString = Object.keys(selectedRowKeys_value).map(key => key + '=' + selectedRowKeys_value[key]).join('&');
                    console.log('queryString =======', queryString)
                    window.open(
                      `${process.env.REACT_APP_BASE_URL_CUSTOMER}/download-contract?${queryString}`
                    );
                  }}
                >
                  Download
                </Button>
              </div>
              <div className="container_button_dskh">
                <Button type="primary" icon={<PlusOutlined />} size="default">
                  Thêm tài khoản mới
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 tab_container_select">
          <Radio.Group
            defaultValue={tab}
            buttonStyle="solid"
            onChange={(e) => {
              setTab(e.target.value);
            }}
          >
            <Radio.Button value="0">eKYC</Radio.Button>
            <Radio.Button value="1">TT liên lạc</Radio.Button>
          </Radio.Group>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 tab_container_input">
          <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-12 col-12 NO_PADDING">
              <div className="container-input-phone">
              <Tooltip title="Tìm theo CMND, SĐT, Số TK">
                <Input
                    placeholder="Tìm theo CMND, SĐT, TK... "
                    prefix={<SearchOutlined />}
                    allowClear={true}
                    onChange={(e) => {
                      setParamsExport({
                        ...paramsExport,
                        search: e.target.value
                      });
                    }}
                    onPressEnter={(e) => {
                      handleSeachSDT();
                    }}
                  />
              </Tooltip>,
                
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-12 NO_PADDING">
              <div className="container-combox-MG">
                <AutoComplete
                  ref={combobox_mg}
                  allowClear={true}
                  options={(searchText === "" && array_mg_all) || options}
                  defaultValue="Tất cả môi giới"
                  onSelect={(value) => {
                    handleSeachMGFrom(value);
                  }}
                  filterOption={(inputValue, option) =>
                    option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                ></AutoComplete>
                {/* <Select  defaultValue="all"  onChange={(value, e) => {
                  
                    handleSearchMG(value)
                }}>
                  <Option value="all">Tất cả MG</Option>
                  {
                   props.mg_list.length > 0 && props.mg_list.map((item,index) => {
                      return (<Option key={index} value={item.email}>{ item.user_name + ' - ' +  item.name}</Option>)
                    })
                  }
                </Select> */}
              </div>
            </div>
            <div
              className="col-lg-2 col-md-2 col-sm-12 col-12 NO_PADDING"
              style={
                {
                  // textAlign: "right",
                }
              }
            >
              <div className="container-combox-TT">
                <Select defaultValue="all" onChange={handlChangeRoom}>
                  <Option value="all">Tất cả phòng GD</Option>
                  {props.rooms.length > 0 &&
                    props.rooms.map((item, index) => {
                      return (
                        <Option
                          key={item.display_name}
                          value={item.name}
                        >
                          {item.display_name}
                        </Option>
                      );
                    })}
                </Select>
              </div>
            </div>

            <div
              className="col-lg-2 col-md-2 col-sm-12 col-12 NO_PADDING"
              style={{
                textAlign: "right",
              }}
            >
              <div className="container-combox-DATE">
                <DatePicker
                  defaultValue={moment(new Date(), "DD/MM/YYYY").subtract(
                    1,
                    "d"
                  )}
                  locale={locale}
                  format="DD/MM/YYYY"
                  onChange={(date, dateString) => {
                    let json_params = {
                      ...params,
                      ...{ start_date: dateString !== "" ? date : "" },
                    };
                   
                     if (dateString !== "")
                     {
                      set_selectedRowKeys({
                        ...selectedRowKeys_value,
                        start_date: date.format('YYYY-MM-DD')
                      })
                      onChangeDate('start_date', date.format('YYYY-MM-DD'));
                     }
                     else {
                      let newObjs = selectedRowKeys_value
                      delete newObjs['start_date'];
                      set_selectedRowKeys(newObjs)
                      onChangeDate('start_date', '');
                     }
                     
                    
                   
                    set_params(json_params);
                    props.seacrch(json_params, (data) => {
                      set_data_fiter(data);
                    });
                  }}
                />
              </div>
            </div>
            <div
              className="col-lg-2 col-md-2 col-sm-12 col-12 NO_PADDING"
              style={{
                textAlign: "right",
              }}
            >
              <div className="container-combox-DATE">
                <DatePicker
                  defaultValue={moment(new Date(), "DD/MM/YYYY")}
                  locale={locale}
                  format="DD/MM/YYYY"
                  onChange={(date, dateString) => {
                    if (dateString !== "") {
                      let json_params = {
                        ...params,
                        ...{ end_date: dateString !== "" ? date : "" },
                      };
                      set_selectedRowKeys({
                        ...selectedRowKeys_value,
                        end_date: date.format('YYYY-MM-DD')
                      });

                      onChangeDate('end_date', date.format('YYYY-MM-DD'));
                     
                      set_params(json_params);
                      props.seacrch(json_params, (data) => {
                        set_data_fiter(data);
                      });
                    }
                    else {
                      let newObjs = selectedRowKeys_value
                      delete newObjs['end_date'];
                      set_selectedRowKeys(newObjs);
                      onChangeDate('end_date', '');
                    }
                  }}
                />
              </div>
            </div>

            <div className="col-lg-2 col-md-2 col-sm-12 col-12 NO_PADDING">
              <div className="container-combox-TT">
                <Select defaultValue="all" onChange={handlChangeStatus}>
                  <Option value="all">Tất cả trạng thái</Option>
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
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 col-12 content-table">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={
              params.id_number !== ""
                ? dataFiter
                : params.moigioi !== "all"
                ? dataFiter
                : params.status !== "all"
                ? dataFiter
                : params.start_date !== ""
                ? dataFiter
                : params.end_date !== ""
                ? dataFiter
                : params.room !== "all"
                ? dataFiter
                : props.list_online
            }
            rowKey={(record) => record._id}
            fixed={true}
            pagination={false}
            showSorterTooltip={false}
            loading={props.loading}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  window.open(`/customers-online/${record._id}`);
                  //props.history.push(`customers/${record._id}`);
                }, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
          />
          {
            props.pagination.totalRecord  === 0 ? null :
            <div className="pagination-wrapper">
                        <Pagination 
                          current={props.pagination.currentPage}
                          pageSize={props.pagination.itemsPerPage}
                          total={props.pagination.totalRecord}
                          showSizeChanger
                          onChange={onChangePage}
                          onShowSizeChange={onShowSizeChange}
                        />
            </div>
          }
          
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.customers.loading,
    list_online: state.customers.list_online,
    pagination: state.customers.pagination,
    mg_list: state.customers.mg_list,
    rooms: state.customers.rooms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCustomer: (id,role,query,callback) => dispatch(actions.getCustomer(id,role,query,callback)),
    seacrch: (params, callback) => dispatch(actions.seacrch(params, callback)),
    getBrokersByRole: (role, id, query = {}) => dispatch(actions.getBrokersByRole(role, id, query)),
    getBrandsByRole: (role, id) => dispatch(actions.getBrandsByRole(role, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersOnline);
