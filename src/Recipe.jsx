import React from 'react';
import styles from "./CSS/Recipe.module.css";

const Recipe = ({title, calories, image, ingredients}) => {
    return (
        <div className={styles.recipe}>
            <h1 className={styles.title}>{title}</h1>
            <div>
                <label for="Calories"><b>Calories : </b></label>{calories.toFixed(2)}
            </div>
            <img className={styles.image} src={image} alt={title}/>
            <table>
                <thead>
                <tr>
                    <th>Ingrdients</th>
                </tr>
                </thead>
                <tbody>
                {ingredients.map(ingredient => (<tr>
                    <td>{ingredient.text}</td>
                </tr>))}
                </tbody>
            </table>
        </div>
    );
};
export default Recipe;