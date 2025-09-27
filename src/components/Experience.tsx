import React from "react";
import { experiences } from "../data/portfolio";
import SpotlightCard from "./SpotlightCard";

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="container"
      style={{ marginTop: "24px" }}
    >
      <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
        <SpotlightCard
          className="reveal"
          spotlightColor="rgba(124, 58, 237, 0.3)"
        >
          <h2>Experience</h2>

          {experiences.map((exp, index) => (
            <div key={exp.id} style={{ marginTop: index > 0 ? "14px" : "0" }}>
              <h3>
                {exp.title} — {exp.company}
              </h3>
              <p className="text-muted">{exp.period}</p>
              <ul className="plain">
                {exp.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </SpotlightCard>
      </div>
    </section>
  );
};

export default Experience;
