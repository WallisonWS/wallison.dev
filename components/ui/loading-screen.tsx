"use client"

import { motion } from "framer-motion"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-500"
            >
              <motion.path
                d="M40 2C19.0132 2 2 19.0132 2 40C2 60.9868 19.0132 78 40 78C60.9868 78 78 60.9868 78 40C78 19.0132 60.9868 2 40 2Z"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M40 20V40L55 55"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)" }}
              animate={{ boxShadow: "0 0 20px 2px rgba(99, 102, 241, 0.3)" }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg font-medium text-primary-400"
        >
          Carregando
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          className="h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mt-2 rounded-full"
        />
      </div>
    </div>
  )
}

