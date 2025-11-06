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
      {/* Main cursor dot - using gradient colors matching role text */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
        }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 1500,
          damping: 50,
          mass: 0.1,
        }}
      />

      {/* Outer ring - matching gradient */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998]"
        style={{
          border: '2px solid #6366f1',
          boxShadow: '0 0 0 1px #8b5cf6, 0 0 0 2px #06b6d4',
          opacity: 0.7,
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          x: { type: "spring", stiffness: 1500, damping: 50, mass: 0.1 },
          y: { type: "spring", stiffness: 1500, damping: 50, mass: 0.1 },
          scale: { type: "spring", stiffness: 500, damping: 30 },
        }}
      />

      {/* Glow effect - matching gradient */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 rounded-full blur-xl pointer-events-none z-[9997]"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
        }}
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          x: { type: "spring", stiffness: 1200, damping: 45, mass: 0.15 },
          y: { type: "spring", stiffness: 1200, damping: 45, mass: 0.15 },
          scale: { type: "spring", stiffness: 300, damping: 30 },
        }}
      />

      {/* Particle trail - matching gradient colors */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9996]"
          style={{
            background: i === 0 ? '#6366f1' : i === 1 ? '#8b5cf6' : '#06b6d4',
          }}
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            x: { type: "spring", stiffness: 1500, damping: 50, mass: 0.1 },
            y: { type: "spring", stiffness: 1500, damping: 50, mass: 0.1 },
            opacity: { duration: 0.5, delay: i * 0.1, repeat: Infinity, ease: "easeOut" },
            scale: { duration: 0.5, delay: i * 0.1, repeat: Infinity, ease: "easeOut" },
          }}
        />
      ))}
    </>
  )
}

export default CustomCursor
