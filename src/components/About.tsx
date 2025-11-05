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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            About Me
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              I'm a <span className="text-primary font-semibold">versatile Software Engineer</span> specializing in 
              building high-performance, scalable applications across the full technology stack. With expertise spanning 
              <span className="text-secondary font-semibold"> backend systems, frontend frameworks, cloud infrastructure, and mobile development</span>, 
              I deliver end-to-end solutions that drive business value.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-6">
              My experience across diverse domains—healthcare, pharmaceuticals, fintech, and enterprise solutions—has 
              equipped me with a unique ability to understand complex business requirements and translate them into 
              robust, user-centric technical implementations. I'm passionate about clean code, architectural excellence, 
              and creating seamless user experiences.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Currently serving as a Software Engineer at <span className="text-accent font-semibold">Sedin Technologies</span>, 
              I've successfully delivered production-grade applications serving thousands of users, with expertise in 
              modern technologies including Python, Java, TypeScript, Kotlin, and cloud platforms.
            </p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
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
                className="gradient-border p-6 h-full"
              >
                <div className="gradient-border-content p-6 h-full flex flex-col">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg w-fit mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">{service.description}</p>
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
