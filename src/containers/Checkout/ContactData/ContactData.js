import React,{Component} from 'react';
import {connect} from 'react-redux'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Buttton/Button';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../components/hoc/withErrorHandler/withErrorHandler';

import {
    purchaseBurger
} from '../../../store/actions/index';

class ContactData extends Component {
    state={
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value:'fastest', displayValue: 'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true,
                validation:{}
            }
        },
        formIsValid: false
    };

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid= value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        //Esse método configura o evento de se clicar no botão de submit do formulário. Uma coisa a se saber, ao se clicar em um botão dentro de um <form> uma requisição será feita e a página vai ser recarregada. Como não desejamos isso, temos que prevenir o comportamento padrão do <form> para que não percamos os dados do estado do componente que possui o <form>.
        event.preventDefault();

        //Acessa os dados que foram inseridos no formulário e cria um objeto com esses dados para ser enviado ao FireBase
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        //Para comunicar com um backend no FireBase, é preciso colocar o formato do dado que vai ser associado à diretiva, nesse caso, a diretiva é /post e o formato é json.
        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.totalPrice,
            orderData: formData
        }

        this.props.onOrderBurger(order);
    }

    onChangeHandler = (event,key) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[key]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedOrderForm[key] = updatedFormElement;
        updatedFormElement.touched = true;
        let formIsValid = true;
        for(let inputIndentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){

        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config:this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => {
                   return <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                onChangeHandler = {(event)=>this.onChangeHandler(event,formElement.id)}
                                invalid = {!formElement.config.valid}
                                touched = {formElement.config.touched}
                                shouldValidate = {formElement.config.validation}
                            />;
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.props.loading){
            form=(
                <Spinner />
            );
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}   
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
        loading: state.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        onOrderBurger: (orderData) => dispatch(purchaseBurger(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));