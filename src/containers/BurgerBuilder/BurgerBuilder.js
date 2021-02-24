import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildsControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INREDIENT_PRICE = {
    salad : 5,
    cheese : 10,
    tomato : 5,
    patty : 20
}

class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
    // }

    state = {
        ingredients : {
            salad : 0,
            tomato : 0,
            patty : 0,
            cheese : 0,
        },
        totalPrice : 20,
        purchasable : false,
        purchasing : false
    }

    updatePurchaseState(ingredient){
        const sum  = Object.keys(ingredient)
            .map(igKey => {
                return ingredient[igKey];
            })
            .reduce((sum,el) => {
                return sum + el;
            } ,0);
        this.setState({purchasable : sum > 0});

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice  = oldPrice + priceAddition;

        this.setState({
            totalPrice : newPrice ,
            ingredients : updatedIngredient
        })
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice  = oldPrice - priceDeduction;

        this.setState({
            totalPrice : newPrice ,
            ingredients : updatedIngredient
        })
        this.updatePurchaseState(updatedIngredient);
    }

    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        alert('You Continue!');
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    modelClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients = {this.state.ingredients}
                        purchasedCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price = {this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    price = {this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;