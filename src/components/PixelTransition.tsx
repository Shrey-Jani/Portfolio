import React, { useState, useEffect, useRef } from 'react';
import './PixelTransition.css';

interface PixelTransitionProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  className?: string;
  trigger?: 'hover' | 'click' | 'auto';
  autoDelay?: number;
}

const PixelTransition: React.FC<PixelTransitionProps> = ({
  firstContent,
  secondContent,
  gridSize = 12,
  pixelColor = '#ffffff',
  animationStepDuration = 0.4,
  className = '',
  trigger = 'hover',
  autoDelay = 3000
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (trigger === 'auto') {
      const autoTransition = () => {
        setIsTransitioning(true);
        setTimeout(() => {
          setShowSecond(prev => !prev);
          setIsTransitioning(false);
        }, gridSize * gridSize * 50);
      };

      timeoutRef.current = setInterval(autoTransition, autoDelay);
      return () => {
        if (timeoutRef.current) {
          clearInterval(timeoutRef.current);
        }
      };
    }
  }, [trigger, autoDelay, gridSize]);

  const handleTransition = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Create pixel overlay
    if (containerRef.current) {
      const container = containerRef.current;
      const pixelsContainer = container.querySelector('.pixels-overlay') as HTMLDivElement;
      
      if (pixelsContainer) {
        pixelsContainer.innerHTML = '';
        
        // Create grid of pixels
        for (let i = 0; i < gridSize * gridSize; i++) {
          const pixel = document.createElement('div');
          pixel.className = 'pixel';
          pixel.style.backgroundColor = pixelColor;
          pixel.style.animationDelay = `${Math.random() * animationStepDuration}s`;
          pixelsContainer.appendChild(pixel);
        }
        
        // Start animation
        pixelsContainer.classList.add('animating');
        
        // Switch content halfway through
        setTimeout(() => {
          setShowSecond(!showSecond);
        }, (animationStepDuration * 1000) / 2);
        
        // End animation
        setTimeout(() => {
          pixelsContainer.classList.remove('animating');
          setIsTransitioning(false);
        }, animationStepDuration * 1000);
      }
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      handleTransition();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      handleTransition();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`pixel-transition-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{
        '--grid-size': gridSize,
        '--animation-duration': `${animationStepDuration}s`
      } as React.CSSProperties}
    >
      <div className="content-container">
        {showSecond ? secondContent : firstContent}
      </div>
      
      <div 
        className="pixels-overlay"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`
        }}
      />
    </div>
  );
};

export default PixelTransition;