/**
 * AuthContext.tsx - Authentication Context Provider
 * Fournisseur de contexte d'authentification
 * 
 * This file provides authentication state and methods throughout the application
 * Ce fichier fournit l'état et les méthodes d'authentification dans toute l'application
 */

// React and authentication imports / Importations React et authentification
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

/**
 * Type definition for authentication context
 * Définition du type pour le contexte d'authentification
 */
interface AuthContextType {
  user: User | null; // Currently authenticated user / Utilisateur actuellement authentifié
  session: Session | null; // Current session data / Données de session actuelle
  loading: boolean; // Loading state during auth operations / État de chargement pendant les opérations d'auth
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: any }>; // User registration / Inscription utilisateur
  signIn: (email: string, password: string) => Promise<{ error: any }>; // User login / Connexion utilisateur
  signOut: () => Promise<void>; // User logout / Déconnexion utilisateur
}

/**
 * Create authentication context
 * Créer le contexte d'authentification
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook to access authentication context
 * Hook pour accéder au contexte d'authentification
 * 
 * @returns {AuthContextType} Authentication context with user data and methods
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider / useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * Composant Fournisseur d'Authentification
 * 
 * @param children - Child components that need access to auth context
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication state variables / Variables d'état d'authentification
  const [user, setUser] = useState<User | null>(null); // Current authenticated user / Utilisateur actuellement authentifié
  const [session, setSession] = useState<Session | null>(null); // Current session / Session actuelle
  const [loading, setLoading] = useState(true); // Loading state for auth operations / État de chargement pour les opérations d'auth

  /**
   * Set up authentication state listener and check existing session
   * Configure l'écouteur d'état d'authentification et vérifie la session existante
   */
  useEffect(() => {
    // Set up auth state listener FIRST to handle real-time auth changes
    // Configure l'écouteur d'état d'auth EN PREMIER pour gérer les changements d'auth en temps réel
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event); // Debug log / Journal de débogage
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session on app load
    // PUIS vérifie la session existante au chargement de l'app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription on component unmount / Nettoie l'abonnement au démontage du composant
    return () => subscription.unsubscribe();
  }, []);

  /**
   * User registration function
   * Fonction d'inscription utilisateur
   * 
   * @param email - User's email address / Adresse e-mail de l'utilisateur
   * @param password - User's password / Mot de passe de l'utilisateur  
   * @param displayName - Display name for the user / Nom d'affichage pour l'utilisateur
   * @returns Promise with potential error / Promesse avec erreur potentielle
   */
  const signUp = async (email: string, password: string, displayName: string) => {
    // Set redirect URL after email confirmation / Définir l'URL de redirection après confirmation par e-mail
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl, // Redirect after email confirmation / Redirection après confirmation par e-mail
        data: {
          display_name: displayName // Additional user metadata / Métadonnées utilisateur supplémentaires
        }
      }
    });
    
    return { error };
  };

  /**
   * User login function
   * Fonction de connexion utilisateur
   * 
   * @param email - User's email address / Adresse e-mail de l'utilisateur
   * @param password - User's password / Mot de passe de l'utilisateur
   * @returns Promise with potential error / Promesse avec erreur potentielle
   */
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error };
  };

  /**
   * User logout function
   * Fonction de déconnexion utilisateur
   * 
   * Clears session and redirects to login / Efface la session et redirige vers la connexion
   */
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  /**
   * Context value object containing all auth state and methods
   * Objet de valeur de contexte contenant tout l'état et les méthodes d'auth
   */
  const value = {
    user, // Current authenticated user / Utilisateur actuellement authentifié
    session, // Current session data / Données de session actuelle
    loading, // Loading state / État de chargement
    signUp, // Registration method / Méthode d'inscription
    signIn, // Login method / Méthode de connexion
    signOut, // Logout method / Méthode de déconnexion
  };

  /**
   * Provide authentication context to child components
   * Fournir le contexte d'authentification aux composants enfants
   */
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};