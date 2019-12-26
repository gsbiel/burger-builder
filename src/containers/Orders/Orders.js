import React, {Component} from 'react';

import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

import classes from './Orders.module.css';

class Orders extends Component {
    state ={
        loading: true,
        orders:[]
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(resp => {
                const fetchedOrders = [];
                for(let key in resp.data){
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    });
                }
                this.setState({loading:false, orders: fetchedOrders});
            })
            .catch(err=>{
                this.setState({loading:false});
            })
    }

    render(){
        return(
            <div className={classes.Orders}>
                {this.state.orders.map(order => {
                    return (
                        <Order  key = {order.id}
                                ingredients={order.ingredients}
                                price={order.totalPrice}/>
                    );
                })}
            </div>
        );
    }

}

export default withErrorHandler(Orders,axios);