import * as api from '../../../api/apiCore';
import * as common from '../../../components/Common/Common';

export const getMarketStock = fetchData => async (dispatch) => {
    try {
        const res = await api.getMarketStock(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: 'MARKET_STOCK.OBJ',
                data: res
            })
        } else {
            common.notify('error', 'Thao tác thất bại :( , ' + res.code);
            // return dispatch({
            //     message: res.message,
            // })
        }
    } catch (er) {
        common.notify("error", "Thao tác thất bại" + er);
        // return dispatch({
        //     message: er,
        // })
    }
}

export const getMarketFutures = fetchData => async (dispatch) => {
    try {
        const res = await api.getMarketFutures(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: 'MARKET_FUTURES.OBJ',
                data: res
            })
        } else {
            common.notify('error', 'Thao tác thất bại :( , ' + res.code);
            // return dispatch({
            //     message: res.message,
            // })
        }
    } catch (er) {
        common.notify("error", "Thao tác thất bại" + er);
        // return dispatch({
        //     message: er,
        // })
    }
}