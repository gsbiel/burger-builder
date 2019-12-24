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

        //Ao clicar no botão Continue, o Spinner deve ser exibido até que a requisição seja completada.
        this.setState({loading:true});

        //alert('You have clicked on the Continue button...');
        //Para comunicar com um backend no FireBase, é preciso colocar o formato do dado que vai ser associado à diretiva, nesse caso, a diretiva é /post e o formato é json.
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer:{  // Essa parte é Dumb Code só para deixar o pedido mais realista.
                name: 'Max',
                address:{
                    street: 'TestStreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                // Após a requisição, devemos tanto remover o Spinner quanto o Modal
                this.setState({loading:false, ordering:false});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading:false, ordering: false});
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