/**
 * App.tsx - Main application component
 * Composant principal de l'application
 * 
 * This file contains the root component that sets up routing, providers, and global state
 * Ce fichier contient le composant racine qui configure le routage, les fournisseurs et l'état global
 */

// React and state management imports / Importations React et gestion d'état
import { useState } from "react";

// UI Component imports / Importations des composants UI
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Data fetching and routing / Récupération de données et routage
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page imports / Importations des pages
import Index from "./pages/Index";
import About from "./pages/About";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Categories from "./pages/Categories";
import WriteArticle from "./pages/WriteArticle";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Component and context imports / Importations des composants et contextes
import ChatWidget from "@/components/ChatWidget";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

/**
 * Initialize QueryClient for data fetching
 * Initialise le QueryClient pour la récupération des données
 */
const queryClient = new QueryClient();

/**
 * Main App component - Entry point of the application
 * Composant App principal - Point d'entrée de l'application
 * 
 * @returns {JSX.Element} The complete application with routing and providers
 */
const App = () => {
  // Chat widget state management / Gestion de l'état du widget de chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  /**
   * Opens the chat widget
   * Ouvre le widget de chat
   */
  const openChat = () => setIsChatOpen(true);

  return (
    /* 
     * Application providers hierarchy - nested context providers
     * Hiérarchie des fournisseurs d'application - fournisseurs de contexte imbriqués
     */
    <QueryClientProvider client={queryClient}>
      {/* Authentication context for user management / Contexte d'authentification pour la gestion utilisateur */}
      <AuthProvider>
        {/* Tooltip provider for UI tooltips / Fournisseur de tooltip pour les info-bulles UI */}
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            {/* Toast notifications / Notifications toast */}
            <Toaster />
            <Sonner />
            
            {/* Router setup with all application routes / Configuration du routeur avec toutes les routes de l'application */}
            <BrowserRouter>
              <Routes>
                {/* Main pages routes / Routes des pages principales */}
                <Route path="/" element={<Index onChatOpen={openChat} />} />
                <Route path="/about" element={<About onChatOpen={openChat} />} />
                <Route path="/articles" element={<Articles onChatOpen={openChat} />} />
                <Route path="/blog" element={<Articles onChatOpen={openChat} />} />
                <Route path="/categories" element={<Categories onChatOpen={openChat} />} />
                <Route path="/auth" element={<Auth onChatOpen={openChat} />} />
                
                {/* Protected route for article writing (requires authentication) */}
                {/* Route protégée pour l'écriture d'articles (nécessite une authentification) */}
                <Route 
                  path="/write" 
                  element={
                    <ProtectedRoute>
                      <WriteArticle onChatOpen={openChat} />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch-all route for 404 errors - MUST BE LAST */}
                {/* Route de capture pour les erreurs 404 - DOIT ÊTRE LA DERNIÈRE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Global chat widget available on all pages */}
              {/* Widget de chat global disponible sur toutes les pages */}
              <ChatWidget isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
