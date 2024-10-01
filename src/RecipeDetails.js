// Importing the required modules from React and React Router
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RecipesContext } from "./RecipesContext";

// RecipeDetails component: renders the details of a single recipe
function RecipeDetails() {
    // Getting the recipe ID from the URL using useParams
    const { id } = useParams();
    // Accessing recipes context to get the current list of recipes
    const { recipes } = useContext(RecipesContext);
    // Initializing navigation to go back to the previous page
    const navigate = useNavigate();

    // Checking if recipes array is available and has the recipe with the current ID
    if (!Array.isArray(recipes) || recipes.length === 0 || !recipes[id]) {
        return <p>Recipe not found or still loading...</p>
    }

    // Extracting the current reicpe object from the recipes array
    const recipe = recipes[id]; 
    console.log('Full recipe object: ', recipe);

    return (
        <div>
            {/* Displaying the recipe label */}
            <h1>{recipe.recipe.label}</h1>
            {/* Displaying the recipe image */}
            <img src = {recipe.recipe.image} alt = {recipe.recipe.label} />
            <h3>Ingredients</h3>
            <ul>
                {/* Mapping over the ingredient lines and displaying each ingredient */}
                {recipe.recipe.ingredientLines.map((ingredient, index) => (
                    <div key={index}>{ingredient}</div>
                ))}
            </ul>
            {/* Displaying the recipe source */}
            <p>Source: {recipe.recipe.source}</p>
            {/* Back button to navigate to the previous page*/}
            <button onClick={() => navigate(-1)}>Back to Search</button>
        </div>
    );
    
}

// Exporting component as default
export default RecipeDetails;