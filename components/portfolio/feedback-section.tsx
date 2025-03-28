"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ThumbsUp, Briefcase, Building, Calendar, CheckCircle, Clock, MapPin } from "lucide-react"

// Componente de estrela animada
const AnimatedStar = ({ filled, onHover, onClick, index }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => onHover(index)}
      onClick={() => onClick(index)}
      className="cursor-pointer"
    >
      <Star
        className={`h-6 w-6 ${
          filled ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
        } transition-colors duration-200`}
      />
    </motion.div>
  )
}

// Depoimentos de clientes mais realistas e profissionais
const testimonials = [
  {
    id: 1,
    name: "Ana Silva",
    role: "CEO, TechStart",
    company: "TechStart Solutions",
    location: "São Paulo, SP",
    date: "Março 2023",
    project: "Website Institucional e Sistema de Gestão",
    rating: 5,
    text: "Contratar o Wallison foi uma das melhores decisões que tomamos para nossa startup. Ele não apenas entregou um site institucional impecável, mas também desenvolveu um sistema de gestão interno que aumentou nossa produtividade em 30%. Sua capacidade de entender nossas necessidades e transformá-las em soluções funcionais é impressionante. Recomendo fortemente!",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Gerente de Projetos",
    company: "InnovateTech",
    location: "Rio de Janeiro, RJ",
    date: "Outubro 2023",
    project: "E-commerce Completo",
    rating: 5,
    text: "Contratamos o Wallison para desenvolver nossa plataforma de e-commerce e ficamos impressionados com a qualidade do código e atenção aos detalhes. O site é rápido, responsivo e extremamente fácil de usar. Nossos clientes têm elogiado a experiência de compra, e as vendas aumentaram significativamente desde o lançamento. Já estamos planejando novos projetos com ele.",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    verified: true,
  },
  {
    id: 3,
    name: "Juliana Costa",
    role: "Designer",
    company: "CreativeStudio",
    location: "Belo Horizonte, MG",
    date: "Janeiro 2024",
    project: "Portfólio Interativo",
    rating: 5,
    text: "Como designer, apreciei muito a capacidade do Wallison de transformar meus designs em código perfeito. Ele entende tanto de estética quanto de funcionalidade. Meu portfólio interativo ficou exatamente como eu imaginava, com animações suaves e uma experiência de usuário excepcional. A comunicação durante todo o projeto foi clara e profissional. Definitivamente trabalharemos juntos novamente!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    verified: true,
  },
  {
    id: 4,
    name: "Rafael Oliveira",
    role: "Empreendedor",
    company: "StartupMVP",
    location: "Curitiba, PR",
    date: "Dezembro 2023",
    project: "MVP para Startup",
    rating: 5,
    text: "Minha startup precisava de um MVP rápido e funcional para validar nosso modelo de negócio. Wallison entregou exatamente o que precisávamos, com código limpo e bem documentado. Sua abordagem pragmática e foco em resultados nos ajudou a lançar em tempo recorde e conseguir nosso primeiro investimento. Sua expertise em React e Node.js foi fundamental para o sucesso do projeto.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    verified: true,
  },
  {
    id: 5,
    name: "Mariana Santos",
    role: "Diretora de Marketing",
    company: "AgênciaDigital",
    location: "Brasília, DF",
    date: "Fevereiro 2024",
    project: "Landing Pages e Automação",
    rating: 5,
    text: "Trabalhamos com o Wallison em várias landing pages para campanhas de marketing digital. Sua capacidade de criar páginas otimizadas para conversão e integradas com nossas ferramentas de automação superou todas as expectativas. As páginas carregam rapidamente, são visualmente atraentes e, mais importante, converteram 40% mais leads do que nossas páginas anteriores. Um profissional excepcional!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    verified: true,
  },
]

// Estatísticas de satisfação
const satisfactionStats = [
  { label: "Projetos Concluídos", value: "25+", icon: CheckCircle, color: "from-green-500 to-emerald-600" },
  { label: "Clientes Satisfeitos", value: "20+", icon: ThumbsUp, color: "from-blue-500 to-indigo-600" },
  { label: "Avaliação Média", value: "5.0", icon: Star, color: "from-yellow-500 to-amber-600" },
  { label: "Tempo de Resposta", value: "2h", icon: Clock, color: "from-purple-500 to-pink-600" },
]

