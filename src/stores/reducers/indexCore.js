let initialState = {
    data: [],
    'STOCKS.LIST': [],
    'BUY_ABLE.LIST': {},
    'SELL_ABLE.LIST': [],
    'EQUITY_ORDER.LIST': [],
    'EQUITY_ORDER.HISTORY': [],
    'EQUITY_ORDER.CANCEL': [],
    'EQUITY_ORDER.MODIFY': [],
    'BANK_ACCOUNT.LIST': {},
    'MARKET_STOCK.OBJ': {},
    'MARKET_FUTURES.OBJ': {},
    'LOGIN_CORE_INTERNAL': {}
}

let reducer = (state = initialState, action) => {
    return { ...state, [action.type]: action.data };
};

export default reducer;