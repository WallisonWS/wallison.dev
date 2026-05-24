"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SendEmail } from "@/integrations/Core"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send, CheckCircle2, AtSign, User, Briefcase, MessageSquare, Terminal, ShieldAlert } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [status, setStatus] = useState("idle") // idle, loading, success, error
  const [progress, setProgress] = useState(0)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Simulação de transmissão de pacotes quando em loading
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (status === "loading") {
      setProgress(0)
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) {
            clearInterval(interval)
            return 98
          }
          return prev + Math.floor(Math.random() * 15) + 5
        })
      }, 150)
    }
    return () => clearInterval(interval)
  }, [status])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setStatus("loading")

    try {
      await SendEmail({
        to: "wallisonoficial85@gmail.com",
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

      setProgress(100)
      setTimeout(() => {
        setStatus("success")
      }, 500)

      // Retorna para idle após 8 segundos
      setTimeout(() => {
        setFormData({ name: "", email: "", company: "", message: "" })
        setStatus("idle")
      }, 8000)
    } catch (error) {
      console.error("Error sending email:", error)
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-emerald-500/30 bg-gray-950/90 backdrop-blur-md p-8 rounded-2xl text-center space-y-6 shadow-[0_0_35px_rgba(16,185,129,0.15)] relative overflow-hidden"
      >
        {/* Top neon glow line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-500 to-green-500" />
        <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.03]" />

        <div className="mx-auto bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-full w-16 h-16 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <CheckCircle2 className="w-8 h-8 animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white tracking-wide font-mono uppercase">[OK] TRANSMISSÃO COMPLETA</h3>
          <p className="text-emerald-400 font-mono text-[10px] tracking-wider">UPLINK_SECURE_ESTABLISHED // SMTP_TUNNEL_UP</p>
        </div>

        <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-800/80 text-left font-mono text-xs text-gray-400 space-y-1.5 shadow-[inset_0_1px_15px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-1.5 text-gray-500 border-b border-gray-800 pb-1 mb-1">
            <Terminal className="h-3 w-3" />
            <span>uplink-terminal-logs</span>
          </div>
          <div>&gt; status: 200 OK</div>
          <div>&gt; payload_received: true</div>
          <div>&gt; ssl_cipher: TLS_AES_256_GCM_SHA384</div>
          <div className="text-emerald-400/90 animate-pulse mt-2 font-bold">&gt; Obrigado! Sua mensagem foi enviada de forma segura. Responderia em breve. _</div>
        </div>
      </motion.div>
    )
  }

  if (status === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-red-500/30 bg-gray-950/90 backdrop-blur-md p-8 rounded-2xl text-center space-y-6 shadow-[0_0_35px_rgba(239,68,68,0.15)] relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-red-500 via-rose-500 to-amber-500" />
        <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.03]" />

        <div className="mx-auto bg-red-500/10 border border-red-500/25 p-4 rounded-full w-16 h-16 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <ShieldAlert className="w-8 h-8 animate-bounce" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white tracking-wide font-mono uppercase">[FALHA] TRANSMISSÃO ABORTADA</h3>
          <p className="text-red-400 font-mono text-[10px] tracking-wider">ROUTE_NOT_FOUND // CONNECT_TIMEOUT</p>
        </div>

        <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-800/80 text-left font-mono text-xs text-gray-400 space-y-1.5 shadow-[inset_0_1px_15px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-1.5 text-gray-500 border-b border-gray-800 pb-1 mb-1">
            <Terminal className="h-3 w-3" />
            <span>uplink-terminal-logs</span>
          </div>
          <div>&gt; status: 504 GATEWAY_TIMEOUT</div>
          <div>&gt; packets_sent: 0 / 4 (retry count exceeded)</div>
          <div className="text-red-400/90 font-bold mt-2">&gt; Por favor, verifique sua conexão ou tente usar o chat lateral. _</div>
        </div>

        <Button 
          onClick={() => setStatus("idle")} 
          className="bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 hover:border-red-500/60 text-white w-full rounded-lg font-mono text-xs py-2 shadow-md transition-all"
        >
          Tentar Novamente
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative group">
        {/* Glowing futuristic card borders */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur opacity-35 group-hover:opacity-60 transition-opacity duration-700" />
        
        <Card className="border border-gray-800/80 bg-gray-950/80 backdrop-blur-md shadow-2xl rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.03]" />

          {/* Corner Grid Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-cyan-500/40 rounded-tl-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-cyan-500/40 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-purple-500/40 rounded-bl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-purple-500/40 rounded-br-2xl pointer-events-none" />

          <CardHeader className="border-b border-gray-900 pb-5">
            <CardTitle className="text-2xl font-extrabold text-white tracking-wide">
              Estabelecer Uplink de Comunicação
            </CardTitle>
            <CardDescription className="text-gray-400 font-mono text-xs">
              Preencha o formulário para enviar pacotes de dados de forma criptografada.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <Label 
                  htmlFor="name" 
                  className={`text-xs font-mono tracking-wider uppercase transition-colors duration-300 flex items-center gap-2 ${focusedField === "name" ? "text-cyan-400" : "text-gray-400"}`}
                >
                  <User className={`h-4 w-4 transition-transform duration-300 ${focusedField === "name" ? "scale-110 text-cyan-400" : "text-gray-500"}`} />
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="mt-1 bg-gray-900/60 border-gray-800/80 text-white rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder:text-gray-600 transition-all font-sans"
                  placeholder="Ex: Wallison Araujo"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] font-mono text-red-400"
                  >
                    [ERRO] {errors.name}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="email" 
                  className={`text-xs font-mono tracking-wider uppercase transition-colors duration-300 flex items-center gap-2 ${focusedField === "email" ? "text-purple-400" : "text-gray-400"}`}
                >
                  <AtSign className={`h-4 w-4 transition-transform duration-300 ${focusedField === "email" ? "scale-110 text-purple-400" : "text-gray-500"}`} />
                  Email Destinatário
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="mt-1 bg-gray-900/60 border-gray-800/80 text-white rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-gray-600 transition-all font-sans"
                  placeholder="Ex: seuemail@provedor.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] font-mono text-red-400"
                  >
                    [ERRO] {errors.email}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="company" 
                  className={`text-xs font-mono tracking-wider uppercase transition-colors duration-300 flex items-center gap-2 ${focusedField === "company" ? "text-blue-400" : "text-gray-400"}`}
                >
                  <Briefcase className={`h-4 w-4 transition-transform duration-300 ${focusedField === "company" ? "scale-110 text-blue-400" : "text-gray-500"}`} />
                  Empresa / Organização (opcional)
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("company")}
                  onBlur={() => setFocusedField(null)}
                  className="mt-1 bg-gray-900/60 border-gray-800/80 text-white rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-600 transition-all font-sans"
                  placeholder="Ex: ABC Associação Brasil Central"
                />
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="message" 
                  className={`text-xs font-mono tracking-wider uppercase transition-colors duration-300 flex items-center gap-2 ${focusedField === "message" ? "text-emerald-400" : "text-gray-400"}`}
                >
                  <MessageSquare className={`h-4 w-4 transition-transform duration-300 ${focusedField === "message" ? "scale-110 text-emerald-400" : "text-gray-500"}`} />
                  Mensagem de Dados (Payload)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="mt-1 bg-gray-900/60 border-gray-800/80 text-white rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder:text-gray-600 transition-all font-sans"
                  placeholder="Escreva sua proposta de projeto ou chamado de suporte..."
                  rows={4}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] font-mono text-red-400"
                  >
                    [ERRO] {errors.message}
                  </motion.p>
                )}
              </div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2">
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full font-mono text-xs uppercase tracking-wider relative overflow-hidden transition-all duration-300 py-3 rounded-lg ${
                    status === "loading"
                      ? "bg-gray-900 border border-cyan-500/30 text-cyan-400"
                      : "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/10"
                  }`}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                      <span>Transmitindo Pacotes... {progress}%</span>
                      {/* Loading Progress Bar */}
                      <span 
                        className="absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-150"
                        style={{ width: `${progress}%` }}
                      />
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      <span>Iniciar Transmissão (Uplink)</span>
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
