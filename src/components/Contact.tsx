import React from "react";
import { contactInfo } from "../data/portfolio";
import Reveal from "./Reveal";

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

const Contact: React.FC = () => {
  return (
    <section id="contact" className="container section-shell">
      <Reveal>
        <div className="glass contact-card">
          <span className="eyebrow" style={{ margin: "0 auto" }}>
            Get in touch
          </span>
          <h2 className="section-title" style={{ marginTop: 16 }}>
            Let's build something <span className="grad">together</span>
          </h2>
          <p className="section-sub" style={{ margin: "12px auto 0" }}>
            Open to new-grad software, cloud, and data roles. My inbox is always open.
          </p>

          <div className="contact-actions center" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn primary" href={`mailto:${contactInfo.email}`}>
              <span>Email me</span>
            </a>
            <button className="btn" onClick={handleResumeDownload} aria-label="Download resume">
              Download Resume
            </button>
            {contactInfo.socialLinks.map((link, index) => (
              <a
                key={index}
                className="btn"
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Contact;
