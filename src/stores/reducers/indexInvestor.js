let initialState = {
    data: [],
    'PROPORTION.PUT': {},
    'UPLOAD.ICON': {}
}

let reducer = (state = initialState, action) => {
    return { ...state, [action.type]: action.data };
};

export default reducer;