'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 768) {
      return
    }

    setIsVisible(true)
    
    const updateMousePosition = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      setMousePosition({ x, y })
      
      // Direct DOM updates for instant response
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x - 8}px, ${y - 8}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${x - 16}px, ${y - 16}px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${x - 40}px, ${y - 40}px)`
      }
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
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] transition-transform duration-0"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
          willChange: 'transform',
        }}
      />

      {/* Outer ring - matching gradient */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] transition-transform duration-0"
        style={{
          border: '2px solid #6366f1',
          boxShadow: '0 0 0 1px #8b5cf6, 0 0 0 2px #06b6d4',
          opacity: 0.7,
          willChange: 'transform',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* Glow effect - matching gradient */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-20 h-20 rounded-full blur-xl pointer-events-none z-[9997] transition-transform duration-0"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
          willChange: 'transform',
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
            x: { type: "tween", ease: "linear", duration: 0 },
            y: { type: "tween", ease: "linear", duration: 0 },
            opacity: { duration: 0.5, delay: i * 0.1, repeat: Infinity, ease: "easeOut" },
            scale: { duration: 0.5, delay: i * 0.1, repeat: Infinity, ease: "easeOut" },
          }}
        />
      ))}
    </>
  )
}

export default CustomCursor
