'use client'

import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient"
        >
          About Me
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center text-gray-300 text-lg leading-relaxed"
        >
          <p className="mb-6">
            I'm a passionate <span className="text-primary font-semibold">Full Stack Software Engineer</span> with expertise in building 
            scalable web applications and mobile solutions. I specialize in modern technologies including 
            <span className="text-secondary font-semibold"> Python, JavaScript, React, Django</span>, and cloud platforms.
          </p>
          <p className="mb-6">
            With experience across multiple domains including healthcare, pharma, fintech, and enterprise solutions, 
            I bring a versatile skill set to every project. I'm passionate about creating seamless user experiences 
            and robust backend systems.
          </p>
          <p>
            When I'm not coding, I enjoy exploring new technologies and contributing to innovative projects that 
            make a real impact.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default About

