'use client'

import { motion } from 'framer-motion'
import { Code, Calendar, MapPin, Briefcase } from 'lucide-react'
import { profile } from '@/data/profile'

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient"
        >
          Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {profile.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="gradient-border"
            >
              <div className="gradient-border-content p-6 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-accent" />
                    <h3 className="text-xl font-bold text-primary">{project.name}</h3>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4 text-sm text-gray-400">
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
                  <p className="text-sm text-gray-300 mb-2">
                    <span className="text-accent font-semibold">Tools: </span>
                    {project.tools}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-300 mb-2">Contribution:</p>
                  <ul className="space-y-2">
                    {project.contribution.map((item, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-accent mt-1">●</span>
                        <span>{item}</span>
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

