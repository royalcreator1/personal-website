'use client'

import { motion } from 'framer-motion'
import { Briefcase, CheckCircle2 } from 'lucide-react'
import { profile } from '@/data/profile'

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 md:pl-28 relative min-h-screen flex items-center dark:bg-dark-secondary/30">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          <span className="text-gradient">Professional</span>{' '}
          <span className="dark:text-white text-gray-900">Experience</span>
        </motion.h2>
        
        <div className="space-y-8">
          {profile.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="dark:bg-dark-secondary/50 bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/20 dark:border-gray-600/20 hover:border-primary/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gradient">{exp.company}</h3>
                    </div>
                    <p className="text-lg dark:text-gray-200 text-gray-900 font-semibold mb-2">{exp.role}</p>
                    <p className="dark:text-gray-400 text-gray-700">{exp.location}</p>
                  </div>
                  <span className="text-accent font-semibold mt-2 md:mt-0">{exp.period}</span>
                </div>
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className="dark:text-gray-200 text-gray-900 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{achievement}</span>
                    </motion.li>
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
