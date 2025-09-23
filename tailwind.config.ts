/**
 * tailwind.config.ts - Tailwind CSS Configuration
 * Configuration Tailwind CSS
 * 
 * This file configures Tailwind CSS with custom design tokens and theme extensions
 * Ce fichier configure Tailwind CSS avec des jetons de design personnalisés et des extensions de thème
 */

import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"], // Enable dark mode with class strategy / Activer le mode sombre avec la stratégie de classe
	content: [
		// Paths to all template files / Chemins vers tous les fichiers de modèle
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "", // No prefix for Tailwind classes / Aucun préfixe pour les classes Tailwind
	theme: {
		container: {
			center: true, // Center containers / Centrer les conteneurs
			padding: '2rem', // Default container padding / Padding par défaut du conteneur
			screens: {
				'2xl': '1400px' // Max container width / Largeur maximale du conteneur
			}
		},
		extend: {
			// Custom background images from design system / Images de fond personnalisées du système de design
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-sunset': 'var(--gradient-sunset)',
				'gradient-card': 'var(--gradient-card)',
			},
			// Custom shadows from design system / Ombres personnalisées du système de design
			boxShadow: {
				'warm': 'var(--shadow-warm)',
				'elegant': 'var(--shadow-elegant)',
				'glow': 'var(--shadow-glow)',
			},
			// Custom transition timing functions / Fonctions de timing de transition personnalisées
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'spring': 'var(--transition-spring)',
			},
			// Color system using HSL CSS variables / Système de couleurs utilisant les variables CSS HSL
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Tunisia-inspired color palette / Palette de couleurs inspirée de la Tunisie
				'tunisia-red': 'hsl(var(--tunisia-red))',
				'tunisia-orange': 'hsl(var(--tunisia-orange))',
				'desert-sand': 'hsl(var(--desert-sand))',
				'warm-sunset': 'hsl(var(--warm-sunset))',
				// Sidebar color system / Système de couleurs de la barre latérale
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			// Border radius system / Système de rayon de bordure
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			// Custom animations / Animations personnalisées
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")], // Enable animation utilities / Activer les utilitaires d'animation
} satisfies Config;