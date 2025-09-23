/**
 * NotFound.tsx - 404 Error Page Component
 * Composant de page d'erreur 404
 * 
 * This component displays a user-friendly 404 error page for non-existent routes
 * Ce composant affiche une page d'erreur 404 conviviale pour les routes inexistantes
 */

// React routing imports / Importations de routage React
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * NotFound Component - Handles 404 errors with user-friendly interface
 * Composant NotFound - Gère les erreurs 404 avec une interface conviviale
 */
const NotFound = () => {
  // Get current location for error logging / Obtenir la localisation actuelle pour la journalisation des erreurs
  const location = useLocation();

  // Log 404 error for debugging / Journaliser l'erreur 404 pour le débogage
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        {/* Error Code Display / Affichage du code d'erreur */}
        <h1 className="text-4xl font-bold mb-4">404</h1>
        
        {/* Error Message / Message d'erreur */}
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        
        {/* Return Home Link / Lien de retour à l'accueil */}
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
