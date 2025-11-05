'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { profile } from '@/data/profile'

const Education = () => {
  return (
    <section id="education" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative section-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gradient px-2"
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
          <div className="gradient-border-content p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-primary to-secondary rounded-lg flex-shrink-0">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">{profile.education.school}</h3>
                <p className="text-base sm:text-lg dark:text-gray-200 text-gray-900 font-semibold mb-2">{profile.education.degree}</p>
                <p className="dark:text-gray-400 text-gray-700 mb-2 text-sm sm:text-base">{profile.education.location}</p>
                <span className="text-accent font-semibold text-sm sm:text-base">{profile.education.period}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
