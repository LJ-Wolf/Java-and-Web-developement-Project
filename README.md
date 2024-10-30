# Available Scripts
In the project directory, you can run:

## npm install
Installs the required dependencies for the project to run.

## npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## node server.js
Runs the proxy server to handle API requests securely.
Make sure you have set up the environment variables in your .env file (explained below).
This server runs on http://localhost:5000.

## npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.
Your app is ready to be deployed!

## npm run eject

**Note: this is a one-way operation. Once you eject, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc.) directly into your project, so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts, so you can tweak them. At this point, you’re on your own.

You don’t have to ever use eject. The curated feature set is suitable for small and middle-sized deployments, and you shouldn’t feel obligated to use this feature.

### Environment Variables
Before running the app, create a .env file in the root of your project and add the following lines, replacing your_edamam_app_id and your_edamam_app_key with your actual Edamam API credentials.

**REACT_APP_EDAMAM_APP_ID=your_edamam_app_id**
**REACT_APP_EDAMAM_APP_KEY=your_edamam_app_key**
**This will allow the app to connect to the Edamam Recipe API for fetching recipes.**

#### Usage
**Searching for Recipes**
 1. Enter an ingredient into the search input field.
 2. Click the "Search" button to retrieve a list of recipes related to that ingredient.
 3. Click the "Liked" button to retrieve a list of saved recipes
 4. Browse through the list and click on any recipe to view more details.

##### Viewing Recipe Details
 + Clicking on a recipe from the list will navigate to a details page showing the ingredients.
 + You can return to the search results by clicking the "Back to Search" button.

###### Learn More
 + To learn more about Create React App, you can check out the following resources:

Create React App documentation
React documentation

###### Deployment
To deploy the production build, refer to the Create React App Deployment documentation.

###### Additional Information
This section provides a brief overview of key features and technologies used:

 1. React: A JavaScript library for building user interfaces.
 2. Node.js & Express: Backend server to handle API requests.
 3. Axios: Used for making HTTP requests to the Edamam API.
 4. React Router: Manages navigation between pages (search page, details page).
 5. Session Storage: Maintains search state between pages.
 6. IndexedDB: To store the data on the device being used allows for offline useage
