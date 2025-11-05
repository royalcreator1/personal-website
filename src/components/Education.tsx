'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { profile } from '@/data/profile'

const Education = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative section-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient"
        >
          Education
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto gradient-border"
        >
          <div className="gradient-border-content p-8">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-primary mb-2">{profile.education.school}</h3>
                <p className="text-lg text-gray-300 font-semibold mb-2">{profile.education.degree}</p>
                <p className="text-gray-400 mb-2">{profile.education.location}</p>
                <span className="text-accent font-semibold">{profile.education.period}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education

