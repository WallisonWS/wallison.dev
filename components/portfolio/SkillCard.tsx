"use client"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

export default function SkillCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: index * 0.1,
      }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-radius-custom animate-custom"
      style={{
        borderLeft: `4px solid var(--primary)`,
        borderBottom: `4px solid var(--secondary)`,
      }}
    >
      <div className="flex flex-col items-center">
        <motion.img
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1 }}
          src={skill.icon}
          alt={skill.name}
          className="w-16 h-16 mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
        <Progress
          value={skill.level}
          className="w-full"
          style={{
            "--progress-background": "var(--primary)",
          }}
        />
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">{skill.level}%</span>
      </div>
    </motion.div>
  )
}

