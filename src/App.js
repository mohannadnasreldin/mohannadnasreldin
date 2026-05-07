import React, { Suspense, lazy } from 'react';
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
import { CustomCursor } from "./ui";
import SmoothScroll from "./components/SmoothScroll";
import Reveal from "./components/Reveal";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import 'lenis/dist/lenis.css';

const AnimatedBackground = lazy(() => import('./components/Background3D'));

function App() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <ScrollProgress />
        <Suspense fallback={null}>
          <AnimatedBackground className="fixed" />
        </Suspense>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
        <CustomCursor />
        <SpeedInsights />
        <Analytics />
        <Header />
        <main className="relative z-10 flex-grow" role="main">
          <Hero id="home" />
          
          <Reveal animation="slide-up" delay={100}>
            <Services id="services" aria-label="Our Services" />
          </Reveal>

          <Reveal animation="3d-rotate" delay={200}>
            <Experience id="experience" aria-label="Professional Experience" />
          </Reveal>

          <Reveal>
            <Projects id="projects" aria-label="Portfolio Projects" />
          </Reveal>

          <Reveal animation="fade" delay={100}>
            <Skills id="skills" aria-label="Technical Skills" />
          </Reveal>

          <Reveal animation="slide-up" delay={100}>
            <About id="about" aria-label="About Me" />
          </Reveal>

          <Reveal animation="3d-rotate" delay={100}>
            <Contact id="contact" aria-label="Contact Information" />
          </Reveal>
        </main>
        <Footer />
      </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
