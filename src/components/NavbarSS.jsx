import React, { useState, useEffect, useRef } from 'react';
import { Home, User, Code2, Contact, CodeSquare, Upload, LogOut, Download, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { icon: Home,        label: 'Home',       href: '#hero'     },
  { icon: User,        label: 'About',      href: '#about'    },
  { icon: CodeSquare,  label: 'Tech Stack', href: '#tech'     },
  { icon: Code2,       label: 'Projects',   href: '#projects' },
  { icon: Contact,     label: 'Contact',    href: '#contact'  },
];

function scrollTo(href) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (!el) return;
  const offset = document.querySelector('header')?.offsetHeight || 64;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
}

export function Navbar({ isLoggedIn, role, isFirebaseAuthenticated, onLogout }) {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollPct,     setScrollPct]     = useState(0);
  const [moreOpen,      setMoreOpen]      = useState(false);
  const moreRef = useRef(null);

  // Scroll tracking
  useEffect(() => {
    let raf;
    const tick = () => {
      const y = window.pageYOffset;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollPct(h > 0 ? (y / h) * 100 : 0);
      setScrolled(y > 50);
      const sections = ['hero','about','tech','projects','contact'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 160 && r.bottom >= 160) { setActiveSection(s); break; }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Close more dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[1000] bg-indigo-100/60">
        <motion.div
          className="h-full origin-left"
          style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)', width: `${scrollPct}%` }}
          transition={{ duration: 0.05 }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md shadow-indigo-100/40'
            : 'bg-white/70 backdrop-blur-sm'
        } border-b border-indigo-100/60`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="flex items-center gap-2 flex-shrink-0"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)' }}>
              A
            </div>
            <span className="font-bold text-base bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent hidden sm:block">
              Abdul Hannan
            </span>
          </motion.a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
              const isActive = `#${activeSection}` === href;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60'
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                </li>
              );
            })}
            {isFirebaseAuthenticated && (
              <li>
                <Link
                  to="/UploadProject"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 transition-all"
                >
                  <Upload size={15} />
                  Upload
                </Link>
              </li>
            )}
          </ul>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 transition-all"
              >
                More
                <ChevronDown size={14} className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg shadow-indigo-100/50 border border-indigo-100/60 overflow-hidden"
                  >
                    <button
                      onClick={() => { window.open(`${import.meta.env.BASE_URL}cv.pdf`, '_blank'); setMoreOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      <Download size={14} /> Download CV
                    </button>
                    {isLoggedIn && (
                      <button
                        onClick={() => { onLogout(); setMoreOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-md hover:shadow-indigo-200/50"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-indigo-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-indigo-100/60"
            >
              <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
                {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
                  const isActive = `#${activeSection}` === href;
                  return (
                    <a
                      key={href}
                      href={href}
                      onClick={(e) => { e.preventDefault(); scrollTo(href); setMenuOpen(false); }}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-slate-600 hover:bg-indigo-50/60 hover:text-indigo-600'
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </a>
                  );
                })}

                {isFirebaseAuthenticated && (
                  <Link
                    to="/UploadProject"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-indigo-50/60 hover:text-indigo-600 transition-all"
                  >
                    <Upload size={16} /> Upload Project
                  </Link>
                )}

                <div className="border-t border-indigo-100/60 mt-1 pt-2 flex flex-col gap-1">
                  <button
                    onClick={() => { window.open(`${import.meta.env.BASE_URL}cv.pdf`, '_blank'); setMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-indigo-50/60 hover:text-indigo-600 transition-all"
                  >
                    <Download size={16} /> Download CV
                  </button>

                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); scrollTo('#contact'); setMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 mx-2 my-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
                  >
                    Hire Me
                  </a>

                  {isLoggedIn && (
                    <button
                      onClick={() => { onLogout(); setMenuOpen(false); }}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
