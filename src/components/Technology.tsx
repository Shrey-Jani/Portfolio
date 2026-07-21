import React from "react";
import LogoLoop from "./LogoLoop";
import { techLogos } from "../data/techLogos";
import SpotlightCard from "./SpotlightCard";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const IconWrapper: React.FC<{ icon: any }> = ({ icon: Icon }) => <Icon />;

const Technology: React.FC = () => {
  return (
    <section className="technology container section-shell" id="technology">
      <Reveal>
        <SpotlightCard spotlightColor="rgba(157, 126, 255, 0.3)">
          <SectionHead
            center
            eyebrow="Toolkit"
            title="Technologies &"
            grad="Tools"
            sub="The stack I reach for to build modern, scalable, cloud-native applications."
          />

          <div style={{ width: "100%", overflow: "hidden", padding: "1rem 0" }}>
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
      </Reveal>
    </section>
  );
};

export default Technology;
