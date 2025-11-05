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

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-20 right-4 md:right-8 z-50 p-3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-xl transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-white" />
      ) : (
        <Moon className="w-5 h-5 text-white" />
      )}
    </motion.button>
  )
}

export default ThemeToggle

