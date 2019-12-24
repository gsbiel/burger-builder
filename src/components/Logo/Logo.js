import React from 'react';

//Sempre importe imagens, nunca coloque o caminho delas diretamente no atributo 'src' da tag pois isso pode gerar problemas com o webpack.
import burgerLogo from '../../assets/images/burger-logo.png';

import classes from './Logo.module.css';

const logo =(props) => {
    return(
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="MyBurger"></img>
        </div>
    );
}

export default logo;