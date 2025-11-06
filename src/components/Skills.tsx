'use client'

import { motion, useInView } from 'framer-motion'
import { profile } from '@/data/profile'
import { Code, Layers, Database, Cloud, MessageSquare, Activity, Wrench } from 'lucide-react'
import { useRef } from 'react'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    { 
      title: 'Programming Languages', 
      skills: profile.skills.languages, 
      icon: Code,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'Frameworks & Libraries', 
      skills: profile.skills.frameworks, 
      icon: Layers,
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'Databases & Search', 
      skills: profile.skills.databases, 
      icon: Database,
      gradient: 'from-cyan-500 to-blue-500'
    },
    { 
      title: 'Cloud & Infrastructure', 
      skills: profile.skills.cloud, 
      icon: Cloud,
      gradient: 'from-indigo-500 to-purple-500'
    },
    { 
      title: 'Messaging & Streaming', 
      skills: profile.skills.messaging, 
      icon: MessageSquare,
      gradient: 'from-pink-500 to-rose-500'
    },
    { 
      title: 'Monitoring & Observability', 
      skills: profile.skills.monitoring, 
      icon: Activity,
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      title: 'Development Tools', 
      skills: profile.skills.tools, 
      icon: Wrench,
      gradient: 'from-orange-500 to-amber-500'
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 md:pl-28 relative min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Technical</span>{' '}
            <span className="dark:text-white text-gray-900">Expertise</span>
          </h2>
          <p className="dark:text-gray-400 text-gray-600 text-lg max-w-2xl">
            A comprehensive toolkit of modern technologies and frameworks to deliver robust, scalable solutions
          </p>
        </motion.div>
        
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="group"
              >
                <div className="dark:bg-dark-secondary/50 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/20 dark:border-gray-600/20 hover:border-primary/50 transition-all duration-300 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${category.gradient} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold dark:text-white text-gray-900">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`px-3 py-1.5 bg-gradient-to-r ${category.gradient} rounded-lg text-sm font-medium text-white shadow-md cursor-default`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
