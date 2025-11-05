'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { 
  Code, GitBranch, Terminal, Database, Server, Cloud, Cpu, Zap, Box, Settings, Layers,
  Github, Package, Activity, Heart, Truck, FileCode, Network, Lock, CircleDot, CheckCircle2
} from 'lucide-react'

const techIcons = [
  { icon: Code, label: 'Python', color: 'text-[#FF4500]/20 dark:text-[#FF4500]/20', delay: 0 },
  { icon: Server, label: 'Java', color: 'text-[#FFD700]/20 dark:text-[#FFD700]/20', delay: 0.5 },
  { icon: Github, label: 'GitHub', color: 'text-[#FF6B35]/20 dark:text-[#FF6B35]/20', delay: 1 },
  { icon: Database, label: 'Database', color: 'text-[#FF4500]/20 dark:text-[#FF4500]/20', delay: 1.5 },
  { icon: Cloud, label: 'AWS', color: 'text-[#FFD700]/20 dark:text-[#FFD700]/20', delay: 2 },
  { icon: Layers, label: 'Kotlin', color: 'text-[#FF6B35]/20 dark:text-[#FF6B35]/20', delay: 2.5 },
  { icon: GitBranch, label: 'Git', color: 'text-[#FF4500]/20 dark:text-[#FF4500]/20', delay: 3 },
  { icon: Cpu, label: 'Docker', color: 'text-[#FFD700]/20 dark:text-[#FFD700]/20', delay: 3.5 },
  { icon: Box, label: 'React', color: 'text-[#FF6B35]/20 dark:text-[#FF6B35]/20', delay: 4 },
  { icon: Settings, label: 'Kafka', color: 'text-[#FF4500]/20 dark:text-[#FF4500]/20', delay: 4.5 },
  { icon: Zap, label: 'Node.js', color: 'text-[#FFD700]/20 dark:text-[#FFD700]/20', delay: 5 },
  { icon: Heart, label: 'Healthcare', color: 'text-[#FF6B35]/20 dark:text-[#FF6B35]/20', delay: 5.5 },
  { icon: Truck, label: 'Supply Chain', color: 'text-[#FF4500]/20 dark:text-[#FF4500]/20', delay: 6 },
  { icon: Package, label: 'Package Manager', color: 'text-[#FFD700]/20 dark:text-[#FFD700]/20', delay: 6.5 },
  { icon: Activity, label: 'Monitoring', color: 'text-[#FF6B35]/20 dark:text-[#FF6B35]/20', delay: 7 },
  { icon: FileCode, label: 'Code', color: 'text-[#FF4500]/20 dark:text-[#FF4500]/20', delay: 7.5 },
  { icon: Network, label: 'Network', color: 'text-[#FFD700]/20 dark:text-[#FFD700]/20', delay: 8 },
  { icon: Lock, label: 'Security', color: 'text-[#FF6B35]/20 dark:text-[#FF6B35]/20', delay: 8.5 },
]

const FloatingTechIcons = () => {
  const generateIcons = () => {
    const icons = []
    // Reduce number of icons on mobile for better performance
    const iconCount = typeof window !== 'undefined' && window.innerWidth < 640 ? 15 : 25
    for (let i = 0; i < iconCount; i++) {
      const tech = techIcons[i % techIcons.length]
      const Icon = tech.icon
      const randomX = Math.random() * 100
      const randomY = Math.random() * 100
      const randomDuration = 20 + Math.random() * 15
      const randomDelay = Math.random() * 8
      const randomSize = typeof window !== 'undefined' && window.innerWidth < 640 
        ? 12 + Math.random() * 12  // Smaller on mobile
        : 14 + Math.random() * 20
      
      icons.push({
        Icon,
        x: randomX,
        y: randomY,
        duration: randomDuration,
        delay: randomDelay + tech.delay,
        color: tech.color,
        size: randomSize,
        key: `tech-${i}`,
      })
    }
    return icons
  }

  const [icons, setIcons] = useState<ReturnType<typeof generateIcons>>([])

  useEffect(() => {
    setIcons(generateIcons())
    
    const handleResize = () => {
      setIcons(generateIcons())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating tech icons */}
      {icons.map((item) => (
        <motion.div
          key={item.key}
          className={`absolute ${item.color} transition-opacity duration-300 hidden sm:block`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
          animate={{
            y: [0, -40, 0, -20, 0],
            x: [0, 30, 0, -20, 0],
            rotate: [0, 15, -15, 10, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <item.Icon className="w-6 h-6 md:w-8 md:h-8" style={{ width: `${item.size}px`, height: `${item.size}px` }} />
        </motion.div>
      ))}

      {/* Subtle gradient orbs - hidden on mobile */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse hidden sm:block" style={{ boxShadow: '0 0 200px rgba(255, 69, 0, 0.3)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse hidden sm:block" style={{ animationDelay: '2s', boxShadow: '0 0 200px rgba(255, 215, 0, 0.3)' }} />
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse hidden sm:block" style={{ animationDelay: '4s', boxShadow: '0 0 200px rgba(255, 107, 53, 0.3)' }} />
    </div>
  )
}

export default FloatingTechIcons
