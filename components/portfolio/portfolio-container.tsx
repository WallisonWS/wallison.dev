"use client"

import { useEffect, useState, useCallback, memo } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, ArrowDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import SkillsGrid from "@/components/portfolio/skills-grid"
import ContactForm from "@/components/portfolio/contact-form"
import BioSection from "@/components/portfolio/bio-section"
import ClientReviews from "@/components/portfolio/client-reviews"
import ChatBot from "@/components/chat/chat-bot"
import CyberHologram from "@/components/portfolio/cyber-hologram"

// Memoize static components
const MemoizedSkillsGrid = memo(SkillsGrid)
const MemoizedContactForm = memo(ContactForm)
const MemoizedBioSection = memo(BioSection)
const MemoizedClientReviews = memo(ClientReviews)
const MemoizedChatBot = memo(ChatBot)
const MemoizedCyberHologram = memo(CyberHologram)

export default function PortfolioContainer() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 200], [1, 0])
  const y = useTransform(scrollY, [0, 200], [0, -50])
  const [activeSection, setActiveSection] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Optimize scroll handler with debounce
  useEffect(() => {
    let requestId
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      lastScrollY = window.scrollY

      if (!ticking) {
        requestId = requestAnimationFrame(() => {
          const sections = document.querySelectorAll("section[id]")

          for (const section of sections) {
            const sectionTop = section.offsetTop - 100
            const sectionHeight = section.offsetHeight

            if (lastScrollY >= sectionTop && lastScrollY < sectionTop + sectionHeight) {
              setActiveSection(section.getAttribute("id"))
              break
            }
          }

          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (requestId) {
        cancelAnimationFrame(requestId)
      }
    }
  }, [])

  const navItems = [
    { id: "home", label: "Início" },
    { id: "about", label: "Sobre" },
    { id: "skills", label: "Skills" },
    { id: "reviews", label: "Avaliações" },
    { id: "feedback", label: "Feedback" },
    { id: "contact", label: "Contato" },
  ]

  // Memoize handlers
  const handleNavClick = useCallback((id) => {
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  // Social button component for reuse
  const SocialButton = memo(({ icon: Icon, href, bgColor }) => (
    <motion.div
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="outline"
        size="icon"
        asChild
        className={`${bgColor} rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20`}
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          <Icon className="h-6 w-6 text-white transition-all duration-300 hover:animate-pulse" />
        </a>
      </Button>
    </motion.div>
  ))

  return (
    <div className="relative">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.p
            className="font-bold text-xl text-white z-50"
            animate={{
              color: ["#38bdf8", "#818cf8", "#38bdf8"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            Wallison.dev
          </motion.p>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`px-4 py-2 text-sm font-medium transition-colors relative z-50`}
                onClick={() => handleNavClick(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  className={
                    activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white transition-colors"
                  }
                >
                  {item.label}
                </span>

                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button - Fixed z-index */}
          <motion.button
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-md bg-gray-800/50 z-50"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu - Adjusted z-index */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 md:hidden"
          >
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`p-3 mb-1 rounded-md text-left ${
                    activeSection === item.id
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                  }`}
                  onClick={() => handleNavClick(item.id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
        {/* Glow neon no fundo do Hero para design premium */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-subtle" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* 3D Cyberpunk Scrolling Grid Floor */}
        <motion.div 
          className="absolute inset-x-0 bottom-0 h-[45vh] pointer-events-none -z-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6,182,212,0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6,182,212,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "perspective(500px) rotateX(65deg)",
            transformOrigin: "bottom",
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 80%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 80%)",
          }}
          animate={{
            backgroundPositionY: ["0px", "60px"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="max-w-6xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10">
          <motion.div style={{ opacity, y }} className="md:col-span-7 text-center md:text-left space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
            >
              Wallison Araujo
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl text-gray-300 font-medium tracking-wide"
            >
              Desenvolvedor de Software | Infraestrutura & Redes | Cibersegurança
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base text-gray-400 max-w-lg leading-relaxed"
            >
              Especialista em arquitetura Zero Trust, switches Aruba, firewalls FortiGate e automação NetDevOps, integrando desenvolvimento de software moderno para gerenciar e blindar redes corporativas de alto desempenho.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 justify-center md:justify-start pt-2"
            >
              <SocialButton
                href="https://github.com/WallisonWS"
                icon={Github}
                bgColor="bg-[#24292e] hover:bg-[#2f363d] transition-colors"
              />

              <SocialButton
                href="https://linkedin.com/in/wallisonaraujo"
                icon={Linkedin}
                bgColor="bg-[#0a66c2] hover:bg-[#004182] transition-colors"
              />

              <SocialButton
                href="mailto:wallisonoficial85@gmail.com"
                icon={Mail}
                bgColor="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="md:col-span-5 flex justify-center w-full"
          >
            <MemoizedCyberHologram />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-10 z-10"
          onClick={() => handleNavClick("about")}
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-800/30 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            <ArrowDown className="h-6 w-6 animate-bounce" />
          </Button>
        </motion.div>
      </section>

      <MemoizedBioSection />

      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Minhas Skills
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MemoizedSkillsGrid />
          </motion.div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <MemoizedClientReviews />



      <section id="contact" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Entre em Contato
          </motion.h2>
          <MemoizedContactForm />
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-gray-800/50 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Wallison.dev. Todos os direitos reservados.</p>
      </footer>

      {/* AI Chat Bot */}
      <MemoizedChatBot />
    </div>
  )
}

