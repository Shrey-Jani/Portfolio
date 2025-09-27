import React, { useEffect, useRef } from "react";

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
  width?: string;
  height?: string;
}

const Lightning: React.FC<LightningProps> = ({
  hue = 220,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
  width = "100%",
  height = "100%",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Lightning bolt class
    class LightningBolt {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      segments: Array<{ x: number; y: number }>;
      life: number;
      maxLife: number;
      thickness: number;
      opacity: number;

      constructor(startX: number, startY: number, endX: number, endY: number) {
        this.x = startX;
        this.y = startY;
        this.targetX = endX;
        this.targetY = endY;
        this.segments = [];
        this.life = 0;
        this.maxLife = 30 + Math.random() * 30;
        this.thickness = (1 + Math.random() * 3) * size;
        this.opacity = 0.8 + Math.random() * 0.2;
        this.generateSegments();
      }

      generateSegments() {
        this.segments = [{ x: this.x, y: this.y }];

        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.floor(distance / (20 * size));

        for (let i = 1; i < steps; i++) {
          const progress = i / steps;
          const x =
            this.x + dx * progress + (Math.random() - 0.5) * 60 * intensity;
          const y =
            this.y + dy * progress + (Math.random() - 0.5) * 60 * intensity;
          this.segments.push({ x, y });
        }

        this.segments.push({ x: this.targetX, y: this.targetY });
      }

      update() {
        this.life++;

        // Regenerate segments occasionally for flickering effect
        if (Math.random() < 0.1 * intensity) {
          this.generateSegments();
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.segments.length < 2) return;

        const alpha = this.opacity * (1 - this.life / this.maxLife);
        if (alpha <= 0) return;

        // Main lightning bolt
        ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${alpha})`;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Add glow effect
        ctx.shadowColor = `hsl(${hue}, 100%, 80%)`;
        ctx.shadowBlur = 10 * size;

        ctx.beginPath();
        ctx.moveTo(this.segments[0].x, this.segments[0].y);

        for (let i = 1; i < this.segments.length; i++) {
          ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }

        ctx.stroke();

        // Brighter inner bolt
        ctx.strokeStyle = `hsla(${hue}, 100%, 90%, ${alpha * 0.8})`;
        ctx.lineWidth = this.thickness * 0.3;
        ctx.shadowBlur = 5 * size;

        ctx.beginPath();
        ctx.moveTo(this.segments[0].x, this.segments[0].y);

        for (let i = 1; i < this.segments.length; i++) {
          ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }

        ctx.stroke();

        // Reset shadow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }

      isDead(): boolean {
        return this.life >= this.maxLife;
      }
    }

    // Lightning system
    const lightningBolts: LightningBolt[] = [];
    let lastLightningTime = 0;

    const createLightning = () => {
      const startX =
        Math.random() * canvas.width * 0.8 + canvas.width * 0.1 + xOffset;
      const startY = Math.random() * canvas.height * 0.3;
      const endX = startX + (Math.random() - 0.5) * 200 * intensity;
      const endY = canvas.height * (0.6 + Math.random() * 0.4);

      lightningBolts.push(new LightningBolt(startX, startY, endX, endY));

      // Add branching bolts
      if (Math.random() < 0.6 * intensity) {
        const branchStartIdx = Math.floor(
          Math.random() *
            (lightningBolts[lightningBolts.length - 1].segments.length - 1)
        );
        const branchStart =
          lightningBolts[lightningBolts.length - 1].segments[branchStartIdx];
        const branchEndX =
          branchStart.x + (Math.random() - 0.5) * 150 * intensity;
        const branchEndY = branchStart.y + Math.random() * 100 * intensity;

        lightningBolts.push(
          new LightningBolt(
            branchStart.x,
            branchStart.y,
            branchEndX,
            branchEndY
          )
        );
      }
    };

    // Animation loop
    const animate = () => {
      timeRef.current += 16 * speed; // ~60fps adjusted by speed

      // Dark background with slight purple tint
      ctx.fillStyle = `hsla(${hue}, 20%, 5%, 0.1)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create new lightning bolts
      const timeSinceLastLightning = Date.now() - lastLightningTime;
      const lightningInterval =
        1000 / intensity + Math.random() * (2000 / intensity);

      if (timeSinceLastLightning > lightningInterval) {
        createLightning();
        lastLightningTime = Date.now();
      }

      // Update and draw lightning bolts
      for (let i = lightningBolts.length - 1; i >= 0; i--) {
        const bolt = lightningBolts[i];
        bolt.update();
        bolt.draw(ctx);

        if (bolt.isDead()) {
          lightningBolts.splice(i, 1);
        }
      }

      // Add atmospheric particles
      ctx.fillStyle = `hsla(${hue}, 60%, 80%, 0.1)`;
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2 * size;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [hue, xOffset, speed, intensity, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default Lightning;
