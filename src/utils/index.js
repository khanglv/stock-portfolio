import moment from "moment";
export const RATIO_STATE_CUSTOMER_ONLINE = {
    'NEW_REGISTER': '1. Liên hệ mới',
    'EKYC_SUCCESS': '2. eKYC thành công',
    'EKYC_FAILED': '3. eKYC không thành công',
    'CS_CONFIRM': '4. CS phê duyệt',
    'WAITING_COMPLETE': '5. Chờ hoàn tất',
    'COMPLETED_CONTRACT': '6. Đã nhận hợp đồng',
    'COMPLETED': '7. Hoàn tất',
    'CANCEL': '8. Hủy',
   
}
export const GENDER = {
    'MALE' : 'NAM',
    'FEMALE': 'NỮ'
}
export function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 || 0;
        d = Math.floor(d/16);
        return (c==='x' ? r : (r&&0x3|0x8)).toString(16);
    });
    return uuid;
};

export const STEPNUM = [
    'CONFIRM_OTP',
    'EKYC_OCR',
    'EKYC_FACE_AUTH',
    'WAITING_ACTIVE',
    'FINISHED'

]

export const CONFIRM_CONTRACT = [
    "NEW_REGISTER",
    "EKYC_SUCCESS",
    "EKYC_FAILED",
    "CS_CONFIRM",
    "WAITING_COMPLETE"


]
export const calculate_age = (dob1) => {
    var today = moment();
    var birthDate = moment(dob1, 'DD/MM/YYYY');
    console.log('birthDate ========', birthDate);
    console.log('dob1 ========', dob1);
      // create a date object directly from `dob1` argument
    var age_now = today.year() - birthDate.year();
    var m = today.month() - birthDate.month();
    if (m < 0 || (m === 0 && today.date() < birthDate.date())) 
    {
        age_now--;
    }
    return age_now;
  }

  export const calculate_issue_date = (issue_date) => {
    var today = moment();
    var issue_date = moment(issue_date, 'DD/MM/YYYY');
    let issue_date_year = issue_date.add(15, 'years')
    if (issue_date_year.isSameOrAfter(today))
    {        
            return true
    }
    else {
        return false
    }
    
  }

