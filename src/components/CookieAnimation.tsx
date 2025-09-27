import React, { useEffect, useRef, useState } from 'react';
import './CookieAnimation.css';

interface CookieAnimationProps {
  isActive?: boolean;
  size?: number;
}

const CookieAnimation: React.FC<CookieAnimationProps> = ({ 
  isActive = false, 
  size = 80 
}) => {
  const [animationPhase, setAnimationPhase] = useState<'mixing' | 'baking' | 'decorating' | 'selling'>('mixing');
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<NodeJS.Timeout>();

  const phases = ['mixing', 'baking', 'decorating', 'selling'] as const;

  useEffect(() => {
    if (isActive) {
      setIsAnimating(true);
      
      const cyclePhases = () => {
        let currentPhaseIndex = 0;
        
        const nextPhase = () => {
          setAnimationPhase(phases[currentPhaseIndex]);
          currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
          
          // Each phase lasts 2.5 seconds
          animationRef.current = setTimeout(nextPhase, 2500);
        };
        
        nextPhase();
      };

      cyclePhases();
    } else {
      setIsAnimating(false);
      setAnimationPhase('mixing');
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <div 
      className="cookie-animation-container"
      style={{ 
        width: size, 
        height: size,
        '--cookie-size': `${size}px`
      } as React.CSSProperties}
    >
      {/* Cookie Bakery Scene */}
      <div className={`cookie-bakery ${isAnimating ? 'active' : ''}`}>
        
        {/* Mixing Phase */}
        {animationPhase === 'mixing' && (
          <div className="mixing-scene">
            <div className="mixing-bowl">
              <div className="bowl-rim"></div>
              <div className="bowl-body"></div>
              <div className="cookie-dough">
                <div className="ingredient ingredient-1"></div>
                <div className="ingredient ingredient-2"></div>
                <div className="ingredient ingredient-3"></div>
              </div>
            </div>
            <div className="mixing-spoon"></div>
            <div className="mixing-particles">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className={`particle particle-${i + 1}`}></div>
              ))}
            </div>
          </div>
        )}

        {/* Baking Phase */}
        {animationPhase === 'baking' && (
          <div className="baking-scene">
            <div className="oven">
              <div className="oven-body"></div>
              <div className="oven-door"></div>
              <div className="oven-window"></div>
              <div className="oven-handle"></div>
            </div>
            <div className="raw-cookie">
              <div className="cookie-base baking"></div>
              <div className="chocolate-chips">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className={`chip chip-${i + 1}`}></div>
                ))}
              </div>
            </div>
            <div className="heat-waves">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className={`heat-wave wave-${i + 1}`}></div>
              ))}
            </div>
          </div>
        )}

        {/* Decorating Phase */}
        {animationPhase === 'decorating' && (
          <div className="decorating-scene">
            <div className="baked-cookie">
              <div className="cookie-base golden"></div>
              <div className="chocolate-chips">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className={`chip chip-${i + 1} baked`}></div>
                ))}
              </div>
            </div>
            <div className="decoration-tools">
              <div className="icing-bag">
                <div className="bag-body"></div>
                <div className="bag-tip"></div>
                <div className="icing-drip"></div>
              </div>
              <div className="sprinkles">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className={`sprinkle sprinkle-${i + 1}`}></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selling Phase */}
        {animationPhase === 'selling' && (
          <div className="selling-scene">
            <div className="cookie-package">
              <div className="package-box"></div>
              <div className="package-ribbon"></div>
              <div className="package-bow"></div>
            </div>
            <div className="finished-cookie premium">
              <div className="cookie-base premium-golden"></div>
              <div className="chocolate-chips">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className={`chip chip-${i + 1} premium`}></div>
                ))}
              </div>
              <div className="icing-decoration"></div>
              <div className="sprinkle-decoration">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className={`final-sprinkle sprinkle-${i + 1}`}></div>
                ))}
              </div>
            </div>
            <div className="selling-sparkles">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className={`sparkle sparkle-${i + 1}`}></div>
              ))}
            </div>
            <div className="price-tag">$5</div>
          </div>
        )}

        {/* Phase Indicator */}
        <div className="phase-indicator">
          <div className={`phase-dot ${animationPhase === 'mixing' ? 'active' : ''}`}></div>
          <div className={`phase-dot ${animationPhase === 'baking' ? 'active' : ''}`}></div>
          <div className={`phase-dot ${animationPhase === 'decorating' ? 'active' : ''}`}></div>
          <div className={`phase-dot ${animationPhase === 'selling' ? 'active' : ''}`}></div>
        </div>
      </div>

      {/* Process Label */}
      <div className="process-label">
        {animationPhase === 'mixing' && 'Mixing...'}
        {animationPhase === 'baking' && 'Baking...'}
        {animationPhase === 'decorating' && 'Decorating...'}
        {animationPhase === 'selling' && 'Ready to Sell!'}
      </div>
    </div>
  );
};

export default CookieAnimation;