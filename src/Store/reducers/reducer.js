import * as actionsTypes from '../actions/actiontypes';

const initialState = {

    name: null,
    image: null,
    price: null,
    delivery: "cheapest",
    purchasing: false,
    loading: false,
    checkout: false,
    token: null,
    userId: null,
    error: null,
    loading: false,
    buying: false,
    count: 1,
    reserved: false,
    desc: null
};

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionsTypes.PURCHASE_CONT:
            return{
                ...state,
                name: action.name,
                image: action.image,
                price: action.price,
                purchasing: true,
                desc: action.desc
            };

        case actionsTypes.PURCHASE_CANCEL:
            return{
                ...state,
                purchasing: false
            }

        case actionsTypes.CHECKOUT_CONT:
            return{
                ...state,
                checkout: true 
            }

        case actionsTypes.CHECKOUT_CANCEL:
            return{
                ...state,
                checkout: false
            }

        case actionsTypes.AUTH_START: 
            return{
                ...state,
                error: null,
                loading: true
            }

        case actionsTypes.AUTH_SUCCESS:
            return{
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            }

        case actionsTypes.AUTH_FAIL:
            return{
                ...state,
                error: action.error,
                loading: false
            }

        case actionsTypes.AUTH_LOGOUT:
            return{
                ...state,
                token: null,
                userId: null
            }

        case actionsTypes.BUY_CHANGE: 
        return{
            ...state,
            buying: true
        }

        case actionsTypes.BUY_NOT: 
        return{
            ...state,
            buying: false
        }

        default:
            return state;
    }

};

export default reducer;