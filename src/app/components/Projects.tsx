import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { animate, stagger } from 'animejs';
import { Github, ExternalLink, TrendingUp } from 'lucide-react';
// import { EquityCurve } from './EquityCurve'; // Commented out — re-enable when ready

const projects = [
  {
    title: 'AlphaForge',
    description:
      'End-to-end quantitative trading platform built from scratch — a 7-stage daily pipeline across 79 stocks with ML-driven alpha generation. TimescaleDB stores 110,000+ feature rows; a 22-signal engineering pipeline feeds Hidden Markov Model regime detection, XGBoost signal generation (AUC 0.829), and FinBERT sentiment scoring across 213,000+ news articles. Kelly Criterion + Markowitz optimization manages risk, with live execution via Alpaca paper trading — achieving 186.65% return and 0.96 Sharpe in backtesting.',
    tech: ['Python', 'TimescaleDB', 'Pandas', 'NumPy', 'Scikit-learn', 'XG-Boost', 'Alpaca API', 'Docker',],
    github: 'https://github.com/ihsankoolz/alphaforge',
    live: null,
    featured: true,
    current: true,
    metrics: 'Momentum Strategy: 91.85% Total Return | Sharpe: 0.56 | 79 stocks',
  },
  {
    title: 'TEMPO',
    description:
      'Crisis detection system monitoring real-time data streams to identify and flag emerging crisis signals. TEMPO combines NLP (BERT for emotion and context extraction) with Reinforcement Learning (RL) for optimal crisis alert timing.',
    tech: ['Python', 'Pandas','Pytorch', 'Scikit-learn','BERT' , 'NLP' ,'Offline Reinforcement Learning',],
    github: 'https://github.com/ihsankoolz/tempo',
    live: null,
    featured: true,
    current: true,
  },
  {
    title: 'RLFactor',
    description:
      'Blockchain invoice factoring platform — Top 8 at Ripple Fintech Hackathon, competing against 50+ teams across Asia. Reinforcement learning framework for factor discovery using deep Q-learning to identify non-linear alpha signals.',
    tech: ['Python', 'Ripple/XRPL', 'React', 'POSTGRESQL' ],
    github: 'https://github.com/decker757/RLFactor',
    live: null,
    featured: true,
    current: false,
    metrics: 'Top 8 — Ripple Fintech Hackathon | 50+ teams',
  },
  {
    title: 'LAWGIC',
    description:
      'Legal research automation using BERT-based NLP and Retrieval-Augmented Generation to parse and surface relevant case law. Designed to reduce manual legal research time for practitioners and students.',
    tech: ['Python', 'BERT', 'HuggingFace', 'RAG', 'FastAPI', 'React'],
    github: 'https://github.com/gregleejy/lawgic-hackathon',
    live: null,
    featured: true,
    current: false,
  },
  {
    title: 'Wavelength',
    description:
      'Music discovery platform connecting Singapore\'s local artists with fans — personalised recommendations, live event discovery, artist analytics dashboard, AI chatbot powered by Gemini, and D3.js network visualization.',
    tech: ['Vue 3', 'Node.js', 'Firebase', 'D3.js', 'Bootstrap', 'Gemini API'],
    github: 'https://github.com/ihsankoolz/wavelength',
    live: null,
    featured: true,
    current: false,
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sectionRef.current) {
            const cards = sectionRef.current.querySelectorAll('.proj-card');
            if (cards.length > 0) {
              animate(cards, {
                opacity: [0, 1],
                translateY: [50, 0],
                delay: stagger(150),
                duration: 900,
                easing: 'out(3)',
              });
            }
          }
        });
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentProjects = projects.filter((p) => p.current);
  const pastProjects = projects.filter((p) => !p.current);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen px-6 lg:px-24 py-32"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-20"
        >
          <span className="text-[var(--noir-accent)] text-sm md:text-base tracking-[0.25em] uppercase">
            Projects
          </span>
          <span className="flex-1 h-px bg-[var(--noir-border)]" />
        </motion.div>

        {/* Currently Working On */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-2 h-2 rounded-full bg-[var(--noir-accent)] animate-pulse" />
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-[var(--noir-text-secondary)]">
              Currently Building
            </span>
          </div>

          <div className="space-y-6">
            {currentProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} index={idx} />
            ))}
          </div>
        </div>

        {/* Previous Projects */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <span className="w-2 h-2 rounded-full bg-[var(--noir-border-hover)]" />
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-[var(--noir-text-secondary)]">
              Previous Work
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {pastProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} index={idx + currentProjects.length} compact />
            ))}
          </div>
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/ihsankoolz"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 text-xs tracking-[0.15em] uppercase text-[var(--noir-text-secondary)] hover:text-[var(--noir-accent)] transition-colors duration-300"
          >
            <span className="w-8 h-px bg-[var(--noir-border-hover)] group-hover:w-12 group-hover:bg-[var(--noir-accent)] transition-all duration-300" />
            View all on GitHub
            <span className="w-8 h-px bg-[var(--noir-border-hover)] group-hover:w-12 group-hover:bg-[var(--noir-accent)] transition-all duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[number];
  index: number;
  compact?: boolean;
}

function ProjectCard({ project, compact }: ProjectCardProps) {
  return (
    <div className="proj-card opacity-0 group relative border border-[var(--noir-border)] hover:border-[var(--noir-border-hover)] bg-[var(--noir-surface)]/40 backdrop-blur-sm hover:bg-[var(--noir-surface)]/80 transition-all duration-500">
      <div className={compact ? 'p-6' : 'p-8 lg:p-10'}>
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3
              className={`${compact ? 'text-xl' : 'text-2xl lg:text-3xl'} text-[var(--noir-text)] group-hover:text-[var(--noir-accent)] transition-colors duration-300`}
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              {project.title}
            </h3>
            {project.metrics && (
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-3 w-3 text-[var(--noir-accent)]" />
                <span className="text-[11px] tracking-wide text-[var(--noir-accent)]">
                  {project.metrics}
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-3 ml-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--noir-text-muted)] hover:text-[var(--noir-accent)] transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--noir-text-muted)] hover:text-[var(--noir-accent)] transition-colors duration-300"
                aria-label="Live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className={`text-[var(--noir-text-secondary)] group-hover:text-[var(--noir-text)] leading-relaxed mb-6 transition-colors duration-300 ${compact ? 'text-sm' : 'text-sm'}`}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="text-[10px] tracking-[0.1em] uppercase text-[var(--noir-text-muted)] group-hover:text-[var(--noir-text-secondary)] px-2.5 py-1 border border-[var(--noir-border)] hover:border-[var(--noir-accent)]/30 hover:text-[var(--noir-accent)] transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Equity curve for AlphaForge */}
        {/* {project.title === 'AlphaForge' && !compact && <EquityCurve />} */}
      </div>

      {/* Subtle hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-[var(--noir-accent)]/[0.03] to-transparent" />
    </div>
  );
}
