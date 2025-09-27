import React from "react";
import SpotlightCard from "./SpotlightCard";

const About: React.FC = () => {
  return (
    <section id="about" className="container" style={{ marginTop: "24px" }}>
      <SpotlightCard
        className="reveal"
        spotlightColor="rgba(245, 158, 11, 0.3)"
      >
        <h2>About</h2>
        <p>
          I am an Information Systems Engineering student at Sheridan College
          with experience in full‑stack development, cloud deployment, and
          building scalable applications using modern technologies such as
          React, Angular, Tailwind CSS, Node.js, Spring Boot, and AWS. My
          background includes developing projects like a Patient Record
          Application and a Python‑based Robo‑Speaker, as well as tutoring web
          development and contributing to student leadership roles where I
          strengthened my communication, teamwork, and governance skills. I am
          passionate about creating impactful, user‑focused solutions that blend
          technical problem‑solving with collaboration and continuous learning.
        </p>
      </SpotlightCard>
    </section>
  );
};

export default About;
