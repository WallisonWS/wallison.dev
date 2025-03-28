"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function OptimizedImage({ src, alt, width, height, className = "", priority = false }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  // Lazy loading com IntersectionObserver
  const [isInView, setIsInView] = useState(priority)
  const [ref, setRef] = useState(null)

  useEffect(() => {
    if (!priority && ref) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        },
        { rootMargin: "200px" },
      )

      observer.observe(ref)
      return () => observer.disconnect()
    }

    return undefined
  }, [ref, priority])

  // Placeholder para quando a imagem não estiver carregada
  const placeholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' fill='%23f3f4f6'%3E%3Crect width='${width}' height='${height}' /%3E%3C/svg%3E`

  return (
    <div ref={setRef} className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {(isInView || priority) && (
        <>
          <motion.img
            src={isError ? placeholder : src}
            alt={alt}
            width={width}
            height={height}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsError(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`object-cover w-full h-full ${className}`}
            loading={priority ? "eager" : "lazy"}
          />

          {!isLoaded && !isError && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        </>
      )}

      {!isInView && !priority && <div className="absolute inset-0 bg-gray-200" />}
    </div>
  )
}

