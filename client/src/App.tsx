import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { ContactForm } from './components/ContactForm';
import { Sidebar } from './components/Sidebar';
import { Portfolio } from './components/Portfolio';
import { Experience } from './components/Experience';
import { About } from './components/About';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0A0E17] overflow-x-hidden">
        <Sidebar />
        <div className="lg:pl-64 pt-[72px] lg:pt-0">
          <Hero />
          <About />
          <Services />
          <Skills />
          <Portfolio />
          <Experience />
          <ContactForm />
        </div>
      </div>
    </LanguageProvider>
  );
}