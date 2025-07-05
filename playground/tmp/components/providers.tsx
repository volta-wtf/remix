"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  // Temporalmente desactivado para debug
  return (
    <>
      {children}
    </>
  )

  // NextThemesProvider desactivado temporalmente para debug
  /*
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  )
  */
}
