import * as api from '../../../api/apiMaster';
import * as common from '../../../components/Common/Common';

export const actionRemind = fetchData => async (dispatch) => {
    try {
        const res = await api.actionRemind(fetchData);
        if (res && !res.arrError && !res.error) {
            return dispatch({
                type: 'ALERT.REMIND',
                data: res
            })
        } else {
            try {
                if(res.error){
                    common.notify("error", res.error);
                }else if(res.arrError){
                    if(res.arrError.length > 0){
                        for(const value of res.arrError){
                            common.notify("error", `${value.isTypeBuySell === 1 ? "Mua" : "Bán"} ${value.stockCode} ${value.message}`);
                        }
                    }
                }
            } catch (error) {
                
            }
        }
    } catch (er) {
        common.notify("error", er);
    }
}

export const getAlertHistory = fetchData => async (dispatch) => {
    try {
        const res = await api.getAlertHistory(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: 'ALERT.ALERT.HISTORY',
                data: res.data
            })
        } else {
            common.notify("error", "Thao tác thất bại");
        }
    } catch (er) {
        common.notify("error", er);
    }
}

export const updateRemind = fetchData => async (dispatch) => {
    try {
        const res = await api.updateRemind(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: 'UPDATE.REMIND',
                data: res.data
            })
        } else {
            common.notify("error", "Thao tác thất bại");
        }
    } catch (er) {
        common.notify("error", er);
    }
}

export const sendRemind = fetchData => async (dispatch) => {
    try {
        const res = await api.sendRemind(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: 'SEND.REMIND',
                data: res.data
            })
        } else {
            common.notify("error", "Thao tác thất bại");
        }
    } catch (er) {
        common.notify("error", er);
    }
}

export const sendRemindSell = fetchData => async (dispatch) => {
    try {
        const res = await api.sendRemindSell(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: 'SEND.REMIND.SELL',
                data: res.data
            })
        } else {
            common.notify("error", "Thao tác thất bại");
        }
    } catch (er) {
        common.notify("error", er);
    }
}

export const getAssetRecommend = fetchData => async (dispatch) => {
    try {
        const res = await api.getAssetRecommend(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: 'GET.ASSET.RECOMMEND',
                data: res.data
            })
        } else {
            common.notify("error", "Thao tác thất bại");

        }
    } catch (er) {
        common.notify("error", er);
    }
}

export const getStatistic = fetchData => async (dispatch) => {
    try {
        const res = await api.getStatistic(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: 'GET.STATISTIC',
                data: res.data
            })
        } else {
            common.notify("error", "Thao tác thất bại");
        }
    } catch (er) {
        common.notify("error", er);
    }
}