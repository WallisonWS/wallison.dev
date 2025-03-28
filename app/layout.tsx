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
  title: "Wallison.dev | Desenvolvedor Full Stack Junior",
  description:
    "Portfolio de Wallison Pereira, Desenvolvedor Full Stack Junior especializado em React, Node.js e tecnologias web modernas.",
  keywords: "desenvolvedor, full stack, react, node.js, javascript, portfolio, web developer",
  authors: [{ name: "Wallison Pereira" }],
  creator: "Wallison Pereira",
  openGraph: {
    title: "Wallison.dev | Desenvolvedor Full Stack Junior",
    description: "Portfolio de Wallison Pereira, Desenvolvedor Full Stack Junior",
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