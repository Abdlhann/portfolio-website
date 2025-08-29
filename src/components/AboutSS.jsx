import React, { useState, useEffect } from 'react';
import { Dumbbell, Code, BookOpen, Puzzle, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import Lanyard from './Lanyard'

export function About() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [language, setLanguage] = useState('id'); // 'id' for Indonesian, 'en' for English
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle screen size detection
  useEffect(() => {
    // Function to check if window width is desktop size
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // 768px is standard md breakpoint
    };

    // Check on initial load
    checkIsDesktop();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsDesktop);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkIsDesktop);
    };
  }, []);

  const openModal = (text) => {
    setModalContent(text);
    setIsOpen(true);
  };

  // Content in both languages
  const content = {
    id: {
      title: 'About Me',
      aboutItems: [
        {
          icon: <BookOpen size={20} className="text-blue-500" />,
          mobileText: "Mahasiswa TI, suka React & Laravel.",
          fullText: "Saya adalah mahasiswa semester 6 di <span class='font-semibold text-blue-600'>Universitas Binaniaga Indonesia</span>, Prodi <span class='font-semibold text-blue-700'>Teknologi Informasi</span>. Passion saya ada di pengembangan web modern menggunakan <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>React.Js</span>, <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>Laravel</span>, dan tools digital inovatif lainnya."
        },
        {
          icon: <Code size={20} className="text-purple-500" />,
          mobileText: "Belajar dari bug dan eksperimen.",
          fullText: "Saya percaya bahwa proses belajar tidak pernah berhenti. Di setiap eksperimen, bug, dan baris kode yang ditulis, saya melihat peluang untuk bertumbuh lebih baik. Bagi saya, kegagalan adalah bagian dari proses memahami, <span class='italic font-medium'>bukan alasan untuk berhenti</span>."
        },
        {
          icon: <Dumbbell size={20} className="text-pink-500" />,
          mobileText: "Gym bikin disiplin dan progresif.",
          fullText: "Selain dunia teknologi, saya menemukan keseimbangan lewat latihan di gym. Disiplin, konsistensi, dan semangat progres yang saya pelajari di sana sangat selaras dengan dunia coding. Sama seperti membangun sistem, membangun diri juga butuh waktu, iterasi, dan semangat pantang menyerah."
        },
        {
          icon: <Puzzle size={20} className="text-blue-400" />,
          mobileText: "Memecahkan masalah secara metodis.",
          fullText: "Saya mendekati masalah dengan cara metodis, memecahnya menjadi komponen yang dapat dikelola untuk mengembangkan solusi yang efektif. Analisis yang cermat dan pemecahan masalah yang sistematis adalah kunci dalam pendekatan saya."
        }
      ],
      modalTitle: "Detail",
      closeButton: "Tutup",
      readMore: "Lihat selengkapnya"
    },
    en: {
      title: 'About Me',
      aboutItems: [
        {
          icon: <BookOpen size={20} className="text-blue-500" />,
          mobileText: "IT Student, passionate about React & Laravel.",
          fullText: "I'm a 6th semester student at <span class='font-semibold text-blue-600'>Universitas Binaniaga Indonesia</span>, majoring in <span class='font-semibold text-blue-700'>Information Technology</span>. My passion lies in modern web development using <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>React.Js</span>, <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>Laravel</span>, and other innovative digital tools."
        },
        {
          icon: <Code size={20} className="text-purple-500" />,
          mobileText: "Learning from bugs and experiments.",
          fullText: "I believe the learning process never stops. In every experiment, bug, and line of code written, I see opportunities to grow better. For me, failure is part of the process of understanding, <span class='italic font-medium'>not a reason to stop</span>."
        },
        {
          icon: <Dumbbell size={20} className="text-pink-500" />,
          mobileText: "Gym builds discipline and progression.",
          fullText: "Besides the world of technology, I find balance through training at the gym. The discipline, consistency, and spirit of progress I learn there are very much in line with the world of coding. Just like building systems, building oneself also takes time, iteration, and a spirit of perseverance."
        },
        {
          icon: <Puzzle size={20} className="text-blue-400" />,
          mobileText: "Solving problems methodically.",
          fullText: "I approach problems methodically, breaking them down into manageable components to develop effective solutions. Careful analysis and systematic problem-solving are key to my approach."
        }
      ],
      modalTitle: "Details",
      closeButton: "Close",
      readMore: "Read more"
    }
  };

  const currentLanguage = content[language];

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <section
      id="about"
      className="relative z-[1] py-16 sm:py-24 md:py-32 px-4 md:px-10 bg-black overflow-hidden"
      style={{ scrollMarginTop: '80px', paddingTop: '120px' }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-gradient-to-tr from-pink-300/10 to-indigo-300/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-gradient-to-tr from-teal-300/10 to-blue-300/10 rounded-full blur-3xl" />
      </div>

      {/* Lanyard Component - Only shown on desktop */}
      {isDesktop && (
        <div className="w-full h-[400px] relative">
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with Language Toggle */}
        <div className="text-center mb-10 sm:mb-16 relative">
          <h2 className="inline-block text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text mb-4">
            {currentLanguage.title}
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full" />

          {/* Language Toggle Button */}
          <motion.button
            onClick={toggleLanguage}
            className="absolute top-0 right-0 sm:right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 text-white flex items-center space-x-1 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={language === 'id' ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
          >
            <Globe size={18} />
            <span className="text-xs font-medium">{language === 'id' ? 'EN' : 'ID'}</span>
          </motion.button>
        </div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-xl border border-[rgb(0,128,255,0.5)] shadow-xl rounded-3xl p-5 sm:p-8 md:p-12"
        >
          <div className="space-y-6 sm:space-y-8 text-white text-sm sm:text-base md:text-lg leading-relaxed">
            {currentLanguage.aboutItems.map((item, index) => (
              <AboutItem
                key={index}
                icon={item.icon}
                mobileText={item.mobileText}
                fullText={item.fullText}
                openModal={openModal}
                readMore={currentLanguage.readMore}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Popup for Mobile Full Text */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-[996]">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-md w-full mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6 space-y-4">
            <Dialog.Title className="text-xl font-bold text-blue-600">{currentLanguage.modalTitle}</Dialog.Title>
            <div
              className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: modalContent }}
            />
            <div className="text-right">
              <button
                className="text-sm text-white bg-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {currentLanguage.closeButton}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
}

// New reusable component for about items
function AboutItem({ icon, mobileText, fullText, openModal, readMore }) {
  return (
    <div className="flex items-start space-x-3">
      <span className="mt-1 flex-shrink-0">
        {icon}
      </span>
      <div>
        {/* Mobile view */}
        <div className="block sm:hidden">
          <span>{mobileText}</span>
          <button
            className="text-blue-400 hover:text-blue-300 underline ml-1 transition-colors"
            onClick={() => openModal(fullText)}
          >
            {readMore}
          </button>
        </div>

        {/* Desktop view */}
        <div
          className="hidden sm:block"
          dangerouslySetInnerHTML={{ __html: fullText }}
        />
      </div>
    </div>
  );
}