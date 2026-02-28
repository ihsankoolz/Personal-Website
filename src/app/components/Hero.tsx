import { useEffect } from 'react';
import { motion } from 'motion/react';
import { animate, stagger } from 'animejs';
import { Github, FileText, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  useEffect(() => {
    // Use a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const titleSpans = document.querySelectorAll('.hero-title span');
      const subtitle = document.querySelector('.hero-subtitle');
      const description = document.querySelector('.hero-description');
      const buttons = document.querySelector('.hero-buttons');

      if (titleSpans.length > 0) {
        animate('.hero-title span', {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: stagger(50),
          duration: 800,
          easing: 'out-expo',
        });
      }

      if (subtitle) {
        animate('.hero-subtitle', {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 400,
          duration: 800,
          easing: 'out-expo',
        });
      }

      if (description) {
        animate('.hero-description', {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 600,
          duration: 800,
          easing: 'out-expo',
        });
      }

      if (buttons) {
        animate('.hero-buttons', {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: 800,
          duration: 800,
          easing: 'out-expo',
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <p className="text-[#00E5BE] mb-4">Hi, my name is</p>
        </motion.div>

        <h1
          className="hero-title text-5xl md:text-7xl mb-6 text-gray-100 overflow-hidden"
        >
          <span className="inline-block">Your</span>{' '}
          <span className="inline-block">Name</span>{' '}
          <span className="inline-block">Here</span>
        </h1>

        <p
          className="hero-subtitle text-3xl md:text-5xl text-gray-400 mb-8 opacity-0"
        >
          Building intelligent systems at the intersection of finance and
          software.
        </p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-gray-400 max-w-xl mb-12 text-lg"
        >
          I'm a software engineering student at SMU specializing in quantitative
          finance and machine learning. Currently in Year 2 and open to summer
          2027 internships.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="hero-buttons flex gap-4 flex-wrap"
        >
          <Button
            size="lg"
            className="bg-transparent border-2 border-[#00E5BE] text-[#00E5BE] hover:bg-[#00E5BE]/10"
            asChild
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-5 w-5" />
              View Resume
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
            asChild
          >
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
          </Button>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#00E5BE] hover:text-[#00E5BE]/80 transition-colors cursor-pointer"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="h-8 w-8 animate-bounce" />
      </motion.button>
    </section>
  );
}