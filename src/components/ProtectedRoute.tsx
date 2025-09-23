/**
 * ProtectedRoute.tsx - Authentication Route Guard
 * Garde de route d'authentification
 * 
 * This component protects routes that require user authentication
 * Ce composant protège les routes qui nécessitent une authentification utilisateur
 */

// React and routing imports / Importations React et routage
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * Props interface for ProtectedRoute component
 * Interface des props pour le composant ProtectedRoute
 */
interface ProtectedRouteProps {
  children: React.ReactNode; // Child components to render if authenticated / Composants enfants à rendre si authentifié
}

/**
 * ProtectedRoute Component - Renders children only if user is authenticated
 * Composant ProtectedRoute - Rend les enfants seulement si l'utilisateur est authentifié
 * 
 * @param children - Components to render when authenticated / Composants à rendre quand authentifié
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Get authentication state / Obtenir l'état d'authentification
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication / Afficher le spinner de chargement pendant la vérification d'authentification
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  // Redirect to authentication page if not logged in / Rediriger vers la page d'authentification si non connecté
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Render protected content if authenticated / Rendre le contenu protégé si authentifié
  return <>{children}</>;
};

export default ProtectedRoute;