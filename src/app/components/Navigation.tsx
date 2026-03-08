import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-[var(--noir-bg)]/90 backdrop-blur-md border-b border-[var(--noir-border)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="group cursor-pointer"
          >
            <span className="text-[var(--noir-text)] text-sm tracking-[0.2em] uppercase font-medium group-hover:text-[var(--noir-accent)] transition-colors duration-300">
              Muhammad Ihsan Bin Alfian
            </span>
            <span className="text-[var(--noir-accent)] ml-1">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className="link-reveal text-[var(--noir-text-secondary)] hover:text-[var(--noir-text)] transition-colors duration-300 text-xs tracking-[0.15em] uppercase cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[var(--noir-text)] hover:text-[var(--noir-accent)] transition-colors w-8 h-8 flex flex-col items-end justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 5, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
              className="block h-px bg-current origin-center"
              style={{ width: '100%' }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
              className="block h-px bg-current"
              style={{ width: '60%' }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -7, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
              className="block h-px bg-current origin-center"
              style={{ width: '80%' }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-[var(--noir-bg)]/98 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center justify-center h-full gap-10">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="text-2xl text-[var(--noir-text)] hover:text-[var(--noir-accent)] transition-colors cursor-pointer"
                  style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
