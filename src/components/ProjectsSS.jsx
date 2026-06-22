import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle, FaTag } from 'react-icons/fa';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { FaImages } from 'react-icons/fa';
import project1 from '../assets/projects/Portfolio.png';
import project2 from '../assets/projects/project2.jpeg';
import project3 from '../assets/projects/project3.jpeg';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Default projects - used only as fallback when Firebase has no projects yet
const fallbackProjects = [
  {
    title: 'Portfolio Web - React',
    desc: 'Solusi portfolio interaktif yang mengatasi masalah presentasi skill yang statis. Dibangun dengan React.js & TailwindCSS untuk responsivitas optimal di semua perangkat, dengan animasi yang meningkatkan user engagement dan teknik lazy loading untuk kecepatan akses.',
    img: project1,
    github: 'https://github.com/Hyperionzs/portfolio',
    demo: '#',
    tags: ['React', 'TailwindCSS', 'Firebase'],
  },
  {
    title: 'IoT LED Control',
    desc: 'Menyelesaikan masalah kontrol jarak jauh perangkat elektronik dengan sistem berbasis IoT menggunakan ESP8266 & MQTT. Mengimplementasikan fitur fail-safe, low-latency response, dan antarmuka yang intuitif untuk memudahkan pengguna non-teknis mengontrol perangkat rumah.',
    img: project2,
    github: 'https://github.com/Hyperionzs/iot-led',
    demo: '#',
    tags: ['Arduino', 'MQTT', 'MySQL'],
  },
  {
    title: 'Aplikasi List Universitas',
    desc: 'Menjawab kesulitan mahasiswa mencari informasi universitas terpercaya dengan aplikasi Flutter yang menyediakan data terverifikasi. Dilengkapi sistem filter multi-parameter, pencarian cepat, dan bookmarking untuk membantu pengambilan keputusan pendidikan yang lebih baik.',
    img: project3,
    github: 'https://github.com/username/univ-app',
    demo: '#',
    tags: ['Flutter', 'Dart'],
  },
];

const animationVariants = [
  { opacity: 0, y: 50 }, // slide up
  { opacity: 0, scale: 0.9 }, // zoom in
  { opacity: 0, x: -50 }, // slide from left
  { opacity: 0, x: 50 }, // slide from right
];

