import React from 'react';
import { Home, User, Code2, ContactIcon } from 'lucide-react';
export function Navbar() {
    return (
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-black/30 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between text-white">
        <a href="#hero" className="text-2xl font-bold tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">Anggra.Dev</a>
        
        <ul className="flex space-x-6 text-sm md:text-base font-medium">
          <NavItem icon={<Home size={18} />} label="Home" href="#hero" />
          <NavItem icon={<User size={18} />} label="About Me" href="#about" />
          <NavItem icon={<Code2 size={18} />} label="Projects" href="#projects" />
          <NavItem icon={<ContactIcon size={18} />} label="Contact" href="#contact" />
          {/* <li><a href="#contact">Contact</a></li> */}
        </ul>
      </nav>
      </header>
    );
  }

  function NavItem({ icon, label, href }) {
    return (
      <li>
        <a
          href={href}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full transition-all hover:bg-purple-600/20 hover:backdrop-blur-md hover:shadow-md hover:text-purple-300"
        >
          {icon}
          {label}
        </a>
      </li>
    );
  }