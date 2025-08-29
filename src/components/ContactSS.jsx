import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaInstagram, FaGithub } from 'react-icons/fa';

export function Contact() {
  return (
    <motion.section
      id="contact"
      className="relative py-24 px-6 bg-black text-white overflow-hidden"
      style={{ scrollMarginTop: '80px', paddingTop: '120px' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Neon Background Glow */}
      <div className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,_#00ffff33,_transparent)] before:blur-2xl before:z-0" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-cyan-400 drop-shadow-neon">Get in Touch</h2>
        <p className="text-gray-300 mb-12 text-lg">
          I'm open to collaboration, feedback, or just a good conversation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.a
            href="mailto:hyperions004@email.com"
            className="relative z-[1] bg-[#111] p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition hover:scale-105 flex items-center space-x-4 border border-cyan-500/20"
            whileHover={{ scale: 1.03 }}
            title="Send an email to hyperions004@email.com"
          >
            <FaEnvelope className="text-4xl text-cyan-400 drop-shadow-neon" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-cyan-300">Email</h3>
              <p className="text-gray-400">hyperions004@email.com</p>
            </div>
          </motion.a>

          <motion.a
            href="https://wa.me/6283155811515"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[1] bg-[#111] p-6 rounded-2xl shadow-lg hover:shadow-green-400/50 transition hover:scale-105 flex items-center space-x-4 border border-green-500/20"
            whileHover={{ scale: 1.03 }}
          >
            <FaWhatsapp className="text-4xl text-green-400 drop-shadow-neon" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-green-300">WhatsApp</h3>
              <p className="text-gray-400">083155811515</p>
            </div>
          </motion.a>

          <motion.a
            href="https://www.instagram.com/anggra___12"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[1] bg-[#111] p-6 rounded-2xl shadow-lg hover:shadow-purple-400/50 transition hover:scale-105 flex items-center space-x-4 border border-purple-500/20"
            whileHover={{ scale: 1.03 }}
          >
            <FaInstagram className="text-4xl text-purple-500 drop-shadow-neon" />
            <div className="text-left">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Instagram
              </h3>
              <p className="text-gray-400">@Anggra___12</p>
            </div>
          </motion.a>

          <motion.a
            href="https://www.github.com/hyperionzs"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[1] bg-[#111] p-6 rounded-2xl shadow-lg hover:shadow-gray-400/50 transition hover:scale-105 flex items-center space-x-4 border border-gray-500/20"
            whileHover={{ scale: 1.03 }}
          >
            <FaGithub className="text-4xl text-brown-500 drop-shadow-neon" />
            <div className="text-left">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Github
              </h3>
              <p className="text-gray-400">@hyperionzs</p>
            </div>
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
