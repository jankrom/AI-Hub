import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ModalProvider from "@/components/modal-provider"
import ToasterProvider from "@/components/toaster-provider"
import CrispProvider from "@/components/CrispProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI-Hub",
  description: "AI Generation Platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <CrispProvider />
      <body className={inter.className}>
        <ModalProvider />
        <ToasterProvider />
        {children}
      </body>
    </html>
  )
}
