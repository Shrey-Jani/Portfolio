import React, { useEffect, useRef } from "react";

interface LiquidEtherProps {
  colors: string[];
  mouseForce: number;
  cursorSize: number;
  isViscous: boolean;
  viscous: number;
  iterationsViscous: number;
  iterationsPoisson: number;
  resolution: number;
  isBounce: boolean;
  autoDemo: boolean;
  autoSpeed: number;
  autoIntensity: number;
  takeoverDuration: number;
  autoResumeDelay: number;
  autoRampDuration: number;
}

const LiquidEther: React.FC<LiquidEtherProps> = ({
  colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  resolution = 0.5,
  isBounce = false,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const autoMouseRef = useRef({ x: 0, y: 0, angle: 0 });
  const lastMouseMoveTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * resolution;
      canvas.height = rect.height * resolution;
      ctx.scale(resolution, resolution);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Liquid simulation variables
    let time = 0;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
    }> = [];

    // Create initial particles
    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: (Math.random() * canvas.width) / resolution,
          y: (Math.random() * canvas.height) / resolution,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    createParticles();

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
      mouseRef.current.isActive = true;
      lastMouseMoveTime.current = Date.now();
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      time += 0.016; // ~60fps

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width / resolution,
        canvas.height / resolution
      );
      gradient.addColorStop(0, colors[0] + "20");
      gradient.addColorStop(0.5, colors[1] + "20");
      gradient.addColorStop(1, colors[2] + "20");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width / resolution, canvas.height / resolution);

      // Check if mouse should take over from auto demo
      const timeSinceMouseMove = Date.now() - lastMouseMoveTime.current;
      const useMouseControl =
        mouseRef.current.isActive && timeSinceMouseMove < autoResumeDelay;

      // Auto demo movement (when mouse is not active)
      if (autoDemo && !useMouseControl) {
        autoMouseRef.current.angle += autoSpeed * 0.01;
        autoMouseRef.current.x =
          canvas.width / resolution / 2 +
          Math.cos(autoMouseRef.current.angle) * autoIntensity * 50;
        autoMouseRef.current.y =
          canvas.height / resolution / 2 +
          Math.sin(autoMouseRef.current.angle * 1.3) * autoIntensity * 30;
      }

      // Update particles
      particles.forEach((particle, index) => {
        // Apply mouse force - use mouse when active, otherwise auto demo
        const mouseX = useMouseControl
          ? mouseRef.current.x
          : autoMouseRef.current.x;
        const mouseY = useMouseControl
          ? mouseRef.current.y
          : autoMouseRef.current.y;

        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < cursorSize) {
          const force = (cursorSize - distance) / cursorSize;
          particle.vx += (dx / distance) * force * mouseForce * 0.1;
          particle.vy += (dy / distance) * force * mouseForce * 0.1;
        }

        // Apply viscosity
        if (isViscous) {
          particle.vx *= 1 - viscous * 0.001;
          particle.vy *= 1 - viscous * 0.001;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary conditions
        if (isBounce) {
          if (particle.x < 0 || particle.x > canvas.width / resolution) {
            particle.vx *= -0.8;
            particle.x = Math.max(
              0,
              Math.min(canvas.width / resolution, particle.x)
            );
          }
          if (particle.y < 0 || particle.y > canvas.height / resolution) {
            particle.vy *= -0.8;
            particle.y = Math.max(
              0,
              Math.min(canvas.height / resolution, particle.y)
            );
          }
        } else {
          // Wrap around
          if (particle.x < 0) particle.x = canvas.width / resolution;
          if (particle.x > canvas.width / resolution) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height / resolution;
          if (particle.y > canvas.height / resolution) particle.y = 0;
        }

        // Update life
        particle.life++;
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = (Math.random() * canvas.width) / resolution;
          particle.y = (Math.random() * canvas.height) / resolution;
          particle.vx = (Math.random() - 0.5) * 2;
          particle.vy = (Math.random() - 0.5) * 2;
        }

        // Draw particle with liquid effect
        const alpha = 1 - particle.life / particle.maxLife;
        const size = 3 + Math.sin(particle.life * 0.1) * 2;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle =
          particle.color +
          Math.floor(alpha * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        // Draw connections between nearby particles
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            const alpha = (80 - distance) / 80;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle =
              colors[0] +
              Math.floor(alpha * 100)
                .toString(16)
                .padStart(2, "0");
            ctx.stroke();
          }
        });
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [
    colors,
    mouseForce,
    cursorSize,
    isViscous,
    viscous,
    resolution,
    isBounce,
    autoDemo,
    autoSpeed,
    autoIntensity,
    autoResumeDelay,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "auto",
      }}
    />
  );
};

export default LiquidEther;
