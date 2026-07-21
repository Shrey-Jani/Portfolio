import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AIAssistant from "./AIAssistant";

interface HeaderProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const goContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const scroll = () =>
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(scroll, 120);
    } else {
      scroll();
    }
  };

  return (
    <header>
      <div className="container nav">
        <Link className="brand" to="/" aria-label="Home">
          <div className="badge" aria-hidden="true"></div>
          <span>Shrey Jani</span>
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/experience">Experience</NavLink>
            </li>
            <li>
              <NavLink to="/certificates">Certificates</NavLink>
            </li>
            <li>
              <a href="/#contact" onClick={goContact}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <AIAssistant />
          <button
            className="btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkTheme ? "🌞" : "🌙"}
          </button>
          <button
            className="btn"
            onClick={handleResumeDownload}
            aria-label="Download resume"
          >
            Resume
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
