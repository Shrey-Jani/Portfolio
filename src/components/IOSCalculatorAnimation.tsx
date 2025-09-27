import React, { useEffect, useRef, useState } from 'react';
import './IOSCalculatorAnimation.css';

interface IOSCalculatorAnimationProps {
  isActive?: boolean;
  size?: number;
}

const IOSCalculatorAnimation: React.FC<IOSCalculatorAnimationProps> = ({ 
  isActive = false, 
  size = 80 
}) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const animationRef = useRef<NodeJS.Timeout>();

  const calculations = [
    { sequence: ['2', '+', '3', '='], result: '5' },
    { sequence: ['7', '×', '8', '='], result: '56' },
    { sequence: ['1', '5', '-', '7', '='], result: '8' },
    { sequence: ['9', '÷', '3', '='], result: '3' },
    { sequence: ['4', '×', '4', '='], result: '16' },
    { sequence: ['1', '0', '0', '-', '2', '5', '='], result: '75' },
    { sequence: ['6', '+', '6', '='], result: '12' },
    { sequence: ['9', '9', '÷', '9', '='], result: '11' }
  ];

  useEffect(() => {
    if (isActive) {
      const startCalculation = () => {
        setIsCalculating(true);
        
        // Pick a random calculation
        const calc = calculations[Math.floor(Math.random() * calculations.length)];
        let stepIndex = 0;
        
        const executeStep = () => {
          if (stepIndex < calc.sequence.length) {
            const currentStep = calc.sequence[stepIndex];
            
            // Highlight the button being pressed
            setActiveButton(currentStep);
            
            // Update display
            if (currentStep === '=') {
              setTimeout(() => {
                setDisplayValue(calc.result);
                setActiveButton(null);
              }, 300);
            } else if (['+', '-', '×', '÷'].includes(currentStep)) {
              // For operators, briefly show the current number then the operator
              setTimeout(() => setDisplayValue(currentStep), 200);
            } else {
              // For numbers, build up the display
              setDisplayValue(prev => {
                if (prev === '0' || ['+', '-', '×', '÷'].includes(prev)) {
                  return currentStep;
                } else {
                  return prev + currentStep;
                }
              });
            }
            
            // Clear button highlight after animation
            setTimeout(() => setActiveButton(null), 300);
            
            stepIndex++;
            setTimeout(executeStep, 800); // Delay between button presses
          } else {
            // Calculation complete, pause before next one
            setTimeout(() => {
              setDisplayValue('0');
              setIsCalculating(false);
              
              // Start next calculation after a pause
              animationRef.current = setTimeout(startCalculation, 2000);
            }, 1500);
          }
        };
        
        executeStep();
      };

      startCalculation();
    } else {
      setDisplayValue('0');
      setIsCalculating(false);
      setActiveButton(null);
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

  const buttons = [
    ['AC', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '', '.', '=']
  ];

  const getButtonClass = (button: string) => {
    let baseClass = 'calc-button';
    
    if (['AC', '±', '%'].includes(button)) {
      baseClass += ' function';
    } else if (['+', '-', '×', '÷', '='].includes(button)) {
      baseClass += ' operator';
    } else if (button === '0') {
      baseClass += ' zero';
    }
    
    if (activeButton === button) {
      baseClass += ' active';
    }
    
    return baseClass;
  };

  return (
    <div 
      className="ios-calculator-container"
      style={{ 
        width: size, 
        height: size * 1.6,
        '--calc-size': `${size}px`
      } as React.CSSProperties}
    >
      {/* Calculator Body */}
      <div className={`calculator-body ${isCalculating ? 'calculating' : ''}`}>
        {/* Display */}
        <div className="calculator-display">
          <div className={`display-text ${isCalculating ? 'animating' : ''}`}>
            {displayValue}
          </div>
          {isCalculating && (
            <div className="calculation-indicator">
              <div className="indicator-dot"></div>
              <div className="indicator-dot"></div>
              <div className="indicator-dot"></div>
            </div>
          )}
        </div>
        
        {/* Button Grid */}
        <div className="button-grid">
          {buttons.map((row, rowIndex) => (
            <div key={rowIndex} className="button-row">
              {row.map((button, colIndex) => (
                button ? (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={getButtonClass(button)}
                  >
                    {button}
                  </div>
                ) : (
                  <div key={`${rowIndex}-${colIndex}`} className="button-spacer"></div>
                )
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* iOS Style Home Indicator */}
      <div className="home-indicator"></div>
      
      {/* Calculation Waves */}
      {isCalculating && (
        <div className="calculation-waves">
          <div className="calc-wave wave-1"></div>
          <div className="calc-wave wave-2"></div>
          <div className="calc-wave wave-3"></div>
        </div>
      )}
    </div>
  );
};

export default IOSCalculatorAnimation;