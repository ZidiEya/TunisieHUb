/**
 * utils.ts - Utility functions
 * Fonctions utilitaires
 * 
 * Common utility functions used throughout the application
 * Fonctions utilitaires communes utilisées dans toute l'application
 */

// CSS class handling imports / Importations pour la gestion des classes CSS
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine and merge CSS class names with Tailwind CSS support
 * Combine et fusionne les noms de classes CSS avec le support de Tailwind CSS
 * 
 * @param inputs - Array of class values to combine / Tableau de valeurs de classes à combiner
 * @returns {string} - Merged class string / Chaîne de classes fusionnées
 * 
 * This function uses clsx for conditional classes and twMerge to handle Tailwind conflicts
 * Cette fonction utilise clsx pour les classes conditionnelles et twMerge pour gérer les conflits Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