export default function FeedbackSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [userRating, setUserRating] = useState(0)
  const [hasRated, setHasRated] = useState(false)
  const [ratingMessage, setRatingMessage] = useState("")
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)
  const autoplayIntervalRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })

  useEffect(() => {
    // Autoplay para o carrossel de depoimentos
    if (autoplayEnabled && isInView) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 8000)
    } else if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
    }

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current)
      }
    }
  }, [autoplayEnabled, isInView, testimonials.length])

  const handleStarHover = (index) => {
    if (!hasRated) {
      setHoveredRating(index + 1)
    }
  }

  const handleStarClick = (index) => {
    if (!hasRated) {
      setUserRating(index + 1)
      setHasRated(true)

      // Mensagens personalizadas baseadas na avaliação
      const messages = [
        "Obrigado pelo feedback! Como posso melhorar?",
        "Obrigado! Estou sempre buscando melhorar.",
        "Agradeço sua avaliação! Espero superar suas expectativas no futuro.",
        "Muito obrigado! Fico feliz que tenha gostado do meu trabalho.",
        "Excelente! Muito obrigado pela avaliação máxima!",
      ]

      setRatingMessage(messages[index])
    }
  }

  const handleStarLeave = () => {
    if (!hasRated) {
      setHoveredRating(0)
    }
  }

  const handleTestimonialChange = (index) => {
    setActiveTestimonial(index)
    // Pausa o autoplay quando o usuário interage
    setAutoplayEnabled(false)
    // Reinicia o autoplay após 30 segundos de inatividade
    setTimeout(() => setAutoplayEnabled(true), 30000)
  }

  return (
    <section className="py-20 px-4" id="feedback" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
        >
          Feedback de Clientes
        </motion.h2>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {satisfactionStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="bg-gray-900/70 backdrop-blur-sm border-gray-800 overflow-hidden h-full">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Depoimentos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="bg-gray-900/70 backdrop-blur-sm border-gray-800 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex justify-center mb-8">
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <Quote className="h-12 w-12 text-blue-400 opacity-50" />
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center md:px-12"
                >
                  <p className="text-gray-300 text-lg italic mb-8 leading-relaxed">
                    "{testimonials[activeTestimonial].text}"
                  </p>

                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-blue-500 shadow-lg shadow-blue-500/20">
                      <img
                        src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                        alt={testimonials[activeTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h4 className="text-white font-semibold text-xl">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-blue-400 text-sm mb-1">{testimonials[activeTestimonial].role}</p>

                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                      <Building className="h-3 w-3" />
                      <span>{testimonials[activeTestimonial].company}</span>
                      <span>•</span>
                      <MapPin className="h-3 w-3" />
                      <span>{testimonials[activeTestimonial].location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
                      <Calendar className="h-3 w-3" />
                      <span>{testimonials[activeTestimonial].date}</span>
                      <span>•</span>
                      <Briefcase className="h-3 w-3" />
                      <span>{testimonials[activeTestimonial].project}</span>
                    </div>

                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                        >
                          <Star
                            className={`h-5 w-5 ${i < testimonials[activeTestimonial].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"} mx-0.5`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {testimonials[activeTestimonial].verified && (
                      <motion.div
                        className="flex items-center gap-1 text-green-400 text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>Cliente verificado</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center mt-10 gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full ${index === activeTestimonial ? "bg-blue-500" : "bg-gray-600"}`}
                    onClick={() => handleTestimonialChange(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    animate={
                      index === activeTestimonial
                        ? {
                            scale: [1, 1.2, 1],
                            transition: { duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
                          }
                        : {}
                    }
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Avaliação do usuário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-gray-900/70 backdrop-blur-sm border-gray-800 overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Como você avalia meu trabalho?</h3>
                <p className="text-gray-400">Seu feedback é muito importante para mim!</p>
              </div>

              <div className="flex justify-center gap-2 mb-4" onMouseLeave={handleStarLeave}>
                {[...Array(5)].map((_, index) => (
                  <AnimatedStar
                    key={index}
                    filled={index < (hoveredRating || userRating)}
                    onHover={handleStarHover}
                    onClick={handleStarClick}
                    index={index}
                  />
                ))}
              </div>

              <AnimatePresence>
                {hasRated && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="flex justify-center mb-2"
                    >
                      {[...Array(userRating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -30 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                        >
                          <Star className="h-6 w-6 text-yellow-400 fill-yellow-400 mx-0.5" />
                        </motion.div>
                      ))}
                    </motion.div>
                    <p className="text-green-400 mb-2 font-semibold">★ Obrigado pela sua avaliação! ★</p>
                    <p className="text-gray-300">{ratingMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

