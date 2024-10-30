import {openDB} from 'idb';

// Create or open the IndexedDB database
const dbUser = openDB('recipeFinderDB', 1, {
    upgrade(db) {
        //create a store for recipes if it does not exist
        if (!db.objectStoreNames.contains('recipes')) {
          db.createObjectStore('recipes', {keyPath: 'label' }); // Using the autoIncrement as a unique key
        }
    },
});

// Function to store a recipe in the database
export async function saveRecipe(recipe) {
    console.log('Before saving to DB', recipe);
    const db = await dbUser;
    await db.put('recipes', {label: recipe.label, recipe}); // Saving recipe 
    console.log('Recipe saved to Database: ', recipe);

}

// Function to get a recipe by label
export async function getRecipe(label) {
    const db = await dbUser;
    return await db.get('recipes', label); // Gets a single recipe
}

// Funtion to get all saved recipes
export async function getAllRecipes() {
    const db = await dbUser;
    return await db.getAll('recipes'); // Provides all recipes
}

// Function to delete a recipe by label
export async function deleteRecipe(label) {
    const db = await dbUser;
    await db.delete('recipes', label); // Delete recipe
    console.log('Recipe with label ' + label + ' deleted from the database');
}