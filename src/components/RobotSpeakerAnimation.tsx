import React, { useEffect, useRef, useState } from 'react';
import './RobotSpeakerAnimation.css';

interface RobotSpeakerAnimationProps {
  isActive?: boolean;
  size?: number;
}

const RobotSpeakerAnimation: React.FC<RobotSpeakerAnimationProps> = ({ 
  isActive = false, 
  size = 80 
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const animationRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isActive) {
      // Start the speaking animation cycle
      const startSpeaking = () => {
        setIsSpeaking(true);
        
        // Random speaking duration between 2-4 seconds
        const speakDuration = Math.random() * 2000 + 2000;
        
        setTimeout(() => {
          setIsSpeaking(false);
          
          // Random pause between 1-3 seconds
          const pauseDuration = Math.random() * 2000 + 1000;
          
          animationRef.current = setTimeout(startSpeaking, pauseDuration);
        }, speakDuration);
      };

      startSpeaking();
    } else {
      setIsSpeaking(false);
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
      className="robot-speaker-container"
      style={{ 
        width: size, 
        height: size,
        '--robot-size': `${size}px`
      } as React.CSSProperties}
    >
      {/* Robot Head */}
      <div className={`robot-head ${isSpeaking ? 'speaking' : ''}`}>
        {/* Robot Eyes */}
        <div className="robot-eyes">
          <div className={`robot-eye left ${isSpeaking ? 'blinking' : ''}`}>
            <div className="eye-pupil"></div>
          </div>
          <div className={`robot-eye right ${isSpeaking ? 'blinking' : ''}`}>
            <div className="eye-pupil"></div>
          </div>
        </div>
        
        {/* Robot Mouth/Speaker */}
        <div className={`robot-mouth ${isSpeaking ? 'speaking' : ''}`}>
          <div className="mouth-grid">
            {Array.from({ length: 12 }, (_, i) => (
              <div 
                key={i} 
                className={`speaker-dot ${isSpeaking ? 'active' : ''}`}
                style={{ 
                  '--delay': `${i * 0.1}s`,
                  '--dot-index': i
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        {/* Robot Antenna */}
        <div className={`robot-antenna ${isSpeaking ? 'transmitting' : ''}`}>
          <div className="antenna-base"></div>
          <div className="antenna-signal">
            <div className="signal-wave wave-1"></div>
            <div className="signal-wave wave-2"></div>
            <div className="signal-wave wave-3"></div>
          </div>
        </div>
      </div>

      {/* Sound Waves */}
      {isSpeaking && (
        <div className="sound-waves">
          <div className="sound-wave wave-1"></div>
          <div className="sound-wave wave-2"></div>
          <div className="sound-wave wave-3"></div>
          <div className="sound-wave wave-4"></div>
        </div>
      )}

      {/* Status LED */}
      <div className={`status-led ${isActive ? 'active' : ''} ${isSpeaking ? 'speaking' : ''}`}></div>
    </div>
  );
};

export default RobotSpeakerAnimation;