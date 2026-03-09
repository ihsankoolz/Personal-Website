import { motion } from 'motion/react';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Contact() {
  return (
    <section
      id="contact"
      className="min-h-[80vh] flex items-center px-6 lg:px-24 py-32"
    >
      <div className="max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section label */}
          <div className="flex items-center gap-6 mb-16">
            <span className="text-[var(--noir-accent)] text-sm md:text-base tracking-[0.25em] uppercase">
              Contact
            </span>
            <span className="flex-1 h-px bg-[var(--noir-border)]" />
          </div>

          {/* Large serif headline */}
          <h2
            className="text-5xl md:text-7xl lg:text-8xl text-[var(--noir-text)] mb-8 leading-[0.95]"
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          >
            Let's build
            <br />
            <span className="text-[var(--noir-text-secondary)]">something</span>{' '}
            together<span className="text-[var(--noir-accent)]">.</span>
          </h2>

          <p className="text-[var(--noir-text-secondary)] max-w-lg mb-14 text-sm leading-relaxed">
            I'm actively looking for internship opportunities in 
            software engineering, and machine learning for Summer 2026 and 2027.
            Whether you have an opportunity or just want to say hi — my inbox is
            always open.
          </p>

          {/* Email CTA */}
          <a
            href="mailto:mihsan.a.2024@computing.smu.edu.sg"
            className="group inline-flex items-center gap-4 mb-16"
          >
            <span className="w-10 h-px bg-[var(--noir-text-muted)] group-hover:w-16 group-hover:bg-[var(--noir-accent)] transition-all duration-300" />
            <span className="text-[var(--noir-text)] group-hover:text-[var(--noir-accent)] transition-colors duration-300 text-sm tracking-wide">
              mihsan.a.2024@computing.smu.edu.sg
            </span>
          </a>

          {/* Social links */}
          <div className="flex items-center gap-8">
            <a
              href="https://github.com/ihsankoolz"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-[var(--noir-text-muted)] hover:text-[var(--noir-accent)] transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
              <span className="text-xs tracking-[0.15em] uppercase">GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/muhammadihsanalfian/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-[var(--noir-text-muted)] hover:text-[var(--noir-accent)] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
              <span className="text-xs tracking-[0.15em] uppercase">LinkedIn</span>
            </a>

            <a
              href="mailto:mihsan.a.2024@computing.smu.edu.sg"
              className="group flex items-center gap-3 text-[var(--noir-text-muted)] hover:text-[var(--noir-accent)] transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
              <span className="text-xs tracking-[0.15em] uppercase">Email</span>
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-32 pt-8 border-t border-[var(--noir-border)]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--noir-text-muted)]">
              Designed &amp; built by Ihsan Alfian
            </p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--noir-text-muted)]">
              React · Tailwind · Motion · Anime.js
            </p>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
