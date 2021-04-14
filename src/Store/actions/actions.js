import axios from 'axios';

import * as actionTypes from './actiontypes';

export const purchaseCont = (name, price) => {
    return {
        type: actionTypes.PURCHASE_CONT,
        name: name,
        price: price
    };
}

export const purchaseCancel = () => {
    return {
        type: actionTypes.PURCHASE_CANCEL
    };
}

export const checkoutCont = () => {
    return {
        type: actionTypes.CHECKOUT_CONT
    };
}

export const checkoutCancel = () => {
    return {
        type: actionTypes.CHECKOUT_CANCEL
    };
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {

    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: "error"
    }
}

export  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const buyChange = () => {
    return{
        type: actionTypes.BUY_CHANGE
    }
}

export const buyNot = () => {
    return{
        type: actionTypes.BUY_NOT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};



export const auth = (email, password, signup) => {
    return dispatch => {
        console.log("started");
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
       
        if(signup){
            axios.post('http://localhost:4000/api/users/Register', authData)
            .then(response => {
                if(response.data.error=="t"){
                    dispatch(authFail("error!!!"));
                   
                }else{
                    const exp = new Date(new Date().getTime() + 3600 * 1000)
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('exp', exp);
                    localStorage.setItem('userId', response.data.result[0].id);
                    dispatch(authSuccess(response.data.token, response.data.result[0].id));
                    dispatch(checkAuthTimeout(3600));
                    console.log(response.data.token, response.data.result[0].id)
                }
                
            })
            .catch(error => {
                dispatch(authFail("error!!!"));
            })
        }else{
            axios.post('http://localhost:4000/api/users/Login', authData)
            .then(response => {
                if(response.data.error=="t"){
                    dispatch(authFail("error!!!"));
                   
                }else{
                    console.log(response.data);
                    const exp = new Date(new Date().getTime() + 3600 * 1000)
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('exp', exp);
                    localStorage.setItem('userId', response.data.id);
                    dispatch(authSuccess(response.data.token, response.data.id));
                    dispatch(checkAuthTimeout(3600));
                    console.log(response.token, response.id)
                }
               
            })
            .catch(error => {
                dispatch(authFail("error!!!"));
            })
        }
       
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const exp = new Date(localStorage.getItem('exp'));
            if (exp <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((exp.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};