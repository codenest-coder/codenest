import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Monitor, Layers, Sparkles, Code } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const services = [
  { icon: Monitor, titleKey: 'services.frontend.title', descKey: 'services.frontend.description' },
  { icon: Code, titleKey: 'services.backend.title', descKey: 'services.backend.description' },
  { icon: Sparkles, titleKey: 'services.blockchain.title', descKey: 'services.blockchain.description' },
  { icon: Layers, titleKey: 'services.design.title', descKey: 'services.design.description' },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Icon = service.icon;
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="group relative bg-[#0F1419] p-8 rounded-2xl border border-[#1F2937] hover:border-[#10B981]/50 transition-all overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-full blur-2xl group-hover:bg-[#10B981]/10 transition-all" />
      
      <div className="relative z-10">
        <motion.div 
          className="w-14 h-14 bg-[#10B981]/10 rounded-xl flex items-center justify-center mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon className="w-7 h-7 text-[#10B981]" />
        </motion.div>
        <h3 
          className="text-xl font-semibold text-white mb-3"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {t(service.titleKey)}
        </h3>
        <p 
          className="text-gray-400 leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {t(service.descKey)}
        </p>
      </div>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 lg:py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full mb-6">
            <p className="text-[#10B981] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t('services.badge')}
            </p>
          </div>
          <h2 
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {t('services.title')}
          </h2>
          <p 
            className="text-xl text-gray-400 max-w-2xl"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t('services.description')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}