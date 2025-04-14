import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

export function About() {
  return (
    <section
      id="about"
      className="relative z-10 py-20 px-4 md:px-10 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden"
    >
      {/* Background Dumbbell Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-50 text-blue-300 pointer-events-none select-none z-30">
        <Dumbbell size={300} strokeWidth={1} />
      </div>

      <motion.div
        className="max-w-3xl mx-auto bg-white/70 border border-blue-100 shadow-xl rounded-2xl p-8 backdrop-blur-sm relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">About Me</h2>

        <p className="text-lg text-gray-700 leading-relaxed text-justify mb-6">
          Saya adalah mahasiswa semester 6 di <strong className="text-blue-600">Universitas Binaniaga Indonesia</strong>, Prodi <strong className="text-blue-600">Teknologi Informasi</strong>. Saya sangat antusias mengembangkan aplikasi web modern menggunakan <span className="font-semibold text-pink-600">React.js</span>, <span className="font-semibold text-pink-600">Laravel</span>, dan berbagai tools lain yang mendukung inovasi digital.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed text-justify mb-6">
          Tapi saya sadar, perjalanan ini belum selesai. Justru, saya sedang berada di tengah-tengahnya—terus belajar, mencoba, dan terkadang juga keliru. Saya percaya bahwa setiap kesalahan kecil sekalipun bisa jadi titik awal pemahaman yang lebih dalam.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed text-justify">
          Selain menulis kode, saya juga menikmati repetisi dalam bentuk lain—seperti beban yang perlahan diangkat di ruang gym. Di sana, saya belajar banyak hal: konsistensi, kesabaran, dan progres yang mungkin tak terlihat hari ini, tapi terasa seiring waktu.  
          <br /><br />
          Membangun sistem dan membangun diri ternyata tak begitu jauh berbeda—keduanya membutuhkan waktu, revisi, dan tekad untuk terus bertumbuh, meski tidak selalu instan. Dan dalam setiap jeda latihan atau debugging, saya sering menemukan makna baru tentang disiplin dan arah.
        </p>
      </motion.div>
    </section>
  );
}
