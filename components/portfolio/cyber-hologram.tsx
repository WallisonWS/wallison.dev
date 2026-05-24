"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Shield, Server, Cpu, Terminal, Network, Activity } from "lucide-react"

export default function CyberHologram() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  
  // Terminal commands mock
  const [cliLines, setCliLines] = useState([
    "FORTIGATE-80F # get system status",
    "Version: FortiOS v7.4.2 Build 2315",
    "Security Level: ZERO-TRUST-ACTIVE",
    "SSL-VPN Tunnel: UP (2 active tunnels)",
    "Threat Feed: IPS-BLOCKLIST-SYNCED",
    "Threats blocked today: 1,542",
    "Network Load: 24% | Memory: 56%",
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate lines like a live terminal
      setCliLines((prev) => {
        const next = [...prev]
        const first = next.shift()
        if (first) next.push(first)
        return next
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Framer Motion spring values for smooth 3D tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  // Transform coordinates to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    
    // Calculate cursor position normalized between -0.5 and 0.5
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    
    x.set(mouseX / width)
    y.set(mouseY / height)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-10">
      {/* 3D Container Wrapper with perspective */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] cursor-pointer"
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
            className="absolute w-[250px] h-[250px] rounded-full bg-blue-500/10 blur-[60px]"
            style={{ transform: "translateZ(-120px)" }}
          />
          <div
            className="absolute w-[180px] h-[180px] rounded-full bg-purple-500/10 blur-[40px]"
            style={{ transform: "translateZ(-80px)" }}
          />

          {/* Layer 2: Cyber Grid Floor (Z: -60px) */}
          <div
            className="absolute w-[280px] h-[280px] border border-blue-500/20 rounded-full opacity-60 flex items-center justify-center"
            style={{
              transform: "translateZ(-60px) rotateX(70deg)",
              background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)",
            }}
          >
            {/* Spinning grid lines */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full rounded-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(56,189,248,0.2) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(56,189,248,0.2) 1px, transparent 1px)
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
            className="absolute w-[240px] h-[240px] border border-dashed border-cyan-400/40 rounded-full flex items-center justify-center"
            style={{ transform: "translateZ(-30px)" }}
          >
            <div className="absolute top-0 text-[8px] text-cyan-400 font-mono tracking-widest bg-gray-950/80 px-1 border border-cyan-400/30">
              ZERO TRUST SECURITY CORE
            </div>
            <div className="absolute bottom-0 text-[8px] text-purple-400 font-mono tracking-widest bg-gray-950/80 px-1 border border-purple-400/30">
              SHIELD STATUS: ACTIVE
            </div>
          </motion.div>

          {/* Layer 4: Counter-Rotating Ring (Z: 0px) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[180px] h-[180px] border border-double border-purple-500/40 rounded-full"
            style={{ transform: "translateZ(0px)" }}
          />

          {/* Layer 5: Pulsing Center Core Shield (Z: 30px) */}
          <motion.div
            animate={{
              scale: hovered ? [1, 1.08, 1] : [1, 1.04, 1],
              boxShadow: hovered 
                ? [
                    "0 0 20px 5px rgba(56, 189, 248, 0.4)",
                    "0 0 35px 10px rgba(139, 92, 246, 0.5)",
                    "0 0 20px 5px rgba(56, 189, 248, 0.4)",
                  ]
                : [
                    "0 0 15px 2px rgba(56, 189, 248, 0.2)",
                    "0 0 25px 5px rgba(139, 92, 246, 0.3)",
                    "0 0 15px 2px rgba(56, 189, 248, 0.2)",
                  ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[90px] h-[90px] rounded-2xl bg-gradient-to-br from-cyan-500/80 to-purple-600/80 border border-white/20 flex flex-col items-center justify-center text-white backdrop-blur-md"
            style={{ 
              transform: "translateZ(30px)",
              transformStyle: "preserve-3d",
            }}
          >
            <Shield className="h-10 w-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <Activity className="h-4 w-4 mt-1 text-cyan-200 animate-pulse" />
          </motion.div>

          {/* Layer 6: Floating Holographic HUD Panels (Z: 60px & Z: 90px) */}
          {/* Panel Left: Server Nodes */}
          <motion.div
            className="absolute -left-12 -top-4 p-2 w-[110px] bg-gray-950/85 border border-cyan-500/40 rounded-lg text-[8px] font-mono text-cyan-400 backdrop-blur-md"
            style={{ transform: "translateZ(60px)" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-1 border-b border-cyan-500/20 pb-1 mb-1 font-bold">
              <Server className="h-3 w-3" />
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
            <div className="flex justify-between items-center text-amber-400 mt-0.5">
              <span>● VoIP-Srv</span>
              <span>42ms</span>
            </div>
          </motion.div>

          {/* Panel Right: CPU Stats & Radar */}
          <motion.div
            className="absolute -right-14 -bottom-6 p-2 w-[110px] bg-gray-950/85 border border-purple-500/40 rounded-lg text-[8px] font-mono text-purple-400 backdrop-blur-md"
            style={{ transform: "translateZ(80px)" }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="flex items-center gap-1 border-b border-purple-500/20 pb-1 mb-1 font-bold">
              <Cpu className="h-3 w-3" />
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
                  animate={{ width: ["30%", "65%", "45%"] }} 
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span>IP Blocks</span>
                <span>Active</span>
              </div>
            </div>
          </motion.div>

          {/* Layer 7: Glowing Terminal Output Window (Z: 100px) */}
          <motion.div
            className="absolute w-[240px] p-2 bg-gray-950/90 border border-blue-500/50 rounded-lg shadow-2xl backdrop-blur-lg"
            style={{ 
              transform: "translateZ(100px) translateY(110px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 15px rgba(59,130,246,0.2)",
            }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="flex items-center justify-between border-b border-blue-500/30 pb-1 mb-1">
              <div className="flex items-center gap-1">
                <Terminal className="h-3 w-3 text-blue-400" />
                <span className="text-[9px] text-blue-400 font-mono font-bold">fortigate-console.sh</span>
              </div>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="h-[75px] overflow-hidden font-mono text-[7px] leading-relaxed text-blue-300/90 space-y-0.5 select-none">
              {cliLines.slice(0, 5).map((line, idx) => (
                <div key={idx} className="truncate flex items-start">
                  <span className="text-cyan-400 mr-1">&gt;</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating Data Nodes (Z: 120px / orbits) */}
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 right-10 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 backdrop-blur-sm"
            style={{ transform: "translateZ(125px)" }}
          >
            <Network className="h-3 w-3" />
          </motion.div>

        </motion.div>
      </div>

      {/* Control Panel Tabs below the 3D hologram to interact */}
      <div className="flex justify-center gap-2 mt-12 bg-gray-900/60 border border-gray-800 p-1.5 rounded-full backdrop-blur-sm relative z-20">
        {["FGT-80F", "VPN Tunnel", "Threat Feed"].map((tab, idx) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(idx)
              if (idx === 0) {
                setCliLines([
                  "FORTIGATE-80F # get system status",
                  "Version: FortiOS v7.4.2 Build 2315",
                  "Security Level: ZERO-TRUST-ACTIVE",
                  "SSL-VPN Tunnel: UP (2 active tunnels)",
                  "Threat Feed: IPS-BLOCKLIST-SYNCED",
                ])
              } else if (idx === 1) {
                setCliLines([
                  "VPN-CTL # diag vpn tunnel list",
                  "Tunnel: SSL-VPN-ABC [UP]",
                  "Client IP: 10.212.134.42 (RemoteUser)",
                  "Encryption: AES256-GCM-SHA384",
                  "Uptime: 04h 12m 33s | Packets: 124,541",
                ])
              } else {
                setCliLines([
                  "IPS-CTL # get system external-resource",
                  "Feed Name: ACTIVE-BLOCKLIST",
                  "URL: raw.githubusercontent.com/WallisonWS/...",
                  "Total Threat IPs: 1,500 blocked",
                  "Last Auto-Sync: 24/05/2026 10:40 (12h cycle)",
                ])
              }
            }}
            className={`px-4 py-1.5 text-[10px] font-mono font-medium rounded-full transition-all duration-300 ${
              activeTab === idx
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-primary/20"
                : "text-gray-400 hover:text-white hover:bg-gray-800/30"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
