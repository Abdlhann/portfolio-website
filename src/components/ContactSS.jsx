import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaEnvelope, FaWhatsapp, FaInstagram, FaGithub } from 'react-icons/fa';

export function Contact() {
  return (
    <motion.section
      id="contact"
      className="relative z-[1] py-24 px-6 bg-gradient-to-br from-cyan-50 via-white to-indigo-50 text-slate-800 overflow-hidden"
      style={{ scrollMarginTop: '80px', paddingTop: '120px' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-cyan-200/40 to-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-gradient-to-tr from-indigo-200/30 to-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-80 h-80 bg-gradient-to-tr from-violet-200/30 to-cyan-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
          Get in Touch
        </h2>
        <p className="text-slate-500 mb-12 text-lg">
          I'm open to collaboration, feedback, or just a good conversation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.a
            href="mailto:abdullhannan335@gmail.com"
            className="relative z-[1] bg-white p-6 rounded-2xl shadow-md hover:shadow-indigo-200/60 transition hover:scale-105 flex items-center space-x-4 border border-indigo-100"
            whileHover={{ scale: 1.03 }}
            title="Send an email to abdullhannan335@gmail.com"
          >
            <FaEnvelope className="text-4xl text-indigo-500" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-indigo-600">Email</h3>
              <p className="text-slate-500">abdullhannan335@gmail.com</p>
            </div>
          </motion.a>

          <motion.a
            href="https://wa.me/6281617425961"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[1] bg-white p-6 rounded-2xl shadow-md hover:shadow-green-200/60 transition hover:scale-105 flex items-center space-x-4 border border-green-100"
            whileHover={{ scale: 1.03 }}
          >
            <FaWhatsapp className="text-4xl text-green-500" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-green-600">WhatsApp</h3>
              <p className="text-slate-500">081617425961</p>
            </div>
          </motion.a>

          <motion.a
            href="https://www.instagram.com/abdlhann"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[1] bg-white p-6 rounded-2xl shadow-md hover:shadow-violet-200/60 transition hover:scale-105 flex items-center space-x-4 border border-violet-100"
            whileHover={{ scale: 1.03 }}
          >
            <FaInstagram className="text-4xl text-violet-500" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-violet-600">Instagram</h3>
              <p className="text-slate-500">@abdlhann</p>
            </div>
          </motion.a>

          <motion.a
            href="https://github.com/Abdlhann"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[1] bg-white p-6 rounded-2xl shadow-md hover:shadow-slate-200/60 transition hover:scale-105 flex items-center space-x-4 border border-slate-100"
            whileHover={{ scale: 1.03 }}
          >
            <FaGithub className="text-4xl text-slate-700" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-slate-700">Github</h3>
              <p className="text-slate-500">@Abdlhann</p>
            </div>
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
