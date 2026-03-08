import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { animate, stagger } from 'animejs';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript / TypeScript', 'SQL', 'HTML / CSS'],
  },
  {
    title: 'Frameworks',
    skills: ['React', 'Vue.js', 'Next.js', 'Node.js', 'TailwindCSS', 'Pandas', 'NumPy', 'Scikit-learn', 'PyTorch', 'HuggingFace'],
  },
  {
    title: 'Infrastructure',
    skills: ['Git', 'Docker', 'PostgreSQL', 'TimescaleDB', 'MongoDB', 'AWS', 'Jupyter', 'Alpaca API'],
  },
  {
    title: 'Machine Learning',
    skills: ['Supervised','Unsupervised','Deep Learning', 'Reinforcement Learning', 'NLP', 'Time Series Analysis', 'RAG Pipelines', 'Signal Generation(XG Boost)', ],
  },
  {
    title: 'Currently Learning',
    skills: ['C++', 'Linear Algebra', 'Low-Latency Systems', 'Options Pricing', 'System Design at Scale'],
    active: true,
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sectionRef.current) {
            const cols = sectionRef.current.querySelectorAll('.skill-col');
            if (cols.length > 0) {
              animate(cols, {
                opacity: [0, 1],
                translateY: [40, 0],
                delay: stagger(120),
                duration: 800,
                easing: 'out(3)',
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen px-6 lg:px-24 py-32 relative"
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-20"
        >
          <span className="text-[var(--noir-accent)] text-sm md:text-base tracking-[0.25em] uppercase">
            Skills
          </span>
          <span className="flex-1 h-px bg-[var(--noir-border)]" />
        </motion.div>

        {/* Skills grid — editorial column layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-col opacity-0 bg-[var(--noir-surface)]/40 backdrop-blur-sm hover:bg-[var(--noir-surface)]/80 border border-[var(--noir-border)] p-6 transition-all duration-500 group">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <h3
                  className="text-lg text-[var(--noir-text)]"
                  style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                >
                  {category.title}
                </h3>
                {category.active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--noir-accent)] animate-pulse" />
                )}
              </div>

              {/* Skill list — clean editorial style */}
              <ul className="space-y-2">
                {category.skills.map((skill, skillIdx) => (
                  <li
                    key={skillIdx}
                    className="flex items-center gap-3 text-sm text-[var(--noir-text-secondary)] group-hover:text-[var(--noir-text)] hover:!text-[var(--noir-accent)] transition-colors duration-200 cursor-default"
                  >
                    <span className="w-3 h-px bg-[var(--noir-border)] group-hover:bg-[var(--noir-accent)] group-hover:w-5 transition-all duration-200" />
                    {skill}
                  </li>
                ))}
                {category.active && (
                  <li className="flex items-center gap-3 text-sm text-[var(--noir-accent)]">
                    <span className="w-3 h-px bg-[var(--noir-accent)]" />
                    <span className="animate-pulse">_</span>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
