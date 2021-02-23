import React from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

const burgerIngredient = (props) => {
    let ingredient = null;

    switch(props.type){
        case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingredient = (
                <div className = {classes.BreadTop}>
                    <div className = {classes.Seeds1}></div>
                    <div className = {classes.Seeds2}></div>
                </div>
            );
            break;
        case ('patty'):
            ingredient = <div className ={classes.Patty}></div>;
            break;
        case ('cheese'):
            ingredient = <div className ={classes.Cheese}></div>;
            break;
        case ('salad'):
            ingredient = <div className ={classes.Salad}></div>;
            break;
        case ('tomato'):
            ingredient = <div className ={classes.Tomato}></div>;
            break;
        default : 
            ingredient = null;
    }

    return ingredient;
};

burgerIngredient.prototype = {
    type : PropTypes.string.isRequired
}

export default burgerIngredient;