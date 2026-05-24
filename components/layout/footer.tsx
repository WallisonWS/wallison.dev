"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/WallisonWS" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/wallisonaraujo" },
    { name: "Email", icon: Mail, href: "mailto:wallisonoficial85@gmail.com" },
  ]

  const footerLinks = [
    { name: "Início", href: "#home" },
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contato", href: "#contact" },
  ]

  return (
    <footer className="relative border-t border-neutral-800 mt-20">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/80 -translate-y-full h-40" />

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="inline-block">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  Wallison.dev
                </h3>
              </Link>
              <p className="mt-2 text-neutral-400 max-w-md">
                Administrador de TI / Redes e Desenvolvedor especializado em infraestrutura segura, cibersegurança, automação (NetDevOps) e sistemas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex space-x-4"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-neutral-800 text-neutral-300 hover:bg-primary-900 hover:text-primary-300 transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Navegação</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-neutral-400 hover:text-primary-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-primary-400 mt-0.5 mr-2" />
                  <a
                    href="mailto:wallisonoficial85@gmail.com"
                    className="text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    wallisonoficial85@gmail.com
                  </a>
                </li>
                <li className="flex items-start">
                  <Linkedin className="w-5 h-5 text-primary-400 mt-0.5 mr-2" />
                  <a
                    href="https://linkedin.com/in/wallisonaraujo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center"
                  >
                    linkedin.com/in/wallisonaraujo
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-neutral-500 text-sm">© {currentYear} Wallison Araujo. Todos os direitos reservados.</p>
          <p className="text-neutral-500 text-sm mt-2 sm:mt-0">
            Desenvolvido com <span className="text-accent-500">♥</span> e Next.js
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

