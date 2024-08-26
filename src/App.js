import React from "react";
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
    <div className={`flex flex-col min-h-screen`}>
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
  );
}

export default App;
