import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { AuthProvider } from "@/hooks/use-auth"

export const metadata: Metadata = {
  title: "Karyaberkah — Custom Signage & Printing Premium",
  description:
    "Solusi custom signage & printing terpercaya. Papan nama, neon box, huruf timbul, dan berbagai kebutuhan branding bisnis Anda.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
