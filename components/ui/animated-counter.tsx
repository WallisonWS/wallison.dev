"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

export const AnimatedCounter = ({
  from = 0,
  to,
  duration = 2000,
  delay = 0,
  formatter = (value) => value.toString(),
  className = "",
}) => {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const startTimeRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!isInView) return

    const startAnimation = () => {
      const step = (timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp
        const progress = timestamp - startTimeRef.current
        const percentage = Math.min(progress / duration, 1)

        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4)
        const currentCount = Math.floor(from + (to - from) * easeOutQuart)

        setCount(currentCount)

        if (percentage < 1) {
          rafRef.current = requestAnimationFrame(step)
        } else {
          // Ensure final value is exactly the target
          setCount(to)
        }
      }

      // Start the animation after the specified delay
      setTimeout(() => {
        rafRef.current = requestAnimationFrame(step)
      }, delay)
    }

    startAnimation()

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isInView, from, to, duration, delay])

  return (
    <span ref={ref} className={className}>
      {formatter(count)}
    </span>
  )
}

