import * as api from '../../../api/apiCore';
import * as common from '../../../components/Common/Common';

export const getStockList = fetchData => async (dispatch) => {
    try {
        const res = await api.getStockList();
        if (res && !res.error) {
            return dispatch({
                type: 'STOCKS.LIST',
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