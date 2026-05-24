"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, Calendar, Briefcase, CheckCircle, ChevronLeft, ChevronRight, Shield, Cpu, Code2, Network } from "lucide-react"

// Componente de estrela dourada
const GoldStar = ({ filled = true, size = "md" }) => {
  const sizeClass = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <Star
        className={`${sizeClass[size]} ${filled ? "text-cyan-400 fill-cyan-400/30 stroke-cyan-300" : "text-gray-600"} drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]`}
      />
    </motion.div>
  )
}

// Avaliações de clientes focadas na infraestrutura e desenvolvimento real do Wallison
const clientReviews = [
  {
    id: 1,
    name: "Dr. Roberto Silveira",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    role: "Diretor Executivo",
    company: "Grupo Educacional Vanguarda",
    date: "Março 2024",
    rating: 5,
    project: "Arquitetura de Rede Zero-Trust e VLANs",
    review:
      "O Wallison executou uma transformação completa na segurança de nossa rede. Implementou políticas Zero-Trust rigorosas no nosso firewall FortiGate 80F e isolou as câmeras Hikvision na VLAN 99, eliminando riscos de vazamentos. Agora, o acesso remoto só é possível via VPN criptografada. Um trabalho técnico impecável e de alto nível de maturidade.",
    verified: true,
    highlight: "Rede corporativa 100% segura!",
    tech: ["FortiGate 80F", "Zero Trust", "VLAN 99", "VPN"]
  },
  {
    id: 2,
    name: "Profa. Eliane Souza",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    role: "Coordenadora Geral",
    company: "Colégio Integral Conexão",
    date: "Janeiro 2024",
    rating: 5,
    project: "Integração e Suporte de Sistemas CPB & E-Class",
    review:
      "Com a implantação e manutenção dos portais escolares CPB, E-Class e SSE pelo Wallison, nossa rotina administrativa mudou para melhor. Ele resolve chamados complexos com rapidez, documenta tudo no Obsidian e garante que os dados dos alunos e professores fiquem sempre integrados sem qualquer interrupção. Excelente suporte técnico!",
    verified: true,
    highlight: "Suporte rápido e integração sem falhas!",
    tech: ["CPB & E-Class", "Obsidian", "SAD & SSE", "Suporte"]
  },
  {
    id: 3,
    name: "Thiago Moreira",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    role: "Engenheiro de Redes Sênior",
    company: "NetSec Solutions",
    date: "Fevereiro 2024",
    rating: 5,
    project: "Automação de Backups e Scripts CLI",
    review:
      "O que destaca o Wallison é sua habilidade em mesclar infraestrutura com automação. Ele desenvolveu scripts em Python e workflows no GitHub Actions que realizam backups automatizados diários dos switches Aruba e firewalls da rede. Ele elevou a administração de redes a um nível de excelência automatizada muito raro.",
    verified: true,
    highlight: "Automação brilhante com Python!",
    tech: ["Python", "PowerShell", "Aruba CLI", "GitHub Actions"]
  },
  {
    id: 4,
    name: "Carlos Eduardo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "Gerente de Infraestrutura",
    company: "CloudCore Hosting",
    date: "Dezembro 2023",
    rating: 5,
    project: "Virtualização e Hipervisores XCP-ng",
    review:
      "Wallison liderou a migração de nossos servidores de aplicação física para um ambiente totalmente virtualizado utilizando XCP-ng. A consolidação reduziu drasticamente custos de hardware e energia, além de implementar rotinas de snapshot e backup redundantes. Um profissional técnico júnior com entrega de nível pleno.",
    verified: true,
    highlight: "Migração XCP-ng com 100% de uptime!",
    tech: ["XCP-ng", "Virtualização", "Debian Linux", "Backups"]
  }
]

