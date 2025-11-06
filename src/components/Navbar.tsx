'use client'

import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '@/contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const context = useContext(ThemeContext)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !context) {
    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="w-10 h-10 rounded-full dark:bg-dark-secondary/90 bg-white/90 backdrop-blur-md shadow-lg" />
      </motion.nav>
    )
  }

  const { theme, toggleTheme } = context
  const isDark = theme === 'dark'

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 right-0 z-50 p-4 md:p-6"
    >
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full dark:bg-dark-secondary/90 bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center dark:text-gray-300 text-gray-700 hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white transition-all"
        aria-label="Toggle theme"
      >
        {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </motion.button>
    </motion.nav>
  )
}

export default Navbar
