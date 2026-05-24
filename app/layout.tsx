import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google"
import { MainLayout } from "@/components/layout/main-layout"
import { Metadata } from "next"
import "./globals.css"

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Wallison Araujo | Redes, Infraestrutura & Desenvolvimento",
  description:
    "Portfólio de Wallison Araujo, focado em administração de TI, infraestrutura de redes, cibersegurança e desenvolvimento de software (NetDevOps).",
  keywords: "infraestrutura, redes, cibersegurança, fortigate, aruba, pfsense, active directory, netdevops, python, flutter, next.js, wallison araujo",
  authors: [{ name: "Wallison Araujo" }],
  creator: "Wallison Araujo",
  openGraph: {
    title: "Wallison Araujo | Redes, Infraestrutura & Desenvolvimento",
    description: "Portfólio de Wallison Araujo, especialista em Infraestrutura de Redes e Desenvolvimento",
    url: "https://wallison.dev",
    siteName: "Wallison.dev",
    locale: "pt_BR",
    type: "website",
  },
  generator: 'v0.dev'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable}`}
    >
      <body className="bg-background text-foreground">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}