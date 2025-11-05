'use client'

import { motion } from 'framer-motion'
import { 
  Code, GitBranch, Terminal, Database, Server, Cloud, Cpu, Zap, Box, Settings, Layers,
  Github, Package, Activity, Heart, Truck, FileCode, Network, Lock, CircleDot, CheckCircle2
} from 'lucide-react'

const techIcons = [
  { icon: Code, label: 'Python', color: 'text-[#3776AB]/15 dark:text-[#3776AB]/15', delay: 0 },
  { icon: Server, label: 'Java', color: 'text-[#ED8B00]/15 dark:text-[#ED8B00]/15', delay: 0.5 },
  { icon: Github, label: 'GitHub', color: 'text-[#181717]/15 dark:text-[#181717]/15', delay: 1 },
  { icon: Database, label: 'Database', color: 'text-[#4169E1]/15 dark:text-[#4169E1]/15', delay: 1.5 },
  { icon: Cloud, label: 'AWS', color: 'text-[#FF9900]/15 dark:text-[#FF9900]/15', delay: 2 },
  { icon: Layers, label: 'Kotlin', color: 'text-[#7F52FF]/15 dark:text-[#7F52FF]/15', delay: 2.5 },
  { icon: GitBranch, label: 'Git', color: 'text-[#F05032]/15 dark:text-[#F05032]/15', delay: 3 },
  { icon: Cpu, label: 'Docker', color: 'text-[#2496ED]/15 dark:text-[#2496ED]/15', delay: 3.5 },
  { icon: Box, label: 'React', color: 'text-[#61DAFB]/15 dark:text-[#61DAFB]/15', delay: 4 },
  { icon: Settings, label: 'Kafka', color: 'text-[#231F20]/15 dark:text-[#231F20]/15', delay: 4.5 },
  { icon: Zap, label: 'Node.js', color: 'text-[#339933]/15 dark:text-[#339933]/15', delay: 5 },
  { icon: Heart, label: 'Healthcare', color: 'text-[#E91E63]/15 dark:text-[#E91E63]/15', delay: 5.5 },
  { icon: Truck, label: 'Supply Chain', color: 'text-[#4CAF50]/15 dark:text-[#4CAF50]/15', delay: 6 },
  { icon: Package, label: 'Package Manager', color: 'text-[#CB3837]/15 dark:text-[#CB3837]/15', delay: 6.5 },
  { icon: Activity, label: 'Monitoring', color: 'text-[#00D9FF]/15 dark:text-[#00D9FF]/15', delay: 7 },
  { icon: FileCode, label: 'Code', color: 'text-[#007ACC]/15 dark:text-[#007ACC]/15', delay: 7.5 },
  { icon: Network, label: 'Network', color: 'text-[#0080FF]/15 dark:text-[#0080FF]/15', delay: 8 },
  { icon: Lock, label: 'Security', color: 'text-[#FFD700]/15 dark:text-[#FFD700]/15', delay: 8.5 },
]

const FloatingTechIcons = () => {
  const generateIcons = () => {
    const icons = []
    for (let i = 0; i < 25; i++) {
      const tech = techIcons[i % techIcons.length]
      const Icon = tech.icon
      const randomX = Math.random() * 100
      const randomY = Math.random() * 100
      const randomDuration = 20 + Math.random() * 15
      const randomDelay = Math.random() * 8
      const randomSize = 14 + Math.random() * 20
      
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

  const icons = generateIcons()

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
          className={`absolute ${item.color} transition-opacity duration-300`}
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

      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
    </div>
  )
}

export default FloatingTechIcons
