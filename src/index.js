//Import statements for all the required libaries and files
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { RecipesProvider } from './RecipesContext';

// Creating a wrapped enviroment with React.StrictMode for identifying potential problems
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
