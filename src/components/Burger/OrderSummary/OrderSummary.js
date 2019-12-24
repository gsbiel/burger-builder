import React,{Component} from 'react';

import Button from '../../UI/Buttton/Button';

// Esse componente pode ser baseado em função. O professor colocou como classe pra testar o shouldComponentUpdate e dizer que esse método não deve ser implementado aqui, pois toda vez que o modal tiver que ser exibido, esse componente deve ser atualizado!
class OrderSummary extends Component{

    render(){
        
        const ingredientSummary = Object.keys(this.props.ingredients).map(ingKey =>{
            return <li key={ingKey}> <span style={{textTransform:'capitalize'}}>{ingKey}</span> : {this.props.ingredients[ingKey]}</li>
        })


        return(
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p> <strong>Total Price: {this.props.totalPrice.toFixed(2)} </strong> </p>
                <p>Continue to Checkout?</p>
                <Button btnType={"Danger"} clickButton={this.props.clickCancel}>Cancel</Button>
                <Button btnType={"Success"} clickButton={this.props.clickContinue}>Continue</Button>
            </React.Fragment>
        );
    }
}

export default OrderSummary;