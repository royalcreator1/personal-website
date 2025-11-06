'use client'

import { motion } from 'framer-motion'
import { useContext, useEffect, useState, useRef } from 'react'
import { ThemeContext } from '@/contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { playMorningSound, playBatSound } from '@/utils/sounds'
import BatAnimation from './BatAnimation'
import BirdAnimation from './BirdAnimation'

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const context = useContext(ThemeContext)
  const [batTrigger, setBatTrigger] = useState(0)
  const [birdTrigger, setBirdTrigger] = useState(0)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
    updateButtonPosition()
    window.addEventListener('resize', updateButtonPosition)
    return () => window.removeEventListener('resize', updateButtonPosition)
  }, [])

  const updateButtonPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    }
  }

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

  const handleToggle = () => {
    updateButtonPosition()
    
    // Play sound and trigger animation based on current theme (before toggle)
    if (isDark) {
      // Switching from dark to light - morning birds
      playMorningSound()
      setBirdTrigger((prev) => prev + 1)
    } else {
      // Switching from light to dark - dangerous bats
      playBatSound()
      setBatTrigger((prev) => prev + 1)
    }
    
    toggleTheme()
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 right-0 z-50 p-4 md:p-6"
      >
        <motion.button
          ref={buttonRef}
          onClick={handleToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full dark:bg-dark-secondary/90 bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center dark:text-gray-300 text-gray-700 hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white transition-all"
          aria-label="Toggle theme"
        >
          {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </motion.button>
      </motion.nav>
      
      {/* Bat Animation - for light to dark transition */}
      <BatAnimation trigger={batTrigger > 0} buttonPosition={buttonPosition} />
      
      {/* Bird Animation - for dark to light transition */}
      <BirdAnimation trigger={birdTrigger > 0} buttonPosition={buttonPosition} />
    </>
  )
}

export default Navbar
