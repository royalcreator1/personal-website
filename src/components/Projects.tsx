'use client'

import { motion } from 'framer-motion'
import { Code, Calendar, MapPin, Briefcase, CheckCircle2, ExternalLink } from 'lucide-react'
import { profile } from '@/data/profile'

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 md:pl-28 relative min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          <span className="text-gradient">Featured</span>{' '}
          <span className="dark:text-white text-gray-900">Projects</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {profile.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="dark:bg-dark-secondary/50 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/20 dark:border-gray-600/20 hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gradient">{project.name}</h3>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4 text-sm dark:text-gray-400 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{project.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                  </div>
                  <div>
                    <span className="text-accent font-semibold">Role: </span>
                    <span>{project.role}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm dark:text-gray-200 text-gray-900 mb-2">
                    <span className="text-accent font-semibold">Tools: </span>
                    <span>{project.tools}</span>
                  </p>
                </div>
                
                <div className="flex-grow">
                  <p className="text-sm font-semibold dark:text-gray-200 text-gray-900 mb-3">Contribution:</p>
                  <ul className="space-y-2">
                    {project.contribution.slice(0, 3).map((item, i) => (
                      <li key={i} className="text-sm dark:text-gray-300 text-gray-800 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
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
