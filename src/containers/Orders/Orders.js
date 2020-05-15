import React, {Component} from 'react';

import {connect} from 'react-redux';

import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

import Spinner from '../../components/UI/Spinner/Spinner';

import {
    fetchOrders
} from '../../store/actions/index';

import classes from './Orders.module.css';

class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders();
    }

    render(){

        let orders = <Spinner />;

        if (!this.props.loading){
            orders = this.props.orders.map(order => {
                return (
                    <Order  key = {order.id}
                            ingredients={order.ingredients}
                            price={order.totalPrice}/>
                );
            }) ;
        }

        return(
            <div className={classes.Orders}>
                {orders}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => {dispatch(fetchOrders())}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders,axios));