import React from "react";
import { contactInfo } from "../data/portfolio";
import SpotlightCard from "./SpotlightCard";

const Contact: React.FC = () => {
  const handleResumeDownload = () => {
    // Direct link for better Safari compatibility
    const link = document.createElement("a");
    link.href = `${process.env.PUBLIC_URL || ""}/Shrey_Jani_Resume.pdf`;
    link.download = "Shrey_Jani_Resume.pdf";
    link.rel = "noopener noreferrer";

    // For Safari: Use target="_blank" as fallback
    const isSafari =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    if (isSafari) {
      // Safari: Open in new tab (browser will handle it)
      window.open(link.href, "_blank");
    } else {
      // Chrome and others: Use download attribute
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <section id="contact" className="container" style={{ marginTop: "24px" }}>
      <SpotlightCard
        className="reveal"
        spotlightColor="rgba(16, 185, 129, 0.3)"
      >
        <h2>Contact</h2>
        <p>Open to New Grads Job Roles. Let's connect.</p>
        <div
          className="contact-actions"
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          <a className="btn primary" href={`mailto:${contactInfo.email}`}>
            Email
          </a>
          <button
            className="btn primary"
            onClick={handleResumeDownload}
            aria-label="Download resume"
          >
            📄 Download Resume
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
      </SpotlightCard>
    </section>
  );
};

export default Contact;
