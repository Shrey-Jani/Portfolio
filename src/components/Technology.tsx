import React from "react";
import LogoLoop from "./LogoLoop";
import { techLogos } from "../data/techLogos";
import SpotlightCard from "./SpotlightCard";

const IconWrapper: React.FC<{ icon: any }> = ({ icon: Icon }) => <Icon />;

const Technology: React.FC = () => {
  return (
    <section className="technology container" id="technology">
      <SpotlightCard
        className="reveal"
        spotlightColor="rgba(157, 126, 255, 0.3)"
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2>Technologies & Tools</h2>
          <p className="lead" style={{ marginTop: "1rem" }}>
            Technologies I work with to build modern, scalable applications
          </p>
        </div>

        <div
          style={{
            width: "100%",
            overflow: "hidden",
            padding: "1rem 0",
          }}
        >
          <LogoLoop
            logos={techLogos.map((tech, index) => ({
              node: <IconWrapper key={index} icon={tech.icon} />,
              title: tech.title,
              href: tech.href,
            }))}
            speed={50}
            direction="left"
            logoHeight={56}
            gap={48}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="var(--bg)"
            ariaLabel="Technology stack"
          />
        </div>
      </SpotlightCard>
    </section>
  );
};

export default Technology;
