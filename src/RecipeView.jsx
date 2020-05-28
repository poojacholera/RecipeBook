import React, {useEffect, useState} from "react";
import Recipe from "./Recipe";
import styles from "./CSS/RecipeView.module.css";

const RecipeView = () => {
    const APP_ID = "732a00fc";
    const APP_KEY = "4a3ea286fc60d80a22746e51a1befaaa";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        const response = await fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();
        setRecipes(data.hits);
    };
    const updateSearch = e => {
        setSearch(e.target.value);
    };
    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    };

    return (
        <div className='CoronaInfo' id="RecipeView">

            <h1 className={styles.AppHeader}>Ingredient Search Book</h1>
            <div>
                <p>Search for recipes that contain the ingredients you want! <br/> Also, Find ingredients by dish</p>
                <form className={styles.searchForm} onSubmit={getSearch}>
                    <input
                        className={styles.searchBar}
                        type='text'
                        value={search}
                        onChange={updateSearch}
                        placeholder={'Ingredient Search:'}
                    />
                    <button
                        className={styles.searchButton}
                        type='submit'
                    >
                        Search
                    </button>
                </form>
                <div className={styles.recipes}>
                    {recipes.map(recipe => (
                        <Recipe
                            title={recipe.recipe.label}
                            calories={recipe.recipe.calories}
                            image={recipe.recipe.image}
                            ingredients={recipe.recipe.ingredients}
                        />
                    ))
                    }
                </div>
            </div>
        </div>
    );

};

export default RecipeView;