'use client'

import { motion } from 'framer-motion'
import { Briefcase, CheckCircle2 } from 'lucide-react'
import { profile } from '@/data/profile'

const Experience = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 dark:bg-dark-secondary/50 bg-gray-50 relative section-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gradient px-2"
        >
          Professional Experience
        </motion.h2>
        
        <div className="space-y-6 sm:space-y-8">
          {profile.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="gradient-border"
            >
              <div className="gradient-border-content p-4 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                      <h3 className="text-xl sm:text-2xl font-bold text-primary break-words">{exp.company}</h3>
                    </div>
                    <p className="text-base sm:text-lg dark:text-gray-200 text-gray-900 font-semibold mb-1">{exp.role}</p>
                    <p className="dark:text-gray-400 text-gray-700 text-sm sm:text-base">{exp.location}</p>
                  </div>
                  <span className="text-accent font-semibold mt-2 md:mt-0 text-sm sm:text-base">{exp.period}</span>
                </div>
                <ul className="space-y-2 sm:space-y-3 mt-4">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="dark:text-gray-200 text-gray-900 flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
