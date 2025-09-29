import React, { useState, useRef, useEffect } from "react";
import PixelTransition from "./PixelTransition";

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status: "Online" | "Offline" | "Away" | "Busy";
  contactText: string;
  avatarUrl: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  handle,
  status,
  contactText,
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || (isMobile && !enableMobileTilt)) return;

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = ((y - centerY) / centerY) * -10;
      const tiltY = ((x - centerX) / centerX) * 10;

      setTilt({ x: tiltX, y: tiltY });
    }
  };

  const handleMouseLeave = () => {
    if (!enableTilt || (isMobile && !enableMobileTilt)) return;
    setTilt({ x: 0, y: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!enableTilt || !enableMobileTilt || !isMobile) return;

    if (cardRef.current && e.touches.length === 1) {
      const rect = cardRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = ((y - centerY) / centerY) * -5; // Reduced tilt for mobile
      const tiltY = ((x - centerX) / centerX) * 5;

      setTilt({ x: tiltX, y: tiltY });
    }
  };

  const handleTouchEnd = () => {
    if (!enableTilt || !enableMobileTilt || !isMobile) return;
    setTilt({ x: 0, y: 0 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "#22d3a6";
      case "Away":
        return "#fbbf24";
      case "Busy":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div
      ref={cardRef}
      className="profile-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease-out",
        transformStyle: "preserve-3d",
        touchAction: "manipulation",
      }}
    >
      <div className="profile-card-inner">
        <div className="profile-avatar">
          <PixelTransition
            firstContent={
              <img
                src={avatarUrl}
                alt={`${name}'s avatar`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
                onError={(e) => {
                  console.error("Failed to load avatar image:", avatarUrl);
                  console.error("Error event:", e);
                }}
                onLoad={() => {
                  console.log("Avatar image loaded successfully:", avatarUrl);
                }}
              />
            }
            secondContent={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "#6A0DAD",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #6A0DAD, #8A2BE2)",
                }}
              >
                <div style={{ textAlign: "center", color: "#ffffff" }}>
                  <p
                    style={{
                      fontWeight: 900,
                      fontSize: "2rem",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    👋
                  </p>
                  <p
                    style={{ fontWeight: 700, fontSize: "1.2rem", margin: "0" }}
                  >
                    Hello!
                  </p>
                </div>
              </div>
            }
            gridSize={12}
            pixelColor="#6A0DAD"
            animationStepDuration={0.6}
            trigger="hover"
            className="profile-pixel-transition"
          />
          <div
            className="status-indicator"
            style={{ backgroundColor: getStatusColor(status) }}
          ></div>
        </div>

        {showUserInfo && (
          <div className="profile-info">
            <h3 className="profile-name">{name}</h3>
            <p className="profile-title">{title}</p>
          </div>
        )}

        <button
          className="btn primary profile-contact-btn"
          onClick={onContactClick}
        >
          {contactText}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
