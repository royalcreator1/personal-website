'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { profile } from '@/data/profile'

const Education = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 md:pl-28 relative min-h-screen flex items-center dark:bg-dark-secondary/30">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          <span className="text-gradient">Education</span>
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="dark:bg-dark-secondary/50 bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/20 dark:border-gray-600/20 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gradient mb-3">{profile.education.school}</h3>
                <p className="text-lg dark:text-gray-200 text-gray-900 font-semibold mb-2">{profile.education.degree}</p>
                <p className="dark:text-gray-400 text-gray-700 mb-3">{profile.education.location}</p>
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
