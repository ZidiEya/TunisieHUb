/**
 * use-toast.ts - Toast Notification System
 * Système de notifications toast
 * 
 * This file provides a global toast notification system for the application
 * Ce fichier fournit un système global de notifications toast pour l'application
 */

import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Toast system configuration / Configuration du système de toast
const TOAST_LIMIT = 1 // Maximum number of toasts / Nombre maximum de toasts
const TOAST_REMOVE_DELAY = 1000000 // Delay before removing toast / Délai avant suppression du toast

/**
 * Extended toast type with additional properties
 * Type de toast étendu avec propriétés supplémentaires
 */
type ToasterToast = ToastProps & {
  id: string // Unique identifier / Identifiant unique
  title?: React.ReactNode // Toast title / Titre du toast
  description?: React.ReactNode // Toast description / Description du toast
  action?: ToastActionElement // Optional action element / Élément d'action optionnel
}

/**
 * Available toast actions / Actions de toast disponibles
 */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST", 
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

/**
 * Generates unique IDs for toasts / Génère des IDs uniques pour les toasts
 * @returns {string} Unique ID string / Chaîne ID unique
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

/**
 * Action types for toast reducer / Types d'action pour le réducteur de toast
 */
type Action =
  | {
      type: ActionType["ADD_TOAST"] // Add new toast / Ajouter un nouveau toast
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"] // Update existing toast / Mettre à jour un toast existant
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"] // Dismiss toast / Rejeter le toast
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"] // Remove toast from DOM / Supprimer le toast du DOM
      toastId?: ToasterToast["id"]
    }

/**
 * Toast state interface / Interface d'état des toasts
 */
interface State {
  toasts: ToasterToast[] // Array of active toasts / Tableau des toasts actifs
}

// Map to track toast timeouts / Map pour suivre les délais des toasts
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * Adds toast to removal queue after delay / Ajoute le toast à la file de suppression après délai
 * @param toastId - ID of toast to remove / ID du toast à supprimer
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * Toast state reducer / Réducteur d'état des toasts
 * Manages toast state changes based on actions / Gère les changements d'état des toasts basés sur les actions
 * 
 * @param state - Current toast state / État actuel des toasts
 * @param action - Action to perform / Action à effectuer
 * @returns {State} New state / Nouvel état
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // Side effects - Add toasts to removal queue / Effets de bord - Ajouter les toasts à la file de suppression
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Global state management / Gestion d'état globale
const listeners: Array<(state: State) => void> = [] // State change listeners / Écouteurs de changement d'état
let memoryState: State = { toasts: [] } // In-memory state / État en mémoire

/**
 * Dispatches actions to update toast state / Distribue les actions pour mettre à jour l'état des toasts
 * @param action - Action to dispatch / Action à distribuer
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id"> // Toast without ID / Toast sans ID

/**
 * Creates and displays a new toast notification
 * Crée et affiche une nouvelle notification toast
 * 
 * @param props - Toast properties / Propriétés du toast
 * @returns Object with toast controls / Objet avec les contrôles du toast
 */
function toast({ ...props }: Toast) {
  const id = genId()

  // Update function for this toast / Fonction de mise à jour pour ce toast
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
    
  // Dismiss function for this toast / Fonction de rejet pour ce toast
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // Create and add the toast / Créer et ajouter le toast
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

/**
 * React hook for toast functionality / Hook React pour la fonctionnalité toast
 * @returns Toast state and control functions / État des toasts et fonctions de contrôle
 */
function useToast() {
  // Local state synchronized with global state / État local synchronisé avec l'état global
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    // Subscribe to global state changes / S'abonner aux changements d'état global
    listeners.push(setState)
    
    // Cleanup subscription on unmount / Nettoyer l'abonnement au démontage
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast, // Function to create new toasts / Fonction pour créer de nouveaux toasts
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }), // Function to dismiss toasts / Fonction pour rejeter les toasts
  }
}

export { useToast, toast }
