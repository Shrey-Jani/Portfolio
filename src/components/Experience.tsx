import React from "react";
import { experiences } from "../data/portfolio";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="container section-shell">
      <Reveal>
        <SectionHead
          eyebrow="Career"
          title="Where I've"
          grad="Worked"
          sub="Full-stack roles across startups, hackathons, and community projects."
        />
      </Reveal>

      <div className="glass" style={{ padding: "34px 30px" }}>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 0.08}>
              <div className="tl-item">
                <div className="tl-head">
                  <h3 className="tl-role">
                    {exp.title} <span className="co">· {exp.company}</span>
                  </h3>
                  <span className="tl-period">{exp.period}</span>
                </div>
                <ul>
                  {exp.responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
