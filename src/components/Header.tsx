import React from "react";

interface HeaderProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkTheme }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header>
      <div className="container nav">
        <a
          className="brand"
          href="#top"
          aria-label="Home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("top");
          }}
        >
          <div className="badge" aria-hidden="true"></div>
          <span>🧑🏽‍💻Shrey Jani</span>
        </a>

        <nav>
          <ul>
            <li>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("projects");
                }}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("experience");
                }}
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#certificates"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("certificates");
                }}
              >
                Certificates
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className="btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkTheme ? "🌞" : "🌙"}
          </button>
          <a className="btn" href="mailto:janishre@sheridancollege.ca">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
