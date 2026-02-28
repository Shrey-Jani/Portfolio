import React from "react";
import { contactInfo } from "../data/portfolio";
import SpotlightCard from "./SpotlightCard";

const Contact: React.FC = () => {
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
