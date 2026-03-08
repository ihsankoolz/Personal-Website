import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { animate, stagger } from 'animejs';

export function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!titleRef.current) return;

      const chars = titleRef.current.querySelectorAll('.hero-char');
      const meta = document.querySelectorAll('.hero-meta');
      const tagline = document.querySelector('.hero-tagline');
      const desc = document.querySelector('.hero-desc');
      const ctas = document.querySelector('.hero-ctas');

      if (chars.length > 0) {
        animate(chars, {
          opacity: [0, 1],
          translateY: [60, 0],
          delay: stagger(30, { start: 200 }),
          duration: 1000,
          easing: 'out(4)',
        });
      }

      if (meta.length > 0) {
        animate(meta, {
          opacity: [0, 1],
          translateY: [15, 0],
          delay: stagger(80, { start: 100 }),
          duration: 800,
          easing: 'out(3)',
        });
      }

      if (tagline) {
        animate(tagline, {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 800,
          duration: 900,
          easing: 'out(3)',
        });
      }

      if (desc) {
        animate(desc, {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 1000,
          duration: 900,
          easing: 'out(3)',
        });
      }

      if (ctas) {
        animate(ctas, {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 1200,
          duration: 900,
          easing: 'out(3)',
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const splitText = (text: string) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block opacity-0"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 lg:px-24 relative overflow-hidden"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 dot-grid-bg opacity-30" />

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-0 w-px h-[45vh] bg-gradient-to-b from-transparent via-[var(--noir-accent)] to-transparent opacity-20 translate-x-[-15vw]" />

      <div className="relative max-w-6xl w-full group">
        {/* Top meta line */}
        <div className="flex items-center gap-6 mb-10">
          <span className="hero-meta opacity-0 text-[var(--noir-accent)] text-xs tracking-[0.25em] uppercase">
            Software Engineer
          </span>
          <span className="hero-meta opacity-0 w-12 h-px bg-[var(--noir-border-hover)]" />
          <span className="hero-meta opacity-0 text-[var(--noir-text-muted)] text-xs tracking-[0.25em] uppercase">
            Singapore
          </span>
        </div>

        {/* Main name — dramatic serif italic */}
        <div ref={titleRef} className="mb-8">
          <h1
            className="text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-[-0.02em] text-[var(--noir-text)]"
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          >
            <span className="block">{splitText('Ihsan')}</span>
            <span className="block text-[var(--noir-text-secondary)]">
              {splitText('Alfian')}
              <span className="hero-char inline-block opacity-0 text-[var(--noir-accent)]">.</span>
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <p
          className="hero-tagline opacity-0 text-lg md:text-xl text-[var(--noir-text-secondary)] group-hover:text-[var(--noir-text)] max-w-2xl mb-6 leading-relaxed transition-colors duration-400"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        >
          Building intelligent systems at the intersection of finance &amp; software.
        </p>

        {/* Description */}
        <p className="hero-desc opacity-0 text-[var(--noir-text-muted)] group-hover:text-[var(--noir-text-secondary)] max-w-lg mb-14 text-sm leading-relaxed transition-colors duration-400">
          Year 2 Information Systems student at SMU, specialising in Business
          Analytics. Focused on quantitative development, machine learning, and
          software engineering. Open to internships.
        </p>

        {/* CTAs */}
        <div className="hero-ctas opacity-0 flex items-center gap-6 flex-wrap">
          <a
            href="https://github.com/ihsankoolz"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-[var(--noir-text)] hover:text-[var(--noir-accent)] transition-colors duration-300"
          >
            <span className="w-8 h-px bg-[var(--noir-text-muted)] group-hover:bg-[var(--noir-accent)] group-hover:w-12 transition-all duration-300" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/muhammadihsanalfian/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-[var(--noir-text)] hover:text-[var(--noir-accent)] transition-colors duration-300"
          >
            <span className="w-8 h-px bg-[var(--noir-text-muted)] group-hover:bg-[var(--noir-accent)] group-hover:w-12 transition-all duration-300" />
            LinkedIn
          </a>
          <a
            href="mailto:mihsan.a.2024@computing.smu.edu.sg"
            className="group flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-[var(--noir-text)] hover:text-[var(--noir-accent)] transition-colors duration-300"
          >
            <span className="w-8 h-px bg-[var(--noir-text-muted)] group-hover:bg-[var(--noir-accent)] group-hover:w-12 transition-all duration-300" />
            Email
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-6 lg:left-24 flex items-center gap-4"
      >
        <div className="w-px h-10 bg-[var(--noir-border-hover)] relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-1/2 bg-[var(--noir-accent)]"
          />
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--noir-text-muted)]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
