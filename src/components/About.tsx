import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = [
  "Software Developer",
  "Cloud Developer",
  "Data Analyst",
  "Full-Stack Engineer",
];

const scrollToSection = (id: string) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const handleResumeDownload = () => {
  const link = document.createElement("a");
  link.href = `${process.env.PUBLIC_URL || ""}/Shrey_Jani_Resume.pdf`;
  link.download = "Shrey_Jani_Resume.pdf";
  link.rel = "noopener noreferrer";
  const isSafari =
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  if (isSafari) {
    window.open(link.href, "_blank");
  } else {
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/** Simple staggered fade-up props for a given order index. */
const rise = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.08 * i, ease: "easeOut" as const },
});

const Hero: React.FC = () => {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % ROLES.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero-v2 container" id="top">
      <div className="hero-grid">
        {/* Left — copy */}
        <div>
          <motion.div className="eyebrow hero-eyebrow" {...rise(0)}>
            Available for opportunities
          </motion.div>

          <motion.h1 className="hero-title" {...rise(1)}>
            <span className="name-grad">Shrey Jani</span>
          </motion.h1>

          <motion.div className="hero-roleline" {...rise(2)}>
            <span className="arrow">&#47;&#47;</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIdx]}
                className="hero-role"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p className="hero-lead" {...rise(3)}>
            Information Systems Engineering graduate from Sheridan College. I
            build scalable, cloud-native full-stack products with React,
            Node.js, Spring Boot, and AWS — turning complex backend logic into
            interfaces people actually enjoy using.
          </motion.p>

          <motion.div className="hero-cta" {...rise(4)}>
            <button
              className="btn primary"
              onClick={() => scrollToSection("projects")}
            >
              <span>View Projects</span>
            </button>
            <button className="btn" onClick={handleResumeDownload}>
              Download Resume
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
          </motion.div>
        </div>

        {/* Right — portrait */}
        <motion.div
          className="hero-portrait-wrap"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
        >
          <div className="hero-portrait">
            <img
              src={`${process.env.PUBLIC_URL}/images/pic_web.jpg`}
              alt="Shrey Jani"
              loading="eager"
            />
          </div>
          <div className="hero-portrait-meta">
            <span className="status-pill">
              <span className="status-dot" />
              Open to work
            </span>
            <span className="pc-loc">Toronto, Canada</span>
          </div>
        </motion.div>
      </div>

      {/* Stat strip */}
      <motion.div className="hero-stats" {...rise(5)}>
        <div className="hero-stat">
          <div className="num">3+</div>
          <div className="lbl">Dev internships</div>
        </div>
        <div className="hero-stat">
          <div className="num">AWS</div>
          <div className="lbl">Certified Cloud Developer</div>
        </div>
        <div className="hero-stat">
          <div className="num">400+</div>
          <div className="lbl">Users served at Hackville</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
