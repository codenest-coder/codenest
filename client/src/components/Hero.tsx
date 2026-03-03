import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-12 lg:py-20 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#10B981]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#059669]/20 rounded-full blur-[120px]" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full mb-8"
          >
            <p className="text-[#10B981] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t('hero.badge')}
            </p>
          </motion.div>
          
          <h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="text-white">{t('hero.title1')}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#059669]">
              {t('hero.title2')}
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t('hero.description')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#10B981] text-white rounded-xl hover:bg-[#059669] transition-all shadow-lg shadow-[#10B981]/20 group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="font-medium">{t('hero.cta1')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="font-medium">{t('hero.cta2')}</span>
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}