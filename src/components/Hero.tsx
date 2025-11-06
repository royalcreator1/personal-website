'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowDown } from 'lucide-react'
import { profile } from '@/data/profile'
import { useState, useEffect } from 'react'

const titles = [
  'Software Engineer',
  'Backend Developer',
  'Frontend Developer',
  'Integration Engineer',
  'Android Developer'
]

const Hero = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex]
    let timeout: NodeJS.Timeout
    
    if (!isDeleting && displayedText === currentTitle) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
        setTypingSpeed(50)
      }, 2000)
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false)
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
      setTypingSpeed(100)
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.substring(0, displayedText.length - 1))
      }, typingSpeed)
    } else {
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.substring(0, displayedText.length + 1))
      }, typingSpeed)
    }
    
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [displayedText, isDeleting, currentTitleIndex, typingSpeed])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden md:pl-20">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="text-accent text-sm sm:text-base font-medium">Hi, my name is</span>
          </motion.div>

          {/* Name - Single line */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 dark:text-white text-gray-900 leading-[1.1] tracking-tight"
          >
            {profile.name}
          </motion.h1>
          
          {/* Dynamic Title - Fixed height with proper line-height */}
          <div className="min-h-[60px] sm:min-h-[70px] md:min-h-[80px] lg:min-h-[90px] flex items-center mb-8 sm:mb-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold dark:text-gray-300 text-gray-700 leading-[1.2]"
            >
              I'm a{' '}
              <span className="text-gradient inline-block">
                {displayedText}
                <span className="animate-pulse text-accent">|</span>
              </span>
            </motion.p>
          </div>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-base sm:text-lg md:text-xl dark:text-gray-400 text-gray-600 mb-10 max-w-2xl leading-relaxed"
          >
            I build scalable applications and deliver end-to-end solutions across the full technology stack,
            specializing in backend systems, frontend frameworks, cloud infrastructure, and mobile development.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all"
            >
              Get In Touch
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 dark:bg-dark-secondary/50 bg-gray-100 dark:text-gray-300 text-gray-700 rounded-lg font-semibold hover:dark:bg-dark-secondary hover:bg-gray-200 transition-all border border-gray-700/20 dark:border-gray-600/20"
            >
              View Projects
            </motion.button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base"
          >
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 dark:text-gray-400 text-gray-600 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="break-all">{profile.email}</span>
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-2 dark:text-gray-400 text-gray-600 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{profile.phone}</span>
            </a>
            <div className="flex items-center gap-2 dark:text-gray-400 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs">Scroll</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
