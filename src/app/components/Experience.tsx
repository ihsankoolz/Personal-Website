import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { animate, stagger } from 'animejs';
import { Award, Briefcase, GraduationCap, Trophy } from 'lucide-react';

const experiences = [
  {
    year: '2027',
    title: 'Seeking Summer Internship',
    organization: 'Quant Trading / SWE / ML Engineering',
    description:
      'Open to internship opportunities in quantitative trading, software engineering, or machine learning roles.',
    icon: Briefcase,
    type: 'future',
  },
  {
    year: '2025',
    title: 'Top 8 Finalist',
    organization: 'Ripple RLFactor Hackathon',
    description:
      'Built reinforcement learning framework for factor discovery. Competed against 50+ teams from universities across Asia.',
    icon: Trophy,
    type: 'achievement',
  },
  {
    year: '2025',
    title: 'Dean\'s List',
    organization: 'Singapore Management University',
    description:
      'Recognized for academic excellence with GPA in top 10% of cohort.',
    icon: Award,
    type: 'achievement',
  },
  {
    year: '2024 - Present',
    title: 'B.Sc. Software Engineering',
    organization: 'Singapore Management University',
    description:
      'Specializing in quantitative finance and machine learning. Relevant coursework: Data Structures, Algorithms, Probability & Statistics, Linear Algebra, Financial Engineering.',
    icon: GraduationCap,
    type: 'education',
  },
  {
    year: '2024',
    title: 'Technical Lead',
    organization: 'SMU Computing Club',
    description:
      'Led a team of 5 developers to build internal tools and manage technical workshops for 200+ members.',
    icon: Briefcase,
    type: 'experience',
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sectionRef.current) {
            const timelineItems = sectionRef.current.querySelectorAll('.timeline-item');
            const timelineLine = sectionRef.current.querySelector('.timeline-line');

            if (timelineItems.length > 0) {
              animate(timelineItems, {
                opacity: [0, 1],
                translateX: [-50, 0],
                delay: stagger(120),
                duration: 800,
                easing: 'out-expo',
              });
            }

            if (timelineLine) {
              animate(timelineLine, {
                height: ['0%', '100%'],
                duration: 2000,
                delay: 300,
                easing: 'out-expo',
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex items-center px-6 py-24"
    >
      <div className="max-w-4xl w-full mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl mb-16 text-gray-100 flex items-center gap-4"
        >
          <span className="text-[#00E5BE]">04.</span> Experience & Achievements
          <span className="h-px bg-gray-700 flex-1 ml-4"></span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800">
            <div className="timeline-line h-0 w-full bg-[#00E5BE]"></div>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <div
                  key={idx}
                  className="timeline-item opacity-0 relative pl-24 group"
                >
                  {/* Icon */}
                  <div className="absolute left-0 w-16 h-16 bg-gray-900 border-2 border-[#00E5BE] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-[#00E5BE]" />
                  </div>

                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-[#00E5BE]/50 transition-all duration-300">
                    <div className="mb-2 text-[#00E5BE] text-sm tracking-wider">
                      {exp.year}
                    </div>
                    <h3 className="text-xl text-gray-100 mb-1">{exp.title}</h3>
                    <div className="text-gray-400 mb-3">{exp.organization}</div>
                    <p className="text-gray-500 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}