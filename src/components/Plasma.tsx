import React, { useEffect, useRef } from "react";

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: "forward" | "reverse";
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
  className?: string;
}

const Plasma: React.FC<PlasmaProps> = ({
  color = "#ff6b35",
  speed = 0.6,
  direction = "forward",
  scale = 1.1,
  opacity = 0.8,
  mouseInteractive = true,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number;
    let height: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseInteractive) {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
    };

    // Convert hex color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 255, g: 107, b: 53 };
    };

    const rgb = hexToRgb(color);

    const drawPlasma = () => {
      const time = timeRef.current * speed * (direction === "forward" ? 1 : -1);
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      // Mouse influence factors (reduced for performance)
      const mouseInfluence = mouseInteractive ? 0.00005 : 0;
      const mouseFactor = Math.sin(time * 0.05) * mouseInfluence;

      // Use larger blocks for better performance (4x4 instead of 2x2)
      for (let x = 0; x < width; x += 4) {
        for (let y = 0; y < height; y += 4) {
          // Simplified plasma algorithm (only 2 sine waves instead of 4)
          const value1 = Math.sin(x * scale * 0.008 + time * 0.8);
          const value2 = Math.sin(y * scale * 0.008 + time);

          // Mouse interaction (simplified)
          const mouseDist = mouseInteractive
            ? Math.sqrt(
                (x - mouseRef.current.x) ** 2 + (y - mouseRef.current.y) ** 2
              )
            : 0;
          const mouseEffect = mouseInteractive
            ? Math.sin(mouseDist * 0.005 + time) * mouseFactor
            : 0;

          // Combine values (simplified)
          const plasma = (value1 + value2 + mouseEffect) * 0.5;

          // Color calculation
          const colorIntensity = (Math.sin(plasma * Math.PI) + 1) * 0.5;

          const r = Math.floor(rgb.r * colorIntensity);
          const g = Math.floor(rgb.g * colorIntensity);
          const b = Math.floor(rgb.b * colorIntensity);
          const a = Math.floor(255 * opacity * colorIntensity);

          // Set pixel data (using 4x4 blocks for better performance)
          for (let dx = 0; dx < 4 && x + dx < width; dx++) {
            for (let dy = 0; dy < 4 && y + dy < height; dy++) {
              const index = ((y + dy) * width + (x + dx)) * 4;
              if (index < data.length) {
                data[index] = r; // Red
                data[index + 1] = g; // Green
                data[index + 2] = b; // Blue
                data[index + 3] = a; // Alpha
              }
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Frame rate throttling for better performance
    let lastFrameTime = 0;
    const targetFPS = 30; // Reduced from 60fps to 30fps for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTime >= frameInterval) {
        timeRef.current += 0.033; // ~30fps
        drawPlasma();
        lastFrameTime = currentTime;
      }
      animationIdRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    if (mouseInteractive) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (mouseInteractive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  return (
    <canvas
      ref={canvasRef}
      className={`plasma-canvas ${className}`}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        mixBlendMode: "screen",
      }}
    />
  );
};

export default Plasma;
