import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders'; //instância do axios importada para realizer pedidos.

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese:0.4,
    meat: 1.3
}

class BurgerBuilder extends Component{

    constructor(props){
        super(props);
        this.state = {
            ingredients:null,
            totalPrice: 4,
            purchasable:false,
            ordering: false,
            loading: false,
            error: false
        }
    }

    componentDidMount(){
        axios.get('https://my-react-burger-40b18.firebaseio.com/ingredients.json')
            .then(response => {
                let data=null
                if(response){
                    data = response.data;
                }
                this.setState({ingredients: data})
            })
            .catch(error=>{
                this.setState({error:true})
            })
    }

    addIngredientHandler = (type) =>{
        const actualState = this.state;
        const actualIngredients = actualState.ingredients;
        const newIngredients = {...actualIngredients};
        newIngredients[type] = newIngredients[type] + 1;
        const newPrice = actualState.totalPrice + INGREDIENT_PRICES[type];
        const newState = {...actualState, ingredients: newIngredients, totalPrice: newPrice}
        this.setState(newState);

        this.updatePurchaseState(newIngredients);
    }

    removeIngredientHandler = (type) =>{
        const actualState = this.state;
        const actualIngredients = actualState.ingredients;
        const newIngredients = {...actualIngredients};
        newIngredients[type] = actualIngredients[type]>0 ? (newIngredients[type] - 1) : 0;
        const newPrice = actualState.totalPrice - INGREDIENT_PRICES[type];
        const newState = {...actualState, ingredients: newIngredients, totalPrice: newPrice}
        this.setState(newState);

        this.updatePurchaseState(newIngredients);
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
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push("price="+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    updatePurchaseState = (ingredients) => {
        const arrayAmount = Object.keys(ingredients).map(ingKey =>{
            return ingredients[ingKey];
        });
        const sum = arrayAmount.reduce((previous,next)=>{
            return previous+next;
        },0);
        this.setState({purchasable: sum ? true : false });
    }


    render(){
        const checkDisableBtn = {...this.state.ingredients};
        for(let key in checkDisableBtn){
            checkDisableBtn[key] = checkDisableBtn[key]<=0 ;
        }
        
        let orderSummary = null;

        let burguer = this.state.error ? <p>Ingredients could not be loaded :(</p> : <Spinner/>;

        if(this.state.ingredients){

            burguer = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        isDisableObj={checkDisableBtn} 
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordering={this.orderClickHandler}/>
                </React.Fragment>
            );

            orderSummary = <OrderSummary 
                                ingredients={this.state.ingredients}
                                clickCancel={this.backDropClickHandler}
                                clickContinue={this.continueHandler}
                                totalPrice={this.state.totalPrice}/>;
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

export default withErrorHandler(BurgerBuilder,axios);