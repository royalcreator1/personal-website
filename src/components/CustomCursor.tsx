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

  // Generate sparkle particles around cursor
  const sparkles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (360 / 8) * i,
    radius: 20 + Math.random() * 15,
    delay: i * 0.08,
    size: 2 + Math.random() * 2,
  }))

  return (
    <>
      {/* Main cursor dot - using gradient colors matching role text */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.5), 0 0 20px rgba(139, 92, 246, 0.3), 0 0 30px rgba(6, 182, 212, 0.2)',
        }}
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 2000,
          damping: 60,
          mass: 0.05,
        }}
      />

      {/* Outer ring - smooth following */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998]"
        style={{
          border: '2px solid rgba(99, 102, 241, 0.6)',
          boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.4), 0 0 0 2px rgba(6, 182, 212, 0.3)',
        }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.8 : 1,
          rotate: isHovering ? 180 : 0,
        }}
        transition={{
          x: { type: "spring", stiffness: 1800, damping: 55, mass: 0.08 },
          y: { type: "spring", stiffness: 1800, damping: 55, mass: 0.08 },
          scale: { type: "spring", stiffness: 400, damping: 25 },
          rotate: { type: "spring", stiffness: 300, damping: 20 },
        }}
      />

      {/* Glow effect - enhanced */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 rounded-full blur-2xl pointer-events-none z-[9997]"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.2), transparent)',
        }}
        animate={{
          x: mousePosition.x - 48,
          y: mousePosition.y - 48,
          scale: isHovering ? 1.6 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{
          x: { type: "spring", stiffness: 1500, damping: 50, mass: 0.1 },
          y: { type: "spring", stiffness: 1500, damping: 50, mass: 0.1 },
          scale: { type: "spring", stiffness: 300, damping: 25 },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Sparkle dust particles - orbiting around cursor */}
      {sparkles.map((sparkle) => {
        const radians = (sparkle.angle * Math.PI) / 180
        const offsetX = Math.cos(radians) * sparkle.radius
        const offsetY = Math.sin(radians) * sparkle.radius
        
        const color = sparkle.id % 3 === 0 
          ? '#6366f1' 
          : sparkle.id % 3 === 1 
          ? '#8b5cf6' 
          : '#06b6d4'
        
        return (
          <motion.div
            key={sparkle.id}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9996]"
            style={{
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              background: `radial-gradient(circle, ${color}, transparent)`,
              boxShadow: `0 0 ${sparkle.size * 2}px ${color}, 0 0 ${sparkle.size * 4}px ${color}`,
            }}
            animate={{
              x: mousePosition.x + offsetX - sparkle.size / 2,
              y: mousePosition.y + offsetY - sparkle.size / 2,
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 360],
            }}
            transition={{
              x: { type: "spring", stiffness: 2000, damping: 60, mass: 0.05 },
              y: { type: "spring", stiffness: 2000, damping: 60, mass: 0.05 },
              opacity: {
                duration: 2.5,
                delay: sparkle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                duration: 2.5,
                delay: sparkle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 4,
                delay: sparkle.delay,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />
        )
      })}

      {/* Trailing particles - following cursor */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`trail-${i}`}
          className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9995]"
          style={{
            background: `linear-gradient(135deg, ${
              i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4'
            }, transparent)`,
            boxShadow: `0 0 6px ${
              i % 3 === 0 ? 'rgba(99, 102, 241, 0.8)' : i % 3 === 1 ? 'rgba(139, 92, 246, 0.8)' : 'rgba(6, 182, 212, 0.8)'
            }`,
          }}
          animate={{
            x: mousePosition.x - 4 - (i * 8),
            y: mousePosition.y - 4 - (i * 8),
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            x: { type: "spring", stiffness: 2000, damping: 60, mass: 0.05, delay: i * 0.02 },
            y: { type: "spring", stiffness: 2000, damping: 60, mass: 0.05, delay: i * 0.02 },
            opacity: {
              duration: 0.8,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeOut",
            },
            scale: {
              duration: 0.8,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeOut",
            },
          }}
        />
      ))}

      {/* Rotating gradient ring - decorative */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9994]"
        style={{
          border: '2px solid transparent',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4, #6366f1) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.4,
        }}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          rotate: [0, 360],
          scale: isHovering ? 1.2 : 0.8,
        }}
        transition={{
          x: { type: "spring", stiffness: 1800, damping: 55, mass: 0.08 },
          y: { type: "spring", stiffness: 1800, damping: 55, mass: 0.08 },
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          },
          scale: { type: "spring", stiffness: 400, damping: 25 },
        }}
      />
    </>
  )
}

export default CustomCursor
