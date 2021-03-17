import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildsControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export const BurgerBuilder = props => {

    const [purchasing , setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients )
    const price = useSelector(state => state.burgerBuilder.totalPrice )
    const error = useSelector(state => state.burgerBuilder.error )
    const isAuthenticated = useSelector(state => state.auth.token )
    
    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()),[]);
    const onInitPurchase = () => dispatch(actions.purchaseInit()) ;
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(()=>{
        onInitIngredients();
    },[onInitIngredients])

    const updatePurchaseState = (ingredient) => {
        const sum  = Object.keys(ingredient)
            .map(igKey => {
                return ingredient[igKey];
            })
            .reduce((sum,el) => {
                return sum + el;
            } ,0);
        return sum > 0;
    }

    const purchaseHandler = () => {   
        if(isAuthenticated){
            setPurchasing(true);
        }else{
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
        
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...ings
    };
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    if(ings){
        burger = (
            <Aux>
                <Burger ingredients={ings}/>
                    <BuildControls 
                        ingredientAdded={onIngredientAdded}
                        ingredientRemoved={onIngredientRemoved}
                        disabled = {disabledInfo}
                        purchasable = {updatePurchaseState(ings)}
                        ordered = {purchaseHandler}
                        isAuth = {isAuthenticated}
                        price = {price}/>
            </Aux>);
        
        orderSummary = <OrderSummary 
            ingredients = {ings}
            purchasedCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            price = {price}/>;
    }

    // if(state.loading){
    //     orderSummary = <Spinner/>
    // }

    return (
        <Aux>
            <Modal show={purchasing}
                modelClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

export default withErrorHandler(BurgerBuilder, axios);