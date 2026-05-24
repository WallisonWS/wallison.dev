"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Shield, Server, Cpu, Terminal, Network, Activity, Send } from "lucide-react"

// Canvas Matrix Rain Effect inside the terminal
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 240
      canvas.height = 75
    }
    resizeCanvas()

    const cols = Math.floor(canvas.width / 7)
    const yPos = Array(cols).fill(0)

    const draw = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#06b6d4" // Cyan matrix rain
      ctx.font = "6px monospace"

      for (let i = 0; i < yPos.length; i++) {
        const text = String.fromCharCode(Math.floor(Math.random() * 93) + 33)
        const x = i * 7
        const y = yPos[i]

        ctx.fillText(text, x, y)

        if (y > 75 && Math.random() > 0.975) {
          yPos[i] = 0
        } else {
          yPos[i] += 6
        }
      }
    }

    const interval = setInterval(draw, 50)
    return () => clearInterval(interval)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-x-0 bottom-0 w-full h-[75px] rounded-b-lg pointer-events-none z-0" />
}

export default function CyberHologram() {
  const containerRef = useRef<HTMLDivElement>(null)
  const terminalInputRef = useRef<HTMLInputElement>(null)

  // Framer Motion spring values for smooth 3D tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  // Transform coordinates to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const [hovered, setHovered] = useState(false)
  const [shieldPulse, setShieldPulse] = useState(false)
  const [matrixActive, setMatrixActive] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalFocused, setTerminalFocused] = useState(false)
  const [overTerminal, setOverTerminal] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const focusTerminal = () => {
    terminalInputRef.current?.focus()
  }

  // Smoothly return card to flat state when typing or hovering the console card
  useEffect(() => {
    if (overTerminal || terminalFocused) {
      x.set(0)
      y.set(0)
    }
  }, [overTerminal, terminalFocused, x, y])
  
  // Terminal console lines history
  const [cliLines, setCliLines] = useState<string[]>([
    "FORTIGATE-80F # get system status",
    "Version: FortiOS v7.4.2 Build 2315",
    "Security Level: ZERO-TRUST-ACTIVE",
    "SSL-VPN Tunnel: UP (2 active tunnels)",
    "Threat Feed: IPS-BLOCKLIST-SYNCED",
    "Type 'help' to view available commands.",
  ])

  const consoleEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll terminal lines
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [cliLines])

  // Local CLI command executor
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    const lowerCmd = trimmed.toLowerCase()
    let response: string[] = []

    if (lowerCmd === "help") {
      response = [
        "Comandos disponíveis:",
        "  help         - Exibe este menu de ajuda",
        "  status       - Obtém métricas e status de segurança",
        "  ping <ip>    - Simula teste de ping a um host",
        "  vpn          - Detalha túneis SSL-VPN ativos",
        "  threats      - Visualiza logs de ameaças bloqueadas",
        "  matrix       - Ativa chuva de código cibernética",
        "  clear        - Limpa o terminal de saída",
      ]
    } else if (lowerCmd === "status" || lowerCmd === "get system status") {
      response = [
        "Métricas Gerais do Core:",
        "  Firewall Model: FortiGate 80F",
        "  CPU Load: 14% | Memory: 56% (Estável)",
        "  Uptime: 24d 5h 12m | Sessões: 485",
        "  Zero Trust: 100% de conformidade nas VLANs",
        "  Obsidian Vault: Sincronizado e Ativo",
      ]
    } else if (lowerCmd.startsWith("ping")) {
      const parts = trimmed.split(" ")
      const host = parts[1] || "8.8.8.8"
      response = [
        `PING ${host} (56 data bytes)...`,
        `  64 bytes from ${host}: icmp_seq=1 ttl=56 time=12.4ms`,
        `  64 bytes from ${host}: icmp_seq=2 ttl=56 time=15.1ms`,
        `  64 bytes from ${host}: icmp_seq=3 ttl=56 time=11.8ms`,
        `--- ${host} estatísticas de ping ---`,
        `  3 pacotes enviados, 3 recebidos, 0% packet loss`,
      ]
    } else if (lowerCmd === "vpn" || lowerCmd === "diag vpn") {
      response = [
        "Túneis SSL-VPN Conectados:",
        "  [UP] SSL-VPN-ABC (10.212.134.42) - Criptografado TLS 1.3",
        "  [UP] IPSec-Backup-Core (184.22.12.8) - Criptografado AES-256",
        "  Tráfego: 124.5MB recebidos | 42.1MB enviados",
      ]
    } else if (lowerCmd === "threats" || lowerCmd === "ips") {
      response = [
        "Ameaças Recentes Bloqueadas:",
        "  Feed: raw.githubusercontent.com/WallisonWS/...",
        "  Entradas Ativas: 1,500 endereços na blocklist",
        "  [Bloqueado] 185.220.101.4 (Port scan bloqueado) - OK",
        "  [Bloqueado] 45.143.203.14 (Tentativa SSH falhou) - OK",
      ]
    } else if (lowerCmd === "clear") {
      setCliLines([])
      return
    } else if (lowerCmd === "matrix") {
      setMatrixActive(true)
      response = [
        "Iniciando protocolo de chuva de código de segurança...",
        "Efeito Matrix ativo no console por 8 segundos.",
      ]
      setTimeout(() => setMatrixActive(false), 8000)
    } else {
      response = [
        `Comando não reconhecido: ${trimmed}`,
        "Digite 'help' para visualizar os comandos de terminal.",
      ]
    }

    setCliLines((prev) => [...prev, `FORTIGATE-80F # ${trimmed}`, ...response])
  }

  // Handle inputs submitting
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(terminalInput)
      setTerminalInput("")
    }
  }

  // Trigger diagnostic by clicking panels
  const triggerPanelDiagnostics = (panelType: "nodes" | "monitor" | "shield") => {
    setShieldPulse(true)
    setTimeout(() => setShieldPulse(false), 8000)

    if (panelType === "nodes") {
      executeCommand("ping GW-Core")
    } else if (panelType === "monitor") {
      executeCommand("status")
    } else if (panelType === "shield") {
      executeCommand("threats")
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || overTerminal || terminalFocused) return
    const rect = containerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    
    x.set(mouseX / width)
    y.set(mouseY / height)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (!overTerminal && !terminalFocused) {
      x.set(0)
      y.set(0)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-10 relative">
      {/* 3D Container Wrapper with perspective */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]"
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Layer 1: Ambient Backdrop Glow (Deep Z: -120px) */}
          <div
            className="absolute w-[250px] h-[250px] rounded-full bg-cyan-500/10 blur-[60px] pointer-events-none"
            style={{ transform: "translateZ(-120px)" }}
          />
          <div
            className="absolute w-[180px] h-[180px] rounded-full bg-violet-600/10 blur-[40px] pointer-events-none"
            style={{ transform: "translateZ(-80px)" }}
          />

          {/* Holographic cabling SVG paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ transform: "translateZ(10px)" }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            {/* Cabling from Nodes to Core (Quadratic Bezier) */}
            <motion.path 
              d="M 30,100 Q 100,120 200,200" 
              fill="none" 
              stroke="url(#pathGradient)" 
              strokeWidth="1.5" 
              strokeDasharray="4 4"
            />
            {/* Cabling from Monitor to Core */}
            <motion.path 
              d="M 370,300 Q 300,280 200,200" 
              fill="none" 
              stroke="url(#pathGradient)" 
              strokeWidth="1.5" 
              strokeDasharray="4 4"
            />
            
            {/* Packet photons animating along the cables */}
            <motion.circle r="3" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 5px #22d3ee)" }}>
              <animateMotion dur="4s" repeatCount="indefinite" path="M 30,100 Q 100,120 200,200" />
            </motion.circle>
            <motion.circle r="3" fill="#8b5cf6" style={{ filter: "drop-shadow(0 0 5px #8b5cf6)" }}>
              <animateMotion dur="3s" repeatCount="indefinite" path="M 370,300 Q 300,280 200,200" />
            </motion.circle>
          </svg>

          {/* Layer 2: Cyber Grid Floor & Radar Sonar Sweep (Z: -60px) */}
          <div
            className="absolute w-[280px] h-[280px] border border-cyan-500/20 rounded-full opacity-60 flex items-center justify-center overflow-hidden"
            style={{
              transform: "translateZ(-60px) rotateX(70deg)",
              background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
            }}
          >
            {/* Conic Radar sweep line */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(34,211,238,0.2)_0deg,transparent_90deg)] pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Spinning grid lines */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full rounded-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(6,182,212,0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(6,182,212,0.15) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
                backgroundPosition: "center",
              }}
            />
          </div>

          {/* Layer 3: Outer Rotating Ring with stats (Z: -30px) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[240px] h-[240px] border border-dashed border-cyan-400/40 rounded-full flex items-center justify-center pointer-events-none"
            style={{ transform: "translateZ(-30px)" }}
          >
            <div className="absolute top-0 text-[8px] text-cyan-400 font-mono tracking-widest bg-gray-950/80 px-1.5 py-0.5 border border-cyan-400/30">
              ZERO TRUST SECURITY CORE
            </div>
            <div className="absolute bottom-0 text-[8px] text-purple-400 font-mono tracking-widest bg-gray-950/80 px-1.5 py-0.5 border border-purple-400/30">
              SHIELD STATUS: ACTIVE
            </div>
          </motion.div>

          {/* Layer 4: Counter-Rotating Ring (Z: 0px) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[180px] h-[180px] border border-double border-purple-500/40 rounded-full pointer-events-none"
            style={{ transform: "translateZ(0px)" }}
          />

          {/* Layer 5: Pulsing Center Core Shield (Z: 30px) */}
          <motion.div
            onClick={() => triggerPanelDiagnostics("shield")}
            animate={{
              scale: hovered ? [1, 1.08, 1] : [1, 1.04, 1],
              boxShadow: shieldPulse
                ? [
                    "0 0 35px 8px rgba(34, 211, 238, 0.7)",
                    "0 0 50px 15px rgba(139, 92, 246, 0.8)",
                    "0 0 35px 8px rgba(34, 211, 238, 0.7)",
                  ]
                : hovered 
                  ? [
                      "0 0 20px 5px rgba(34, 211, 238, 0.4)",
                      "0 0 35px 10px rgba(139, 92, 246, 0.5)",
                      "0 0 20px 5px rgba(34, 211, 238, 0.4)",
                    ]
                  : [
                      "0 0 15px 2px rgba(34, 211, 238, 0.2)",
                      "0 0 25px 5px rgba(139, 92, 246, 0.3)",
                      "0 0 15px 2px rgba(34, 211, 238, 0.2)",
                    ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[90px] h-[90px] rounded-2xl bg-gradient-to-br from-cyan-500/85 to-purple-600/85 border border-white/20 flex flex-col items-center justify-center text-white backdrop-blur-md cursor-pointer transition-colors hover:from-cyan-400 hover:to-purple-500 z-20"
            style={{ 
              transform: "translateZ(30px)",
              transformStyle: "preserve-3d",
            }}
          >
            <Shield className="h-10 w-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <Activity className="h-4 w-4 mt-1 text-cyan-200 animate-pulse" />
          </motion.div>

          {/* Shockwave Ripple Effect on Core Click */}
          <AnimatePresence>
            {shieldPulse && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute w-[100px] h-[100px] rounded-full border-2 border-cyan-400 pointer-events-none z-10"
                style={{ transform: "translateZ(30px)" }}
              />
            )}
          </AnimatePresence>

          {/* Layer 6: Floating Holographic HUD Panels (Z: 60px & Z: 80px) */}
          {/* Panel Left: Server Nodes */}
          <motion.div
            onClick={() => triggerPanelDiagnostics("nodes")}
            className={`absolute -left-12 -top-4 p-2.5 w-[115px] bg-gray-950/85 border rounded-lg text-[8px] font-mono text-cyan-400 backdrop-blur-md cursor-pointer z-20 transition-all duration-300 ${
              shieldPulse ? "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] scale-105" : "border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]"
            }`}
            style={{ transform: "translateZ(60px)" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-1 border-b border-cyan-500/20 pb-1 mb-1 font-bold">
              <Server className="h-3 w-3 animate-pulse" />
              <span>NODES (3/3)</span>
            </div>
            <div className="flex justify-between items-center text-emerald-400">
              <span>● GW-Core</span>
              <span>10ms</span>
            </div>
            <div className="flex justify-between items-center text-emerald-400 mt-0.5">
              <span>● VPN-FW01</span>
              <span>15ms</span>
            </div>
            <div className="flex justify-between items-center text-emerald-400 mt-0.5">
              <span>● VoIP-Srv</span>
              <span>42ms</span>
            </div>
            <div className="text-[6px] text-gray-500 mt-1 border-t border-cyan-950/40 pt-1 text-center font-bold">CLIQUE PARA DIAGE</div>
          </motion.div>

          {/* Panel Right: CPU Stats & Radar */}
          <motion.div
            onClick={() => triggerPanelDiagnostics("monitor")}
            className={`absolute -right-14 -bottom-6 p-2.5 w-[115px] bg-gray-950/85 border rounded-lg text-[8px] font-mono text-purple-400 backdrop-blur-md cursor-pointer z-20 transition-all duration-300 ${
              shieldPulse ? "border-purple-400 shadow-[0_0_15px_rgba(167,139,250,0.3)] scale-105" : "border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_10px_rgba(167,139,250,0.2)]"
            }`}
            style={{ transform: "translateZ(80px)" }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="flex items-center gap-1 border-b border-purple-500/20 pb-1 mb-1 font-bold">
              <Cpu className="h-3 w-3 animate-spin" style={{ animationDuration: '6s' }} />
              <span>MONITOR</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>CPU Temp</span>
                <span>48°C</span>
              </div>
              <div className="w-full bg-purple-950 h-1 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-purple-500 h-full" 
                  animate={{ width: shieldPulse ? ["30%", "95%", "45%"] : ["30%", "65%", "45%"] }} 
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span>IP Blocks</span>
                <span className="text-emerald-400">Ativo</span>
              </div>
            </div>
            <div className="text-[6px] text-gray-500 mt-1 border-t border-purple-950/40 pt-1 text-center font-bold">CLIQUE PARA DIAGE</div>
          </motion.div>

          {/* Layer 7: Interactive Terminal Output Window (Z: 100px) */}
          <motion.div
            onMouseEnter={() => setOverTerminal(true)}
            onMouseLeave={() => setOverTerminal(false)}
            onMouseDown={(e) => {
              // Prevent focus loss/blur from the input when clicking anywhere else on the card
              if (e.target !== terminalInputRef.current) {
                e.preventDefault()
              }
            }}
            onClick={(e) => {
              e.stopPropagation()
              focusTerminal()
            }}
            className={`absolute w-[250px] bg-gray-950/92 border rounded-lg shadow-2xl backdrop-blur-lg z-30 transition-all duration-300 ${
              terminalFocused
                ? "border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-[1.02]"
                : shieldPulse 
                  ? "border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.3)]" 
                  : "border-blue-500/50"
            }`}
            style={{ 
              transform: "translateZ(100px) translateY(105px)",
              boxShadow: terminalFocused 
                ? "0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(34,211,238,0.3)" 
                : "0 20px 40px rgba(0,0,0,0.6), 0 0 15px rgba(59,130,246,0.15)"
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            {/* Header console bar */}
            <div className="flex items-center justify-between border-b border-blue-500/30 p-2">
              <div className="flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-[9px] text-blue-400 font-mono font-bold">fortigate-console.sh</span>
              </div>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Display line panel */}
            <div className="h-[75px] overflow-y-auto p-2 font-mono text-[7px] leading-relaxed text-cyan-300/90 space-y-0.5 select-none relative scrollbar-none">
              
              {matrixActive ? (
                <MatrixRain />
              ) : (
                <>
                  {cliLines.map((line, idx) => (
                    <div key={idx} className="truncate flex items-start">
                      {line.startsWith("FORTIGATE-80F") ? (
                        <span className="text-cyan-400 mr-1">&gt;</span>
                      ) : (
                        <span className="text-blue-400 mr-1.5">::</span>
                      )}
                      <span>{line}</span>
                    </div>
                  ))}
                  <div ref={consoleEndRef} />
                </>
              )}
            </div>

            {/* Command input form */}
            <div className={`border-t p-1.5 flex gap-1.5 items-center bg-gray-950/95 rounded-b-lg relative z-40 transition-all duration-300 ${
              terminalFocused 
                ? "border-cyan-400/60 shadow-[inset_0_0_10px_rgba(34,211,238,0.15)] bg-cyan-950/10" 
                : "border-blue-500/30"
            }`}>
              <span className="text-[8px] font-mono text-cyan-400 pl-1">FGT #</span>
              <input
                ref={terminalInputRef}
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setTerminalFocused(true)}
                onBlur={() => setTerminalFocused(false)}
                onClick={(e) => e.stopPropagation()}
                placeholder="digite help, status, matrix..."
                className="bg-transparent border-none text-[8px] font-mono text-white placeholder-gray-600 focus:outline-none focus:ring-0 flex-1 w-full pl-0.5 cursor-text"
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  executeCommand(terminalInput)
                  setTerminalInput("")
                }}
                className="p-1 bg-cyan-950 border border-cyan-800 rounded hover:bg-cyan-900 transition-colors text-cyan-400 cursor-pointer"
              >
                <Send className="w-2.5 h-2.5" />
              </button>
            </div>
          </motion.div>

          {/* Floating Data Nodes (Z: 125px / orbits) */}
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 right-10 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 backdrop-blur-sm pointer-events-none"
            style={{ transform: "translateZ(125px)" }}
          >
            <Network className="h-3 w-3 animate-pulse" />
          </motion.div>

        </motion.div>
      </div>

      {/* Control Panel Tabs below the 3D hologram to interact */}
      <div className="flex justify-center gap-2 mt-12 bg-gray-950/80 border border-gray-900 p-1.5 rounded-full backdrop-blur-md relative z-20 shadow-lg">
        {["Status", "VPN Tunnel", "Threat Feed", "Matrix Rain"].map((tab, idx) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(idx)
              if (idx === 0) {
                executeCommand("status")
              } else if (idx === 1) {
                executeCommand("vpn")
              } else if (idx === 2) {
                executeCommand("threats")
              } else {
                executeCommand("matrix")
              }
            }}
            className={`px-4 py-1.5 text-[9px] font-mono font-bold rounded-full transition-all duration-300 ${
              activeTab === idx
                ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-md shadow-cyan-500/20"
                : "text-gray-500 hover:text-white hover:bg-gray-900/40"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
