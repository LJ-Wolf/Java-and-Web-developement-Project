// Importing required functions
import React, { createContext, useState} from 'react';

// Creating the contect for recipes
export const RecipesContext = createContext();

// Creating the provider component to wrap the app and provide context
export const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);         // State for array and function to update it
    
    // Returning the provider, making the recipes and setrecipes available to all components
    return (
        <RecipesContext.Provider value={{recipes, setRecipes}}>
            {children}
        </RecipesContext.Provider>
    );

};