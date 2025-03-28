"use client"

import { motion } from "framer-motion"

export const SectionHeading = ({
  title,
  subtitle = "",
  align = "center",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  delay = 0,
}) => {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  return (
    <div className={`mb-12 ${alignClass[align]} ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay }}
        className={`text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ${titleClassName}`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: delay + 0.1 }}
          className={`text-gray-400 max-w-2xl mx-auto ${subtitleClassName}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

