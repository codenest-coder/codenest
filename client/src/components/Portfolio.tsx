import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const projects = [
  {
    title: 'AVstore',
    description:
      'E-commerce platform for electronics and appliances with modern design and seamless shopping experience.',
    tech: ['PHP', 'JavaScript', 'jQuery', 'E-commerce'],
    link: 'https://www.avstore.ro',
    image: 'https://codenest.ro/assets/Screenshot%202026-02-25%20at%2021.20.51.png',
    status: 'live' as const,
  },
  {
    title: 'FirstConcept',
    description:
      'Portfolio website for a creative professional with clean design and smooth animations.',
    tech: ['React', 'Tailwind CSS', 'Portfolio Website'],
    link: 'https://dragon-fresh-66975430.figma.site/',
    image: 'https://codenest.ro/assets/Screenshot%202026-02-25%20at%2021.20.13.png',
    status: 'live' as const,
    statusLabel: 'Work in progress',
  },
];

type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  image: string;
  status?: 'live' | 'wip';
  statusLabel?: string;
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const isDisabled = project.status === 'wip' || !project.link;

  return (
    <motion.a
      href={isDisabled ? undefined : project.link}
      target={isDisabled ? undefined : '_blank'}
      rel={isDisabled ? undefined : 'noopener noreferrer'}
      aria-disabled={isDisabled}
      onClick={(e) => {
        if (isDisabled) e.preventDefault();
      }}
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={isDisabled ? undefined : { y: -8 }}
      className={`group relative bg-[#0F1419] rounded-2xl border border-[#1F2937] transition-all overflow-hidden
        ${isDisabled ? 'opacity-90 cursor-not-allowed' : 'hover:border-[#10B981]/50'}`}
    >
      {/* Image header */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={isDisabled ? undefined : { scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />

        {/* Status banner */}
        {project.status === 'wip' && (
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                         bg-[#F59E0B] text-[#000000] border border-[#F59E0B]/30"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {project.statusLabel ?? 'Work in progress'}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3
            className="text-xl font-semibold text-white group-hover:text-[#10B981] transition-colors"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {project.title}
          </h3>

          {!isDisabled && (
            <motion.div
              whileHover={{ rotate: 45, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#10B981] transition-colors" />
            </motion.div>
          )}
        </div>

        <p className="text-gray-400 mb-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-[#1F2937] text-gray-300 rounded-full text-xs"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="py-20 lg:py-32 px-6 relative">
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
              {t('portfolio.badge')}
            </p>
          </div>
          <h2
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {t('portfolio.title')}
          </h2>
          <p
            className="text-xl text-gray-400 max-w-2xl"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t('portfolio.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}