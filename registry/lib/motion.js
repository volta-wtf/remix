/**
 * Motion & Animation Utilities
 * Framer Motion, CSS transitions, animations, etc.
 */

// Re-export framer-motion for convenience
export * from "framer-motion"

// Transiciones predefinidas
export const transitions = {
  // Transiciones básicas
  fast: { duration: 0.15 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },

  // Transiciones con easing
  spring: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },

  smooth: {
    type: "tween",
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3,
  },

  bouncy: {
    type: "spring",
    stiffness: 400,
    damping: 10,
  },
}

// Variantes de animación comunes
export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const slideVariants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
}

export const scaleVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
}

export const drawerVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
}

export const modalVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
}

// Clases CSS para transiciones
export const transitionClasses = {
  // Transiciones básicas
  transition: "transition-all duration-300 ease-in-out",
  transitionFast: "transition-all duration-150 ease-in-out",
  transitionSlow: "transition-all duration-500 ease-in-out",

  // Transiciones específicas
  transitionColors: "transition-colors duration-300 ease-in-out",
  transitionOpacity: "transition-opacity duration-300 ease-in-out",
  transitionTransform: "transition-transform duration-300 ease-in-out",

  // Transformaciones
  hover: "hover:scale-105 hover:shadow-lg",
  hoverSoft: "hover:scale-102 hover:shadow-md",
  hoverButton: "hover:scale-95 active:scale-90",

  // Estados
  loading: "animate-pulse",
  bounce: "animate-bounce",
  spin: "animate-spin",
}

// Utilidades para crear animaciones personalizadas
export function createStaggerAnimation(delay = 0.1) {
  return {
    animate: {
      transition: {
        staggerChildren: delay,
      },
    },
  }
}

export function createSlideAnimation(direction = 'left', distance = 20) {
  const directions = {
    left: { x: -distance },
    right: { x: distance },
    up: { y: -distance },
    down: { y: distance },
  }

  return {
    initial: { ...directions[direction], opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { ...directions[direction], opacity: 0 },
  }
}

// Hook para manejar animaciones condicionales
export function useConditionalAnimation(condition, trueVariant, falseVariant) {
  return condition ? trueVariant : falseVariant
}

// Configuraciones de página
export const pageTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: transitions.smooth,
}

// Configuraciones para listas
export const listItemVariants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
}

export const listContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}