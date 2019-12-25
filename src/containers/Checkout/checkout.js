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
        },
        totalPrice:0
    }

    componentDidMount() {
        // O método URLSearchParams permite retirar os parâmetros inseridos em uma URL.
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            // cada param tem o formato do seguinte array: ['key','value']
            if(param[0]==='price'){
                price = param[1];
            }
            else{
                ingredients[param[0]] = +param[1] //o '+' converte um string em um número
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }
    
    onCheckoutCancel = () => {
        this.props.history.goBack();
    }

    onCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        // Observe a rota do ContactData que foi feita com o argumento render. Isso foi feito pois assim podemos passar dados pela rota sem precisar criar uma query na URL. Note que os objetos que o Router passa como argumento chegam à função anônima dentro de "props", então você tem que repassar esse props para o componente que está sendo instânciado.
        return(
            <div>
                <CheckoutSummary    
                    onCheckoutCancel={this.onCheckoutCancel} 
                    onCheckoutContinue={this.onCheckoutContinue} 
                    ingredients={this.state.ingredients}
                />
                <Route  path={this.props.match.path + '/contact-data'} 
                        render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />}
                />
            </div>
        );
    }
}

export default Checkout;