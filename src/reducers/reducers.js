import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT
} from '../actions/actions';


const initialState = {
    ingredients:{
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4.00
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese:0.4,
    meat: 1.3
}

const reducer = (state = initialState,action) => {
    if(action.type === ADD_INGREDIENT){
        const newState = {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1 
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        };
        return newState;
    }
    else if(action.type === REMOVE_INGREDIENT){
        const newState = {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        };
        return newState;
    }
    else{
        return state;
    } 
};

export default reducer;