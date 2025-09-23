/**
 * main.tsx - Application entry point
 * Point d'entrée de l'application
 * 
 * This file initializes the React application and mounts it to the DOM
 * Ce fichier initialise l'application React et la monte dans le DOM
 */

// React rendering import / Import pour le rendu React
import { createRoot } from 'react-dom/client'

// Main app component / Composant principal de l'app
import App from './App.tsx'

// Global CSS styles / Styles CSS globaux
import './index.css'

/**
 * Create root element and render the App component
 * Crée l'élément racine et rend le composant App
 * 
 * Uses React 18's new createRoot API for better performance
 * Utilise la nouvelle API createRoot de React 18 pour de meilleures performances
 */
createRoot(document.getElementById("root")!).render(<App />);
