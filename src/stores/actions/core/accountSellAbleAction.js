import * as api from '../../../api/apiCore';
import * as common from '../../../components/Common/Common';

export const getAccountSellAble = fetchData => async (dispatch) => {
    try {
        const res = await api.getAccountSellAble(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: 'SELL_ABLE.LIST',
                data: res
            })
        } else {
            common.notify('error', 'Thao tác thất bại :( , ' + res.code);
            // return dispatch({
            //     message: res.message,
            // })
        }
    } catch (er) {
        common.notify("error", er);
    }
}