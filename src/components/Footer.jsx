import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="relative z-[1] bg-gray-950 text-gray-300 py-12 border-t border-white/10 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:40px_40px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
        <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(0,0,0,0.03)_1px)] [background-size:40px_40px] opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-purple-400">Anggra.dev</span>. All rights reserved.
        </p>
        
        <div className="flex space-x-5 text-2xl">
          <a href="https://github.com/hyperionzs" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/anggra-dev-825567347?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com/anggra__12" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
