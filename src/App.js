import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./context/ThemeContext";
import { FluidScrollProvider } from "./context/FluidScrollContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import FluidBackdrop from "./components/FluidBackdrop";
import ScrollProgress from "./components/ScrollProgress";
import StoryRail from "./components/story/StoryRail";

function App() {
  return (
    <ThemeProvider>
      <FluidScrollProvider>
        <div className="relative flex min-h-screen flex-col text-ink">
          <SpeedInsights />
          <Analytics />
          <FluidBackdrop />
          <ScrollProgress />
          <StoryRail />
          <Header />
          <main className="relative z-10 flex-grow">
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
      </FluidScrollProvider>
    </ThemeProvider>
  );
}

export default App;
