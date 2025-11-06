'use client'

import { motion } from 'framer-motion'
import { Code, Zap, Layers, Rocket } from 'lucide-react'

const About = () => {
  const services = [
    {
      icon: Code,
      title: "Full Stack Development",
      description: "End-to-end web and mobile application development with modern frameworks and best practices.",
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: "Backend Architecture",
      description: "Scalable RESTful APIs, microservices, and cloud infrastructure design and implementation.",
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Layers,
      title: "Integration Engineering",
      description: "Seamless third-party integrations, API design, and enterprise system connectivity solutions.",
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Rocket,
      title: "Cloud & DevOps",
      description: "AWS infrastructure, containerization, CI/CD pipelines, and automated deployment strategies.",
      gradient: 'from-indigo-500 to-purple-500'
    }
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 md:pl-28 relative min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">About</span>{' '}
            <span className="dark:text-white text-gray-900">Me</span>
          </h2>
          <div className="max-w-3xl space-y-4 dark:text-gray-300 text-gray-700 text-lg leading-relaxed">
            <p>
              I'm a <span className="text-primary font-semibold">versatile Software Engineer</span> specializing in 
              building high-performance, scalable applications across the full technology stack. With expertise spanning 
              <span className="text-secondary font-semibold"> backend systems, frontend frameworks, cloud infrastructure, and mobile development</span>, 
              I deliver end-to-end solutions that drive business value.
            </p>
            <p className="dark:text-gray-400 text-gray-600">
              My experience across diverse domains—healthcare, pharmaceuticals, fintech, and enterprise solutions—has 
              equipped me with a unique ability to understand complex business requirements and translate them into 
              robust, user-centric technical implementations. I'm passionate about clean code, architectural excellence, 
              and creating seamless user experiences.
            </p>
            <p className="dark:text-gray-400 text-gray-600">
              Currently serving as a Software Engineer at <span className="text-accent font-semibold">Sedin Technologies</span>, 
              I've successfully delivered production-grade applications with expertise in 
              modern technologies including Python, Java, TypeScript, Kotlin, and cloud platforms.
            </p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="dark:bg-dark-secondary/50 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/20 dark:border-gray-600/20 hover:border-primary/50 transition-all duration-300 h-full">
                  <div className={`p-3 bg-gradient-to-br ${service.gradient} rounded-lg w-fit mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">{service.title}</h3>
                  <p className="dark:text-gray-400 text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About
