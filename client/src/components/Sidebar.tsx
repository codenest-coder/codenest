import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, Home, User, Briefcase, Code2, FolderOpen, GraduationCap, MessageSquare, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const navItems = [
  { id: 'home', key: 'nav.home', icon: Home },
  { id: 'about', key: 'nav.about', icon: User },
  { id: 'services', key: 'nav.services', icon: Briefcase },
  { id: 'skills', key: 'nav.skills', icon: Code2 },
  { id: 'portfolio', key: 'nav.portfolio', icon: FolderOpen },
  { id: 'experience', key: 'nav.experience', icon: GraduationCap },
  { id: 'contact', key: 'nav.contact', icon: MessageSquare },
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 lg:hidden "
        style={{
          background: 'linear-gradient(180deg, rgba(10, 14, 23, 0.95) 0%, rgba(10, 14, 23, 0.8) 70%, rgba(10, 14, 23, 0) 100%)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="text-[#10B981]">code</span>
              <span className="text-white">nest</span>
            </h1>

            {/* Hamburger Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-[#10B981] transition-colors rounded-lg hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Current Section Indicator - Below Mobile Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-16 left-0 right-0 z-40 lg:hidden px-6 py-3"
      >
        {navItems.find(item => item.id === activeSection) && (
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 w-fit">
            {(() => {
              const currentItem = navItems.find(item => item.id === activeSection);
              const Icon = currentItem?.icon;
              return Icon ? <Icon className="w-3.5 h-3.5 text-[#10B981]" /> : null;
            })()}
            <span 
              className="text-sm text-gray-400 font-medium"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t(`nav.${activeSection}`)}
            </span>
          </div>
        )}
      </motion.div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed left-0 top-0 h-screen w-64 p-6 flex-col z-50 hidden lg:flex"
        style={{
          background: 'linear-gradient(90deg, rgba(15, 20, 25, 0.6) 0%, rgba(15, 20, 25, 0.4) 85%, transparent 100%)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Subtle right edge fade */}
        <div 
          className="absolute top-0 right-0 bottom-0 w-px"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%)'
          }}
        />

        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="text-[#10B981]">code</span>
            <span className="text-white">nest</span>
          </h1>
        </div>

        {/* Avatar & Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 pb-6 border-b border-white/5"
        >
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10B981]/20 to-transparent p-0.5">
                <img
                  src="https://media.licdn.com/dms/image/v2/C4D03AQGt3MOyS_rhug/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1651596383021?e=1773878400&v=beta&t=8WbVa2L0qlN0icKd4gHy66XVvNMSWj8e3truAuU_Bc8"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-[#0F1419]"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#10B981] rounded-full border-2 border-[#0F1419] shadow-lg shadow-[#10B981]/50" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-white mb-1 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Andrei
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Full-Stack Developer
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-[#10B981]">@</span> AVstore
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm flex items-center gap-3 font-medium ${
                  activeSection === item.id
                    ? 'text-[#10B981] bg-[#10B981]/10 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{t(item.key)}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="space-y-5 pt-6 border-t border-white/5">
          {/* Social Links */}
          <div className="flex gap-3 justify-center">
            <motion.a
              href="https://github.com/codenest-coder"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 text-gray-400 hover:text-[#10B981] transition-all bg-white/5 hover:bg-[#10B981]/10 rounded-lg"
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/andrei-oncica-182874172/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 text-gray-400 hover:text-[#10B981] transition-all bg-white/5 hover:bg-[#10B981]/10 rounded-lg"
            >
              <Linkedin className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="mailto:hello@codenest.ro"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 text-gray-400 hover:text-[#10B981] transition-all bg-white/5 hover:bg-[#10B981]/10 rounded-lg"
            >
              <Mail className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Language Toggle */}
          <div className="flex gap-3 justify-center">
            <motion.button
              onClick={() => setLanguage('en')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`text-2xl transition-all rounded-lg p-1 ${
                language === 'en' ? 'opacity-100 scale-110 ring-2 ring-[#10B981]/30' : 'opacity-40 hover:opacity-70'
              }`}
              title="English"
            >
              🇬🇧
            </motion.button>
            <motion.button
              onClick={() => setLanguage('ro')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`text-2xl transition-all rounded-lg p-1 ${
                language === 'ro' ? 'opacity-100 scale-110 ring-2 ring-[#10B981]/30' : 'opacity-40 hover:opacity-70'
              }`}
              title="Română"
            >
              🇷🇴
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Slide-in */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-0 top-0 h-screen w-64 p-6 flex flex-col z-50 lg:hidden"
            style={{
              background: 'linear-gradient(90deg, rgba(15, 20, 25, 0.98) 0%, rgba(15, 20, 25, 0.95) 85%, rgba(15, 20, 25, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Subtle right edge fade */}
            <div 
              className="absolute top-0 right-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.15) 50%, transparent 100%)'
              }}
            />

            {/* Logo */}
            <div className="mb-12">
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="text-[#10B981]">code</span>
                <span className="text-white">nest</span>
              </h1>
            </div>

            {/* Avatar & Info */}
            <div className="mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10B981]/20 to-transparent p-0.5">
                    <img
                      src="https://media.licdn.com/dms/image/v2/C4D03AQGt3MOyS_rhug/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1651596383021?e=1773878400&v=beta&t=8WbVa2L0qlN0icKd4gHy66XVvNMSWj8e3truAuU_Bc8"
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-2 border-[#0F1419]"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#10B981] rounded-full border-2 border-[#0F1419] shadow-lg shadow-[#10B981]/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-white mb-1 tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Andrei
                  </h2>
                  <p className="text-xs text-gray-400 leading-relaxed mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Full-Stack Developer
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span className="text-[#10B981]">@</span> AVstore
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm flex items-center gap-3 font-medium ${
                      activeSection === item.id
                        ? 'text-[#10B981] bg-[#10B981]/10 shadow-sm'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{t(item.key)}</span>
                  </button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="space-y-5 pt-6 border-t border-white/5">
              {/* Social Links */}
              <div className="flex gap-3 justify-center">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-gray-400 hover:text-[#10B981] transition-all bg-white/5 hover:bg-[#10B981]/10 rounded-lg"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-gray-400 hover:text-[#10B981] transition-all bg-white/5 hover:bg-[#10B981]/10 rounded-lg"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:hello@codenest.ro"
                  className="p-2.5 text-gray-400 hover:text-[#10B981] transition-all bg-white/5 hover:bg-[#10B981]/10 rounded-lg"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Language Toggle */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setLanguage('en')}
                  className={`text-2xl transition-all rounded-lg p-1 ${
                    language === 'en' ? 'opacity-100 scale-110 ring-2 ring-[#10B981]/30' : 'opacity-40 hover:opacity-70'
                  }`}
                  title="English"
                >
                  🇬🇧
                </button>
                <button
                  onClick={() => setLanguage('ro')}
                  className={`text-2xl transition-all rounded-lg p-1 ${
                    language === 'ro' ? 'opacity-100 scale-110 ring-2 ring-[#10B981]/30' : 'opacity-40 hover:opacity-70'
                  }`}
                  title="Română"
                >
                  🇷🇴
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}