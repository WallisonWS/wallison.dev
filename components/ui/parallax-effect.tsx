"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxEffect({ children, depth = 0.2, className = "" }) {
  const ref = useRef(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  const { scrollY } = useScroll()

  // Calcular a posição do elemento apenas uma vez no carregamento
  // e quando a janela for redimensionada
  useEffect(() => {
    const element = ref.current
    const onResize = () => {
      setElementTop(element?.getBoundingClientRect().top + window.scrollY || 0)
      setClientHeight(window.innerHeight)
    }

    onResize()
    window.addEventListener("resize", onResize, { passive: true })

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [ref])

  // Transformar o scrollY em um valor de y para o parallax
  const y = useTransform(scrollY, [elementTop - clientHeight, elementTop + clientHeight], [-depth * 100, depth * 100])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

