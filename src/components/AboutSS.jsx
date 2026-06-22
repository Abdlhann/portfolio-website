import React, { useState, useEffect } from 'react';
import { Dumbbell, Code, BookOpen, Puzzle, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import DataVisualizer from './DataVisualizer'

export function About() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [language, setLanguage] = useState('en'); // 'en' for English (default), 'id' for Indonesian
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
          mobileText: "Lulusan Sistem Informasi, fokus di Data & AI.",
          fullText: "Halo, saya Abdul Hannan, lulusan Sistem Informasi dari <span class='font-semibold text-blue-600'>Universitas Binaniaga Indonesia</span> dengan minat yang kuat pada <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>Data Analytics</span>, <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>Data Science</span>, <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>Artificial Intelligence (AI)</span>, dan Web Development. Saya menikmati proses mengubah data menjadi insight yang bermanfaat serta membangun solusi digital yang dapat membantu pengambilan keputusan dan meningkatkan efisiensi bisnis."
        },
        {
          icon: <Code size={20} className="text-purple-500" />,
          mobileText: "Fokus di analisis data, ML, dan web dev.",
          fullText: "Fokus saya saat ini adalah mengembangkan kemampuan dalam analisis data, machine learning, visualisasi data, serta pengembangan aplikasi berbasis web. Saya memiliki pengalaman mengerjakan berbagai proyek menggunakan <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>Python</span>, <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>SQL</span>, <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>Tableau</span>, dan teknologi web modern untuk mengolah data, membangun model prediktif, serta menyajikan informasi yang mudah dipahami oleh pengguna maupun stakeholder."
        },
        {
          icon: <Dumbbell size={20} className="text-pink-500" />,
          mobileText: "Gemar membaca dan berolahraga.",
          fullText: "Saya memiliki rasa ingin tahu yang tinggi dan senang mempelajari teknologi baru. Di luar aktivitas teknis, saya gemar membaca dan berolahraga karena keduanya membantu saya menjaga keseimbangan, memperluas wawasan, serta membangun disiplin dalam kehidupan sehari-hari."
        },
        {
          icon: <Puzzle size={20} className="text-blue-400" />,
          mobileText: "Berpikir analitis dan sistematis.",
          fullText: "Dalam menghadapi tantangan, saya terbiasa berpikir secara analitis dan sistematis. Saya menikmati proses memahami permasalahan, mengeksplorasi berbagai kemungkinan solusi, dan menerapkan pendekatan yang tepat berdasarkan data dan kebutuhan yang ada. Bagi saya, setiap proyek adalah kesempatan untuk terus belajar, berkembang, dan menciptakan dampak yang positif melalui teknologi."
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
          mobileText: "Information Systems graduate, focused on Data & AI.",
          fullText: "Hi, I'm Abdul Hannan, an Information Systems graduate from <span class='font-semibold text-blue-600'>Universitas Binaniaga Indonesia</span> with a strong interest in <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>Data Analytics</span>, <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>Data Science</span>, <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>Artificial Intelligence (AI)</span>, and Web Development. I enjoy transforming data into actionable insights and building digital solutions that support decision-making and improve business efficiency."
        },
        {
          icon: <Code size={20} className="text-purple-500" />,
          mobileText: "Focused on data analysis, ML, and web dev.",
          fullText: "My current focus is on developing skills in data analysis, machine learning, data visualization, and web application development. I have experience working on various projects using <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>Python</span>, <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>SQL</span>, <span class='px-1 mx-1 bg-pink-50 text-pink-600 font-medium rounded'>Tableau</span>, and modern web technologies to process data, build predictive models, and present information that is easily understood by both users and stakeholders."
        },
        {
          icon: <Dumbbell size={20} className="text-pink-500" />,
          mobileText: "Passionate about reading and sports.",
          fullText: "I have a strong curiosity and enjoy learning new technologies. Outside of technical work, I love reading and exercising, as both help me maintain balance, broaden my perspective, and build discipline in my daily life."
        },
        {
          icon: <Puzzle size={20} className="text-blue-400" />,
          mobileText: "Analytical and systematic thinker.",
          fullText: "When facing challenges, I am accustomed to thinking analytically and systematically. I enjoy the process of understanding problems, exploring various possible solutions, and applying the right approach based on data and existing needs. For me, every project is an opportunity to keep learning, growing, and creating positive impact through technology."
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
      className="relative z-[1] py-16 sm:py-24 md:py-32 px-4 md:px-10 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 overflow-hidden"
      style={{ scrollMarginTop: '80px', paddingTop: '120px' }}
    >
      {/* Background Glow & Grid Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:40px_40px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(0,0,0,0.03)_1px)] [background-size:40px_40px] opacity-40" />

        {/* Floating Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-200/40 to-violet-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-gradient-to-tr from-cyan-200/30 to-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-gradient-to-tr from-violet-200/30 to-cyan-200/30 rounded-full blur-3xl" />
      </div>

      {/* Data Visualizer - Only shown on desktop */}
      {isDesktop && (
        <div className="w-full max-w-2xl mx-auto mb-8">
          <DataVisualizer />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with Language Toggle */}
        <div className="text-center mb-10 sm:mb-16 relative">
          <h2 className="inline-block text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-transparent bg-clip-text mb-4">
            {currentLanguage.title}
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 rounded-full" />

          {/* Language Toggle Button */}
          <motion.button
            onClick={toggleLanguage}
            className="absolute top-0 right-0 sm:right-4 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 rounded-full px-3 py-1.5 text-white flex items-center space-x-1.5 transition-all duration-300 shadow-md shadow-indigo-200/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={language === 'id' ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
          >
            <Globe size={16} />
            <span className="text-xs font-semibold">{language === 'id' ? 'EN' : 'ID'}</span>
          </motion.button>
        </div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-xl border border-indigo-200/50 shadow-xl shadow-indigo-100/50 rounded-3xl p-5 sm:p-8 md:p-12"
        >
          <div className="space-y-6 sm:space-y-8 text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed">
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
            <Dialog.Title className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">{currentLanguage.modalTitle}</Dialog.Title>
            <div
              className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: modalContent }}
            />
            <div className="text-right">
              <button
                className="text-sm text-white bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-1.5 rounded-md hover:from-indigo-600 hover:to-violet-600 transition-colors"
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
        <div className="block sm:hidden text-justify">
          <span>{mobileText}</span>
          <button
            className="text-indigo-500 hover:text-indigo-700 underline ml-1 transition-colors"
            onClick={() => openModal(fullText)}
          >
            {readMore}
          </button>
        </div>

        {/* Desktop view */}
        <div
          className="hidden sm:block text-justify"
          dangerouslySetInnerHTML={{ __html: fullText }}
        />
      </div>
    </div>
  );
}