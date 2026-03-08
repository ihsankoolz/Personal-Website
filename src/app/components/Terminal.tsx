import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'success' | 'accent' | 'muted';
  delay: number;
}

const lines: TerminalLine[] = [
  { text: 'PS > winfetch', type: 'command', delay: 0 },
  { text: '', type: 'muted', delay: 300 },
  { text: '  ihsan@DESKTOP-IHSAN', type: 'accent', delay: 250 },
  { text: '  ─────────────────────────────────', type: 'muted', delay: 100 },
  { text: '  OS      Windows 11 Home (Build 26200)', type: 'muted', delay: 80 },
  { text: '  Shell   PowerShell 7.4', type: 'muted', delay: 80 },
  { text: '  Editor  VS Code + Neovim', type: 'muted', delay: 80 },
  { text: '  Stack   Python · TypeScript · React · PyTorch', type: 'output', delay: 80 },
  { text: '', type: 'muted', delay: 350 },
  { text: 'PS > git log --oneline -5', type: 'command', delay: 0 },
  { text: '', type: 'muted', delay: 350 },
  { text: '  a3f1d2c feat: add HMM regime detection module', type: 'output', delay: 180 },
  { text: '  e7b4a09 fix: BERT tokenizer padding for batch inference', type: 'output', delay: 180 },
  { text: '  1c9f3e8 feat: XRPL smart contract for invoice factoring', type: 'output', delay: 180 },
  { text: '  d42a7f1 refactor: RAG pipeline with hybrid retrieval', type: 'output', delay: 180 },
  { text: '  8b6e0c3 feat: D3.js artist network visualization', type: 'output', delay: 180 },
  { text: '', type: 'muted', delay: 350 },
  { text: 'PS > pip install -r requirements.txt', type: 'command', delay: 0 },
  { text: '', type: 'muted', delay: 300 },
  { text: '  Collecting xgboost==2.0.3', type: 'muted', delay: 100 },
  { text: '  Collecting torch==2.2.0', type: 'muted', delay: 100 },
  { text: '  Collecting transformers==4.38.2', type: 'muted', delay: 100 },
  { text: '  Collecting timescaledb psycopg2-binary pandas numpy scikit-learn', type: 'muted', delay: 100 },
  { text: '  Installing collected packages: 24 packages', type: 'output', delay: 400 },
  { text: '  Successfully installed 24 packages ✓', type: 'success', delay: 350 },
  { text: '', type: 'muted', delay: 350 },
  { text: 'PS > npm run build', type: 'command', delay: 0 },
  { text: '', type: 'muted', delay: 300 },
  { text: '  vite v6.2.0 building for production...', type: 'output', delay: 300 },
  { text: '  ✓ 142 modules transformed', type: 'success', delay: 500 },
  { text: '  dist/index.html                   0.46 kB │ gzip:  0.30 kB', type: 'muted', delay: 150 },
  { text: '  dist/assets/index-C8xzMpLk.css   18.23 kB │ gzip:  4.12 kB', type: 'muted', delay: 100 },
  { text: '  dist/assets/index-DkQ5Y3rZ.js   312.47 kB │ gzip: 94.81 kB', type: 'muted', delay: 100 },
  { text: '  ✓ built in 2.31s', type: 'success', delay: 300 },
  { text: '', type: 'muted', delay: 350 },
  { text: 'PS > python -m pytest tests/ -v --tb=short', type: 'command', delay: 0 },
  { text: '', type: 'muted', delay: 350 },
  { text: '  tests/test_feature_engine.py::test_signal_pipeline    PASSED', type: 'success', delay: 200 },
  { text: '  tests/test_hmm_regime.py::test_state_transition       PASSED', type: 'success', delay: 200 },
  { text: '  tests/test_sentiment.py::test_finbert_scoring         PASSED', type: 'success', delay: 200 },
  { text: '  tests/test_portfolio.py::test_kelly_optimization      PASSED', type: 'success', delay: 200 },
  { text: '  tests/test_rl_agent.py::test_crisis_detection         PASSED', type: 'success', delay: 200 },
  { text: '', type: 'muted', delay: 150 },
  { text: '  5 passed in 3.42s', type: 'success', delay: 250 },
  { text: '', type: 'muted', delay: 350 },
  { text: 'PS > docker compose up -d && curl -s localhost:8000/health', type: 'command', delay: 0 },
  { text: '', type: 'muted', delay: 400 },
  { text: '  ✔ api          Started', type: 'success', delay: 180 },
  { text: '  ✔ timescaledb  Started', type: 'success', delay: 180 },
  { text: '  ✔ redis        Started', type: 'success', delay: 180 },
  { text: '  {"status":"healthy","uptime":"0d 0h 0m 3s"}', type: 'accent', delay: 350 },
  { text: '', type: 'muted', delay: 250 },
  { text: '  All systems go.', type: 'success', delay: 300 },
];

const colorMap: Record<TerminalLine['type'], string> = {
  command: 'var(--noir-text)',
  output: 'var(--noir-text-secondary)',
  success: '#4ade80',
  accent: 'var(--noir-accent)',
  muted: 'var(--noir-text-muted)',
};

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let lineIndex = 0;

    const showNext = () => {
      if (lineIndex >= lines.length) return;
      const line = lines[lineIndex];

      if (line.type === 'command') {
        setIsTyping(true);
        let charIndex = 0;
        const typeChar = () => {
          if (charIndex <= line.text.length) {
            setTypingText(line.text.slice(0, charIndex));
            charIndex++;
            timeoutRef.current = setTimeout(typeChar, 22);
          } else {
            setIsTyping(false);
            setTypingText('');
            lineIndex++;
            setVisibleLines(lineIndex);
            if (lineIndex < lines.length) {
              timeoutRef.current = setTimeout(showNext, lines[lineIndex]?.delay ?? 300);
            }
          }
        };
        typeChar();
      } else {
        lineIndex++;
        setVisibleLines(lineIndex);
        if (lineIndex < lines.length) {
          timeoutRef.current = setTimeout(showNext, lines[lineIndex]?.delay ?? 200);
        }
      }
    };

    timeoutRef.current = setTimeout(showNext, 400);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [hasStarted]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines, typingText]);

  return (
    <section ref={ref} className="py-24 px-6 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="border border-[var(--noir-border)] bg-[var(--noir-surface)]/60 backdrop-blur-sm overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--noir-border)] bg-[var(--noir-surface)]/80">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-3 text-[10px] tracking-[0.15em] uppercase text-[var(--noir-text-muted)]">
              ihsan@DESKTOP-IHSAN — PowerShell 7
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className="p-5 h-[440px] overflow-y-auto font-mono text-[12px] md:text-[13px] leading-[1.7] scroll-smooth"
          >
            {lines.slice(0, visibleLines).map((line, i) => (
              <div key={i} style={{ color: colorMap[line.type] }}>
                {line.text || '\u00A0'}
              </div>
            ))}

            {isTyping && (
              <div style={{ color: colorMap.command }}>
                {typingText}
                <span className="animate-pulse">▋</span>
              </div>
            )}

            {!isTyping && visibleLines >= lines.length && (
              <div className="text-[var(--noir-text-muted)] mt-1">
                {'PS > '}<span className="animate-pulse">▋</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
