'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { profile } from '@/data/profile'

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient"
        >
          Get In Touch
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.a
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.05 }}
              className="gradient-border p-6 text-center group"
            >
              <div className="gradient-border-content p-6">
                <Mail className="w-8 h-8 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-gray-400">{profile.email}</p>
              </div>
            </motion.a>
            
            <motion.a
              href={`tel:${profile.phone}`}
              whileHover={{ scale: 1.05 }}
              className="gradient-border p-6 text-center group"
            >
              <div className="gradient-border-content p-6">
                <Phone className="w-8 h-8 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-sm text-gray-400">{profile.phone}</p>
              </div>
            </motion.a>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="gradient-border p-6 text-center md:col-span-2"
            >
              <div className="gradient-border-content p-6">
                <MapPin className="w-8 h-8 mx-auto mb-4 text-accent" />
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-sm text-gray-400">{profile.location}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

