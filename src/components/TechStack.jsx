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
  SiArduino,
} from 'react-icons/si';

export function TechStack() {
  const stacks = [
    { icon: <SiHtml5 className="text-orange-500" />, name: 'HTML' },
    { icon: <SiCss3 className="text-blue-500" />, name: 'CSS' },
    { icon: <SiJavascript className="text-yellow-400" />, name: 'JavaScript' },
    {
      icon: (
        <div className="relative">
          <SiPython className="text-blue-500 absolute top-0 left-0" />
          <SiPython className="text-yellow-400 translate-y-2" />
        </div>
      ),
      name: 'Python',
    },
    { icon: <SiPhp className="text-indigo-500" />, name: 'PHP' },
    { icon: <SiFlutter className="text-cyan-500" />, name: 'Flutter' },
    { icon: <SiDart className="text-sky-500" />, name: 'Dart' },
    { icon: <SiGit className="text-orange-400" />, name: 'Git' },
    { icon: <SiReact className="text-cyan-400" />, name: 'React.Js' },
    { icon: <SiNodedotjs className="text-green-500" />, name: 'Node.Js' },
    { icon: <SiLaravel className="text-red-500" />, name: 'Laravel' },
    { icon: <SiArduino className="text-blue-500" />, name: 'Arduino' },
  ];

  return (
    <section
      id="tech"
      className="relative z-[1] py-16 sm:py-24 md:py-32 px-4 md:px-10 bg-gray-950 overflow-hidden text-white"
      style={{ scrollMarginTop: '80px', paddingTop: '120px' }}
    >
      {/* Background Glow & Grid Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:40px_40px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(0,0,0,0.03)_1px)] [background-size:40px_40px] opacity-40" />

        {/* Floating Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-gradient-to-tr from-pink-300/5 to-indigo-300/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-gradient-to-tr from-teal-300/5 to-blue-300/5 rounded-full blur-3xl" />
      </div>

      <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-14">
            Tech Stack
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
            {stacks.map((stack, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.07, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group relative p-6 w-full max-w-[140px] flex flex-col items-center justify-center rounded-2xl bg-white dark:bg-[#201c2f] shadow-md dark:shadow-purple-900/40 border border-purple-100 dark:border-purple-600/10 hover:shadow-purple-400/30 hover:dark:shadow-purple-500/40 transition-all duration-300"
              >
                <div className="relative text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stack.icon}
                  <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-50 transition duration-300 bg-gradient-to-tr from-purple-400 via-pink-300 to-blue-400 -z-10" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 text-center">
                  {stack.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
    </section>
  );
}
