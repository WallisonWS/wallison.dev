"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Custom stable SVG Components for niche tech logos
const FortiGateIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M50 5L15 20V50C15 72 50 95 50 95C50 95 85 72 85 50V20L50 5Z" fill="#C00000" />
    <path d="M50 20V80" stroke="white" strokeWidth="8" strokeLinecap="round" />
    <path d="M35 38H65" stroke="white" strokeWidth="8" strokeLinecap="round" />
    <path d="M35 53H55" stroke="white" strokeWidth="8" strokeLinecap="round" />
  </svg>
)

const ArubaIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="10" y="25" width="80" height="50" rx="8" fill="#FF6600" />
    <rect x="18" y="37" width="12" height="10" rx="2" fill="white" fillOpacity="0.8" />
    <rect x="36" y="37" width="12" height="10" rx="2" fill="white" fillOpacity="0.8" />
    <rect x="54" y="37" width="12" height="10" rx="2" fill="white" fillOpacity="0.8" />
    <rect x="72" y="37" width="12" height="10" rx="2" fill="white" fillOpacity="0.8" />
    <rect x="18" y="53" width="66" height="12" rx="2" fill="black" fillOpacity="0.3" />
    <circle cx="23" cy="59" r="2" fill="#58D68D" />
    <circle cx="31" cy="59" r="2" fill="#58D68D" />
    <circle cx="39" cy="59" r="2" fill="#58D68D" />
  </svg>
)

const PfSenseIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M50 5L90 25V75L50 95L10 75V25L50 5Z" fill="#E27D34" />
    <path d="M50 5V95" stroke="white" strokeWidth="4" />
    <path d="M10 25L90 75" stroke="white" strokeWidth="4" />
    <path d="M10 75L90 25" stroke="white" strokeWidth="4" />
    <circle cx="50" cy="50" r="14" fill="#E27D34" stroke="white" strokeWidth="4" />
  </svg>
)

const UniFiIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="40" stroke="#005FFF" strokeWidth="6" fill="none" />
    <circle cx="50" cy="50" r="26" stroke="#005FFF" strokeWidth="4" strokeDasharray="6 6" fill="none" />
    <circle cx="50" cy="50" r="12" fill="#005FFF" />
  </svg>
)

const XcpNgIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M50 10L85 30V70L50 90L15 70V30L50 10Z" fill="#00B2B2" />
    <path d="M50 25L72 38V62L50 75L28 62V38L50 25Z" fill="white" />
    <circle cx="50" cy="50" r="8" fill="#00B2B2" />
  </svg>
)

const AsteriskIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g stroke="#F39C12" strokeWidth="12" strokeLinecap="round">
      <line x1="50" y1="15" x2="50" y2="85" />
      <line x1="15" y1="50" x2="85" y2="50" />
      <line x1="25" y1="25" x2="75" y2="75" />
      <line x1="25" y1="75" x2="75" y2="25" />
    </g>
    <circle cx="50" cy="50" r="12" fill="#F39C12" />
  </svg>
)

