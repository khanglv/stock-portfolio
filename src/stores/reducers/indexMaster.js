let initialState = {
    data: [],
    'ALERT.REMIND': {},
    'ALERT.ALERT.HISTORY': [],
    'UPDATE.REMIND': {},
    'SEND.REMIND': {},
    'SEND.REMIND.SELL': {},
    'GET.ASSET.RECOMMEND': [],
    'GET.STATISTIC': []
}

let reducer = (state = initialState, action) => {
    return { ...state, [action.type]: action.data };
};

export default reducer;