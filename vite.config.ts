/**
 * vite.config.ts - Vite Build Configuration
 * Configuration de build Vite
 * 
 * This file configures Vite for development and production builds
 * Ce fichier configure Vite pour les builds de développement et de production
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Vite configuration with React and SWC plugins
// Configuration Vite avec les plugins React et SWC
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Server configuration for development / Configuration du serveur pour le développement
  server: {
    host: "::", // Listen on all interfaces / Écouter sur toutes les interfaces
    port: 8080, // Development server port / Port du serveur de développement
  },
  
  // Build plugins configuration / Configuration des plugins de build
  plugins: [
    react(), // React plugin with SWC for fast refresh / Plugin React avec SWC pour le rafraîchissement rapide
    mode === 'development' &&
    componentTagger(), // Component tagging in development mode / Marquage des composants en mode développement
  ].filter(Boolean), // Remove falsy plugins / Supprimer les plugins falsy
  
  // Module resolution configuration / Configuration de résolution des modules
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias for src directory / Alias pour le répertoire src
    },
  },
}));
