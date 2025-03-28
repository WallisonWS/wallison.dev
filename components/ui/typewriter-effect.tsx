"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimate, stagger } from "framer-motion"

interface TypewriterEffectProps {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ words, className = "", cursorClassName = "" }) => {
  const [scope, animate] = useAnimate()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const currentWord = words[currentWordIndex].text

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentWord.length) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1))
          setTypingSpeed(150 - Math.random() * 100)
        }, typingSpeed)
      } else {
        // Pause at end of word
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true)
          setTypingSpeed(100)
        }, 1500)
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length - 1))
          setTypingSpeed(50)
        }, typingSpeed)
      } else {
        // Move to next word
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        setTypingSpeed(150)
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentText, currentWordIndex, isDeleting, typingSpeed, words])

  useEffect(() => {
    animate("span", { opacity: 1 }, { duration: 0.01, delay: stagger(0.05) })
  }, [animate, currentWordIndex])

  return (
    <div className={`inline-flex items-center ${className}`} ref={scope}>
      {words.map((word, index) => (
        <div key={index} className={`${index === currentWordIndex ? "block" : "hidden"} relative`}>
          <span className={word.className || ""}>{currentText}</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className={`inline-block w-[3px] h-[1.2em] ml-1 bg-primary-400 ${cursorClassName}`}
          />
        </div>
      ))}
    </div>
  )
}