export function Projects({ addedProjects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState(null);
  const [allTags, setAllTags] = useState([]);
  
  // Define preset tech stack tags
  const techStackTags = [
    'Python', 'Google Colab', 'Kaggle', 'Tableau', 'Excel',
    'HTML', 'CSS', 'JavaScript', 'React', 
    'Node.js', 'Express', 'Firebase', 'MySQL', 'PHP', 'Laravel',
    'Git', 'Kotlin', 'TailwindCSS', 'Bootstrap', 'MaterialUI'
  ];
  
  // Fetch projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Extract all unique tags
        const tags = new Set();
        projectsData.forEach(project => {
          if (project.tags && Array.isArray(project.tags)) {
            project.tags.forEach(tag => tags.add(tag));
          }
        });
        
        setAllTags(Array.from(tags));
        
        // Optimize projects order: featured first, then by custom order field
        const optimizedProjects = [...projectsData].sort((a, b) => {
          // First sort by featured status
          if (a.featured !== b.featured) {
            return a.featured ? -1 : 1;
          }
          
          // Then by custom order (lower = first), fallback to creation date
          const orderA = a.order !== undefined && a.order !== null ? a.order : 999;
          const orderB = b.order !== undefined && b.order !== null ? b.order : 999;
          if (orderA !== orderB) return orderA - orderB;
          
          // Fallback: sort by creation date (newest first)
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateA - dateB;
        });
        
        setProjects(optimizedProjects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects from Firebase:", error);
        
        // Show specific error message for permissions issues
        if (error.code === 'permission-denied') {
          console.error("Firebase permissions error: Make sure Firestore rules allow public read access");
        } else if (error.code === 'unavailable') {
          console.error("Firebase service unavailable: Check your internet connection");
        } else {
          console.error("Firebase error details:", error.message);
        }
        
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  // Use Firebase projects only, fallback to defaults if empty
  const combinedProjects = projects.length > 0 ? projects : fallbackProjects;
  
  // Sort all projects by custom order
  const allProjects = activeTag 
    ? combinedProjects
        .filter(project => project.tags && Array.isArray(project.tags) && project.tags.includes(activeTag))
    : combinedProjects.sort((a, b) => {
        // First sort by featured status
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }
        
        // Then by custom order (lower = first)
        const orderA = a.order !== undefined && a.order !== null ? a.order : 999;
        const orderB = b.order !== undefined && b.order !== null ? b.order : 999;
        return orderA - orderB;
      });
  
  // Get images array from project (backward compatible with single img field)
  const getProjectImages = (project) => {
    if (project.images && Array.isArray(project.images) && project.images.length > 0) {
      return project.images;
    }
    if (project.img) return [project.img];
    return ['/api/placeholder/400/300'];
  };

  // Open modal with project details
  const openModal = (project) => {
    setSelectedProject(project);
    setModalImageIndex(0);
    document.body.classList.add('modal-open');
  };
  
  // Close modal
  const closeModal = () => {
    document.body.classList.remove('modal-open');
    setSelectedProject(null);
    setModalImageIndex(0);
  };

  // Navigate images in modal
  const nextImage = (e) => {
    e.stopPropagation();
    const images = getProjectImages(selectedProject);
    setModalImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const images = getProjectImages(selectedProject);
    setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      id="projects"
      className="relative z-[1] py-28 px-4 bg-gradient-to-br from-indigo-50 via-white to-violet-50 overflow-hidden"
      style={{ scrollMarginTop: '80px', paddingTop: '120px' }}
    >
      {/* Background Glow & Grid Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:40px_40px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(0,0,0,0.03)_1px)] [background-size:40px_40px] opacity-40" />
      </div>

      {/* Isi Projects */}
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent mb-12">
          Recent Projects
        </h2>

        {/* Tags Filter */}
        <motion.div 
          className="mb-12 relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <div className="absolute inset-0 bg-indigo-100/20 filter blur-xl rounded-full -z-10 scale-75 opacity-60" />
          
          {/* Mobile Scrollable Container */}
          <div className="overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
            <div className="flex flex-nowrap md:flex-wrap md:justify-center gap-3 min-w-max md:min-w-0 px-4">
              <motion.button
                onClick={() => setActiveTag(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative overflow-hidden group ${
                  activeTag === null
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-200/50 scale-105'
                    : 'bg-white text-slate-600 hover:bg-indigo-50 hover:scale-105 hover:shadow-md duration-300 border border-indigo-100'
                }`}
                whileHover={{ scale: activeTag === null ? 1.05 : 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">All</span>
                {activeTag === null && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-violet-500/50 -z-0"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                )}
              </motion.button>
              
              {/* Display preset tech stack tags */}
              {techStackTags.map((tag, idx) => {
                // Check if this tag exists in any project
                const tagExists = combinedProjects.some(
                  project => project.tags && Array.isArray(project.tags) && project.tags.includes(tag)
                );
                
                return (
                  <motion.button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative overflow-hidden group ${
                      activeTag === tag
                        ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-200/50 scale-105'
                        : tagExists
                          ? 'bg-white text-slate-600 hover:bg-indigo-50 hover:scale-105 hover:shadow-md duration-300 border border-indigo-100'
                          : 'bg-white/50 text-slate-400 cursor-default border border-slate-100'
                    }`}
                    whileHover={{ scale: tagExists ? (activeTag === tag ? 1.05 : 1.1) : 1 }}
                    whileTap={{ scale: tagExists ? 0.95 : 1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    title={!tagExists ? `No projects with ${tag} yet` : undefined}
                    disabled={!tagExists}
                  >
                    <span className="relative z-10">{tag}</span>
                    {tagExists && activeTag === tag && (
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-violet-500/50 -z-0"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {allProjects.length > 0 ? (
            allProjects.map((project, i) => (
              <motion.div
                key={project.id || i}
                initial={animationVariants[i % animationVariants.length]}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                onClick={() => openModal(project)}
                className={`rounded-2xl overflow-hidden shadow-md bg-white border border-indigo-100 transition-all hover:shadow-indigo-200/50 cursor-pointer`}
              >
                <div className="w-full aspect-video overflow-hidden relative bg-gray-900/50">
                  <img
                    src={getProjectImages(project)[0]}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {getProjectImages(project).length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <FaImages size={10} /> {getProjectImages(project).length}
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col justify-between h-56">
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">{project.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-3 h-[4.5em]">{project.desc}</p>
                      
                      {/* Display Tags */}
                      {project.tags && Array.isArray(project.tags) && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-700"
                            >
                              <FaTag className="mr-1 text-[0.6rem]" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                    <button 
                      onClick={() => openModal(project)}
                      className="mt-2 text-xs flex items-center gap-1 text-indigo-500 hover:text-indigo-700 transition-colors"
                    >
                      <FaInfoCircle /> Read more
                    </button>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 transition"
                    >
                      <FaGithub /> GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 transition"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full flex flex-col items-center justify-center py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white p-8 rounded-2xl max-w-md mx-auto shadow-md border border-indigo-100">
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">No Projects Found</h3>
                <p className="text-slate-500 mb-4">
                  Currently there are no projects available with the tag <span className="text-indigo-500 font-semibold">{activeTag}</span>.
                </p>
                <motion.button
                  onClick={() => setActiveTag(null)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg hover:from-indigo-600 hover:to-violet-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Show All Projects
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
        )}
      </motion.div>
      
      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (() => {
          const images = getProjectImages(selectedProject);
          return (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="bg-white rounded-xl max-w-2xl w-full shadow-xl overflow-hidden border border-indigo-100 mb-8"
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Image Carousel */}
              <div className="relative w-full aspect-video overflow-hidden bg-gray-900/50">
                <img 
                  src={images[modalImageIndex]} 
                  alt={`${selectedProject.title} - ${modalImageIndex + 1}`}
                  className="w-full h-full object-cover" 
                />
                
                {/* Close button */}
                <button 
                  onClick={closeModal}
                  className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors z-10"
                >
                  <IoClose size={20} />
                </button>

                {/* Navigation arrows (only if multiple images) */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                    >
                      <IoChevronBack size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                    >
                      <IoChevronForward size={20} />
                    </button>
                    {/* Image counter */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                      {modalImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails (only if multiple images) */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-gray-50">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setModalImageIndex(idx); }}
                      className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === modalImageIndex ? 'border-indigo-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                  {selectedProject.title}
                </h3>
                
                {/* Display Tags in Modal */}
                {selectedProject.tags && Array.isArray(selectedProject.tags) && selectedProject.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {selectedProject.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-100 text-indigo-700"
                      >
                        <FaTag className="mr-1 text-[0.6rem]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="text-slate-600 mb-6 leading-relaxed whitespace-pre-line">
                  {selectedProject.desc}
                </p>
                <div className="flex justify-between">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg transition-colors"
                  >
                    <FaGithub /> GitHub
                  </a>
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg transition-colors"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}