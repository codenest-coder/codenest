import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const workExperience = [
  {
    title: 'Full-Stack Developer',
    company: 'AVstore',
    period: 'March 2023 - Present',
    description: [
      'Maintain and optimize the current website, ensuring smooth functionality with JavaScript and PHP',
      'Develop and implement new web pages and features to enhance user experience and drive sales',
      'Actively researched and applied the latest web development trends and technologies',
      'Applied UI/UX principles to design intuitive, user-friendly interfaces and improve overall site usability',
      'Conducted user testing and feedback analysis to refine design elements and enhance customer satisfaction'
    ]
  },
  {
    title: 'Technical Product & Sales Specialist',
    company: 'AVstore',
    period: 'February 2019 - March 2023',
    description: [
      'Provided expert advice to customers on hi - fi equipment, ensuring a high level of customer satisfaction',
      'Managed and published product listings on the company’s website, ensuring accurate and up - to - date information for customers',
      'Took the role of Product Manager, overseeing product listings, inventory, and updates to the online store'
    ]
  },
  {
    title: 'Store Manager',
    company: 'M&C Musical Instruments Distributor',
    period: 'October 2017 - February 2019',
    description: [
      "Managed day-to-day operation of the musical instruments store",
      "Provided professional advice to customers on musical instruments and related products",
      "Oversaw inventory management and replenishment",
      "Issued invoices and maintained financial records"
    ]
  },
  {
    title: 'Sales Representative',
    company: 'BluePoint Telecom',
    period: 'February 2015 - September 2015',
    description: [
      "Conducted outbound sales calls to companies, promoting telecommunication subscriptions",
      "Engaged potential clients, conveyed product benefits, and closed sales deals"
    ]
  },
  {
    title: 'Customer support',
    company: 'Competence Call Center',
    period: 'February 2014 - May 2014',
    description: [
      "Provided customer care services for a flight company, addressing inquiries and resolving issues",
      "Assisted customers with flight bookings, reservations, and itinerary changes",
      "Maintained a high level of customer satisfaction through effective communication and problem-solving"
    ]
  },
];

const education = [
  {
    degree: 'Bachelor in Economics',
    school: 'Academy of Economic Studies Bucharest',
    period: 'October 2015 - July 2018',
    description: `
      Focused on Marketing, Business Strategy, and Economic Analysis. 
      Developed a strong foundation in market research, consumer behavior, branding, and financial decision-making. 
      Participated in case studies and practical projects that strengthened analytical thinking, problem-solving, and strategic planning skills.
    `,
  },
  {
    degree: 'High School Diploma',
    school: 'Colegiul National "Anastasescu" Roșiori de Vede',
    period: 'September 2009 - July 2013',
    description: `
      Completed a comprehensive academic curriculum with emphasis on analytical thinking, mathematics, and humanities. 
      Actively participated in academic and extracurricular activities that developed communication skills, discipline, and teamwork abilities.
    `,
  },
  {
    degree: 'The Complete Front-End Web Development Course',
    school: 'Udemy',
    period: 'January 2022 - February 2022',
    description: `
      Intensive front-end development course covering HTML5, CSS3, JavaScript, and modern UI development principles. 
      Gained practical experience building responsive websites, implementing dynamic interfaces, and understanding core web fundamentals including DOM manipulation, APIs, and performance optimization.
    `,
  },

];

function TimelineItem({ item, icon: Icon, index }: { item: any; icon: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-[11px] top-8 bottom-0 w-px bg-[#1F2937]" />

      {/* Icon */}
      <div className="absolute left-0 top-0 w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center">
        <Icon className="w-3 h-3 text-[#0F1419]" />
      </div>

      <div className="bg-[#0F1419] border border-[#1F2937] rounded-xl p-6 hover:border-[#10B981]/50 transition-all">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3
            className="text-lg font-semibold text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {item.title || item.degree}
          </h3>
          <span
            className="text-sm text-[#10B981]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {item.period}
          </span>
        </div>
        <p
          className="text-gray-400 mb-3"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {item.company || item.school}
        </p>
        <p
          className="text-gray-500 text-sm leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {Array.isArray(item.description) ? item.description.map((task: string) => <div>- {task};</div>) : item.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 lg:py-32 px-6 bg-[#0A0E17] relative">
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#10B981]/10 rounded-full blur-[120px]" />

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
              {t('experience.badge')}
            </p>
          </div>
          <h2
            className="text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {t('experience.title')}
          </h2>
          <p
            className="text-xl text-gray-400 max-w-2xl"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t('experience.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <h3
              className="text-2xl font-bold text-white mb-8 flex items-center gap-3"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <Briefcase className="w-6 h-6 text-[#10B981]" />
              {t('experience.work')}
            </h3>
            <div>
              {workExperience.map((item, index) => (
                <TimelineItem key={index} item={item} icon={Briefcase} index={index} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="lg:sticky lg:top-24 h-fit">
              <h3
                className="text-2xl font-bold text-white mb-8 flex items-center gap-3"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <GraduationCap className="w-6 h-6 text-[#10B981]" />
                {t('experience.education')}
              </h3>

              <div>
                {education.map((item, index) => (
                  <TimelineItem key={index} item={item} icon={GraduationCap} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}