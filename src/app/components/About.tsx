import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { animate, stagger } from 'animejs';

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sectionRef.current) {
            const paras = sectionRef.current.querySelectorAll('.about-p');
            const img = sectionRef.current.querySelector('.about-img');

            if (paras.length > 0) {
              animate(paras, {
                opacity: [0, 1],
                translateY: [30, 0],
                delay: stagger(120, { start: 200 }),
                duration: 900,
                easing: 'out(3)',
              });
            }

            if (img) {
              animate(img, {
                opacity: [0, 1],
                scale: [0.96, 1],
                delay: 400,
                duration: 1000,
                easing: 'out(3)',
              });
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center px-6 lg:px-24 py-32"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-16"
        >
          <span className="text-[var(--noir-accent)] text-sm md:text-base tracking-[0.25em] uppercase">
            About
          </span>
          <span className="flex-1 h-px bg-[var(--noir-border)]" />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-16 items-start">
          {/* Text column */}
          <div className="space-y-6">
            <p className="about-p opacity-0 text-[var(--noir-text-secondary)] text-base leading-[1.8]">
              I'm a second-year Information Systems student at Singapore Management
              University, specialising in Business Analytics. What started as curiosity
              about how markets work has evolved into a passion for building intelligent
              trading systems that sit at the intersection of{' '}
              <span className="text-[var(--noir-text)]">software engineering</span> and{' '}
              <span className="text-[var(--noir-text)]">quantitative finance</span>.
            </p>

            <p className="about-p opacity-0 text-[var(--noir-text-secondary)] text-base leading-[1.8]">
              Beyond quant finance, I care about building things that matter. I led
              finance and logistics for a{' '}
              <span className="text-[var(--noir-text)]">$35,000+</span> community service
              expedition to rural Laos, and I serve as Public Relations Director at SMU's
              Business Intelligence &amp; Analytics Club, connecting{' '}
              <span className="text-[var(--noir-text)]">500+ members</span> with industry
              practitioners.
            </p>

            <p className="about-p opacity-0 text-[var(--noir-text-secondary)] text-base leading-[1.8]">
              I'm currently open to{' '}
              <span className="text-[var(--noir-accent)]">
                Summer 2026 and 2026 off-cycle (Aug - Dec) internship opportunities
              </span>{' '}
              in software engineering, or ML engineering — anywhere
              I can build meaningful things at scale.
            </p>
          </div>

          {/* Photo */}
          <div className="about-img opacity-0 relative">
            <div className="aspect-[3/4] bg-[var(--noir-surface)] overflow-hidden relative group">
              <img
                src= '/images/profile.jpg'
                alt="Ihsan Alfian"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              {/* Overlay tint */}
              <div className="absolute inset-0 bg-[var(--noir-accent)]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-700" />
            </div>
            {/* Offset border frame */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-[var(--noir-accent)]/30 -z-10" />
            {/* Small label */}
            <div className="absolute -bottom-8 left-0 text-[10px] tracking-[0.2em] uppercase text-[var(--noir-text-muted)]">
              Singapore, 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
