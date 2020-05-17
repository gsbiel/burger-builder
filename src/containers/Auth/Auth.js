import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttton/Button';

import {
    auth
} from '../../store/actions/index';

import classes from './Auth.module.css';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
          ...this.state.controls,
          [controlName]:{
              ...this.state.controls[controlName],
              value: event.target.value,
              valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
              touched: true
          }  
        };
        this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email, this.state.controls.password);
    }

    render(){

        const formElementsArray = [];

        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config:this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => {
            return <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                onChangeHandler = {(event)=>this.inputChangedHandler(event,formElement.id)}
                invalid = {!formElement.config.valid}
                touched = {formElement.config.touched}
                shouldValidate = {formElement.config.validation}
            />
        });

        return(
            <div className={classes.Auth}>
                <form onSubmit = {this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => {dispatch(auth(email, password))}
    }
}

export default connect(null, mapDispatchToProps)(Auth);