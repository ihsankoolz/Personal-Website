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
            const textElements = sectionRef.current.querySelectorAll('.about-text p');
            const techItems = sectionRef.current.querySelectorAll('.tech-item');

            if (textElements.length > 0) {
              animate(textElements, {
                opacity: [0, 1],
                translateY: [30, 0],
                delay: stagger(100),
                duration: 800,
                easing: 'out-expo',
              });
            }

            if (techItems.length > 0) {
              animate(techItems, {
                opacity: [0, 1],
                scale: [0.8, 1],
                delay: stagger(50, { start: 400 }),
                duration: 600,
                easing: 'out-expo',
              });
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center px-6 py-24"
    >
      <div className="max-w-4xl w-full mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl mb-12 text-gray-100 flex items-center gap-4"
        >
          <span className="text-[#00E5BE]">01.</span> About Me
          <span className="h-px bg-gray-700 flex-1 ml-4"></span>
        </motion.h2>

        <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-start">
          <div className="space-y-4 about-text">
            <p className="text-gray-400 text-lg leading-relaxed opacity-0">
              I'm a second-year student at Singapore Management University,
              pursuing a degree in Software Engineering with a deep focus on
              quantitative finance and machine learning. What started as
              curiosity about how markets work has evolved into a passion for
              building intelligent trading systems.
            </p>

            <p className="text-gray-400 text-lg leading-relaxed opacity-0">
              My journey led me to develop AlphaForge, a quantitative trading
              platform implementing multiple strategy engines with impressive
              risk-adjusted returns. I'm currently self-teaching C++ to prepare
              for quant developer roles and exploring advanced ML techniques for
              alpha generation. I placed Top 8 at the Ripple RLFactor Hackathon,
              competing against teams from across Asia.
            </p>

            <p className="text-gray-400 text-lg leading-relaxed opacity-0">
              Beyond finance, I love solving complex algorithmic problems,
              contributing to open source, and building tools that make
              developers' lives easier. When I'm not coding, you'll find me
              reading research papers on market microstructure or tinkering with
              new tech stacks.
            </p>

            <p className="text-gray-400 text-lg leading-relaxed opacity-0">
              I'm currently seeking summer 2027 internships in quantitative
              trading, software engineering, or ML engineering roles where I can
              apply my skills at scale.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#00E5BE] relative">
              <div className="absolute inset-0 bg-[#00E5BE]/20 group-hover:bg-transparent transition-colors duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="absolute inset-0 border-2 border-[#00E5BE] rounded-lg translate-x-4 translate-y-4 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}