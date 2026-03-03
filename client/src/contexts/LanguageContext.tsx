import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ro';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Sidebar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.skills': 'Skills',
    'nav.portfolio': 'Portfolio',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'sidebar.location': 'LOCATION',
    'sidebar.locationValue': 'Romania',
    'sidebar.availability': 'AVAILABILITY',
    'sidebar.availabilityValue': 'Available for new opportunities',

    // Hero
    'hero.badge': 'Web Developer & Designer',
    'hero.title1': 'Building Digital',
    'hero.title2': 'Solutions',
    'hero.description': 'I develop modern, scalable web applications designed to solve real business challenges. Clean architecture, strategic design, and seamless functionality.',
    'hero.cta1': 'Start a Project',
    'hero.cta2': 'Hire Me',

    // About
    'about.badge': 'ABOUT ME',
    'about.title': 'Who I Am',
    'about.description': 'My name is Andrei, I am a 32-year-old full-stack developer with a background in sales. I combine technical expertise with strong communication skills and a deep understanding of business needs.',
    'about.paragraph1': 'I began my journey in web development in 2022 and quickly developed a strong foundation in modern technologies such as React, Node.js, and backend systems. My focus is on building scalable, maintainable applications that deliver real value.',
    'about.paragraph2': 'Coming from a sales background gives me a unique advantage as a developer — I understand client expectations, user behavior, and business objectives. This allows me to approach projects not only from a technical perspective, but also from a strategic and results-driven mindset.',
    'about.location': 'Based in Romania',
    'about.experience': 'Professional Background in Sales & Technology',
    'about.projects': 'Available for Freelance Projects',

    // Services
    'services.badge': 'WHAT I DO',
    'services.title': 'Services',
    'services.description': 'Comprehensive full-stack development services — from initial concept to deployment and optimization.',
    'services.frontend.title': 'Frontend Development',
    'services.frontend.description': 'Designing and developing responsive, high-performance user interfaces using React, Next.js, and modern CSS frameworks.',
    'services.backend.title': 'Backend & APIs',
    'services.backend.description': 'Building secure and scalable server-side applications with Node.js, Express, and well-structured RESTful API architecture.',
    'services.blockchain.title': 'Blockchain & Web3',
    'services.blockchain.description': 'Developing smart contracts with Solidity and integrating Web3 solutions for decentralized applications.',
    'services.design.title': 'UI/UX Design',
    'services.design.description': 'Creating intuitive and accessible interfaces in Figma, focused on usability, consistency, and modern design systems.',

    // Skills
    'skills.badge': 'TECH STACK',
    'skills.title': 'Skills & Technologies',
    'skills.description': 'Modern technologies and tools for building scalable, efficient applications.',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.blockchain': 'Blockchain',
    'skills.design': 'Design',
    'skills.tools': 'Tools',

    // Portfolio
    'portfolio.badge': 'MY WORK',
    'portfolio.title': 'Portfolio',
    'portfolio.description': 'A selection of projects demonstrating technical expertise, problem-solving ability, and attention to detail.',
    'portfolio.viewProject': 'View Project',

    // Experience
    'experience.badge': 'BACKGROUND',
    'experience.title': 'Experience & Education',
    'experience.description': 'An overview of my professional experience and academic background.',
    'experience.work': 'Work Experience',
    'experience.education': 'Education',
    'experience.present': 'Present',

    // Contact
    'contact.badge': 'GET IN TOUCH',
    'contact.title': "Let's Work Together",
    'contact.description': 'Have a project in mind? Let’s discuss how we can turn your ideas into a successful digital product.',
    'contact.name': 'Name',
    'contact.namePlaceholder': 'Your full name',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'your.email@example.com',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell me about your project, goals, or requirements...',
    'contact.send': 'Send Message',
    'contact.sent': 'Message sent successfully!',
    'contact.footer': '© 2026 codenest. All rights reserved.',
    'contact.info.email': 'Email',
    'contact.info.location': 'Location',
    'contact.info.locationValue': 'Romania',
    'contact.info.response': 'Response Time',
    'contact.info.responseValue': 'Within 24 hours',
  },

  ro: {
    // Sidebar
    'nav.home': 'Acasă',
    'nav.about': 'Despre',
    'nav.services': 'Servicii',
    'nav.skills': 'Competențe',
    'nav.portfolio': 'Portofoliu',
    'nav.experience': 'Experiență',
    'nav.contact': 'Contact',
    'sidebar.location': 'LOCAȚIE',
    'sidebar.locationValue': 'România',
    'sidebar.availability': 'DISPONIBILITATE',
    'sidebar.availabilityValue': 'Disponibil pentru noi oportunități',

    // Hero
    'hero.badge': 'Dezvoltator & Designer Web',
    'hero.title1': 'Construiesc Soluții',
    'hero.title2': 'Digitale',
    'hero.description': 'Dezvolt aplicații web moderne și scalabile, concepute pentru a rezolva provocări reale de business. Arhitectură curată, design strategic și funcționalitate impecabilă.',
    'hero.cta1': 'Începe un Proiect',
    'hero.cta2': 'Colaborează cu Mine',

    // About
    'about.badge': 'DESPRE MINE',
    'about.title': 'Cine Sunt',
    'about.description': 'Mă numesc Andrei, am 32 de ani și sunt dezvoltator full-stack, cu un background solid în domeniul vânzărilor. Îmbin competențele tehnice cu abilități puternice de comunicare și o înțelegere clară a obiectivelor de business.',
    'about.paragraph1': 'Am început parcursul meu în web development în 2022 și mi-am construit rapid o bază solidă în tehnologii moderne precum React, Node.js și dezvoltare backend. Mă concentrez pe construirea de aplicații scalabile, bine structurate și orientate către rezultate concrete.',
    'about.paragraph2': 'Experiența în vânzări îmi oferă un avantaj important ca dezvoltator: înțeleg comportamentul utilizatorilor, nevoile clienților și importanța livrării de valoare reală. Abordez fiecare proiect nu doar din perspectivă tehnică, ci și strategică, cu focus pe eficiență și impact.',
    'about.location': 'Stabilit în România',
    'about.experience': 'Background profesional în vânzări și tehnologie',
    'about.projects': 'Disponibil pentru proiecte freelance',

    // Services
    'services.badge': 'CE FAC',
    'services.title': 'Servicii',
    'services.description': 'Servicii complete de dezvoltare full-stack — de la concept și strategie până la implementare și optimizare.',
    'services.frontend.title': 'Dezvoltare Frontend',
    'services.frontend.description': 'Proiectarea și dezvoltarea de interfețe responsive și performante folosind React, Next.js și framework-uri CSS moderne.',
    'services.backend.title': 'Dezvoltare Backend & API-uri',
    'services.backend.description': 'Construirea de aplicații server-side sigure și scalabile cu Node.js, Express și arhitectură RESTful.',
    'services.blockchain.title': 'Blockchain & Web3',
    'services.blockchain.description': 'Dezvoltarea de smart contracts în Solidity și integrarea soluțiilor Web3 pentru aplicații descentralizate.',
    'services.design.title': 'UI/UX Design',
    'services.design.description': 'Crearea de interfețe intuitive și accesibile în Figma, axate pe claritate, consistență și experiență modernă.',

    // Skills
    'skills.badge': 'TEHNOLOGII',
    'skills.title': 'Competențe & Tehnologii',
    'skills.description': 'Tehnologii și instrumente moderne pentru dezvoltarea de aplicații scalabile și eficiente.',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.blockchain': 'Blockchain',
    'skills.design': 'Design',

    // Portfolio
    'portfolio.badge': 'PROIECTE',
    'portfolio.title': 'Portofoliu',
    'portfolio.description': 'O selecție de proiecte care reflectă expertiza tehnică, capacitatea de rezolvare a problemelor și atenția la detalii.',
    'portfolio.viewProject': 'Vezi Proiectul',

    // Experience
    'experience.badge': 'BACKGROUND',
    'experience.title': 'Experiență & Educație',
    'experience.description': 'O privire de ansamblu asupra experienței profesionale și a parcursului academic.',
    'experience.work': 'Experiență Profesională',
    'experience.education': 'Educație',
    'experience.present': 'Prezent',

    // Contact
    'contact.badge': 'CONTACT',
    'contact.title': 'Hai să Lucrăm Împreună',
    'contact.description': 'Ai un proiect în minte? Hai să discutăm cum îl putem transforma într-un produs digital de succes.',
    'contact.name': 'Nume',
    'contact.namePlaceholder': 'Numele complet',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'email@exemplu.ro',
    'contact.message': 'Mesaj',
    'contact.messagePlaceholder': 'Descrie proiectul, obiectivele sau cerințele tale...',
    'contact.send': 'Trimite Mesajul',
    'contact.sent': 'Mesaj trimis cu succes!',
    'contact.footer': '© 2026 codenest. Toate drepturile rezervate.',
    'contact.info.email': 'Email',
    'contact.info.location': 'Locație',
    'contact.info.locationValue': 'România',
    'contact.info.response': 'Timp de Răspuns',
    'contact.info.responseValue': 'În maximum 24 de ore',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Detect user's country based on IP (mock implementation)
    // In production, you would use a service like ipapi.co or ip-api.com
    const detectLanguage = async () => {
      try {
        // Mock IP detection - in production replace with actual API call
        // const response = await fetch('https://ipapi.co/json/');
        // const data = await response.json();
        // if (data.country_code === 'RO') {
        //   setLanguage('ro');
        // }

        // For demo purposes, check browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('ro')) {
          setLanguage('ro');
        }
      } catch (error) {
        console.error('Error detecting language:', error);
      }
    };

    detectLanguage();
  }, []);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}