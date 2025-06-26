"use client"

import React from "react"
import { picto, type PictoName } from "./picto.js"
import { cn } from "./utils.js"

// Definir tamaños estándar
export const iconSizes = {
  xs: "size-3",      // 12px
  sm: "size-4",      // 16px
  md: "size-5",      // 20px (default)
  lg: "size-6",      // 24px
  xl: "size-8",      // 32px
  "2xl": "size-10",  // 40px
} as const

// Definir colores semánticos
export const iconColors = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  secondary: "text-secondary-foreground",
  destructive: "text-destructive",
  success: "text-green-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
} as const

export type IconSize = keyof typeof iconSizes
export type IconColor = keyof typeof iconColors

export interface IconProps {
  name: PictoName
  size?: IconSize
  color?: IconColor
  className?: string
  onClick?: () => void
  "aria-label"?: string
}

// Componente Icon que combina semántica con presentación
export function Icon({
  name,
  size = "md",
  color = "default",
  className,
  onClick,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  const IconComponent = picto[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" no encontrado en picto`)
    return null
  }

    const iconClasses = cn(
    iconSizes[size],
    iconColors[color],
    onClick && "cursor-pointer hover:opacity-80 transition-opacity",
    className
  )

  return React.createElement(IconComponent, {
    className: iconClasses,
    onClick,
    "aria-label": ariaLabel || name,
    ...props
  })
}

// Hook para usar iconos programáticamente
export function useIcon(name: PictoName) {
  return picto[name]
}

// Utilidad para obtener clases de icono sin el componente
export function getIconClasses(size: IconSize = "md", color: IconColor = "default", className?: string) {
  return cn(iconSizes[size], iconColors[color], className)
}