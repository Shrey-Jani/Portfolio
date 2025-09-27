import React, { useEffect, useRef } from "react";

interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
  width?: string;
  height?: string;
}

const Silk: React.FC<SilkProps> = ({
  speed = 5,
  scale = 1,
  color = "#6A0DAD",
  noiseIntensity = 1.5,
  rotation = 0,
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

    // Parse color to get RGB values
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 106, g: 13, b: 173 }; // Default royal purple
    };

    const baseColor = hexToRgb(color);

    // Noise function for organic movement
    const noise = (x: number, y: number, time: number) => {
      const a = Math.sin(x * 0.01 + time * 0.001) * 0.5;
      const b = Math.cos(y * 0.01 + time * 0.0015) * 0.5;
      const c = Math.sin((x + y) * 0.005 + time * 0.002) * 0.3;
      return (a + b + c) * noiseIntensity;
    };

    // Silk wave class
    class SilkWave {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      amplitude: number;
      frequency: number;
      phase: number;
      opacity: number;
      thickness: number;

      constructor(x: number, y: number) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.amplitude = (20 + Math.random() * 30) * scale;
        this.frequency = 0.002 + Math.random() * 0.003;
        this.phase = Math.random() * Math.PI * 2;
        this.opacity = 0.1 + Math.random() * 0.3;
        this.thickness = (5 + Math.random() * 8) * scale;
      }

      update(time: number) {
        const noiseX = noise(this.baseX, this.baseY, time);
        const noiseY = noise(this.baseY, this.baseX, time + 1000);

        this.x = this.baseX + noiseX * 50;
        this.y = this.baseY + noiseY * 50;

        this.phase += this.frequency * speed;
      }

      draw(
        ctx: CanvasRenderingContext2D,
        time: number,
        canvasWidth: number,
        canvasHeight: number
      ) {
        const waveOffset = Math.sin(this.phase) * this.amplitude;

        ctx.save();
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-canvasWidth / 2, -canvasHeight / 2);

        // Create gradient for silk effect
        const gradient = ctx.createLinearGradient(
          this.x - 50,
          this.y - 50,
          this.x + 50,
          this.y + 50
        );

        const alpha1 = this.opacity * 0.8;
        const alpha2 = this.opacity * 0.3;
        const alpha3 = this.opacity * 0.1;

        gradient.addColorStop(
          0,
          `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${alpha3})`
        );
        gradient.addColorStop(
          0.5,
          `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${alpha1})`
        );
        gradient.addColorStop(
          1,
          `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${alpha2})`
        );

        // Draw flowing silk curves
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Add glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 25 * scale;

        ctx.beginPath();

        // Create flowing silk path
        const points = 20;
        for (let i = 0; i <= points; i++) {
          const t = i / points;
          const x = this.x + t * 200 * scale;
          const y =
            this.y + Math.sin(t * Math.PI * 4 + this.phase) * waveOffset;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();

        // Draw secondary silk strands
        ctx.shadowBlur = 8 * scale;
        ctx.lineWidth = this.thickness * 0.7;
        ctx.strokeStyle = `rgba(${baseColor.r + 20}, ${baseColor.g + 20}, ${
          baseColor.b + 20
        }, ${this.opacity * 0.6})`;

        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const t = i / points;
          const x = this.x + t * 180 * scale + Math.sin(t * Math.PI * 2) * 20;
          const y =
            this.y +
            Math.sin(t * Math.PI * 3 + this.phase + 1) * waveOffset * 0.7;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();

        // Reset shadow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        ctx.restore();
      }
    }

    // Create silk waves
    const silkWaves: SilkWave[] = [];
    const waveCount = Math.floor(15 * scale);

    for (let i = 0; i < waveCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      silkWaves.push(new SilkWave(x, y));
    }

    // Animation loop
    const animate = () => {
      timeRef.current += 16 * (speed / 5);

      // Clear canvas with subtle background
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );

      bgGradient.addColorStop(
        0,
        `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.02)`
      );
      bgGradient.addColorStop(
        1,
        `rgba(${baseColor.r - 20}, ${baseColor.g - 10}, ${
          baseColor.b - 30
        }, 0.05)`
      );

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw silk waves
      silkWaves.forEach((wave) => {
        wave.update(timeRef.current);
        wave.draw(ctx, timeRef.current, canvas.width, canvas.height);
      });

      // Add floating particles for extra silk effect
      ctx.fillStyle = `rgba(${baseColor.r + 30}, ${baseColor.g + 30}, ${
        baseColor.b + 30
      }, 0.1)`;
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2 * scale;
        const time = timeRef.current * 0.001;
        const offsetX = Math.sin(time + i) * 20;
        const offsetY = Math.cos(time + i * 1.5) * 15;

        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
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
  }, [speed, scale, color, noiseIntensity, rotation]);

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

export default Silk;
