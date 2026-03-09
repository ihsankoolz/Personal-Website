import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { animate, stagger } from 'animejs';
import { Award, Briefcase, GraduationCap, Globe, Trophy, Users } from 'lucide-react';

const experiences = [
  {
    year: '2026 / 2027',
    title: 'Seeking Internship',
    organization: 'Software Engineering · ML Engineering',
    description:
      'Open to Summer 2026 and 2026 off-cycle(Aug-Dec) internship opportunities where I can apply my skills in machine learning, and full-stack engineering at scale.',
    icon: Briefcase,
    type: 'future',
  },
  {
    year: '2025',
    title: 'Top 8 Finalist',
    organization: 'Ripple Fintech Hackathon',
    description:
      'Built RLFactor, a blockchain invoice factoring platform combining reinforcement learning with decentralised finance. Competed against 50+ teams from universities across Asia.',
    icon: Trophy,
    type: 'achievement',
  },
  {
    year: '2025',
    title: "Dean's List",
    organization: 'Singapore Management University',
    description:
      'Awarded Dean\'s List recognition for academic excellence, placing in the top tier of my cohort with a 3.83 GPA.',
    icon: Award,
    type: 'achievement',
  },
  {
    year: 'Jun 2025 – Present',
    title: 'Public Relations Director',
    organization: 'SMU Business Intelligence & Analytics Club',
    description:
      'Secured sponsorships and industry partnerships to run networking events, fireside chats, and a datathon for 500+ club members.',
    icon: Users,
    type: 'experience',
  },
  {
    year: 'Jun 2025 – Jan 2026',
    title: 'Finance & Logistics Head',
    organization: 'Project Wan Mai XV — Vientiane, Laos',
    description:
      'Led finance and logistics for an international community service expedition to rural Laos, managing a $35,000+ budget. Delivered educational support and youth empowerment programs.',
    icon: Globe,
    type: 'experience',
  },
  {
    year: '2024 – Present',
    title: 'B.Sc. Information Systems (Business Analytics)',
    organization: 'Singapore Management University',
    description:
      'Specialising in Business Analytics with focus on software engineering and machine learning.',
    icon: GraduationCap,
    type: 'education',
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sectionRef.current) {
            const items = sectionRef.current.querySelectorAll('.exp-item');
            const line = sectionRef.current.querySelector('.exp-line-fill');

            if (items.length > 0) {
              animate(items, {
                opacity: [0, 1],
                translateX: [-30, 0],
                delay: stagger(100, { start: 300 }),
                duration: 800,
                easing: 'out(3)',
              });
            }

            if (line) {
              animate(line, {
                height: ['0%', '100%'],
                duration: 2000,
                delay: 200,
                easing: 'out(4)',
              });
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen px-6 lg:px-24 py-32"
    >
      <div className="max-w-5xl w-full mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-20"
        >
          <span className="text-[var(--noir-accent)] text-sm md:text-base tracking-[0.25em] uppercase">
            Experience
          </span>
          <span className="flex-1 h-px bg-[var(--noir-border)]" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--noir-border)]">
            <div className="exp-line-fill h-0 w-full bg-[var(--noir-accent)]/40" />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <div
                  key={idx}
                  className="exp-item opacity-0 relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] border border-[var(--noir-border-hover)] bg-[var(--noir-bg)] flex items-center justify-center transition-colors duration-300">
                    <div className="w-[5px] h-[5px] bg-[var(--noir-accent)] opacity-60 transition-opacity duration-300" />
                  </div>

                  <div className="group border border-[var(--noir-border)] bg-[var(--noir-surface)]/40 backdrop-blur-sm hover:bg-[var(--noir-surface)]/80 p-6 hover:border-[var(--noir-border-hover)] transition-all duration-500">
                    {/* Year + icon row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--noir-text-muted)] group-hover:text-[var(--noir-text-secondary)] transition-colors duration-300">
                        {exp.year}
                      </span>
                      <Icon className="h-4 w-4 text-[var(--noir-text-muted)] group-hover:text-[var(--noir-accent)] transition-colors duration-300" />
                    </div>

                    <h3
                      className="text-xl text-[var(--noir-text)] mb-1 group-hover:text-[var(--noir-accent)] transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {exp.title}
                    </h3>
                    <div className="text-[var(--noir-text-secondary)] text-sm mb-3 group-hover:text-[var(--noir-text)] transition-colors duration-300">
                      {exp.organization}
                    </div>
                    <p className="text-[var(--noir-text-muted)] text-sm leading-relaxed group-hover:text-[var(--noir-text)] transition-colors duration-300">
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
