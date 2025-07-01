import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/components/providers"

import "@workspace/ui-registry/globals.css"

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
      
        {/* Auto-inyección del Theme Editor */}
        {process.env.NODE_ENV === 'development' && (
          <script src="/theme-editor-auto.js" async />
        )}
        </body>
    </html>
  )
}
