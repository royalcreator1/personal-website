'use client'

import { motion } from 'framer-motion'
import { Code, Calendar, MapPin, Briefcase, CheckCircle2 } from 'lucide-react'
import { profile } from '@/data/profile'

const Projects = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative section-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gradient px-2"
        >
          Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {profile.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="gradient-border"
            >
              <div className="gradient-border-content p-4 sm:p-6 h-full">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Code className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-bold text-primary break-words">{project.name}</h3>
                  </div>
                </div>
                
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 text-xs sm:text-sm dark:text-gray-400 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="break-words">{project.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="break-words">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{project.year}</span>
                  </div>
                  <div>
                    <span className="text-accent font-semibold">Role: </span>
                    <span className="break-words">{project.role}</span>
                  </div>
                </div>
                
                <div className="mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm dark:text-gray-200 text-gray-900 mb-1 sm:mb-2">
                    <span className="text-accent font-semibold">Tools: </span>
                    <span className="break-words">{project.tools}</span>
                  </p>
                </div>
                
                <div>
                  <p className="text-xs sm:text-sm font-semibold dark:text-gray-200 text-gray-900 mb-2">Contribution:</p>
                  <ul className="space-y-2 sm:space-y-3">
                    {project.contribution.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm dark:text-gray-300 text-gray-800 flex items-start gap-2 sm:gap-3">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
