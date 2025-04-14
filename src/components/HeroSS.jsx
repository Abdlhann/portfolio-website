import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

export function Hero() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const effect = NET({
      el: vantaRef.current,
      THREE,
      color: 0x7c3aed, // ungu
      backgroundColor: 0x000000,
      points: 12.0,
      maxDistance: 20.0,
      spacing: 15.0
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  const textVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
  };

  return (
    <section
      id="hero"
      ref={vantaRef}
      className="h-screen flex flex-col items-center justify-center text-center relative text-white px-4 overflow-hidden"
    >
      {/* Gradient overlay bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-0" />

      <motion.img
        src="/profile/project4.jpeg"
        alt="Foto Profil"
        className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-purple-500 shadow-lg mb-6 z-10 object-cover"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      />

      <motion.h1
        className="text-4xl md:text-6xl font-extrabold z-10 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent leading-tight"
        variants={textVariant}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        Halo, Saya Anggra
      </motion.h1>

      <motion.p
        className="mt-4 text-lg md:text-xl text-zinc-300 z-10 max-w-xl"
        variants={textVariant}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        Mahasiswa Teknologi Informasi & Web Developer
      </motion.p>

      <motion.a
        href="#projects"
        className="mt-8 inline-block px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition text-white shadow-lg backdrop-blur-md z-10"
        variants={textVariant}
        initial="hidden"
        animate="visible"
        custom={3}
      >
        My Projects
      </motion.a>
    </section>
  );
}
