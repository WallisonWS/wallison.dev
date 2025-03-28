"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Otimizado para melhor desempenho - menos animações complexas
const skills = [
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E34F26",
    proficiency: "Avançado",
    description: "Criação de estruturas web semânticas, acessibilidade ARIA e formulários avançados",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572B6",
    proficiency: "Avançado",
    description: "Layouts com Flexbox e Grid, animações, media queries e design responsivo",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
    proficiency: "Intermediário",
    description: "ES6+, manipulação DOM, Promises, Fetch API e funções assíncronas",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    proficiency: "Intermediário",
    description: "Hooks (useState, useEffect), Context API, componentes reutilizáveis e React Router",
    animation: {
      hover: { scale: 1.05 },
      special: {
        rotate: [0, 360],
        transition: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
      },
    },
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    proficiency: "Básico",
    description: "Express, criação de APIs RESTful, middleware e conexão com bancos de dados",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    color: "#7952B3",
    proficiency: "Avançado",
    description: "Uso de componentes, grid system, customização de temas e templates responsivos",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
    proficiency: "Intermediário",
    description: "Controle de versão, branches, merges, resolução de conflitos e GitFlow",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
    proficiency: "Básico",
    description: "Modelagem de dados NoSQL, CRUD operations e integrações com Node.js",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
    proficiency: "Básico",
    description: "Tipagem estática, interfaces, types e integração com React e Node.js",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#4479A1",
    proficiency: "Intermediário",
    description: "Queries SQL, modelagem relacional, joins, funções agregadas e stored procedures",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "#F24E1E",
    proficiency: "Básico",
    description: "Visualização de design, extração de assets, protótipos interativos e specs",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "Sass",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    color: "#CC6699",
    proficiency: "Intermediário",
    description: "Pré-processador CSS com variáveis, mixins, nesting e arquitetura de estilos modular",
    animation: {
      hover: { scale: 1.05 },
    },
  },
]

export default function SkillsGrid() {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  // Memoize handler functions
  const handleHoverStart = useCallback((skillName) => {
    setHoveredSkill(skillName)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setHoveredSkill(null)
  }, [])

  // Memoize o grid para evitar re-renderizações desnecessárias
  const skillGrid = useMemo(() => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }} // Once = true for performance
            transition={{ delay: Math.min(index * 0.05, 0.5) }} // Cap maximum delay
            className="group relative"
            onHoverStart={() => handleHoverStart(skill.name)}
            onHoverEnd={handleHoverEnd}
            layout={false} // Use layout={false} to prevent layout recalculation
          >
            <motion.div
              className="relative p-4 bg-gray-800/80 rounded-xl backdrop-blur-sm border border-gray-700/50 transition-all duration-300 cursor-pointer"
              animate={
                hoveredSkill === skill.name
                  ? {
                      borderColor: `${skill.color}80`,
                      boxShadow: `0 0 20px ${skill.color}30`,
                    }
                  : {}
              }
              whileHover={skill.animation.hover}
              layoutId={undefined} // Reduce layout shifts
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className="relative"
                  animate={hoveredSkill === skill.name && skill.animation.special ? skill.animation.special : {}}
                >
                  <img
                    src={skill.icon || "/placeholder.svg"}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                    style={{
                      filter: hoveredSkill === skill.name ? `drop-shadow(0 0 8px ${skill.color}80)` : "none",
                    }}
                    loading="lazy"
                  />
                </motion.div>

                <motion.p
                  className="mt-3 text-sm text-center font-medium"
                  animate={{
                    color: hoveredSkill === skill.name ? skill.color : "rgb(209, 213, 219)",
                  }}
                >
                  {skill.name}
                </motion.p>
              </div>

              {/* Renderizar tooltip apenas quando necessário */}
              <AnimatePresence>
                {hoveredSkill === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 z-50 w-48 p-3 rounded-lg shadow-xl"
                    style={{
                      backgroundColor: `rgba(17, 24, 39, 0.95)`,
                      border: `1px solid ${skill.color}40`,
                      boxShadow: `0 5px 15px rgba(0, 0, 0, 0.3), 0 0 10px ${skill.color}30`,
                    }}
                  >
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-sm" style={{ color: skill.color }}>
                          {skill.name}
                        </h4>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${skill.color}20`,
                            color: skill.color,
                          }}
                        >
                          {skill.proficiency}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{skill.description}</p>

                      <div
                        className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45"
                        style={{
                          backgroundColor: `rgba(17, 24, 39, 0.95)`,
                          border: `1px solid ${skill.color}40`,
                          borderTop: "none",
                          borderLeft: "none",
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    )
  }, [hoveredSkill, handleHoverStart, handleHoverEnd])

  return skillGrid
}

