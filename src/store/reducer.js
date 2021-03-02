import * as actionTypes from './actions';

const initialState = { 
    ingredients : {
        "cheese" : 0,
        "patty" : 0,
        "salad" : 0,
        "tomato" : 0
    },
    totalPrice : 20
};

const INREDIENT_PRICE = {
    salad : 5,
    cheese : 10,
    tomato : 5,
    patty : 20
}

const reducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT :
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + INREDIENT_PRICE[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - INREDIENT_PRICE[action.ingredientName]
            };
        default :
            return state;
    }
};

export default reducer;