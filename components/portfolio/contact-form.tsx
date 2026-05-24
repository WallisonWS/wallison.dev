"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SendEmail } from "@/integrations/Core"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send, CheckCircle2, AtSign, User, Briefcase, MessageSquare } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
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
      await SendEmail({
        to: "wallisonoficial85@gmail.com", // Email atualizado
        subject: `Contato do Portfolio: ${formData.name}`,
        body: `
          <h2>Nova mensagem de contato</h2>
          <p><strong>Nome:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Empresa:</strong> ${formData.company || "Não informado"}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${formData.message.replace(/\n/g, "<br>")}</p>
        `,
      })

      setStatus("success")

      // Reset to idle after 3 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", company: "", message: "" })
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-gray-800 bg-gray-900/70 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">Vamos conversar!</CardTitle>
          <CardDescription className="text-gray-400">
            Preencha o formulário abaixo para entrar em contato comigo.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="space-y-2"
            >
              <Label htmlFor="name" className="text-gray-200 flex items-center gap-2">
                <User className="h-4 w-4 text-blue-400" />
                Nome
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 bg-gray-800/70 border-gray-700 text-white placeholder-gray-400"
                placeholder="Seu nome completo"
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
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="space-y-2"
            >
              <Label htmlFor="email" className="text-gray-200 flex items-center gap-2">
                <AtSign className="h-4 w-4 text-purple-400" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 bg-gray-800/70 border-gray-700 text-white placeholder-gray-400"
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
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="space-y-2"
            >
              <Label htmlFor="company" className="text-gray-200 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-cyan-400" />
                Empresa (opcional)
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-1 bg-gray-800/70 border-gray-700 text-white placeholder-gray-400"
                placeholder="Nome da empresa"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="space-y-2"
            >
              <Label htmlFor="message" className="text-gray-200 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-green-400" />
                Mensagem
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 bg-gray-800/70 border-gray-700 text-white placeholder-gray-400"
                placeholder="Como posso ajudar você?"
                rows={4}
              />
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : status === "success" ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {status === "loading" ? "Enviando..." : status === "success" ? "Mensagem Enviada!" : "Enviar Mensagem"}
              </Button>
            </motion.div>

            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-red-400 mt-2"
              >
                Erro ao enviar mensagem. Tente novamente ou use o chat para falar comigo.
              </motion.p>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

