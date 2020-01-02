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
    totalPrice: 4
};

const reducer = (state = initialState,action) => {
    if(action.type === ADD_INGREDIENT){
        const newState = {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1 
            }
        };
        return newState;
    }
    else if(action.type === REMOVE_INGREDIENT){
        const newState = {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            }
        };
        return newState;
    }
    else{
        return state;
    } 
};

export default reducer;