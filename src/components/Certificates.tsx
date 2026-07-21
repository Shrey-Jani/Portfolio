import React from "react";
import { certificates } from "../data/portfolio";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const resolveImageSrc = (src: string) => {
  if (/^https?:\/\//i.test(src)) return src;
  const base = process.env.PUBLIC_URL || "";
  const normalized = src.startsWith("/") ? src : `/${src}`;
  return `${base}${normalized}`;
};

const Certificates: React.FC = () => {
  if (!certificates.length) return null;

  return (
    <section id="certificates" className="container section-shell">
      <Reveal>
        <SectionHead
          eyebrow="Credentials"
          title="Certificates &"
          grad="Awards"
          sub="Verified certifications and competition recognitions."
        />
      </Reveal>

      <div className="cert-grid">
        {certificates.map((certificate, i) => (
          <Reveal key={certificate.id} delay={i * 0.08}>
            <article className="glass cert-card">
              <div className="cert-img">
                {certificate.image ? (
                  <img
                    src={resolveImageSrc(certificate.image.src)}
                    alt={certificate.image.alt}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      color: "var(--muted)",
                      fontSize: "0.85rem",
                    }}
                  >
                    Image coming soon
                  </div>
                )}
              </div>

              <div>
                <p className="cert-issuer">{certificate.issuer}</p>
                <h3>{certificate.title}</h3>
                <p className="cert-year">{certificate.issued}</p>
              </div>

              {certificate.credentialUrl && (
                <a
                  className="btn primary"
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View credential for ${certificate.title}`}
                  style={{ alignSelf: "flex-start", padding: "8px 16px", fontSize: 13 }}
                >
                  <span>View credential</span>
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
