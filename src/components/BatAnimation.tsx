'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface BatAnimationProps {
  trigger: boolean
  buttonPosition: { x: number; y: number }
}

const BatAnimation = ({ trigger, buttonPosition }: BatAnimationProps) => {
  const [bats, setBats] = useState<Array<{ id: number; angle: number; distance: number }>>([])

  useEffect(() => {
    if (trigger) {
      // Create 8-12 bats flying in different directions
      const batCount = 8 + Math.floor(Math.random() * 5)
      const newBats = Array.from({ length: batCount }, (_, i) => ({
        id: i,
        angle: (360 / batCount) * i + Math.random() * 20 - 10, // Spread evenly with some randomness
        distance: 200 + Math.random() * 150,
      }))
      setBats(newBats)

      // Clear bats after animation
      setTimeout(() => setBats([]), 2000)
    }
  }, [trigger])

  if (bats.length === 0) return null

  return (
    <>
      {bats.map((bat) => {
        const radians = (bat.angle * Math.PI) / 180
        const endX = buttonPosition.x + Math.cos(radians) * bat.distance
        const endY = buttonPosition.y + Math.sin(radians) * bat.distance

        return (
          <motion.div
            key={bat.id}
            className="fixed pointer-events-none z-[10000]"
            initial={{
              x: buttonPosition.x - 12,
              y: buttonPosition.y - 12,
              opacity: 1,
              scale: 0.3,
            }}
            animate={{
              x: endX - 12,
              y: endY - 12,
              opacity: [1, 1, 0.8, 0],
              scale: [0.3, 0.8, 1, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              ease: 'easeOut',
            }}
          >
            {/* Bat SVG - more detailed */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-800 dark:text-gray-900"
            >
              {/* Bat body */}
              <ellipse cx="12" cy="12" rx="3" ry="5" fill="currentColor" />
              {/* Bat wings */}
              <path
                d="M8 10 Q4 8 2 10 Q4 12 8 12 Q8 11 8 10 Z"
                fill="currentColor"
                opacity="0.8"
              />
              <path
                d="M16 10 Q20 8 22 10 Q20 12 16 12 Q16 11 16 10 Z"
                fill="currentColor"
                opacity="0.8"
              />
              {/* Bat ears */}
              <path
                d="M10 8 L11 6 L12 8 Z"
                fill="currentColor"
              />
              <path
                d="M12 8 L13 6 L14 8 Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        )
      })}
    </>
  )
}

export default BatAnimation
