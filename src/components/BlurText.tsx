import React, { useEffect, useState } from 'react';
import './BlurText.css';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'characters' | 'words';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onAnimationComplete?: () => void;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 100,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const words = text.split(' ');
  const characters = text.split('');

  const getAnimationDelay = (index: number) => {
    return `${index * delay}ms`;
  };

  const getTransformOrigin = () => {
    switch (direction) {
      case 'top':
        return 'center top';
      case 'bottom':
        return 'center bottom';
      case 'left':
        return 'left center';
      case 'right':
        return 'right center';
      default:
        return 'center top';
    }
  };

  const handleAnimationEnd = (index: number, totalItems: number) => {
    if (index === totalItems - 1 && onAnimationComplete) {
      onAnimationComplete();
    }
  };

  if (animateBy === 'words') {
    return (
      <div className={`blur-text-container ${className}`}>
        {words.map((word, index) => (
          <span
            key={index}
            className={`blur-text-word ${isVisible ? 'animate' : ''}`}
            style={{
              animationDelay: getAnimationDelay(index),
              transformOrigin: getTransformOrigin(),
            }}
            onAnimationEnd={() => handleAnimationEnd(index, words.length)}
          >
            {word}
            {index < words.length - 1 && '\u00A0'}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`blur-text-container ${className}`}>
      {characters.map((char, index) => (
        <span
          key={index}
          className={`blur-text-char ${isVisible ? 'animate' : ''}`}
          style={{
            animationDelay: getAnimationDelay(index),
            transformOrigin: getTransformOrigin(),
          }}
          onAnimationEnd={() => handleAnimationEnd(index, characters.length)}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default BlurText;