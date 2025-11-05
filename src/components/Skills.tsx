'use client'

import { motion } from 'framer-motion'
import { profile } from '@/data/profile'

const Skills = () => {
  const skillCategories = [
    { 
      title: 'Programming Languages', 
      skills: profile.skills.languages, 
      color: 'from-primary to-primary/50',
      icon: '💻'
    },
    { 
      title: 'Frameworks & Libraries', 
      skills: profile.skills.frameworks, 
      color: 'from-secondary to-secondary/50',
      icon: '⚛️'
    },
    { 
      title: 'Databases & Search', 
      skills: profile.skills.databases, 
      color: 'from-accent to-accent/50',
      icon: '🗄️'
    },
    { 
      title: 'Cloud & Infrastructure', 
      skills: profile.skills.cloud, 
      color: 'from-purple-500 to-purple-500/50',
      icon: '☁️'
    },
    { 
      title: 'Messaging & Streaming', 
      skills: profile.skills.messaging, 
      color: 'from-pink-500 to-pink-500/50',
      icon: '📨'
    },
    { 
      title: 'Monitoring & Observability', 
      skills: profile.skills.monitoring, 
      color: 'from-green-500 to-green-500/50',
      icon: '📊'
    },
    { 
      title: 'Development Tools', 
      skills: profile.skills.tools, 
      color: 'from-orange-500 to-orange-500/50',
      icon: '🛠️'
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Technical Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks to deliver robust, scalable solutions
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="gradient-border"
            >
              <div className="gradient-border-content p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-xl font-bold text-gradient">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      className={`px-3 py-1.5 bg-gradient-to-r ${category.color} rounded-lg text-sm font-semibold cursor-default shadow-sm`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
