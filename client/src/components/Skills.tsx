import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const skillCategories = [
  {
    key: 'skills.frontend',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'TypeScript',
      'React.js',
      'Next.js',
      'jQuery',
      'Tailwind CSS'
    ],
    color: '#10B981',
  },
  {
    key: 'skills.backend',
    skills: [
      'Node.js',
      'Express.js',
      'PHP',
      'RESTful APIs',
      'JWT Authentication',
      'API Integration',
      'MySQL',
      'MongoDB'
    ],
    color: '#3B82F6',
  },
  {
    key: 'skills.blockchain',
    skills: [
      'Solidity',
      'Smart Contracts',
      'Web3.js'
    ],
    color: '#8B5CF6',
  },

  {
    key: 'skills.design',
    skills: [
      'UI/UX Design',
      'Responsive Design',
      'Figma',
      'Adobe Photoshop'
    ],
    color: '#EC4899',
  },
  {
    key: 'skills.tools',
    skills: [
      'Git',
      'GitHub',
      'GitHub Actions',
      'Postman',
      'Docker (basic)',
      'Linux',
      'cPanel',
      'Vite',
      'NPM / Yarn'
    ],
    color: '#F59E0B',
  },
];

function SkillCategory({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-1 h-8 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <h3
          className="text-xl font-semibold text-white"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {t(category.key)}
        </h3>
      </div>

      <div className="flex flex-wrap gap-3 pl-6">
        {category.skills.map((skill, skillIndex) => (
          <motion.div
            key={skillIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.1 + skillIndex * 0.05 }}
            className="px-4 py-2 bg-[#0F1419] border border-[#1F2937] rounded-lg text-gray-300 hover:border-[#10B981]/50 hover:text-white transition-all text-sm"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 lg:py-32 px-6 bg-[#0A0E17] relative">
      <div className="absolute top-20 left-1/2 w-96 h-96 bg-[#10B981]/10 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full mb-6">
            <p className="text-[#10B981] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t('skills.badge')}
            </p>
          </div>
          <h2
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {t('skills.title')}
          </h2>
          <p
            className="text-xl text-gray-400 max-w-2xl"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t('skills.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, index) => (
            <SkillCategory key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}