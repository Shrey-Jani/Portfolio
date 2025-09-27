import React, { useRef, useEffect } from 'react';

interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
}

const LogoLoop: React.FC<LogoLoopProps> = ({
  logos,
  speed = 120,
  direction = 'left',
  logoHeight = 48,
  gap = 40,
  pauseOnHover = true,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Logo carousel'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    
    if (!container || !content) return;

    // Duplicate logos for seamless loop
    const duplicateLogos = () => {
      const originalLogos = Array.from(content.children);
      originalLogos.forEach(logo => {
        const clone = logo.cloneNode(true) as HTMLElement;
        content.appendChild(clone);
      });
    };

    duplicateLogos();

    const totalWidth = content.scrollWidth / 2; // Divide by 2 because we duplicated
    const duration = totalWidth / speed;

    content.style.animationDuration = `${duration}s`;
    content.style.animationDirection = direction === 'left' ? 'normal' : 'reverse';

    return () => {
      // Cleanup
      if (content) {
        const children = Array.from(content.children);
        children.slice(logos.length).forEach(child => child.remove());
      }
    };
  }, [logos, speed, direction]);

  const handleMouseEnter = () => {
    if (pauseOnHover && contentRef.current) {
      contentRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && contentRef.current) {
      contentRef.current.style.animationPlayState = 'running';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="logo-loop-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      style={{
        height: `${logoHeight}px`,
        position: 'relative',
        overflow: 'hidden',
        maskImage: fadeOut ? `linear-gradient(to right, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)` : undefined,
        WebkitMaskImage: fadeOut ? `linear-gradient(to right, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)` : undefined,
      }}
    >
      <div 
        ref={contentRef}
        className="logo-loop-content"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: `${gap}px`,
          height: '100%',
          animation: 'logoLoop linear infinite',
          animationPlayState: 'running',
        }}
      >
        {logos.map((logo, index) => (
          <div
            key={index}
            className={`logo-item ${scaleOnHover ? 'logo-hover-scale' : ''}`}
            style={{
              height: `${logoHeight}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              minWidth: `${logoHeight}px`,
            }}
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                title={logo.title || logo.alt}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {logo.node ? (
                  <div style={{ fontSize: `${logoHeight * 0.8}px`, display: 'flex' }}>
                    {logo.node}
                  </div>
                ) : logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.alt || ''}
                    style={{
                      height: `${logoHeight * 0.8}px`,
                      width: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                ) : null}
              </a>
            ) : (
              <>
                {logo.node ? (
                  <div style={{ fontSize: `${logoHeight * 0.8}px`, display: 'flex' }}>
                    {logo.node}
                  </div>
                ) : logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.alt || ''}
                    style={{
                      height: `${logoHeight * 0.8}px`,
                      width: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                ) : null}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;