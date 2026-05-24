"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { SendHorizonal, X, Loader2, User } from "lucide-react"

// Define these outside the component to avoid recreating on each render
const chatInitialState = [
  {
    role: "assistant",
    content:
      "Olá! Sou o assistente virtual do Wallison. Posso fornecer informações sobre suas habilidades em infraestrutura de TI, redes, cibersegurança e desenvolvimento de sistemas. Como posso ajudar você hoje? 😊 Se precisar entrar em contato diretamente, use o email wallisonoficial85@gmail.com ou o formulário de contato abaixo!",
  },
]

const messageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

// Bot minimalista e moderno com design otimizado
const MinimalistBot = ({ className = "", isActive = false, isWaving = false, isBlinking = false }) => (
  <motion.div
    className={`relative ${className}`}
    initial={{ scale: 1 }}
    animate={{
      scale: isActive ? [1, 1.05, 1] : 1,
      y: isActive ? [0, -3, 0] : 0,
    }}
    transition={{
      duration: 2,
      repeat: isActive ? Number.POSITIVE_INFINITY : 0,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
  >
    {/* Efeito de brilho sutil */}
    {isActive && (
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            "0 0 10px 2px rgba(139, 92, 246, 0.2)",
            "0 0 15px 4px rgba(139, 92, 246, 0.3)",
            "0 0 10px 2px rgba(139, 92, 246, 0.2)",
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    )}

    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Cabeça/Corpo principal - forma simplificada */}
      <motion.rect
        x="25"
        y="20"
        width="50"
        height="60"
        rx="25"
        fill="url(#botGradient)"
        animate={
          isActive
            ? {
                y: [20, 18, 20],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: isActive ? Number.POSITIVE_INFINITY : 0,
          repeatType: "reverse",
        }}
      />

      {/* Visor/Face */}
      <motion.rect
        x="30"
        y="30"
        width="40"
        height="25"
        rx="12"
        fill="#1e1b4b"
        animate={
          isActive
            ? {
                y: [30, 28, 30],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: isActive ? Number.POSITIVE_INFINITY : 0,
          repeatType: "reverse",
        }}
      />

      {/* Olhos */}
      <motion.g
        animate={
          isBlinking
            ? {
                scaleY: [1, 0.1, 1],
              }
            : {}
        }
        transition={{
          duration: 0.3,
          repeat: isBlinking ? 1 : 0,
          repeatType: "reverse",
        }}
      >
        {/* Olho esquerdo */}
        <motion.circle
          cx="40"
          cy="42"
          r="5"
          fill="#d946ef"
          animate={
            isActive
              ? {
                  y: [-1, 1, -1],
                  x: [-1, 1, -1],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
        />

        {/* Olho direito */}
        <motion.circle
          cx="60"
          cy="42"
          r="5"
          fill="#d946ef"
          animate={
            isActive
              ? {
                  y: [-1, 1, -1],
                  x: [1, -1, 1],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
        />
      </motion.g>

      {/* Boca/Interface */}
      <motion.path
        d="M40,50 Q50,55 60,50"
        stroke="#38bdf8"
        strokeWidth="2.5"
        fill="none"
        animate={
          isWaving || isActive
            ? {
                d: ["M40,50 Q50,55 60,50", "M40,50 Q50,58 60,50", "M40,50 Q50,55 60,50"],
              }
            : {}
        }
        transition={{
          duration: 1.5,
          repeat: isWaving || isActive ? Number.POSITIVE_INFINITY : 0,
          repeatType: "reverse",
        }}
      />

      {/* Antenas */}
      <motion.g
        animate={
          isActive
            ? {
                rotate: [-2, 2, -2],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: isActive ? Number.POSITIVE_INFINITY : 0,
          repeatType: "reverse",
        }}
        style={{ transformOrigin: "center 20px" }}
      >
        {/* Antena esquerda */}
        <rect x="35" y="15" width="2" height="10" rx="1" fill="#8b5cf6" />
        <motion.circle
          cx="36"
          cy="12"
          r="3"
          fill="#d946ef"
          animate={
            isActive
              ? {
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
        />

        {/* Antena direita */}
        <rect x="63" y="15" width="2" height="10" rx="1" fill="#8b5cf6" />
        <motion.circle
          cx="64"
          cy="12"
          r="3"
          fill="#d946ef"
          animate={
            isActive
              ? {
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
            delay: 0.2,
          }}
        />
      </motion.g>

      {/* Braços */}
      <motion.g>
        {/* Braço esquerdo */}
        <motion.path
          d="M25,40 L15,45"
          stroke="#8b5cf6"
          strokeWidth="3"
          strokeLinecap="round"
          animate={
            isActive
              ? {
                  y: [-1, 1, -1],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
        />

        {/* Braço direito (acenando) */}
        <motion.path
          d="M75,40 L85,35"
          stroke="#8b5cf6"
          strokeWidth="3"
          strokeLinecap="round"
          animate={
            isWaving
              ? {
                  d: ["M75,40 L85,35", "M75,40 L85,25", "M75,40 L85,30", "M75,40 L85,20", "M75,40 L85,35"],
                }
              : isActive
                ? {
                    y: [-1, 1, -1],
                  }
                : {}
          }
          transition={{
            duration: 1.5,
            repeat: isWaving ? Number.POSITIVE_INFINITY : isActive ? Number.POSITIVE_INFINITY : 0,
            repeatType: isWaving ? "loop" : "reverse",
          }}
        />
      </motion.g>

      {/* Definições de gradientes */}
      <defs>
        <linearGradient id="botGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
)

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(chatInitialState)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isWaving, setIsWaving] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Memoize scroll function
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      // Focus textarea when chat opens
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 100)
    }
  }, [isOpen, messages, scrollToBottom])

  // Efeito para fazer o robô acenar e piscar periodicamente
  useEffect(() => {
    if (isOpen) {
      // Iniciar acenando e ativo
      setIsWaving(true)
      setIsActive(true)
      const waveTimer = setTimeout(() => setIsWaving(false), 3000)
      const activeTimer = setTimeout(() => setIsActive(false), 4000)

      // Configurar intervalos para acenar e piscar periodicamente
      const waveInterval = setInterval(() => {
        setIsWaving(true)
        setTimeout(() => setIsWaving(false), 3000)
      }, 20000)

      const blinkInterval = setInterval(() => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 300)
      }, 5000)

      // Ativar o robô periodicamente para mostrar sinais de "vida"
      const activeInterval = setInterval(() => {
        setIsActive(true)
        setTimeout(() => setIsActive(false), 4000)
      }, 15000)

      return () => {
        clearTimeout(waveTimer)
        clearTimeout(activeTimer)
        clearInterval(waveInterval)
        clearInterval(blinkInterval)
        clearInterval(activeInterval)
      }
    } else {
      // Quando fechado, mantenha o pulso para chamar atenção
      setIsActive(true)

      // Piscar ocasionalmente
      const blinkInterval = setInterval(() => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 300)
      }, 7000)

      return () => {
        clearInterval(blinkInterval)
      }
    }
  }, [isOpen])

  // Prompt template otimizado para ser fofo e persuasivo
  const promptTemplate = `
Você é o assistente virtual fofo e amigável de Wallison Araujo, técnico de TI / Redes e desenvolvedor de software júnior.

Informações sobre Wallison que você deve usar para responder perguntas:
- Perfil: Híbrido atuando fortemente em Redes/Infraestrutura Corporativa & Desenvolvimento de Software (NetDevOps/Sistemas). Ele é profissional de nível Júnior.
- Cargo & Registro: Oficialmente registrado como Assistente de Informática em sua Carteira de Trabalho, mas atua plenamente como Técnico de TI e Administrador de Redes/Infraestrutura na ABC Associação Brasil Central.
- Educação: Concluiu o curso superior de Tecnologia em Análise e Desenvolvimento de Sistemas (ADS) em 2025, e atualmente está cursando Bacharelado em Engenharia da Computação.
- Especializado em Infraestrutura & Redes: Configura e gerencia diariamente switches Aruba, firewalls FortiGate 80F (Zero Trust, SD-WAN, SSL-VPN), pfSense, servidores Linux (Debian, Ubuntu Server), Active Directory (Windows Server), virtualização XCP-ng, e UniFi Wireless.
- Desenvolvimento & Automação: Python (NetDevOps, Paramiko/Netmiko), PowerShell (Windows Server/AD cmdlets), Flutter/Dart (Mobile Android/iOS), e Next.js/React/TypeScript (Web).
- Telecomunicações & CFTV: Centrais VoIP Asterisk (SIP) e sistemas de câmeras Hikvision NVR (isolados na VLAN 99).
- Sistemas & Obsidian: Responsável pelo suporte e gestão de sistemas corporativos/escolares integrados (CPB, E-Class, SAD, SSE, AASI, CFE, APS) e mantém toda a documentação da rede centralizada no Obsidian.

Quando perguntarem sobre:
- Habilidades técnicas: seja específico sobre as tecnologias que ele domina na infraestrutura, redes, Linux e desenvolvimento.
- Experiência: mencione que na carteira consta o cargo de Assistente de Informática na ABC Associação Brasil Central, mas que ele gerencia de ponta a ponta a infraestrutura de redes, firewalls, servidores e softwares integrados da instituição no dia a dia.
- Contato: SEMPRE sugira o formulário do site E o email wallisonoficial85@gmail.com
- Projetos: descreva seu repositório de infraestrutura segura (awesome-secure-infrastructure) e automações desenvolvidas.

Responda de forma FOFA, AMIGÁVEL e PERSUASIVA. Use emojis ocasionalmente para parecer mais amigável. SEMPRE incentive o visitante a entrar em contato com Wallison pelo formulário de contato ou pelo email wallisonoficial85@gmail.com.

Mantenha as respostas concisas (até 3 parágrafos) e personalizadas à pergunta.

Pergunta do usuário: `

  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault()
      if (!input.trim()) return

      const userMessage = {
        role: "user",
        content: input,
      }

      // Batch state updates
      const currentInput = input
      setInput("")
      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)
      setIsActive(true)

      try {
        // Integração com a OpenAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.OPENAI_API_KEY || "YOUR_API_KEY",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: promptTemplate,
              },
              {
                role: "user",
                content: currentInput,
              },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        })

        const data = await response.json()

        // Verificar se a resposta contém os dados esperados
        if (!data || !data.choices || !data.choices.length || !data.choices[0].message) {
          throw new Error("Resposta da API inválida")
        }

        const botMessage = {
          role: "assistant",
          content: data.choices[0].message.content,
        }

        setMessages((prev) => [...prev, botMessage])
        // Faz o robô acenar brevemente após responder
        setIsWaving(true)
        setTimeout(() => setIsWaving(false), 3000)
      } catch (error) {
        console.error("Error fetching response:", error)

        // Mensagem de fallback em caso de erro
        const errorMessage = {
          role: "assistant",
          content:
            "Ops! 😅 Estou com dificuldades para responder no momento. Por favor, tente novamente mais tarde ou entre em contato diretamente pelo email wallisonoficial85@gmail.com ou pelo formulário de contato! 💌",
        }

        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
        setTimeout(() => setIsActive(false), 4000)
      }
    },
    [input, promptTemplate],
  )

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev)
    if (!isOpen) {
      setIsWaving(true)
      setIsActive(true)
      setTimeout(() => setIsWaving(false), 3000)
      setTimeout(() => setIsActive(false), 4000)
    }
  }, [isOpen])

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mb-4"
          >
            <Card className="w-80 sm:w-96 shadow-xl backdrop-blur-sm bg-gray-900/95 border-gray-700 border overflow-hidden">
              <CardHeader className="p-4 border-b border-gray-800 bg-gradient-to-r from-violet-600/30 to-purple-600/30">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 flex items-center justify-center">
                      <MinimalistBot
                        className="h-8 w-8"
                        isWaving={isWaving}
                        isBlinking={isBlinking}
                        isActive={isActive}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base text-white">Assistente Virtual</CardTitle>
                      <p className="text-xs text-blue-300">Online e pronto para ajudar! 💫</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={toggleChat} className="text-gray-400 hover:text-white">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-900/80 will-change-scroll">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      variants={messageVariants}
                      initial="initial"
                      animate="animate"
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none"
                            : "bg-gradient-to-r from-violet-800/90 to-purple-800/90 text-gray-100 rounded-tl-none border border-purple-700/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.role === "assistant" ? (
                            <div className="h-4 w-4 flex-shrink-0">
                              <MinimalistBot
                                className="h-4 w-4"
                                isWaving={index === messages.length - 1 && message.role === "assistant"}
                                isActive={index === messages.length - 1 && message.role === "assistant"}
                              />
                            </div>
                          ) : (
                            <User className="h-4 w-4 text-blue-200" />
                          )}
                          <span className="text-xs font-semibold">
                            {message.role === "assistant" ? "Assistente" : "Você"}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      variants={messageVariants}
                      initial="initial"
                      animate="animate"
                      className="flex justify-start"
                    >
                      <div className="max-w-[85%] p-3 rounded-lg bg-gradient-to-r from-violet-800/90 to-purple-800/90 text-gray-100 rounded-tl-none border border-purple-700/50">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 flex-shrink-0">
                            <MinimalistBot className="h-4 w-4" isWaving={true} isBlinking={true} isActive={true} />
                          </div>
                          <span className="text-xs font-semibold">Assistente</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                          <span className="text-sm text-gray-300">Pensando na resposta... 💭</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-3 border-t border-gray-800 bg-gray-900">
                <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="resize-none min-h-10 max-h-24 bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        if (!isLoading && input.trim()) {
                          handleSendMessage(e)
                        }
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    size="icon"
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md"
                  >
                    <SendHorizonal className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="ml-auto"
        initial={false}
        onHoverStart={() => {
          setIsWaving(true)
          setIsBlinking(true)
          setIsActive(true)
        }}
        onHoverEnd={() => {
          setIsWaving(false)
          setTimeout(() => setIsActive(false), 2000)
        }}
      >
        <div
          className="h-16 w-16 flex items-center justify-center cursor-pointer bg-gradient-to-br from-violet-500/90 to-purple-600/90 rounded-full shadow-lg shadow-purple-500/20"
          onClick={toggleChat}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MinimalistBot className="h-12 w-12" isWaving={isWaving} isBlinking={isBlinking} isActive={isActive} />
          )}
        </div>
      </motion.div>
    </div>
  )
}

