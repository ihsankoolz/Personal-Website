import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulseOffset: number;
}

const PARTICLE_COUNT = 160;
const CONNECTION_DISTANCE = 200;
const MOUSE_RADIUS = 350;
const BASE_SPEED = 0.4;

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const dimensionsRef = useRef({ w: 0, h: 0 });
  const timeRef = useRef(0);

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * BASE_SPEED * 2,
        vy: (Math.random() - 0.5) * BASE_SPEED * 2,
        radius: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.6 + 0.3,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      dimensionsRef.current = { w, h };

      if (particlesRef.current.length === 0) {
        initParticles(w, h);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const accentR = 224, accentG = 90, accentB = 51;   // #E05A33
    const baseR = 140, baseG = 135, baseB = 125;        // warm muted for idle particles

    const draw = () => {
      const { w, h } = dimensionsRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      timeRef.current += 0.016;
      const time = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // Draw a radial glow around the mouse cursor
      if (mouse.x > -500) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
        gradient.addColorStop(0, `rgba(${accentR},${accentG},${accentB},0.06)`);
        gradient.addColorStop(0.5, `rgba(${accentR},${accentG},${accentB},0.02)`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(mouse.x - MOUSE_RADIUS, mouse.y - MOUSE_RADIUS, MOUSE_RADIUS * 2, MOUSE_RADIUS * 2);
      }

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Mouse attraction (pull toward cursor) + close-range repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          if (dist > 60) {
            // Attract toward mouse
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.03;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          } else {
            // Repel when too close — prevents clumping
            const force = (60 - dist) / 60 * 0.08;
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
          }
        }

        // Dampen
        p.vx *= 0.997;
        p.vy *= 0.997;

        // Min speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < BASE_SPEED * 0.4) {
          p.vx += (Math.random() - 0.5) * 0.04;
          p.vy += (Math.random() - 0.5) * 0.04;
        }
        // Max speed cap
        if (speed > BASE_SPEED * 4) {
          p.vx *= 0.95;
          p.vy *= 0.95;
        }
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const proximity = 1 - dist / CONNECTION_DISTANCE;

            // Check if near mouse
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const mouseDist = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2);
            const mouseT = mouseDist < MOUSE_RADIUS ? 1 - mouseDist / MOUSE_RADIUS : 0;

            const r = Math.round(baseR + (accentR - baseR) * mouseT);
            const g = Math.round(baseG + (accentG - baseG) * mouseT);
            const b = Math.round(baseB + (accentB - baseB) * mouseT);

            // Base alpha is much higher, mouse makes it even brighter
            const alpha = proximity * (0.25 + mouseT * 0.45);

            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 0.8 + mouseT * 1.2 + proximity * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const mouseDist = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2);
        const mouseT = mouseDist < MOUSE_RADIUS ? 1 - mouseDist / MOUSE_RADIUS : 0;

        // Pulse effect
        const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.3 + 0.7;

        const r = Math.round(baseR + (accentR - baseR) * mouseT);
        const g = Math.round(baseG + (accentG - baseG) * mouseT);
        const b = Math.round(baseB + (accentB - baseB) * mouseT);

        const finalRadius = p.radius * pulse + mouseT * 3;
        const finalOpacity = p.opacity + mouseT * 0.5;

        // Outer glow for particles near mouse
        if (mouseT > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, finalRadius + 6 * mouseT, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accentR},${accentG},${accentB},${mouseT * 0.12})`;
          ctx.fill();
        }

        // Main particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, finalRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${finalOpacity})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
