'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
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
      // Finished typing, wait then start deleting
      timeout = setTimeout(() => {
        setIsDeleting(true)
        setTypingSpeed(50)
      }, 2000)
    } else if (isDeleting && displayedText === '') {
      // Finished deleting, move to next title
      setIsDeleting(false)
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
      setTypingSpeed(100)
    } else if (isDeleting) {
      // Deleting characters
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.substring(0, displayedText.length - 1))
      }, typingSpeed)
    } else {
      // Typing characters
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.substring(0, displayedText.length + 1))
      }, typingSpeed)
    }
    
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [displayedText, isDeleting, currentTitleIndex, typingSpeed])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(6,182,212,0.04),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-4 text-gradient"
          >
            {profile.name}
          </motion.h1>
          
          <div className="h-12 md:h-16 flex items-center justify-center mb-8">
            <p className="text-2xl md:text-3xl text-gray-300 font-semibold">
              {displayedText}
              <span className="animate-pulse text-accent">|</span>
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 dark:text-gray-400 text-gray-600"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-accent" />
              <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent" />
              <a href={`tel:${profile.phone}`} className="hover:text-primary transition-colors">
                {profile.phone}
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              View My Work
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
