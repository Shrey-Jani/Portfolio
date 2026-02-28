import React from "react";
import { certificates } from "../data/portfolio";
import SpotlightCard from "./SpotlightCard";

const Certificates: React.FC = () => {
  if (!certificates.length) {
    return null;
  }

  const resolveImageSrc = (src: string) => {
    if (/^https?:\/\//i.test(src)) {
      return src;
    }
    const base = process.env.PUBLIC_URL || "";
    const normalized = src.startsWith("/") ? src : `/${src}`;
    return `${base}${normalized}`;
  };

  return (
    <section
      id="certificates"
      className="container"
      style={{ marginTop: "24px" }}
    >
      <SpotlightCard
        className="reveal"
        spotlightColor="rgba(14, 165, 233, 0.35)"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>Certificates</h2>
            </div>
            <span className="tag" style={{ whiteSpace: "nowrap" }}>
              {certificates.length} credentials
            </span>
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px",
            }}
          >
            {certificates.map((certificate) => (
              <article
                key={certificate.id}
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "20px",
                  padding: "18px",
                  backdropFilter: "blur(12px)",
                  background: "rgba(255, 255, 255, 0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  minHeight: "280px",
                }}
              >
                {certificate.image ? (
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "14px",
                      overflow: "hidden",
                      aspectRatio: "1 / 1",
                      maxWidth: "220px",
                      width: "100%",
                      background:
                        "linear-gradient(135deg, rgba(14,165,233,0.25), rgba(59,130,246,0.15))",
                      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={resolveImageSrc(certificate.image.src)}
                      alt={certificate.image.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        padding: "0",
                        display: "block",
                        background: "rgba(15,23,42,0.45)",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      borderRadius: "14px",
                      aspectRatio: "1 / 1",
                      maxWidth: "220px",
                      width: "100%",
                      background:
                        "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(14,165,233,0.15))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      margin: "0 auto",
                    }}
                  >
                    Image coming soon
                  </div>
                )}
                <div>
                  <p
                    className="text-muted"
                    style={{
                      margin: 0,
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {certificate.issuer}
                  </p>
                  <h3 style={{ margin: "4px 0 0" }}>{certificate.title}</h3>
                  <p className="text-muted" style={{ margin: 0 }}>
                    {certificate.issued}
                  </p>
                </div>
                {certificate.credentialUrl && (
                  <a
                    className="tag certificate-link"
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View credential for ${certificate.title}`}
                    style={{
                      alignSelf: "flex-start",
                      display: "inline-flex",
                      padding: "6px 14px",
                      fontSize: "0.85rem",
                    }}
                  >
                    Link
                  </a>
                )}
                <p className="text-muted" style={{ flexGrow: 1 }}>
                  {certificate.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
};

export default Certificates;
