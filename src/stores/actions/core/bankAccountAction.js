import * as api from '../../../api/apiCore';
import * as common from '../../../components/Common/Common';

export const getBankAccount = fetchData => async (dispatch) => {
    try {
        const res = await api.getBankAccount(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: 'BANK_ACCOUNT.LIST',
                data: res
            })
        } else {
            common.notify("error", res.error);
        }
    } catch (er) {
        common.notify("error", er);
        // return dispatch({
        //     message: er,
        // })
    }
}