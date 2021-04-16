export const accessTokenAuth = ()=>{
    return localStorage.getItem('accessTokenAuthKey');
}

//token api core
export const userInfoRole = ()=>{
    return localStorage.getItem('keyRoleUser');
}

//token api core
export const accessTokenCore = ()=>{
    return localStorage.getItem('accessTokenCore');
}

//remember section order
export const rememberSectionOrder = (obj)=>{
    return localStorage.setItem('rememberSectionOrder', obj);
}

export const removeSectionOrder = ()=>{
    return localStorage.removeItem('rememberSectionOrder');
}
//remember order quick
export const rememberOrderQuick = (obj)=>{
    return localStorage.setItem('rememberOrderQuick', obj);
}
export const removeOrderQuick = ()=>{
    return localStorage.removeItem('rememberOrderQuick');
}

export const removeStorageToken = ()=>{
    localStorage.removeItem('accessTokenAuthKey');
    localStorage.removeItem("accountInfoKey");
    localStorage.removeItem("accessTokenCore");
    localStorage.removeItem("userInfoKey");
    localStorage.removeItem("keyRoleUser");
    localStorage.removeItem("keyAuthInfoUser")
    return '';
}