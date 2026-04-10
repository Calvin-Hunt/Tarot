import { useEffect, useRef } from 'react';
import { appThemes } from '@/data/themes';
import { usePreferences } from '@/context/PreferencesContext';

interface Star {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
}

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { selectedThemeId } = usePreferences();
  const theme = appThemes.find((entry) => entry.id === selectedThemeId) ?? appThemes[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = Array.from({ length: Math.min(180, Math.floor(width / 10)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.18 + 0.05,
        alpha: Math.random() * 0.55 + 0.15,
      }));
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      const gradient = context.createRadialGradient(width * 0.72, height * 0.2, 0, width * 0.72, height * 0.2, width * 0.7);
      gradient.addColorStop(0, 'rgba(212,176,106,0.1)');
      gradient.addColorStop(1, 'rgba(5,7,17,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = 'rgba(212,176,106,0.08)';
      for (let index = 0; index < stars.length - 12; index += 12) {
        context.beginPath();
        context.moveTo(stars[index].x, stars[index].y);
        context.lineTo(stars[index + 6].x, stars[index + 6].y);
        context.stroke();
      }

      stars.forEach((star, index) => {
        star.y += star.speed;
        if (star.y > height) {
          star.y = -2;
          star.x = Math.random() * width;
        }
        const pulse = Math.sin((Date.now() * 0.001 + index) * 0.85) * 0.1;
        context.beginPath();
        context.arc(star.x, star.y, star.radius + pulse, 0, Math.PI * 2);
        context.fillStyle = theme.starColor.replace(/[\d.]+\)$/, `${Math.max(0.08, star.alpha + pulse)})`);
        context.fill();
      });

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [theme.starColor]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-90" />;
}
