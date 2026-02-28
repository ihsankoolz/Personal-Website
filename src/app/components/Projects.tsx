import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { animate, stagger } from 'animejs';
import { Github, ExternalLink, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

const projects = [
  {
    title: 'AlphaForge',
    description:
      'Quantitative trading platform implementing multiple strategy engines with machine learning-driven alpha generation. Achieved Sharpe ratio of 2.1+ with max drawdown under 12%.',
    tech: [
      'Python',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'PostgreSQL',
      'Redis',
      'Docker',
    ],
    github: 'https://github.com/yourusername/alphaforge',
    live: null,
    featured: true,
    metrics: 'Sharpe Ratio: 2.1 | Max DD: 12%',
  },
  {
    title: 'RLFactor - Top 8 at Ripple Hackathon',
    description:
      'Reinforcement learning framework for factor discovery in financial markets. Used deep Q-learning to identify non-linear patterns in market data.',
    tech: ['Python', 'TensorFlow', 'OpenAI Gym', 'React', 'FastAPI'],
    github: 'https://github.com/yourusername/rlfactor',
    live: 'https://rlfactor-demo.vercel.app',
    featured: true,
  },
  {
    title: 'Portfolio Optimizer',
    description:
      'Web app for mean-variance portfolio optimization with Monte Carlo simulations. Features real-time data fetching and interactive efficient frontier visualization.',
    tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'Recharts', 'yfinance'],
    github: 'https://github.com/yourusername/portfolio-optimizer',
    live: 'https://portfolio-optimizer.vercel.app',
    featured: true,
  },
  {
    title: 'DevTools CLI',
    description:
      'Command-line tool to automate common development workflows. Bootstraps projects, manages environments, and integrates with GitHub Actions.',
    tech: ['TypeScript', 'Node.js', 'Commander.js', 'Inquirer'],
    github: 'https://github.com/yourusername/devtools-cli',
    live: null,
    featured: false,
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sectionRef.current) {
            const projectCards = sectionRef.current.querySelectorAll('.project-card');
            
            if (projectCards.length > 0) {
              animate(projectCards, {
                opacity: [0, 1],
                translateY: [60, 0],
                delay: stagger(200),
                duration: 1000,
                easing: 'out-expo',
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
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
          <span className="text-[#00E5BE]">03.</span> Featured Projects
          <span className="h-px bg-gray-700 flex-1 ml-4"></span>
        </motion.h2>

        <div className="space-y-8">
          {projects
            .filter((p) => p.featured)
            .map((project, idx) => (
              <div
                key={idx}
                className="project-card opacity-0 group relative bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-[#00E5BE]/50 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl text-gray-100 mb-2 group-hover:text-[#00E5BE] transition-colors duration-300">
                        {project.title}
                      </h3>
                      {project.metrics && (
                        <div className="flex items-center gap-2 text-sm text-[#00E5BE] mb-3">
                          <TrendingUp className="h-4 w-4" />
                          <span>{project.metrics}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#00E5BE] transition-colors"
                          aria-label="View on GitHub"
                        >
                          <Github className="h-6 w-6" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#00E5BE] transition-colors"
                          aria-label="View live demo"
                        >
                          <ExternalLink className="h-6 w-6" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-3 py-1 text-sm bg-gray-800/50 text-[#00E5BE] rounded-full border border-gray-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00E5BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-3xl"></div>
              </div>
            ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-[#00E5BE] text-[#00E5BE] hover:bg-[#00E5BE]/10"
            asChild
          >
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}