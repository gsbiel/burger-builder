import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {
    return(
        props.show ? <div className={classes.Backdrop} onClick={props.clickBackdrop}></div> : null
    );
}

export default backdrop;