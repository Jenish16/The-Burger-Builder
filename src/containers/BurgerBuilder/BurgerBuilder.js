import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildsControls';

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
        totalPrice : 20
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
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled = {disabledInfo}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;