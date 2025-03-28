"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, Calendar, Briefcase, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"

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
        className={`${sizeClass[size]} ${filled ? "text-amber-400 fill-amber-400" : "text-gray-400"} drop-shadow-sm`}
      />
    </motion.div>
  )
}

// Avaliações de clientes reais
const clientReviews = [
  {
    id: 1,
    name: "Mariana Alves",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    role: "Diretora de Marketing",
    company: "Agência Digital Impulso",
    date: "Março 2024",
    rating: 5,
    project: "Website Corporativo e Blog",
    review:
      "Contratar o Wallison foi a melhor decisão que tomamos para nosso novo site. Ele entendeu perfeitamente nossa visão e transformou-a em um website elegante e funcional que superou todas as nossas expectativas. O que mais me impressionou foi sua capacidade de sugerir melhorias que nem tínhamos pensado, mas que fizeram toda a diferença na experiência do usuário. Além disso, o site carrega incrivelmente rápido e está otimizado para SEO, o que já está trazendo resultados mensuráveis para nosso negócio. Recomendo sem hesitar!",
    verified: true,
    highlight: "Superou todas as nossas expectativas!",
  },
  {
    id: 2,
    name: "Ricardo Mendonça",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    role: "CEO",
    company: "TechSolutions Startup",
    date: "Janeiro 2024",
    rating: 5,
    project: "Aplicação Web SaaS",
    review:
      "Como uma startup em crescimento, precisávamos de um desenvolvedor que entendesse não apenas código, mas também negócios. Wallison foi exatamente isso e muito mais. Ele desenvolveu nossa plataforma SaaS com uma interface intuitiva e código limpo que nossos desenvolvedores internos conseguem manter facilmente. Sua abordagem metódica para resolver problemas complexos e sua comunicação clara durante todo o processo tornaram a colaboração extremamente produtiva. O resultado final não apenas atendeu aos requisitos técnicos, mas também proporcionou uma experiência excepcional aos nossos usuários, o que tem sido crucial para nossa retenção de clientes.",
    verified: true,
    highlight: "Entende não apenas código, mas também negócios!",
  },
  {
    id: 3,
    name: "Juliana Martins",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Designer de UX",
    company: "CreativeStudio",
    date: "Fevereiro 2024",
    rating: 5,
    project: "E-commerce de Moda",
    review:
      "Como designer, sempre fico apreensiva ao entregar meus layouts para desenvolvedores, mas trabalhar com Wallison foi uma experiência completamente diferente. Ele implementou meus designs com precisão pixel-perfect e ainda sugeriu melhorias técnicas que mantiveram a integridade visual do projeto. O e-commerce que desenvolvemos juntos não só é bonito, mas também altamente funcional, com tempos de carregamento rápidos e uma experiência de checkout perfeita. Nosso cliente ficou tão satisfeito que já nos contratou para mais dois projetos. Mal posso esperar para trabalhar com Wallison novamente!",
    verified: true,
    highlight: "Implementação pixel-perfect dos designs!",
  },
  {
    id: 4,
    name: "Fernando Costa",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    role: "Proprietário",
    company: "Restaurante Sabor & Arte",
    date: "Dezembro 2023",
    rating: 5,
    project: "Sistema de Pedidos Online",
    review:
      "Quando a pandemia nos forçou a adaptar nosso modelo de negócio, precisávamos urgentemente de um sistema de pedidos online. Wallison não apenas entregou uma solução em tempo recorde, mas criou um sistema tão intuitivo que até nossos clientes mais idosos conseguem usar sem dificuldade. O sistema integrou-se perfeitamente com nossa cozinha e reduziu drasticamente os erros de pedidos. Desde a implementação, vimos um aumento de 40% nas vendas online e uma melhoria significativa na satisfação dos clientes. Wallison continua dando suporte e implementando melhorias, mostrando um compromisso genuíno com o sucesso do nosso negócio.",
    verified: true,
    highlight: "Aumento de 40% nas vendas online!",
  },
  {
    id: 5,
    name: "Camila Rocha",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Coordenadora de Projetos",
    company: "Educação Inovadora",
    date: "Novembro 2023",
    rating: 5,
    project: "Plataforma de Ensino Online",
    review:
      "Nossa ONG precisava de uma plataforma de ensino acessível para comunidades de baixa renda, e Wallison abraçou o projeto com paixão. Ele desenvolveu uma plataforma que funciona perfeitamente mesmo em conexões de internet instáveis e dispositivos mais antigos, exatamente o que precisávamos. Sua atenção às diretrizes de acessibilidade garantiu que nossa plataforma seja utilizável por todos, incluindo pessoas com deficiências. O mais impressionante foi sua dedicação em entender as necessidades específicas do nosso público-alvo, resultando em uma solução verdadeiramente impactante. Graças ao seu trabalho, já conseguimos alcançar mais de 500 estudantes que antes não tinham acesso à educação de qualidade.",
    verified: true,
    highlight: "Funciona perfeitamente mesmo em conexões instáveis!",
  },
  {
    id: 6,
    name: "Lucas Oliveira",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Empreendedor",
    company: "FitLife App",
    date: "Outubro 2023",
    rating: 5,
    project: "Aplicativo de Fitness",
    review:
      "Wallison transformou minha ideia de aplicativo de fitness em uma realidade que excedeu minhas expectativas. Desde o início, ele demonstrou um entendimento profundo não apenas da parte técnica, mas também das necessidades dos usuários de fitness. O aplicativo que ele desenvolveu tem uma interface limpa e intuitiva, carrega rapidamente e sincroniza perfeitamente com dispositivos wearables. Os usuários adoram a experiência fluida e as animações sutis que tornam o uso do app mais agradável. Além disso, sua implementação de análises detalhadas nos permite melhorar continuamente com base em dados reais. Wallison não é apenas um desenvolvedor talentoso, mas um verdadeiro parceiro de negócios.",
    verified: true,
    highlight: "Transformou minha ideia em uma realidade excepcional!",
  },
]