export default function ClientReviews() {
  const [currentReview, setCurrentReview] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const reviewsRef = useRef<HTMLDivElement | null>(null)

  // Captura o movimento do mouse para efeito parallax holográfico
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!reviewsRef.current) return
    const rect = reviewsRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    })
  }

  // Função para navegar entre as avaliações
  const navigateReview = (direction: "next" | "prev") => {
    setAutoplay(false) // Pausa o autoplay quando o usuário interage

    if (direction === "next") {
      setCurrentReview((prev) => (prev + 1) % clientReviews.length)
    } else {
      setCurrentReview((prev) => (prev - 1 + clientReviews.length) % clientReviews.length)
    }

    // Reinicia o autoplay após 30 segundos de inatividade
    if (autoplayRef.current) clearTimeout(autoplayRef.current)
    autoplayRef.current = setTimeout(() => setAutoplay(true), 30000)
  }

  // Autoplay para o carrossel de avaliações
  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % clientReviews.length)
      }, 10000) // Muda a cada 10 segundos

      return () => clearInterval(interval)
    }
  }, [autoplay])

  // Renderiza as estrelas
  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <GoldStar key={i} filled={i < rating} size={size} />
        ))}
      </div>
    )
  }

  return (
    <section 
      className="py-24 px-4 relative overflow-hidden" 
      id="feedback" 
      ref={reviewsRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background Cyber / Surreal Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(17,24,39,0.85),rgba(3,7,18,1))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Floating Hologram Orbs */}
      <motion.div 
        className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none"
        animate={{
          x: mousePosition.x * 0.1,
          y: mousePosition.y * 0.1,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{ left: '10%', top: '20%' }}
      />
      <motion.div 
        className="absolute w-[350px] h-[350px] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none"
        animate={{
          x: mousePosition.x * -0.1,
          y: mousePosition.y * -0.1,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{ right: '15%', bottom: '20%' }}
      />

      {/* Floating Cyber Icons in background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] top-[15%] text-cyan-500"
        >
          <Shield className="w-10 h-10" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[8%] top-[25%] text-violet-500"
        >
          <Network className="w-12 h-12" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute left-[12%] bottom-[15%] text-purple-500"
        >
          <Cpu className="w-8 h-8" />
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 font-mono uppercase tracking-wider text-xs">
            Feedback & Avaliações
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
            O Que Clientes e Gestores Dizem
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            Depoimentos de profissionais reais que validaram minhas soluções de infraestrutura segura, virtualização e automação NetDevOps.
          </p>
        </motion.div>

        <div className="relative">
          {/* Holographic Glowing card border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <Card className="bg-gray-950/75 backdrop-blur-md border border-gray-800/80 overflow-hidden shadow-2xl rounded-2xl relative">
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.03]" />
            
            {/* Hologram Grid Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-cyan-500/30 rounded-tr-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-violet-500/30 rounded-bl-2xl pointer-events-none" />

            <CardContent className="p-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  initial={{ opacity: 0, scale: 0.98, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -5 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 md:p-12"
                >
                  <div className="flex flex-col md:flex-row gap-10 items-stretch">
                    {/* Informações do cliente */}
                    <div className="md:w-5/12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-800/80 pb-6 md:pb-0 md:pr-10">
                      <div>
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {/* Ring Glow */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 blur-sm opacity-60" />
                            <Avatar className="h-16 w-16 border-2 border-cyan-400 relative z-10">
                              <AvatarImage
                                src={clientReviews[currentReview].avatar}
                                alt={clientReviews[currentReview].name}
                                className="object-cover"
                              />
                              <AvatarFallback className="bg-gray-800 text-cyan-400 text-lg font-bold">
                                {clientReviews[currentReview].name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-white tracking-wide">{clientReviews[currentReview].name}</h3>
                            <p className="text-cyan-400 text-xs font-mono font-medium">{clientReviews[currentReview].role}</p>
                            <p className="text-gray-400 text-xs font-semibold">{clientReviews[currentReview].company}</p>
                          </div>
                        </div>

                        <div className="mt-6 space-y-2.5">
                          <div className="flex items-center gap-2 text-gray-400 text-xs font-mono">
                            <Calendar className="h-3.5 w-3.5 text-cyan-500" />
                            <span>{clientReviews[currentReview].date}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-400 text-xs font-mono">
                            <Briefcase className="h-3.5 w-3.5 text-violet-500" />
                            <span className="truncate max-w-[250px]">{clientReviews[currentReview].project}</span>
                          </div>

                          {clientReviews[currentReview].verified && (
                            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono mt-1">
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span>Feedback Validado</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-8">
                        <Badge
                          variant="outline"
                          className="bg-cyan-500/5 text-cyan-300 border-cyan-500/20 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wide w-full justify-center text-center shadow-[inset_0_1px_15px_rgba(6,182,212,0.05)]"
                        >
                          "{clientReviews[currentReview].highlight}"
                        </Badge>
                      </div>
                    </div>

                    {/* Conteúdo da avaliação */}
                    <div className="md:w-7/12 flex flex-col justify-between pt-2 md:pt-0">
                      <div className="relative">
                        <Quote className="absolute -top-4 -left-2 h-10 w-10 text-cyan-500/10 pointer-events-none" />
                        
                        <div className="flex gap-1.5 mb-5">
                          {renderStars(clientReviews[currentReview].rating)}
                        </div>

                        <p className="text-gray-300 leading-relaxed text-sm md:text-base relative z-10 pl-2">
                          {clientReviews[currentReview].review}
                        </p>
                      </div>

                      {/* Tech Badges */}
                      <div className="mt-8 pt-6 border-t border-gray-900/60">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500 font-mono mb-2">Tecnologias Envolvidas</p>
                        <div className="flex flex-wrap gap-2">
                          {clientReviews[currentReview].tech.map((t, idx) => (
                            <Badge 
                              key={idx} 
                              className="bg-gray-900 hover:bg-gray-800 text-gray-400 border border-gray-800/80 px-2 py-0.5 rounded font-mono text-[10px]"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Console Style Navigation buttons */}
          <div className="flex justify-between items-center mt-6">
            {/* Indicadores de navegação (Dots) */}
            <div className="flex gap-2.5">
              {clientReviews.map((_, index) => (
                <button
                  key={index}
                  className={`w-5 h-1 rounded-full transition-all duration-300 ${index === currentReview ? "bg-cyan-400 w-8 shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "bg-gray-800 hover:bg-gray-700"}`}
                  onClick={() => {
                    setCurrentReview(index)
                    setAutoplay(false)
                    if (autoplayRef.current) clearTimeout(autoplayRef.current)
                    autoplayRef.current = setTimeout(() => setAutoplay(true), 30000)
                  }}
                />
              ))}
            </div>

            {/* Arrow Nav Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateReview("prev")}
                className="h-9 w-9 rounded-lg border-gray-800 bg-gray-950/80 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 shadow-md backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateReview("next")}
                className="h-9 w-9 rounded-lg border-gray-800 bg-gray-950/80 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 shadow-md backdrop-blur-sm transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Resumo de avaliações - Glassmorphism metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <Card className="bg-gray-950/40 backdrop-blur-sm border border-gray-900 shadow-xl overflow-hidden hover:border-cyan-500/20 transition-colors duration-500">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-0.5">5.0 / 5.0</h4>
                <p className="text-gray-400 text-xs font-medium">Avaliação média de satisfação</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-950/40 backdrop-blur-sm border border-gray-900 shadow-xl overflow-hidden hover:border-violet-500/20 transition-colors duration-500">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-violet-500/10 p-3 rounded-xl border border-violet-500/20 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-0.5">100%</h4>
                <p className="text-gray-400 text-xs font-medium">SLA e Prazos Cumpridos</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-950/40 backdrop-blur-sm border border-gray-900 shadow-xl overflow-hidden hover:border-purple-500/20 transition-colors duration-500">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-0.5">25+</h4>
                <p className="text-gray-400 text-xs font-medium">Automações Ativas em Produção</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
