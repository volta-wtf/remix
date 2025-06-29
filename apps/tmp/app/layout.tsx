import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/components/providers"

import Script from "next/script"

import "./globals.css"
//import "@workspace/ui-registry/stylewind.css"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === 'development' && (
          <Script src="http://localhost:4444/theme-editor.js" strategy="afterInteractive"/>
        )}
      </body>
    </html>
  )
}
