import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = (props) =>{
    return(
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.More} onClick={props.addFunction}>+</button>
            <button disabled={props.isDisable} className={classes.Less} onClick={props.removeFunction}>-</button>
        </div>
    );
}

export default buildControl;