'use client'

import { motion } from 'framer-motion'
import { Code, Zap, Layers, Rocket } from 'lucide-react'

const About = () => {
  const services = [
    {
      icon: Code,
      title: "Full Stack Development",
      description: "End-to-end web and mobile application development with modern frameworks and best practices."
    },
    {
      icon: Zap,
      title: "Backend Architecture",
      description: "Scalable RESTful APIs, microservices, and cloud infrastructure design and implementation."
    },
    {
      icon: Layers,
      title: "Integration Engineering",
      description: "Seamless third-party integrations, API design, and enterprise system connectivity solutions."
    },
    {
      icon: Rocket,
      title: "Cloud & DevOps",
      description: "AWS infrastructure, containerization, CI/CD pipelines, and automated deployment strategies."
    }
  ]

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gradient">
            About Me
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl dark:text-gray-300 text-gray-800 leading-relaxed mb-4 sm:mb-6 font-medium px-2">
              I'm a <span className="text-primary font-semibold">versatile Software Engineer</span> specializing in 
              building high-performance, scalable applications across the full technology stack. With expertise spanning 
              <span className="text-secondary font-semibold"> backend systems, frontend frameworks, cloud infrastructure, and mobile development</span>, 
              I deliver end-to-end solutions that drive business value.
            </p>
            <p className="text-sm sm:text-base md:text-lg dark:text-gray-400 text-gray-600 leading-relaxed mb-4 sm:mb-6 px-2">
              My experience across diverse domains—healthcare, pharmaceuticals, fintech, and enterprise solutions—has 
              equipped me with a unique ability to understand complex business requirements and translate them into 
              robust, user-centric technical implementations. I'm passionate about clean code, architectural excellence, 
              and creating seamless user experiences.
            </p>
            <p className="text-sm sm:text-base md:text-lg dark:text-gray-400 text-gray-600 leading-relaxed px-2">
              Currently serving as a Software Engineer at <span className="text-accent font-semibold">Sedin Technologies</span>, 
              I've successfully delivered production-grade applications with expertise in 
              modern technologies including Python, Java, TypeScript, Kotlin, and cloud platforms.
            </p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12 md:mt-16">
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
                className="gradient-border p-4 sm:p-6 h-full"
              >
                <div className="gradient-border-content p-4 sm:p-6 h-full flex flex-col">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg w-fit mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold dark:text-white text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
                  <p className="dark:text-gray-400 text-gray-600 text-xs sm:text-sm leading-relaxed flex-grow">{service.description}</p>
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
