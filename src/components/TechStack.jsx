import React from 'react';
import { motion } from 'framer-motion';
import {
    SiHtml5,
  SiCss3,
  SiJavascript,
  SiPython,
  SiPhp,
  SiFlutter,
  SiDart,
  SiGit,
  SiReact,
  SiLaravel,
    SiNodedotjs,
    SiArduino
} from 'react-icons/si';

export function TechStack() {
  const stacks = [
    { icon: <SiHtml5 className="text-orange-500" />, name: 'HTML' },
    { icon: <SiCss3 className="text-cyan-500" />, name: 'CSS' },
    { icon: <SiJavascript className="text-yellow-500" />, name: 'JavaScript' },
    { icon: (
        <div className="relative">
          <SiPython className="text-blue-500 absolute top-0 left-0" />
          <SiPython className="text-yellow-500 translate-y-2" />
        </div>
      ), name: 'Python' },
    { icon: <SiPhp className="text-blue-500" />, name: 'PHP' },
    { icon: <SiFlutter className="text-blue-500" />, name: 'Futter' },
    { icon: <SiDart className="text-blue-500" />, name: 'Dart' },
    { icon: <SiGit className="text-orange-400" />, name: 'Git' },
    { icon: <SiReact className="text-cyan-500" />, name: 'React.Js' },
    { icon: <SiNodedotjs className="text-green-500" />, name: 'Node.Js' },
    { icon: <SiLaravel className="text-red-500" />, name: 'Laravel' },
    { icon: <SiArduino className="text-blue-500" />, name: 'Arduino' },
  ];

  return (
    <section
      id="tech"
      className="relative z-10 py-20 px-4 md:px-10 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden"
    >
      <motion.div
        className="max-w-5xl mx-auto relative z-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10">
          Tech Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {stacks.map((stack, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-4 rounded-xl bg-white bg-opacity-70 backdrop-blur-md shadow-md border border-purple-200 hover:shadow-purple-400/40 transition transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-4xl mb-2">{stack.icon}</div>
              <p className="text-sm font-medium text-gray-700">{stack.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
