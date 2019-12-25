import React,{Component} from 'react';
import {Route} from 'react-router-dom';

import ContactData from './ContactData/ContactData';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state ={ // Dumb data
        ingredients:{
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        // O método URLSearchParams permite retirar os parâmetros inseridos em uma URL.
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let param of query.entries()){
            // cada param tem o formato do seguinte array: ['ingredient','value']
            ingredients[param[0]] = +param[1] //o '+' converte um string em um número
        }
        this.setState({ingredients: ingredients});
    }
    
    onCheckoutCancel = () => {
        this.props.history.goBack();
    }

    onCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary    
                    onCheckoutCancel={this.onCheckoutCancel} 
                    onCheckoutContinue={this.onCheckoutContinue} 
                    ingredients={this.state.ingredients}
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
}

export default Checkout;