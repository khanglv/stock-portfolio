import * as api from '../../../api/api';
import * as common from '../../../components/Common/Common';

export const deleteIndex = fetchData => async (dispatch) => {
    try {
        const res = await api.deleteIndex(fetchData);
        if (res && res.success) {
            return dispatch({
                type: 'INDEX.DELETE',
                data: res.data
            })
        } else {
            common.notify('error', 'Thao tác thất bại :( , ' + res.message);
        }
    } catch (er) {
        common.notify("error", "Thao tác thất bại" + er);
    }
}

export const actionIndex = fetchData => async (dispatch) => {
    try {
        const res = await api.actionIndex(fetchData);
        if (res && res.success) {
            return dispatch({
                type: 'INDEX.POST',
                data: res.data
            })
        } else {
            common.notify('error', 'Thao tác thất bại :( , ' + res.message);
        }
    } catch (er) {
        common.notify("error", "Thao tác thất bại" + er);
    }
}

export const updateIndex = fetchData => async (dispatch) => {
    try {
        const res = await api.updateIndex(fetchData);
        if (res && res.success) {
            return dispatch({
                type: 'INDEX.PUT',
                data: res.data
            })
        } else {
            common.notify('error', 'Thao tác thất bại :( , ' + res.message);
        }
    } catch (er) {
        common.notify("error", "Thao tác thất bại" + er);
    }
}

export const getListIndex = fetchData => async (dispatch) => {
    try {
        const res = await api.getListIndex(fetchData);
        if (res && res.success) {
            return dispatch({
                type: 'INDEX.GET',
                data: res.data
            })
        } else {
            common.notify('error', 'Thao tác thất bại :( , ' + res.message);
        }
    } catch (er) {
        common.notify("error", "Thao tác thất bại" + er);
    }
}

export const activeIndex = fetchData => async (dispatch) => {
    try {
        const res = await api.activeIndex(fetchData);
        if (res && res.success) {
            return dispatch({
                type: 'INDEX.PUT',
                data: res.data
            })
        } else {
            common.notify('error', 'Thao tác thất bại :( , ' + res.message);
        }
    } catch (er) {
        common.notify("error", "Thao tác thất bại" + er);
    }
}