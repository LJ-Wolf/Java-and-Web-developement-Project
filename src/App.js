// importing all the required libaries and files for program to run
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import {RecipesContext} from './RecipesContext'
import {getAllRecipes} from './UserDatabase';

// Main app function that handles user input, navigation between routes, and data fetching
// It interacts with the Edamam API and manages state, session storage, and routing.
function App() {
  const [ingredient, setIngredient] = useState('');                // State for storing the ingredient input from user
  const { pathname } = useLocation();                              // useLocation to get the current route's pathname
  const navigate = useNavigate();                                  // useNavigate for programmatically navigating between routes
  const {recipes, setRecipes} = useContext(RecipesContext);        // useContext to access global recipe state and recipe setter function from RecipesContext
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');  // State to store and manage the current search term in the app
  const [isLikedRecipe, setIsLikedRecipe] = useState();       // Instantiating boolean to control if the recipe is in the DB

  // A function to fetch the recipes from the proxy server (which interacts with Edamam API)
  // Stores the fetched data (recipes and search term) into session storage for persisting state between page reloads
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recipes', {
        params: { ingredient }
      });
      const newRecipes = Array.isArray(response.data.hits) ? response.data.hits : []; 
      setRecipes(newRecipes);   // Recipes list stored in an array
      setIsLikedRecipe(false);
      sessionStorage.setItem('recipes', JSON.stringify(newRecipes));        // Using sessionStorage to restore the recipe list and search term after page refresh or re-renders 
      sessionStorage.setItem('searchTerm', ingredient);                     // JSON.parse is used to convert the stored string back into a JavaScript object or array
      setCurrentSearchTerm(ingredient);
      sessionStorage.setItem('isLikedRecipe', 'false');
      console.log(sessionStorage.getItem('isLikedRecipe'));
  // Error handling incase input or recipes cant be fetched
    } catch (error) {  
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    }
  };

  // Fecthing liked recipes from UserDB, updating the global recipes state, and updating the session storage states
  const loadSavedRecipes = async () => {
    try { 
      const savedRecipes = await getAllRecipes();
      setRecipes(savedRecipes);
      setIsLikedRecipe(true);
      sessionStorage.setItem('recipes', JSON.stringify(savedRecipes));
      sessionStorage.setItem('searchTerm', 'Liked Recipes');
      setCurrentSearchTerm('Liked Recipes');
      console.log('Saved Recipes loaded!!')
      sessionStorage.setItem('isLikedRecipe', true);
      console.log(sessionStorage.getItem('isLikedRecipe'));
    } catch(error) {
      console.log('Recipes could not be loaded', error);
    }
  };

  //using a navigate function to help transfer constants
  const navigateToDetails = (recipeId) => {
    const selectedRecipe = recipes[recipeId];
    const recipe = selectedRecipe.recipe.recipe ? selectedRecipe.recipe.recipe : selectedRecipe.recipe;

    navigate(`/recipe/${recipeId}`, { state: { isLikedRecipe, selectedRecipe: recipe } });
  }

  //storing recipes in session storage and controling isLikedRecipe boolean
  useEffect(() => {
    const storedRecipes = sessionStorage.getItem('recipes');       // storing the recipes into a global variable
    const storedSearchTerm = sessionStorage.getItem('searchTerm'); // storing the ingredient into global variable

    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
      setCurrentSearchTerm(storedSearchTerm);
      setIsLikedRecipe(sessionStorage.getItem('isLikedRecipe') === 'true');
    }
  }, []);

  console.log("Recipes in App.js:", recipes);

  // returning information after user imput
  return (
    <div className="App">
      <h1>Recipe Finder</h1>                                   
      {pathname === '/' && (
        <>
          <input
            type="text"
            value={ingredient}                                     
            onChange={(e) => setIngredient(e.target.value)}      // Main input field where users enter the ingredient they want to search for
            placeholder="Enter ingredient"
          />
          <button onClick={fetchRecipes}>Search</button>        {/* Button triggers the fetchRecipes function to search for the recipes based on the user-provided ingredient*/}
          <button onClick={loadSavedRecipes}>Liked Recipes</button>  {/* Button to load save/liked recipes*/}
        </>
      )}
      {/* Defining the Routes for application */}
      <Routes>
        {/* Route 1: Displays a list of recipes based on the search input from the user*/}
        <Route 
          path="/"
          element={ 
            <div className="recipe-list">
              {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
               <div key = {index} className="recipe-item">
                 <h2>
                    <button onClick={() => navigateToDetails(index)}>
                     {recipe.recipe.recipe ? recipe.recipe.recipe.label : recipe.recipe.label}
                   </button>
                 </h2>
                 <img 
                    src={recipe.recipe.recipe ? recipe.recipe.recipe.image : recipe.recipe.image} 
                    alt={recipe.recipe.recipe ? recipe.recipe.recipe.label : recipe.recipe.label} />
                </div>
              ))
            ) : (
              <p>No Recipes found.</p>
            )}
            </div>
          }
          />
        {/* Route 2: Navigates to the details page of selected recipe */}
        <Route path="/recipe/:id" element={<RecipeDetails recipes={recipes} />} />
      </Routes>
      </div>
    );
} 

export default App;


