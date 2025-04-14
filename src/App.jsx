import React from 'react';
import { Hero } from './components/HeroSS.jsx';
import { About } from './components/AboutSS.jsx';
import { TechStack } from './components/TechStack.jsx';
import { Projects } from './components/ProjectsSS.jsx';
import { Contact } from './components/ContactSS.jsx';
import { Navbar } from './components/NavbarSS.jsx';
import { Footer } from './components/Footer.jsx';

function App() {
  return (
    <>
    <Hero />
    <About />
    <TechStack />
    <Projects />
    <Contact />
    <Navbar />
    <Footer />
    </>
  );
}

export default App;