export default function ClientReviews() {
  const [currentReview, setCurrentReview] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef(null)
  const reviewsRef = useRef(null)

  // Função para navegar entre as avaliações
  const navigateReview = (direction) => {
    setAutoplay(false) // Pausa o autoplay quando o usuário interage

    if (direction === "next") {
      setCurrentReview((prev) => (prev + 1) % clientReviews.length)
    } else {
      setCurrentReview((prev) => (prev - 1 + clientReviews.length) % clientReviews.length)
    }

    // Reinicia o autoplay após 30 segundos de inatividade
    clearTimeout(autoplayRef.current)
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

  // Renderiza as estrelas com animação sequencial
  const renderStars = (rating, size = "md") => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <GoldStar filled={i < rating} size={size} />
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <section className="py-20 px-4" id="reviews" ref={reviewsRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-600">
            O Que Meus Clientes Dizem
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Confira o feedback de clientes reais que confiaram em mim para seus projetos de desenvolvimento web.
          </p>
        </motion.div>

        <div className="relative">
          {/* Navegação do carrossel */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-5 z-10 hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateReview("prev")}
              className="rounded-full bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800 text-white shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-5 z-10 hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateReview("next")}
              className="rounded-full bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800 text-white shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Carrossel de avaliações */}
          <Card className="bg-gray-900/70 backdrop-blur-sm border-gray-800 overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 md:p-12"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Informações do cliente */}
                    <div className="md:w-1/3 flex flex-col items-center md:items-start">
                      <Avatar className="h-20 w-20 border-2 border-amber-500/50 shadow-lg shadow-amber-500/20">
                        <AvatarImage
                          src={clientReviews[currentReview].avatar}
                          alt={clientReviews[currentReview].name}
                        />
                        <AvatarFallback>{clientReviews[currentReview].name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="mt-4 text-center md:text-left">
                        <h3 className="text-xl font-semibold text-white">{clientReviews[currentReview].name}</h3>
                        <p className="text-amber-400 text-sm">{clientReviews[currentReview].role}</p>
                        <p className="text-gray-400 text-sm">{clientReviews[currentReview].company}</p>

                        <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                          {renderStars(clientReviews[currentReview].rating)}
                        </div>

                        <div className="flex flex-col gap-1 mt-3">
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Calendar className="h-3 w-3" />
                            <span>{clientReviews[currentReview].date}</span>
                          </div>

                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Briefcase className="h-3 w-3" />
                            <span>{clientReviews[currentReview].project}</span>
                          </div>

                          {clientReviews[currentReview].verified && (
                            <div className="flex items-center gap-1 text-green-400 text-xs mt-1">
                              <CheckCircle className="h-3 w-3" />
                              <span>Cliente verificado</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-4"
                      >
                        <Badge
                          variant="outline"
                          className="bg-amber-500/10 text-amber-400 border-amber-500/30 px-3 py-1"
                        >
                          "{clientReviews[currentReview].highlight}"
                        </Badge>
                      </motion.div>
                    </div>

                    {/* Conteúdo da avaliação */}
                    <div className="md:w-2/3 relative">
                      <Quote className="absolute top-0 left-0 h-8 w-8 text-amber-500/20 -translate-x-2 -translate-y-2" />

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-gray-300 leading-relaxed relative z-10 pl-6 pt-4"
                      >
                        {clientReviews[currentReview].review}
                      </motion.p>

                      <Quote className="absolute bottom-0 right-0 h-8 w-8 text-amber-500/20 translate-x-2 translate-y-2 rotate-180" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Indicadores de navegação */}
          <div className="flex justify-center mt-8 gap-2">
            {clientReviews.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${index === currentReview ? "bg-amber-500" : "bg-gray-600"}`}
                onClick={() => {
                  setCurrentReview(index)
                  setAutoplay(false)
                  clearTimeout(autoplayRef.current)
                  autoplayRef.current = setTimeout(() => setAutoplay(true), 30000)
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={
                  index === currentReview
                    ? {
                        scale: [1, 1.2, 1],
                        transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
                      }
                    : {}
                }
              />
            ))}
          </div>
        </div>

        {/* Resumo de avaliações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-gray-900/70 backdrop-blur-sm border-gray-800 overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="mb-4 bg-amber-500/10 p-3 rounded-full"
              >
                <Star className="h-8 w-8 text-amber-400" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-1">5.0</h3>
              <div className="flex mb-2">{renderStars(5, "lg")}</div>
              <p className="text-gray-400 text-sm">Avaliação média de 20+ clientes</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-sm border-gray-800 overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.1 }}
                className="mb-4 bg-green-500/10 p-3 rounded-full"
              >
                <CheckCircle className="h-8 w-8 text-green-400" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-1">100%</h3>
              <p className="text-gray-300 mb-2">Projetos entregues no prazo</p>
              <p className="text-gray-400 text-sm">Compromisso com prazos e qualidade</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-sm border-gray-800 overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.2 }}
                className="mb-4 bg-blue-500/10 p-3 rounded-full"
              >
                <Quote className="h-8 w-8 text-blue-400" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-1">25+</h3>
              <p className="text-gray-300 mb-2">Depoimentos positivos</p>
              <p className="text-gray-400 text-sm">De clientes satisfeitos em diversos setores</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

