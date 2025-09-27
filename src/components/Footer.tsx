import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer>
      <div className="container footer-inner">
        <span>© {currentYear} Shrey Jani</span>
        <button
          onClick={scrollToTop}
          style={{
            background: "none",
            border: "none",
            color: "rgb(233, 223, 235)",
            cursor: "pointer",
            fontSize: "14px",
            textDecoration: "underline",
          }}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;
