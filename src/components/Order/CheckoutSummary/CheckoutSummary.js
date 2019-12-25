import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Buttton/Button';

import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1> We hop it tastes well</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button clickButton={props.onCheckoutCancel} btnType="Danger">CANCEL</Button>
            <Button clickButton={props.onCheckoutContinue} btnType="Success">CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;