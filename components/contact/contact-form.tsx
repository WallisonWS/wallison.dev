"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Loader2, Send, CheckCircle2 } from "lucide-react"

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState("idle") // idle, loading, success, error
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório"
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }
    if (!formData.message.trim()) newErrors.message = "Mensagem é obrigatória"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setStatus("loading")

    try {
      // Simulação de envio de email
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setStatus("success")

      // Reset to idle after 3 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" })
        setStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Error sending email:", error)
      setStatus("error")

      // Reset to idle after 3 seconds
      setTimeout(() => {
        setStatus("idle")
      }, 3000)
    }
  }

  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20"></div>
      <div className="relative bg-gray-900 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-white mb-4">Envie uma Mensagem</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-white mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Seu nome"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-1 text-sm text-red-400"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="seu@email.com"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-1 text-sm text-red-400"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="block text-white mb-2">
              Assunto (opcional)
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Assunto da mensagem"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-white mb-2">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
              placeholder="Sua mensagem..."
            ></textarea>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-1 text-sm text-red-400"
              >
                {errors.message}
              </motion.p>
            )}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mensagem Enviada!
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </motion.div>

          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-400 mt-2"
            >
              Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente por email.
            </motion.p>
          )}
        </form>
      </div>
    </div>
  )
}

