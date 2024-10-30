// Importing the required modules from React and React Router
import React, { useContext, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { RecipesContext } from "./RecipesContext";
import { deleteRecipe, saveRecipe } from "./UserDatabase";
import './Detail.css';

// RecipeDetails component: renders the details of a single recipe
function RecipeDetails() {
    // Getting the recipe ID from the URL using useParams
    const { id } = useParams();
    // Accessing recipes context to get the current list of recipes
    const { recipes } = useContext(RecipesContext);
    // Initializing navigation to go back to the previous page
    const navigate = useNavigate();
    // Extracting the current reicpe object from the recipes array
    const recipe = recipes[id].recipe.recipe ? recipes[id].recipe.recipe : recipes[id].recipe;
    const location = useLocation();
    const [isLikedRecipe, setIsLikedRecipe] = useState(location.state?.isLikedRecipe ?? false);
    const [visibleSection, setVisibleSection] = useState('ingredients');

    // Checking if recipes array is available and has the recipe with the current ID
    if (!Array.isArray(recipes) || recipes.length === 0 || !recipes[id]) {
        return <p>Recipe not found or still loading...</p>
    };

    // Error checking and saving of a recipe to database
    const handleSaveRecipe = async () => {
        try{
            await saveRecipe(recipe); // Variable saved to Database
            setIsLikedRecipe(true);
            console.log('Recipe saved');
        } catch (error) {
            console.error('Failed to save recipe', error);
        }
    };

    // Error check and deleting of a saved recipe
    const handleDeleteRecipe = async () => {
        try{
            await deleteRecipe(recipe.label); // Recipe deleted from Database
            setIsLikedRecipe(false);
            console.log('Recipe deleted')
        } catch(error){
            console.error('Failed to delete recipe', error);
        }
    };

    // Constant extracting the ingredients of the recipe
    const buttonIngredients = () => {
        return (
        <>
            <h3>Ingredients</h3>
            <ul>
                {/* Mapping over the ingredient lines and displaying each ingredient */}
                {recipe.ingredientLines.map((ingredient, index) => (
                <div key={index}>{ingredient}</div>
                ))}
            </ul> 
        </>    
        )
    };

    // Constant extracting the Recipe information
    const buttonLabels = () => {
        return (
        <>           
            <h3>Recipe information</h3>
            <p>
                <strong>Cuisine Type: </strong> {recipe.cuisineType.join(', ')}
            </p>
            <p>
                <strong>Diet Labels: </strong>{recipe.dietLabels.join(', ')}
            </p>
            <p>
                <strong>Dish Type: </strong> {recipe.dishType.join(', ')}
            </p>
            <p>
                <strong>Health Labels: </strong> {recipe.healthLabels.join(', ')}
            </p>
            <p>
                <strong>Meal Type: </strong> {recipe.mealType.join(', ')}
            </p>
        </>
        )
    };
    
    // Constant sorting and fetching the nutritional content from recipe
    const nutritionalInformation = () => {
        const requiredNutrients = ['FAT', 'CHOCDF', 'PROCNT', 'CA', 'FE', 'VITC', 'VITB12'];
        const nutrientLabels = {
            'FAT': 'Fat',
            'CHOCDF': 'Carbs',
            'PROCNT': 'Protein',
            'CA': 'Calcium',
            'FE': 'Iron',
            'VITC': 'Vitamin C',
            'VITB12': 'Vitamin B12'
        };

        const selectedNutrients = requiredNutrients.map((key) => {
            const nutrient = recipe.totalNutrients[key];
            if (nutrient) {
                return (
                    <div key={key}>
                        <strong>{nutrientLabels[key]}:</strong> {nutrient.quantity.toFixed(2)} {nutrient.unit} 
                    </div> 
                );
            }
            return null;
        });

        return (
            <>
                <h3>Nutrition information</h3>
                <p>
                    <strong>Calories: </strong> {recipe.calories}
                </p>
                <ul>
                    {selectedNutrients}
                </ul>    
            </>
        )

    }

    return (
        <div>
            {/* Displaying the recipe label */}
            <h1>{recipe.label}</h1>
            {/* Displaying the recipe image */}
            <img src = {recipe.image} alt = {recipe.label} />
            <div>
                <button onClick={() => setVisibleSection('ingredients')}>Show Ingredients</button>
                <button onClick={() => setVisibleSection('labels')}>Show Recipe Information</button>
                <button onClick={() => setVisibleSection('nutritional')}>Show Nutritional Information</button>
            </div>
            <div>
                {visibleSection === 'ingredients' && buttonIngredients()}
                {visibleSection === 'labels' && buttonLabels()}
                {visibleSection === 'nutritional' && nutritionalInformation()}
            </div>
            {/* Displaying the recipe source */}
            <p>Source: {recipe.source}</p>
            {/* Buttons to save and delete a recipe into/from storage*/}           
            {isLikedRecipe ? (
                <button onClick={handleDeleteRecipe}>Remove Recipe</button>
            ) : ( 
                <button onClick={handleSaveRecipe}>Save Recipe</button>
            )}
            {/* Back button to navigate to the previous page*/}
            <button onClick={() => navigate(-1)}>Back to Search</button>
        </div>
    );
    
}

// Exporting component as default
export default RecipeDetails;