import React from "react";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <SpeedInsights />
        <Analytics />
        <Header />
        <main className="flex-grow">
          <Hero id="home" />
          <Services id="services" />
          <Experience id="experience" />
          <Projects id="projects" />
          <Skills id="skills" />
          <About id="about" />
          <Contact id="contact" />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
