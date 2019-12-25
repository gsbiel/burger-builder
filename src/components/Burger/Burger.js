import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>{
    const ingredients = Object.keys(props.ingredients);
    const ingredientArray =[];
    for(let index=0; index<ingredients.length;index++){
        let cont = props.ingredients[ingredients[index]];
        for(let i=0;i<cont;i++){
            ingredientArray.push(ingredients[index]);
        }
    }
    
    const ingredientResponse = ingredientArray.length > 0 ? 
        ingredientArray.map(ingString =>{   
            return(
                <BurgerIngredient key={ingString[0]+(Math.floor(Math.random()*1000)).toString()} type={ingString}/>
            )
        }) : <p>Please, feel free to add some ingredients to your burger :)</p>;

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {ingredientResponse}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default burger;