const skills = [
  {
    name: "FortiGate",
    icon: FortiGateIcon,
    color: "#C00000",
    proficiency: "Avançado",
    description: "Configuração de políticas Zero Trust, SD-WAN, SSL-VPN, Web Filter, roteamento inter-VLAN e Sniffer/Troubleshooting via CLI.",
    animation: {
      hover: { scale: 1.06, rotateX: 8, rotateY: -8, translateZ: 15 },
    },
  },
  {
    name: "Switches Aruba",
    icon: ArubaIcon,
    color: "#FF6600",
    proficiency: "Avançado",
    description: "Provisionamento de portas (Access/Trunk), configuração de VLANs, Spanning-Tree (PortFast), LACP (Trunking) e gerência CLI.",
    animation: {
      hover: { scale: 1.06, rotateX: 8, rotateY: 8, translateZ: 15 },
    },
  },
  {
    name: "pfSense",
    icon: PfSenseIcon,
    color: "#E27D34",
    proficiency: "Avançado",
    description: "Configuração de regras de firewall, NAT, OpenVPN/IPsec, controle de tráfego, pacotes de segurança (pfBlockerNG) e debug via Shell.",
    animation: {
      hover: { scale: 1.06, rotateX: -8, rotateY: -8, translateZ: 15 },
    },
  },
  {
    name: "Active Directory",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
    color: "#0078D6",
    proficiency: "Avançado",
    description: "Administração de Domain Controllers, criação e auditoria de contas de usuário e computadores, gerenciamento de GPOs e automação AD.",
    animation: {
      hover: { scale: 1.06, rotateX: -8, rotateY: 8, translateZ: 15 },
    },
  },
  {
    name: "UniFi Wireless",
    icon: UniFiIcon,
    color: "#005FFF",
    proficiency: "Avançado",
    description: "Gerenciamento centralizado de Access Points (APs), isolamento de clientes em redes de visitantes e mapeamento de SSIDs para VLANs.",
    animation: {
      hover: { scale: 1.06, rotateX: 8, rotateY: -8, translateZ: 15 },
    },
  },
  {
    name: "XCP-ng",
    icon: XcpNgIcon,
    color: "#00B2B2",
    proficiency: "Intermediário",
    description: "Administração de hipervisores Xen Project, provisionamento de VMs, redes virtuais isoladas e rotinas de backup de servidores.",
    animation: {
      hover: { scale: 1.06, rotateX: 8, rotateY: 8, translateZ: 15 },
    },
  },
  {
    name: "PowerShell",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg",
    color: "#53C1DE",
    proficiency: "Avançado",
    description: "Automação de rotinas de infraestrutura Windows Server, consultas via AD-Cmdlets e scripts para backup de configurações de rede.",
    animation: {
      hover: { scale: 1.06, rotateX: -8, rotateY: -8, translateZ: 15 },
    },
  },
  {
    name: "Python (NetDevOps)",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776AB",
    proficiency: "Intermediário",
    description: "Scripts em Python para automação de backup de firewalls via SSH (Paramiko/Netmiko) e coleta/tratamento de APIs de redes.",
    animation: {
      hover: { scale: 1.06, rotateX: -8, rotateY: 8, translateZ: 15 },
    },
  },
  {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    color: "#02569B",
    proficiency: "Intermediário",
    description: "Desenvolvimento de aplicativos móveis (Android/iOS) integrados a serviços locais e APIs para monitoramento e controle de TI.",
    animation: {
      hover: { scale: 1.06, rotateX: 8, rotateY: -8, translateZ: 15 },
    },
  },
  {
    name: "Next.js & React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#61DAFB",
    proficiency: "Intermediário",
    description: "Construção de aplicações web modernas, dashboards dinâmicos para visualização de logs de rede e painéis de controle de TI.",
    animation: {
      hover: { scale: 1.06, rotateX: 8, rotateY: 8, translateZ: 15 },
    },
  },
  {
    name: "Git & GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
    proficiency: "Intermediário",
    description: "Controle de versão de scripts, documentação em markdown, gerenciamento de repositórios e automação via GitHub Actions.",
    animation: {
      hover: { scale: 1.06, rotateX: -8, rotateY: -8, translateZ: 15 },
    },
  },
  {
    name: "Asterisk (VoIP)",
    icon: AsteriskIcon,
    color: "#F39C12",
    proficiency: "Intermediário",
    description: "Gerenciamento de centrais telefônicas IP baseadas em Asterisk, ramais SIP, troncos de telecomunicações e manutenção de servidores VoIP.",
    animation: {
      hover: { scale: 1.06, rotateX: -8, rotateY: 8, translateZ: 15 },
    },
  },
]

export default function SkillsGrid() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const handleHoverStart = useCallback((skillName: string) => {
    setHoveredSkill(skillName)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setHoveredSkill(null)
  }, [])

  const skillGrid = useMemo(() => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6" style={{ perspective: 1000 }}>
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: Math.min(index * 0.05, 0.4) }}
            className="group relative"
            onHoverStart={() => handleHoverStart(skill.name)}
            onHoverEnd={handleHoverEnd}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="relative p-5 bg-gray-800/80 rounded-xl backdrop-blur-sm border border-gray-700/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[140px]"
              style={{ transformStyle: "preserve-3d" }}
              animate={
                hoveredSkill === skill.name
                  ? {
                      borderColor: `${skill.color}80`,
                      boxShadow: `0 10px 30px ${skill.color}25`,
                    }
                  : {}
              }
              whileHover={skill.animation.hover}
            >
              <div className="flex flex-col items-center" style={{ transform: "translateZ(10px)" }}>
                <div
                  className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300"
                  style={{
                    filter: hoveredSkill === skill.name ? `drop-shadow(0 0 10px ${skill.color}60)` : "none",
                  }}
                >
                  {typeof skill.icon === "string" ? (
                    <img
                      src={skill.icon || "/placeholder.svg"}
                      alt={skill.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <skill.icon 
                      className="w-12 h-12 transition-colors duration-300" 
                      style={{ 
                        color: hoveredSkill === skill.name ? skill.color : "rgba(255, 255, 255, 0.7)" 
                      }} 
                    />
                  )}
                </div>

                <motion.p
                  className="mt-4 text-xs font-semibold text-center select-none"
                  animate={{
                    color: hoveredSkill === skill.name ? skill.color : "rgb(209, 213, 219)",
                  }}
                >
                  {skill.name}
                </motion.p>
              </div>

              {/* Render tooltip only when active */}
              <AnimatePresence>
                {hoveredSkill === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-3 z-50 w-52 p-3 rounded-lg shadow-xl"
                    style={{
                      backgroundColor: `rgba(17, 24, 39, 0.98)`,
                      border: `1px solid ${skill.color}50`,
                      boxShadow: `0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px ${skill.color}25`,
                      transform: "translateZ(20px) translateX(-50%)",
                    }}
                  >
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1.5 border-b border-gray-800 pb-1">
                        <h4 className="font-bold text-xs" style={{ color: skill.color }}>
                          {skill.name}
                        </h4>
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${skill.color}15`,
                            color: skill.color,
                            border: `1px solid ${skill.color}30`
                          }}
                        >
                          {skill.proficiency}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-300 leading-relaxed font-medium">{skill.description}</p>

                      <div
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 rotate-45"
                        style={{
                          backgroundColor: `rgba(17, 24, 39, 0.98)`,
                          borderRight: `1px solid ${skill.color}50`,
                          borderBottom: `1px solid ${skill.color}50`,
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
