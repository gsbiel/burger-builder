import {
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_INIT
} from './actionTypes';

import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: PURCHASE_BURGER_FAIL,
        error: error
    };
};


export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START
    };

};

export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                console.log(error)
                console.log("ENTREI AQUIIII")
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (order) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders: order
    };
};

export const fetchOrdersFail = (error) => {
    return{
        type: FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type:FETCH_ORDERS_INIT
    };
};

export const fetchOrders = () => {
    return (dispatch) => {

        dispatch(fetchOrdersStart());
        
        axios.get('/orders.json')
            .then(resp => {
                const fetchedOrders = [];
                for(let key in resp.data){
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err=>{
                dispatch(fetchOrdersFail(err));
            })
    }
}