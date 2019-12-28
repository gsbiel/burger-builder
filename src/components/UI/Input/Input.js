import React from 'react';

import classes from './Input.module.css'

const input = (props) => {

    let inputElement = null;

    switch(props.elementType){
        case('input'):
            inputElement = <input   
                                className={classes.InputElement} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.onChangeHandler}
                            />;
            break;
        case('textarea'):
            inputElement = <textarea    
                                className={classes.InputElement} 
                                {...props.elementConfig}
                                onChange={props.onChangeHandler}  
                            />;
            break;
        case('select'):
            inputElement =  <select
                                className={classes.InputElement}
                                value={props.value}
                                onChange={props.onChangeHandler}
                            >
                                {props.elementConfig.options.map(option => {
                                return <option 
                                            value={option.value}
                                            key={option.value}
                                        >
                                            {option.displayValue}
                                        </option>;
                                })}
                            </select>
            break;
        default:
            inputElement = <input 
                                className={classes.InputElement} 
                                {...props.elementConfig} 
                                value={props.value}
                            />;
    } 

    return(
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;