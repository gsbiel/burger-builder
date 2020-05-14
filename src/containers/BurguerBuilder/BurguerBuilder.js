import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';

import axios from '../../axios-orders'; //instância do axios importada para realizer pedidos.

import {
    addIngredient,
    removeIngredient
} from '../../store/actions/index'

class BurgerBuilder extends Component{

    constructor(props){
        super(props);
        this.state = {
            ordering: false,
            loading: false,
            error: false
        }
    }

    componentDidMount(){
        // axios.get('https://my-react-burger-40b18.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         let data=null
        //         if(response){
        //             data = response.data;
        //         }
        //         this.setState({ingredients: data})
        //     })
        //     .catch(error=>{
        //         this.setState({error:true})
        //     })
    }

    orderClickHandler = () =>{
        const actualState = {...this.state};
        const newState = {...actualState, ordering: true};
        this.setState(newState);
    }

    backDropClickHandler = () =>{
        const actualState = {...this.state};
        const newState = {...actualState, ordering: false};
        this.setState(newState);
    }

    continueHandler = () => {
        // Vamos passar os dados dos ingredientes como argumentos dentro da URL, como queries.
        // O método encodeURIComponent() pega elementos de um objeto e formata eles para que sejam inseridos em uma query string
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push("price="+this.state.totalPrice);
        // const queryString = queryParams.join('&');

        // AGORA QUE REDUX ESTÁ SENDO USADO, NÃO É PRECISO PASSAR ARGUMENTOS VIA QUERY STRING DENTRO DA URL
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    updatePurchaseState = (ingredients) => {
        const arrayAmount = Object.keys(ingredients).map(ingKey =>{
            return ingredients[ingKey];
        });
        const sum = arrayAmount.reduce((previous,next)=>{
            return previous+next;
        },0);
        return sum>0;
    }


    render(){
        const checkDisableBtn = {...this.props.ings};
        for(let key in checkDisableBtn){
            checkDisableBtn[key] = checkDisableBtn[key]<=0 ;
        }
        
        let orderSummary = null;

        let burguer = this.state.error ? <p>Ingredients could not be loaded :(</p> : <Spinner/>;

        if(this.props.ings){

            burguer = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemove}
                        isDisableObj={checkDisableBtn} 
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordering={this.orderClickHandler}/>
                </React.Fragment>
            );

            orderSummary = <OrderSummary 
                                ingredients={this.props.ings}
                                clickCancel={this.backDropClickHandler}
                                clickContinue={this.continueHandler}
                                totalPrice={this.props.price}/>;
        }   

        if(this.state.loading) {
            orderSummary = <Spinner /> ;
        }

        return(
            <React.Fragment>
                    <Modal show={this.state.ordering} modalClose={this.backDropClickHandler}>
                        {orderSummary}
                    </Modal> 
                    {burguer}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => {dispatch(addIngredient(ingName))},
        onIngredientRemove: (ingName) => {dispatch(removeIngredient(ingName))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));