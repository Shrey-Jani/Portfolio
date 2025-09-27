import React, { useState } from "react";
import { projects } from "../data/portfolio";
import SpotlightCard from "./SpotlightCard";
import RobotSpeakerAnimation from "./RobotSpeakerAnimation";
import IOSCalculatorAnimation from "./IOSCalculatorAnimation";
import CookieAnimation from "./CookieAnimation";

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="container">
      <SpotlightCard
        className="reveal"
        spotlightColor="rgba(255, 92, 230, 0.3)"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ margin: "0" }}>Projects</h2>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
            marginTop: "6px",
          }}
        >
          {projects.map((project) => (
            <article
              key={project.id}
              className="project"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="cover" aria-hidden="true">
                {/* Show Robot-Speaker animation for the Robo-Speaker project */}
                {project.title === "Robo-Speaker" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "60%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                    }}
                  >
                    <RobotSpeakerAnimation
                      isActive={hoveredProject === project.id}
                      size={120}
                    />
                  </div>
                )}
                {/* Show iOS Calculator animation for the iOS Calculator project */}
                {project.title === "iOS Calculator" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "60%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                    }}
                  >
                    <IOSCalculatorAnimation
                      isActive={hoveredProject === project.id}
                      size={75}
                    />
                  </div>
                )}
                {/* Show Cookie animation for the Capstone Project */}
                {project.title === "Capstone Project" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "65%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                    }}
                  >
                    <CookieAnimation
                      isActive={hoveredProject === project.id}
                      size={110}
                    />
                  </div>
                )}
              </div>
              <div>
                <h3
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  {project.title}
                  {/* Small robot icon next to Robo-Speaker title */}
                  {project.title === "Robo-Speaker" && (
                    <RobotSpeakerAnimation
                      isActive={hoveredProject === project.id}
                      size={24}
                    />
                  )}
                  {/* Small calculator icon next to iOS Calculator title */}
                  {project.title === "iOS Calculator" && (
                    <IOSCalculatorAnimation
                      isActive={hoveredProject === project.id}
                      size={20}
                    />
                  )}
                  {/* Small cookie icon next to Capstone Project title */}
                  {project.title === "Capstone Project" && (
                    <CookieAnimation
                      isActive={hoveredProject === project.id}
                      size={22}
                    />
                  )}
                </h3>
                <p className="text-muted">{project.description}</p>
                <div className="projects meta">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tag">
                      {tech}
                    </span>
                  ))}
                  {project.codeUrl && (
                    <a
                      className="tag code-btn"
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      className="tag"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </SpotlightCard>
    </section>
  );
};

export default Projects;
