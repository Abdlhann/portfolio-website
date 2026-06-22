import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import project4 from '../assets/projects/project4.jpeg';
import Globe3D from './Globe3D';

export function Hero() {
  const textVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{ margin: 0, padding: 0, scrollMarginTop: '100px' }}
    >
      {/* ── Peta dunia 3D — full background ── */}
      <div className="absolute inset-0 z-0">
        <Globe3D />
      </div>

      {/* Overlay gradient supaya teks tetap terbaca */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(238,242,255,0.75) 60%, rgba(238,242,255,0.92) 100%)'
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col items-center">

        {/* Profile — orbit rings + particles */}
        <motion.div
          className="relative mb-6 flex items-center justify-center"
          style={{ width: 220, height: 220 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          {/* Glow pulse */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 156, height: 156, background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Ring 1 */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 182, height: 182, border: '2px solid rgba(99,102,241,0.45)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 shadow-md shadow-indigo-300" />
          </motion.div>

          {/* Ring 2 */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 208, height: 208, border: '1.5px solid rgba(139,92,246,0.32)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 shadow-md shadow-violet-200" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm" />
          </motion.div>

          {/* Ring 3 dashed */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 218, height: 218, border: '1.5px dashed rgba(6,182,212,0.30)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />

          {/* Floating particles */}
          {[
            { size: 7, color: 'bg-indigo-400', x: -100, y: -28, dur: 3.2 },
            { size: 5, color: 'bg-violet-400', x:   96, y: -52, dur: 2.8 },
            { size: 4, color: 'bg-cyan-400',   x:  -84, y:  62, dur: 3.7 },
            { size: 6, color: 'bg-pink-400',   x:   88, y:  58, dur: 2.5 },
            { size: 4, color: 'bg-indigo-300', x:   12, y:-104, dur: 4.1 },
            { size: 5, color: 'bg-violet-300', x:  -20, y: 102, dur: 3.0 },
            { size: 3, color: 'bg-cyan-300',   x:  104, y:  10, dur: 3.5 },
            { size: 4, color: 'bg-pink-300',   x: -104, y: -10, dur: 2.9 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${p.color} shadow-sm`}
              style={{ width: p.size, height: p.size, left: '50%', top: '50%', marginLeft: p.x, marginTop: p.y }}
              animate={{ y: [0, -12, 0], opacity: [0.7, 1, 0.7], scale: [1, 1.4, 1] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
            />
          ))}

          {/* Profile photo */}
          <motion.img
            src={project4}
            alt="Foto Profil"
            className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[5px] border-white object-cover relative z-10"
            style={{ boxShadow: '0 8px 40px rgba(99,102,241,0.32), 0 2px 12px rgba(0,0,0,0.08)' }}
            whileHover={{ scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent leading-tight text-center"
          variants={textVariant}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Hello, I'm Hannan
        </motion.h1>

        {/* Type animation */}
        <motion.div
          className="mt-3 text-lg md:text-xl font-semibold max-w-xl text-center"
          variants={textVariant}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
            <TypeAnimation
              sequence={[
                'Data Analyst', 2000,
                'Data Scientist', 2000,
                'Information Systems Student', 2000,
                'Fullstack Enthusiast', 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </motion.div>

        {/* Skill badges */}
        <motion.div
          className="mt-5 flex flex-wrap justify-center gap-2"
          variants={textVariant}
          initial="hidden"
          animate="visible"
          custom={2.5}
        >
          {[
            { label: 'Python',           icon: '🐍' },
            { label: 'Machine Learning', icon: '🤖' },
            { label: 'Data Viz',         icon: '📊' },
            { label: 'SQL',              icon: '🗄️' },
            { label: 'Fullstack',        icon: '💻' },
          ].map((b) => (
            <span
              key={b.label}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 border border-indigo-100 text-indigo-600 shadow-sm backdrop-blur-sm"
            >
              {b.icon} {b.label}
            </span>
          ))}
        </motion.div>

        {/* CTA button */}
        <motion.a
          href="#projects"
          className="mt-7 inline-block px-8 py-3 rounded-full text-white font-semibold shadow-lg shadow-indigo-200 relative overflow-hidden group"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)' }}
          variants={textVariant}
          initial="hidden"
          animate="visible"
          custom={3}
          whileHover={{ scale: 1.06, boxShadow: '0 0 28px rgba(99,102,241,0.5)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          <span className="relative z-10 tracking-wide">View My Projects</span>
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs text-slate-400 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-indigo-300/60 flex items-start justify-center pt-1">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
              animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
