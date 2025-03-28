"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export const AnimatedText = ({
  text,
  className = "",
  once = true,
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.02,
  ...props
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  // Split text into words and characters
  const words = text.split(" ")

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay * i,
      },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...props}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block mr-1">
          {Array.from(word).map((char, charIndex) => (
            <motion.span key={charIndex} variants={child} className="inline-block">
              {char}
            </motion.span>
          ))}
          {index !== words.length - 1 && " "}
        </span>
      ))}
    </motion.div>
  )
}

