import React from "react";
import ProfileCard from "./ProfileCard";
import SpotlightCard from "./SpotlightCard";
import BlurText from "./BlurText";

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAnimationComplete = () => {
    console.log("Name animation completed!");
  };

  return (
    <section className="hero container" id="top">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <ProfileCard
          name="Shrey Jani"
          title="Software Developer | Cloud Developer | Data Analyst | AI Freshman"
          avatarUrl={`${process.env.PUBLIC_URL}/images/pic_web.jpg`}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
        />

        <SpotlightCard
          className="reveal"
          spotlightColor="rgba(79, 140, 255, 0.3)"
        >
          <h1>
            <BlurText
              text="Hello !"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="hero-name"
            />
          </h1>
          <p className="lead">
            Information Systems Engineering graduate from Sheridan College,
            specializing in building scalable, full-stack applications. With a
            technical toolkit including React, Node.js, Spring Boot, and AWS, I
            bridge the gap between complex backend logic and intuitive user
            experiences. I am a collaborative problem-solver committed to
            continuous learning and building impactful, cloud-native solutions.
          </p>

          <div
            className="hero-actions"
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "14px",
            }}
          >
            <button
              className="btn primary"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </button>
            <a
              className="btn"
              href="https://github.com/Shrey-Jani"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="btn"
              href="https://www.linkedin.com/in/shrey-jani/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};

export default Hero;
