/**
 * use-mobile.tsx - Mobile Device Detection Hook
 * Hook de détection d'appareil mobile
 * 
 * This hook detects if the current device is mobile based on screen width
 * Ce hook détecte si l'appareil actuel est mobile basé sur la largeur de l'écran
 */

import * as React from "react"

// Mobile breakpoint in pixels / Point de rupture mobile en pixels
const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect if the current device is mobile
 * Hook personnalisé pour détecter si l'appareil actuel est mobile
 * 
 * @returns {boolean} True if device is mobile / Vrai si l'appareil est mobile
 */
export function useIsMobile() {
  // State to track mobile status / État pour suivre le statut mobile
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Create media query matcher / Créer un matcher de requête média
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    /**
     * Handle screen size changes / Gérer les changements de taille d'écran
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener for media query changes / Ajouter un écouteur d'événement pour les changements de requête média
    mql.addEventListener("change", onChange)
    
    // Set initial state / Définir l'état initial
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Cleanup event listener on unmount / Nettoyer l'écouteur d'événement au démontage
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return boolean value, defaulting to false / Retourner une valeur booléenne, par défaut false
  return !!isMobile
}
