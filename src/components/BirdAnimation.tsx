'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface BirdAnimationProps {
  trigger: boolean
  buttonPosition: { x: number; y: number }
}

const BirdAnimation = ({ trigger, buttonPosition }: BirdAnimationProps) => {
  const [birds, setBirds] = useState<Array<{ id: number; angle: number; distance: number }>>([])

  useEffect(() => {
    if (trigger) {
      // Create 5-8 birds flying away
      const birdCount = 5 + Math.floor(Math.random() * 4)
      const newBirds = Array.from({ length: birdCount }, (_, i) => ({
        id: i,
        angle: (360 / birdCount) * i + Math.random() * 30 - 15, // Spread evenly with randomness
        distance: 250 + Math.random() * 200,
      }))
      setBirds(newBirds)

      // Clear birds after animation
      setTimeout(() => setBirds([]), 2000)
    }
  }, [trigger])

  if (birds.length === 0) return null

  return (
    <>
      {birds.map((bird) => {
        const radians = (bird.angle * Math.PI) / 180
        const endX = buttonPosition.x + Math.cos(radians) * bird.distance
        const endY = buttonPosition.y + Math.sin(radians) * bird.distance

        return (
          <motion.div
            key={bird.id}
            className="fixed pointer-events-none z-[10000]"
            initial={{
              x: buttonPosition.x - 12,
              y: buttonPosition.y - 12,
              opacity: 1,
              scale: 0.6,
            }}
            animate={{
              x: endX - 12,
              y: endY - 12,
              opacity: [1, 1, 0.9, 0],
              scale: [0.6, 1, 1.2, 0.4],
              rotate: [0, -20, 20, 0],
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
          >
            {/* Bird SVG - more detailed */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-yellow-400"
            >
              {/* Bird body */}
              <ellipse cx="12" cy="14" rx="4" ry="5" fill="currentColor" />
              {/* Bird head */}
              <circle cx="12" cy="10" r="3" fill="currentColor" />
              {/* Bird beak */}
              <path
                d="M9 10 L7 9 L9 8 Z"
                fill="orange"
              />
              {/* Bird wing */}
              <ellipse
                cx="10"
                cy="14"
                rx="3"
                ry="2"
                fill="currentColor"
                opacity="0.7"
                transform="rotate(-20 10 14)"
              />
            </svg>
          </motion.div>
        )
      })}
    </>
  )
}

export default BirdAnimation
