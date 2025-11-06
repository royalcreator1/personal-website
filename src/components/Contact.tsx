'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Linkedin } from 'lucide-react'
import { profile } from '@/data/profile'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 md:pl-28 relative min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          <span className="text-gradient">Get In</span>{' '}
          <span className="dark:text-white text-gray-900">Touch</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="dark:bg-dark-secondary/50 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/20 dark:border-gray-600/20">
              <h3 className="text-2xl font-bold mb-6 text-gradient">Contact Information</h3>
              <div className="space-y-4">
                <motion.a
                  href={`mailto:${profile.email}`}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-lg dark:bg-dark-secondary/50 bg-gray-100/50 hover:dark:bg-dark-secondary hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm dark:text-gray-400 text-gray-600">Email</p>
                    <p className="dark:text-white text-gray-900 font-medium break-all">{profile.email}</p>
                  </div>
                </motion.a>
                
                <motion.a
                  href={`tel:${profile.phone}`}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-lg dark:bg-dark-secondary/50 bg-gray-100/50 hover:dark:bg-dark-secondary hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm dark:text-gray-400 text-gray-600">Phone</p>
                    <p className="dark:text-white text-gray-900 font-medium">{profile.phone}</p>
                  </div>
                </motion.a>
                
                <motion.a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-lg dark:bg-dark-secondary/50 bg-gray-100/50 hover:dark:bg-dark-secondary hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm dark:text-gray-400 text-gray-600">LinkedIn</p>
                    <p className="dark:text-white text-gray-900 font-medium">Connect with me</p>
                  </div>
                </motion.a>
                
                <div className="flex items-center gap-4 p-4 rounded-lg dark:bg-dark-secondary/50 bg-gray-100/50">
                  <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm dark:text-gray-400 text-gray-600">Location</p>
                    <p className="dark:text-white text-gray-900 font-medium break-words">{profile.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="dark:bg-dark-secondary/50 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/20 dark:border-gray-600/20">
              <h3 className="text-2xl font-bold mb-6 text-gradient">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 dark:bg-dark-secondary bg-gray-100 border border-gray-700/20 dark:border-gray-600/20 rounded-lg dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 dark:bg-dark-secondary bg-gray-100 border border-gray-700/20 dark:border-gray-600/20 rounded-lg dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 dark:bg-dark-secondary bg-gray-100 border border-gray-700/20 dark:border-gray-600/20 rounded-lg dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-sm"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm"
                  >
                    Failed to send message. Please try again or email me directly.
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
