'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 768) {
      return
    }

    setIsVisible(true)
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Elements that should trigger hover effect
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]')
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', updateMousePosition, { passive: true })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Designer cursor pointer - SVG cursor shape */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 2000,
          damping: 60,
          mass: 0.05,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="drop-shadow-lg"
        >
          {/* Cursor pointer shape with gradient */}
          <defs>
            <linearGradient id="cursorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <path
            d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
            fill="url(#cursorGradient)"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>

      {/* Glow effect behind cursor */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full blur-xl pointer-events-none z-[9998]"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.2), transparent)',
        }}
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 1500,
          damping: 50,
          mass: 0.1,
        }}
      />

      {/* Sparkle particles around cursor */}
      {[...Array(6)].map((_, i) => {
        const angle = (360 / 6) * i
        const radius = 25
        const radians = (angle * Math.PI) / 180
        const offsetX = Math.cos(radians) * radius
        const offsetY = Math.sin(radians) * radius
        
        const color = i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4'
        
        return (
          <motion.div
            key={i}
            className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9997]"
            style={{
              background: color,
              boxShadow: `0 0 6px ${color}`,
            }}
            animate={{
              x: mousePosition.x + offsetX - 3,
              y: mousePosition.y + offsetY - 3,
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              x: { type: "spring", stiffness: 2000, damping: 60, mass: 0.05 },
              y: { type: "spring", stiffness: 2000, damping: 60, mass: 0.05 },
              opacity: {
                duration: 2,
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                duration: 2,
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        )
      })}
    </>
  )
}

export default CustomCursor
