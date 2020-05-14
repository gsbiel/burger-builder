import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED
} from '../actions/actionTypes';


const initialState = {
    ingredients: null,
    totalPrice: 4.00,
    error: false
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
    else if(action.type === SET_INGREDIENTS){
        return {
            ...state,
            ingredients: action.ingredients,
            error: false
        }
    }
    else if(action.type === FETCH_INGREDIENTS_FAILED){
        return {
            ...state,
            error: true
        }
    }
    else{
        return state;
    } 
};

export default reducer;