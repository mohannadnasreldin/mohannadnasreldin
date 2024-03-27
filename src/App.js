import './App.css';
import Footer from './Footer/Footer';
import About from './components/About/About';
import Contactme from './components/Contactme/Contactme';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Qualifications from './components/Qualifications/Qualifications';
import Services from './components/Services/Services';
import Skills from './components/Skills/Skills';
import { SpeedInsights } from "@vercel/speed-insights/react"
function App() {
  return (
    <div className="App">

      <section>
      <Header />
      </section>
      


      <section id='HOME'>
      <Home />
      </section>


      <section id='ABOUT'>
        <About />
      </section>


      <section id='SKILLS'>
        <Skills />
      </section>


      <section id='QUALIFICATIONS'>
      <Qualifications />
      </section>

      <section id='SERVICES'>
      <Services />
      </section>

      <section id="CONTACT">
      <Contactme />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}

export default App;
