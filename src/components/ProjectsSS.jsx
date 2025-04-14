import React from 'react';
import { motion } from 'framer-motion';

export function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 py-20 px-4 md:px-10 bg-gradient-to-b from-gray-100 via-gray-50 to-white overflow-hidden"
    >
      <motion.div
        className="max-w-5xl mx-auto relative z-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10">
          My Projects
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Portfolio Web - React', desc: 'Website portfolio pribadi dengan React.js dan Tailwind' },
            { title: 'Aplikasi List Universitas', desc: 'Pencarian dan filter universitas menggunakan Flutter' },
            { title: 'IoT LED Control', desc: 'Kontrol lampu LED menggunakan ESP8266 & MQTT' },
          ].map((project, index) => (
            <li
              key={index}
              className="bg-white bg-opacity-70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-200 hover:shadow-purple-400/30 transition"
            >
              <h3 className="text-xl font-semibold text-purple-700 mb-2 text-center">{project.title}</h3>
              <p className="text-gray-700 text-sm">{project.desc}</p>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
