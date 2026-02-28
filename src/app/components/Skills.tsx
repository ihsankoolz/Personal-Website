import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { animate, stagger } from 'animejs';
import {
  Code2,
  Database,
  Wrench,
  TrendingUp,
  Brain,
  Terminal,
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    skills: [
      'Python',
      'JavaScript/TypeScript',
      'Java',
      'C++',
      'SQL',
      'R',
      'HTML/CSS',
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: Database,
    skills: [
      'React',
      'Next.js',
      'Node.js',
      'Express',
      'TailwindCSS',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'TensorFlow',
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: Wrench,
    skills: [
      'Git/GitHub',
      'Docker',
      'AWS',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Linux',
      'Jupyter',
    ],
  },
  {
    title: 'Quantitative Finance',
    icon: TrendingUp,
    skills: [
      'Algorithmic Trading',
      'Risk Management',
      'Portfolio Optimization',
      'Backtesting',
      'Market Analysis',
    ],
  },
  {
    title: 'Machine Learning',
    icon: Brain,
    skills: [
      'Deep Learning',
      'Reinforcement Learning',
      'NLP',
      'Time Series Analysis',
      'Feature Engineering',
    ],
  },
  {
    title: 'Currently Learning',
    icon: Terminal,
    skills: [
      'Advanced C++ (for HFT)',
      'Rust',
      'System Design',
      'Low-Latency Systems',
      'Options Pricing',
    ],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sectionRef.current) {
            const skillCategories = sectionRef.current.querySelectorAll('.skill-category');
            
            if (skillCategories.length > 0) {
              animate(skillCategories, {
                opacity: [0, 1],
                translateY: [50, 0],
                delay: stagger(150),
                duration: 800,
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
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center px-6 py-24"
    >
      <div className="max-w-6xl w-full mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl mb-12 text-gray-100 flex items-center gap-4"
        >
          <span className="text-[#00E5BE]">02.</span> Skills & Technologies
          <span className="h-px bg-gray-700 flex-1 ml-4"></span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div
                key={idx}
                className="skill-category opacity-0 bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-[#00E5BE]/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="h-6 w-6 text-[#00E5BE] group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl text-gray-100">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm hover:bg-[#00E5BE]/10 hover:text-[#00E5BE] transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}