import React from "react";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  grad?: string; // trailing word rendered in the gradient accent
  sub?: string;
  center?: boolean;
}

/** Reusable eyebrow + gradient title block. */
const SectionHead: React.FC<SectionHeadProps> = ({
  eyebrow,
  title,
  grad,
  sub,
  center,
}) => (
  <div className={`section-head${center ? " center" : ""}`}>
    <span className="eyebrow">{eyebrow}</span>
    <h2 className="section-title">
      {title} {grad && <span className="grad">{grad}</span>}
    </h2>
    {sub && <p className="section-sub">{sub}</p>}
  </div>
);

export default SectionHead;
