'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '@/contexts/ThemeContext'

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const context = useContext(ThemeContext)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !context) {
    return null
  }

  const { theme, toggleTheme } = context
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-16 sm:top-20 right-3 sm:right-4 md:right-8 z-50 group"
      aria-label="Toggle theme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-12 h-7 sm:w-14 sm:h-8 rounded-full bg-gradient-to-r from-primary to-secondary p-0.5 sm:p-1 transition-all duration-300 shadow-lg">
        <motion.div
          className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center shadow-md"
          animate={{
            x: isDark ? 0 : 20,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          {isDark ? (
            <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
          ) : (
            <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
          )}
        </motion.div>
      </div>
    </motion.button>
  )
}

export default ThemeToggle
