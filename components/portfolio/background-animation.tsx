"use client"

import { useMemo, useEffect, useState } from "react"
import { motion } from "framer-motion"

export const BackgroundAnimation = ({ scrollY = 0, isDark = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Optimize mouse event handling
  useEffect(() => {
    let lastMouseX = 0
    let lastMouseY = 0
    let mouseTicking = false

    const handleMouseMove = (e) => {
      lastMouseX = e.clientX
      lastMouseY = e.clientY
      if (!mouseTicking) {
        window.requestAnimationFrame(() => {
          setMousePosition({ x: lastMouseX, y: lastMouseY })
          mouseTicking = false
        })
        mouseTicking = true
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Generate code particles
  const codeParticles = useMemo(() => {
    const particles = []
    const particleCount = 15 // Reduced for better performance

    const codeSnippets = [
      "config firewall address; edit 'Hikvision_NVR'",
      "Set-ADUser -Identity 'wallison.araujo' -Enabled $true",
      "ssh.connect(hostname='192.168.99.100', port=22)",
      "vlan 99; name 'CFTV_Hikvision'; untagged 1-10",
      "diagnose sniffer packet any 'host 192.168.10.15'",
      "const App = () => <PortfolioContainer />",
      "import { useState, useEffect } from 'react'",
      "git commit -m 'feat: update threat intelligence feed'",
      "Search-ADAccount -AccountInactive -UsersOnly",
      "import 'package:flutter/material.dart'",
      "pfctl -sr | grep 'block'",
    ]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.3 + 0.7,
        opacity: Math.random() * 0.15 + 0.05,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      })
    }

    return particles
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 bg-grid opacity-[0.03]"
        style={{
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] overflow-hidden">
        <motion.div
          className="absolute -top-[30vh] -left-[10vw] w-[50vw] h-[50vh] rounded-full blur-[120px] opacity-[0.15]"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary-400)), transparent 70%)`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute -top-[20vh] -right-[10vw] w-[40vw] h-[40vh] rounded-full blur-[120px] opacity-[0.1]"
          style={{
            background: `radial-gradient(circle, hsl(var(--accent-400)), transparent 70%)`,
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 5,
          }}
        />
      </div>

      {/* Mouse spotlight effect */}
      <motion.div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary-900)), transparent 40%)`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />

      {/* Code particles */}
      {codeParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute font-mono whitespace-nowrap text-xs sm:text-sm opacity-0"
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`,
            fontSize: `${particle.size}rem`,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: particle.opacity,
            y: ["0vh", "5vh", "10vh"],
          }}
          transition={{
            opacity: { duration: 1 },
            y: {
              duration: 50 + Math.random() * 50,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
            },
          }}
        >
          <span className="text-primary-700">{particle.text}</span>
        </motion.div>
      ))}

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

