"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Otimizado para melhor desempenho - menos animações complexas
const skills = [
  {
    name: "FortiGate",
    icon: "https://www.vectorlogo.zone/logos/fortinet/fortinet-icon.svg",
    color: "#C00000",
    proficiency: "Avançado",
    description: "Configuração de políticas Zero Trust, SD-WAN, SSL-VPN, Web Filter, roteamento inter-VLAN e Sniffer/Troubleshooting via CLI.",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "Switches Aruba",
    icon: "https://www.vectorlogo.zone/logos/hpe/hpe-icon.svg",
    color: "#FF6600",
    proficiency: "Avançado",
    description: "Provisionamento de portas (Access/Trunk), configuração de VLANs, Spanning-Tree (PortFast), LACP (Trunking) e gerência CLI.",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "pfSense",
    icon: "https://www.vectorlogo.zone/logos/pfsense/pfsense-icon.svg",
    color: "#E27D34",
    proficiency: "Avançado",
    description: "Configuração de regras de firewall, NAT, OpenVPN/IPsec, controle de tráfego, pacotes de segurança (pfBlockerNG) e debug via Shell.",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "Active Directory",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
    color: "#0078D6",
    proficiency: "Avançado",
    description: "Administração de Domain Controllers, criação e auditoria de contas de usuário e computadores, gerenciamento de GPOs e automação AD.",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "UniFi Wireless",
    icon: "https://www.vectorlogo.zone/logos/ubnt/ubnt-icon.svg",
    color: "#005FFF",
    proficiency: "Avançado",
    description: "Gerenciamento centralizado de Access Points (APs), isolamento de clientes em redes de visitantes e mapeamento de SSIDs para VLANs.",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "XCP-ng",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xenproject/xenproject-original.svg",
    color: "#00B2B2",
    proficiency: "Intermediário",
    description: "Administração de hipervisores Xen Project, provisionamento de VMs, redes virtuais isoladas e rotinas de backup de servidores.",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "PowerShell",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg",
    color: "#53C1DE",
    proficiency: "Avançado",
    description: "Automação de rotinas de infraestrutura Windows Server, consultas via AD-Cmdlets e scripts para backup de configurações de rede.",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "Python (NetDevOps)",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776AB",
    proficiency: "Intermediário",
    description: "Scripts em Python para automação de backup de firewalls via SSH (Paramiko/Netmiko) e coleta/tratamento de APIs de redes.",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    color: "#02569B",
    proficiency: "Intermediário",
    description: "Desenvolvimento de aplicativos móveis (Android/iOS) integrados a serviços locais e APIs para monitoramento e controle de TI.",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "Next.js & React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#61DAFB",
    proficiency: "Intermediário",
    description: "Construção de aplicações web modernas, dashboards dinâmicos para visualização de logs de rede e painéis de controle de TI.",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "Git & GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
    proficiency: "Intermediário",
    description: "Controle de versão de scripts, documentação em markdown, gerenciamento de repositórios e automação via GitHub Actions.",
    animation: {
      hover: { scale: 1.05 },
    },
  },
  {
    name: "Asterisk (VoIP)",
    icon: "https://www.vectorlogo.zone/logos/asterisk/asterisk-icon.svg",
    color: "#F39C12",
    proficiency: "Intermediário",
    description: "Gerenciamento de centrais telefônicas IP baseadas em Asterisk, ramais SIP, troncos de telecomunicações e manutenção de servidores VoIP.",
    animation: {
      hover: { scale: 1.05 },
  },
]

export default function SkillsGrid() {

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

