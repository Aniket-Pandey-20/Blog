export const LoginStart= (userCredential)=>{
    return({
        type:"LOGIN_START",
    })
};

export const LoginSuccess = (user)=>{
    return({
        type:"LOGIN_SUCCESS",
        Payload:user,
    })
};

export const LoginFailure = ()=>{
    return({
        type:"LOGIN_FAILURE",
    })
};

export const Logout = ()=>({
    type:"LOGOUT",
});

export const UpdateStart= (userCredential)=>{
    return({
        type:"UPDATE_START",
    })
};

export const UpdateSuccess = (user)=>{
    return({
        type:"UPDATE_SUCCESS",
        Payload:user,
    })
};

export const UpdateFailure = ()=>{
    return({
        type:"UPDATE_FAILURE",
    })
};

