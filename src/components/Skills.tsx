'use client'

import { motion } from 'framer-motion'
import { profile } from '@/data/profile'

const Skills = () => {
  const skillCategories = [
    { title: 'Programming Languages', skills: profile.skills.languages, color: 'from-primary to-primary/50' },
    { title: 'Frameworks', skills: profile.skills.frameworks, color: 'from-secondary to-secondary/50' },
    { title: 'Databases', skills: profile.skills.databases, color: 'from-accent to-accent/50' },
    { title: 'Development Tools', skills: profile.skills.tools, color: 'from-purple-500 to-purple-500/50' },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient"
        >
          Skills
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="gradient-border"
            >
              <div className="gradient-border-content p-6">
                <h3 className="text-xl font-bold mb-4 text-gradient">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      whileHover={{ scale: 1.1 }}
                      className={`px-4 py-2 bg-gradient-to-r ${category.color} rounded-full text-sm font-semibold cursor-default`}
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

