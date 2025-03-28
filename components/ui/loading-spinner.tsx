"use client"

import { motion } from "framer-motion"

export function LoadingSpinner({ size = "md", color = "primary" }) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const colorMap = {
    primary: "text-blue-500",
    secondary: "text-purple-500",
    accent: "text-pink-500",
    white: "text-white",
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeMap[size]} ${colorMap[color]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" strokeDasharray="40" strokeDashoffset="0" />
        </svg>
      </motion.div>
    </div>
  )
}

