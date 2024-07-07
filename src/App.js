import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Experience from './components/Experience';
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero id="home" />       {/* Ensure this has id="home" */}
        <Services id="services" /> {/* Ensure this has id="services" */}
        <Experience id="experience"/>
        <Skills id="skills" />    {/* Ensure this has id="skills" */}
        <About id="about" />      {/* Ensure this has id="about" */}
        <Contact id="contact" />  {/* Ensure this has id="contact" */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
