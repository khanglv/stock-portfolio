import * as api from '../../../api/apiCore';
import * as common from '../../../components/Common/Common';

export const equityAccountProfitLoss = fetchData => async (dispatch) => {
    try {
        const res = await api.equityAccountProfitLoss(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: 'EQUITY_ACCOUNT.PROFIT_LOSS',
                data: res
            })
        } else {
            common.notify('error', 'Thao tác thất bại :(' + res.code);
        }
    } catch (er) {
        common.notify("error", er);
    }
}

export const equityAccountAssetInfo = fetchData => async (dispatch) => {
    try {
        const res = await api.equityAccountAssetInfo(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: 'EQUITY_ACCOUNT.ASSET_INFO',
                data: res
            })
        } else {
            common.notify('error', 'Thao tác thất bại :(' + res.code);
        }
    } catch (er) {
        common.notify("error", er);
    }
}