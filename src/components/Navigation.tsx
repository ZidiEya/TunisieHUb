/**
 * Navigation.tsx - Main navigation component  
 * Composant de navigation principal
 * 
 * Provides responsive navigation with mobile menu, authentication, and chat access
 * Fournit une navigation responsive avec menu mobile, authentification et accès au chat
 */

// React hooks and routing / Hooks React et routage
import { useState } from "react";
import { Link } from "react-router-dom";

// UI Components / Composants UI
import { Button } from "@/components/ui/button";

// Icons / Icônes
import { MessageCircle, Menu, X, Home, BookOpen, Tag, PenTool, User, LogOut } from "lucide-react";

// Authentication context / Contexte d'authentification
import { useAuth } from "@/contexts/AuthContext";

/**
 * Props interface for Navigation component
 * Interface des props pour le composant Navigation
 */
interface NavigationProps {
  onChatOpen?: () => void; // Optional callback to open chat widget / Callback optionnel pour ouvrir le widget de chat
}

/**
 * Navigation Component - Main site navigation with responsive design
 * Composant Navigation - Navigation principale du site avec design responsive
 * 
 * Features: Logo, desktop/mobile menus, authentication status, chat access
 * Fonctionnalités : Logo, menus desktop/mobile, statut d'authentification, accès au chat
 * 
 * @param onChatOpen - Function to open chat widget / Fonction pour ouvrir le widget de chat
 */
const Navigation = ({ onChatOpen }: NavigationProps) => {
  // Mobile menu visibility state / État de visibilité du menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get authentication state / Obtenir l'état d'authentification
  const { user, signOut } = useAuth();

  /**
   * Handle user sign out and close mobile menu
   * Gérer la déconnexion utilisateur et fermer le menu mobile
   */
  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false); // Close mobile menu after logout / Fermer le menu mobile après déconnexion
  };

  return (
    /* 
     * Main navigation bar with sticky positioning and backdrop blur
     * Barre de navigation principale avec positionnement sticky et flou d'arrière-plan
     */
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section - Brand identity and home link */}
          {/* Section Logo - Identité de marque et lien d'accueil */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Blog Tunisia
            </span>
          </Link>

          {/* Desktop Navigation Menu - Hidden on mobile */}
          {/* Menu de Navigation Desktop - Masqué sur mobile */}
          <div className="hidden md:flex items-center space-x-8">{/* ... keep existing code (desktop menu) */}
            <Link to="/" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Home className="w-4 h-4" />
              Accueil
            </Link>
            <Link to="/articles" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Articles
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Catégories
            </Link>
            {/* Conditional navigation based on authentication status */}
            {/* Navigation conditionnelle basée sur le statut d'authentification */}
            {user ? (
              <Link to="/write" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                Écrire
              </Link>
            ) : (
              <Link to="/auth" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <User className="w-4 h-4" />
                Connexion
              </Link>
            )}
            <Link to="/about" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <User className="w-4 h-4" />
              À propos
            </Link>
          </div>

          {/* Authentication Actions - Desktop only */}
          {/* Actions d'Authentification - Desktop seulement */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              /* Logged in user - show logout button */
              /* Utilisateur connecté - afficher le bouton de déconnexion */
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            ) : (
              /* Not logged in - show login button */
              /* Non connecté - afficher le bouton de connexion */
              <Button variant="tunisia" asChild>
                <Link to="/auth">Se connecter</Link>
              </Button>
            )}
          </div>

          {/* Chat Assistant Button - Fixed position for easy access */}
          {/* Bouton Assistant Chat - Position fixe pour un accès facile */}
          <Button
            variant="chat"
            size="icon"
            onClick={onChatOpen}
            className="fixed bottom-6 right-6 z-50"
            title="Assistant IA"
          >
            <MessageCircle className="w-5 h-5" />
          </Button>

          {/* Mobile Menu Toggle Button - Only visible on mobile */}
          {/* Bouton de Basculement du Menu Mobile - Visible seulement sur mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu - Conditional rendering based on state */}
        {/* Menu Mobile - Rendu conditionnel basé sur l'état */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {/* Mobile navigation links with click handlers to close menu */}
              {/* Liens de navigation mobile avec gestionnaires de clic pour fermer le menu */}
              <Link to="/" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Home className="w-4 h-4" />
                Accueil
              </Link>
              <Link to="/articles" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                <BookOpen className="w-4 h-4" />
                Articles
              </Link>
              <Link to="/categories" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Tag className="w-4 h-4" />
                Catégories
              </Link>
              {/* Conditional mobile navigation based on auth status */}
              {/* Navigation mobile conditionnelle basée sur le statut d'auth */}
              {user ? (
                <Link to="/write" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <PenTool className="w-4 h-4" />
                  Écrire
                </Link>
              ) : (
                <Link to="/auth" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-4 h-4" />
                  Connexion
                </Link>
              )}
              <Link to="/about" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                <User className="w-4 h-4" />
                À propos
              </Link>
              
              {/* Mobile Authentication Actions */}
              {/* Actions d'Authentification Mobile */}
              {user ? (
                /* Mobile logout button */
                /* Bouton de déconnexion mobile */
                <button
                  onClick={handleSignOut}
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              ) : (
                /* Mobile login link */
                /* Lien de connexion mobile */
                <Link to="/auth" className="text-tunisia-red hover:text-tunisia-orange transition-colors flex items-center gap-2 py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-4 h-4" />
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;