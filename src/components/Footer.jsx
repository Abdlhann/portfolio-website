import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8 border-t border-white/10">
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
