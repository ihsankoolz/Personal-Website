import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { ParticleNetwork } from './components/ParticleNetwork';
// import { Metrics } from './components/Metrics'; // Commented out — will re-enable when more achievements are ready
import { Terminal } from './components/Terminal';

export default function App() {
  return (
    <div className="bg-[var(--noir-bg)] text-[var(--noir-text)] min-h-screen relative">
      {/* Animated particle network background */}
      <ParticleNetwork />

      {/* Film grain overlay */}
      <div className="grain-overlay" />

      {/* Fixed side elements — desktop only */}
      <aside className="fixed left-8 bottom-0 z-40 hidden lg:flex flex-col items-center gap-5">
        <a
          href="https://github.com/ihsankoolz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--noir-text-muted)] hover:text-[var(--noir-accent)] transition-colors duration-300 -rotate-0"
          aria-label="GitHub"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        </a>
        <a
          href="https://www.linkedin.com/in/muhammadihsanalfian/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--noir-text-muted)] hover:text-[var(--noir-accent)] transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a
          href="mailto:mihsan.a.2024@computing.smu.edu.sg"
          className="text-[var(--noir-text-muted)] hover:text-[var(--noir-accent)] transition-colors duration-300"
          aria-label="Email"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
        <div className="w-px h-24 bg-[var(--noir-border-hover)]" />
      </aside>

      <Navigation />
      <main>
        <Hero />
        <About />
        {/* <Metrics /> */}
        <Projects />
        <Experience />
        <Skills />
        <Terminal />
        <Contact />
      </main>
    </div>
  );
}
