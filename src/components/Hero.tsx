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
      <div className="grid two">
        <SpotlightCard
          className="reveal"
          spotlightColor="rgba(79, 140, 255, 0.3)"
        >
          <h1>
            <BlurText
              text="Shrey Jani"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="hero-name"
            />
          </h1>
          <p className="lead">
            I am an Information Systems Engineering student at Sheridan College
            with experience in full‑stack development, cloud deployment, and
            building scalable applications using modern technologies such as
            React, Angular, Tailwind CSS, Node.js, Spring Boot, and AWS. My
            background includes developing projects like a Patient Record
            Application and a Python‑based Robo‑Speaker, as well as tutoring web
            development and contributing to student leadership roles where I
            strengthened my communication, teamwork, and governance skills. I am
            passionate about creating impactful, user‑focused solutions that
            blend technical problem‑solving with collaboration and continuous
            learning.
          </p>

          <div
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

        <SpotlightCard
          className="reveal profile-spotlight-card"
          spotlightColor="rgba(255, 107, 157, 0.3)"
        >
          <ProfileCard
            name="Shrey Jani"
            title="Software Engineer"
            handle="shrey1807"
            status="Online"
            contactText="Contact Me"
            avatarUrl={`${process.env.PUBLIC_URL}/images/pic_web.jpg`}
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => {
              window.location.href = "mailto:janishre@sheridancollege.ca";
            }}
          />
        </SpotlightCard>
      </div>
    </section>
  );
};

export default Hero;
