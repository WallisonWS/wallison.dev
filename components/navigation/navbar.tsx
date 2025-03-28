"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Otimizar scroll handler com debounce
  useEffect(() => {
    let requestId
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      lastScrollY = window.scrollY
      setIsScrolled(lastScrollY > 50)

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
    { id: "projects", label: "Projetos" },
    { id: "testimonials", label: "Depoimentos" },
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

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] transition-all duration-300 ${
          isScrolled ? "glass-effect" : "bg-transparent"
        }`}
      >
        <div className="container-custom h-full flex items-center justify-between">
          <Link href="/" className="relative z-10">
            <motion.span
              className="text-xl font-bold"
              animate={{
                background: [
                  "linear-gradient(to right, hsl(var(--primary-400)), hsl(var(--primary-500)))",
                  "linear-gradient(to right, hsl(var(--primary-500)), hsl(var(--accent-500)))",
                  "linear-gradient(to right, hsl(var(--accent-500)), hsl(var(--primary-400)))",
                  "linear-gradient(to right, hsl(var(--primary-400)), hsl(var(--primary-500)))",
                ],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Wallison.dev
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative focus-ring ${
                      activeSection === item.id
                        ? "text-white"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                    }`}
                  >
                    {item.label}

                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Button (Desktop) */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNavClick("contact")}
              size="sm"
              className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white border-none"
            >
              Fale Comigo
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800/50 focus-ring"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[var(--header-height)] left-0 right-0 z-40 glass-effect md:hidden"
          >
            <nav className="container-custom py-4">
              <ul className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full px-4 py-3 rounded-md text-left transition-colors focus-ring ${
                        activeSection === item.id
                          ? "bg-primary-900/50 text-white"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <Button
                    onClick={() => handleNavClick("contact")}
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white border-none"
                  >
                    Fale Comigo
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

