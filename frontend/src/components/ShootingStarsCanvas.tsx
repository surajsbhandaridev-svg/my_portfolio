import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  size: number;
  active: boolean;
  trail: { x: number; y: number }[];
}

interface TwinkleStar {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  delta: number;
}

export const ShootingStarsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initTwinkleStars();
    };

    window.addEventListener('resize', handleResize);

    // Subtle background twinkle stars
    const twinkleCount = Math.floor((width * height) / 28000); // lightweight
    let twinkleStars: TwinkleStar[] = [];

    const initTwinkleStars = () => {
      twinkleStars = [];
      for (let i = 0; i < twinkleCount; i++) {
        twinkleStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.9 + 0.3,
          alpha: Math.random() * 0.6 + 0.1,
          delta: (Math.random() * 0.006 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    };

    initTwinkleStars();

    // Shooting stars pool
    const shootingStars: Star[] = [];
    const maxShootingStars = 3;

    const createShootingStar = (): Star => {
      // Diagonal trajectory from top-left or top to bottom-right
      const startX = Math.random() * width * 0.8;
      const startY = Math.random() * height * 0.3;
      const speed = Math.random() * 4 + 4; // moderate speed
      const length = Math.random() * 90 + 70;
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.15; // ~45 degrees diagonal

      return {
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        opacity: 1,
        size: Math.random() * 1.5 + 1.2,
        active: true,
        trail: [],
      };
    };

    let lastSpawnTime = Date.now();
    let nextSpawnDelay = Math.random() * 2500 + 1500; // random spawn interval

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle background twinkling stars
      for (let i = 0; i < twinkleStars.length; i++) {
        const star = twinkleStars[i];
        star.alpha += star.delta;
        if (star.alpha > 0.7 || star.alpha < 0.1) {
          star.delta = -star.delta;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 233, 239, ${star.alpha})`;
        ctx.fill();
      }

      // 2. Check if we should spawn a shooting star
      const now = Date.now();
      if (now - lastSpawnTime > nextSpawnDelay && shootingStars.length < maxShootingStars) {
        shootingStars.push(createShootingStar());
        lastSpawnTime = now;
        nextSpawnDelay = Math.random() * 4000 + 2000;
      }

      // 3. Update & render shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.active) {
          shootingStars.splice(i, 1);
          continue;
        }

        const vx = Math.cos(star.angle) * star.speed;
        const vy = Math.sin(star.angle) * star.speed;

        star.x += vx;
        star.y += vy;
        star.opacity -= 0.007;

        if (star.x > width + 100 || star.y > height + 100 || star.opacity <= 0) {
          star.active = false;
          continue;
        }

        // Draw shooting star trail
        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(240, 233, 239, ${star.opacity})`);
        gradient.addColorStop(0.2, `rgba(118, 169, 255, ${star.opacity * 0.8})`);
        gradient.addColorStop(0.7, `rgba(242, 166, 172, ${star.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(16, 16, 16, 0)');

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright white/blue luminous head
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.shadowColor = '#76A9FF';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
};
