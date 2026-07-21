import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LineSidebar.css";

interface Item {
  label: string;
  path: string;
  contact?: boolean;
}

const ITEMS: Item[] = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Certificates", path: "/certificates" },
  { label: "Contact", path: "/", contact: true },
];

const LineSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (item: Item) => {
    if (item.contact) {
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
      return;
    }
    navigate(item.path);
  };

  return (
    <nav className="line-sidebar" aria-label="Page navigation">
      <ul>
        {ITEMS.map((it) => {
          const active =
            !it.contact && location.pathname === it.path;
          return (
            <li key={it.label}>
              <button
                type="button"
                className={`ls-item ${active ? "active" : ""}`}
                onClick={() => go(it)}
                aria-current={active ? "page" : undefined}
                aria-label={it.label}
              >
                <span className="ls-label">{it.label}</span>
                <span className="ls-line" />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LineSidebar;
