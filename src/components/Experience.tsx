'use client'

import { motion } from 'framer-motion'
import { Briefcase, CheckCircle2 } from 'lucide-react'
import { profile } from '@/data/profile'

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary/50 dark:bg-dark-secondary/50 bg-light-secondary/50 relative section-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient"
        >
          Professional Experience
        </motion.h2>
        
        <div className="space-y-8">
          {profile.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="gradient-border"
            >
              <div className="gradient-border-content p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-accent" />
                      <h3 className="text-2xl font-bold text-primary">{exp.company}</h3>
                    </div>
                    <p className="text-lg text-gray-300 dark:text-gray-300 text-gray-700 font-semibold">{exp.role}</p>
                    <p className="text-gray-400 dark:text-gray-400 text-gray-600">{exp.location}</p>
                  </div>
                  <span className="text-accent font-semibold mt-2 md:mt-0">{exp.period}</span>
                </div>
                <ul className="space-y-3 mt-4">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-300 dark:text-gray-300 text-gray-700 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
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
