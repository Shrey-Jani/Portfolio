import React, { useState } from "react";
import { projects } from "../data/portfolio";
import CookieAnimation from "./CookieAnimation";
import StockAnimation from "./StockAnimation";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const monogram = (title: string) =>
  title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const Projects: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="container section-shell">
      <Reveal>
        <SectionHead
          eyebrow="Selected work"
          title="Featured"
          grad="Projects"
          sub="A few things I've designed, built, and shipped end-to-end."
        />
      </Reveal>

      <div className="proj-grid">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.08}>
            <article
              className="glass proj-card"
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="proj-cover" aria-hidden="true">
                {project.title === "Capstone Project" ? (
                  <CookieAnimation isActive={hovered === project.id} size={200} />
                ) : project.title === "Stock Sense" ? (
                  <StockAnimation isActive={hovered === project.id} size={230} />
                ) : (
                  <span className="proj-monogram">{monogram(project.title)}</span>
                )}
              </div>

              <div className="proj-body">
                <h3>{project.title}</h3>
                <p className="proj-desc">{project.description}</p>

                <div className="proj-meta">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="proj-links">
                  {project.liveUrl && (
                    <a
                      className="btn primary"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      className="btn"
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
