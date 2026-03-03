import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { MapPin, Briefcase, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const stats = [
  { icon: MapPin, key: 'about.location' },
  { icon: Briefcase, key: 'about.experience' },
  { icon: Award, key: 'about.projects' },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 lg:py-32 px-6 relative">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-[120px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full mb-6">
            <p className="text-[#10B981] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t('about.badge')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 
                className="text-5xl font-bold text-white mb-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {t('about.title')}
              </h2>
              
              <p 
                className="text-xl text-gray-400 mb-6 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {t('about.description')}
              </p>
              
              <p 
                className="text-gray-500 mb-4 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {t('about.paragraph1')}
              </p>
              
              <p 
                className="text-gray-500 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {t('about.paragraph2')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-6 bg-[#0F1419] border border-[#1F2937] rounded-xl hover:border-[#10B981]/50 transition-all group"
                  >
                    <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <p 
                      className="text-white font-medium"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {t(stat.key)}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}