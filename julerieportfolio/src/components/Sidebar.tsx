import { useEffect, useState } from "react";
import type { PageId } from "../App";
import { profile } from "../data";
import { MiniAvatar } from "./ProfilePhoto";

const links: { id: PageId; label: string }[] = [
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

// Must match the breakpoint in styles.css
const MOBILE_QUERY = "(max-width: 900px)";

export default function Sidebar({ current }: { current: PageId }) {
  const [open, setOpen] = useState(false);

  // Close the menu when the screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => !mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Escape closes the menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Stop the page behind the menu from scrolling
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <>
      <header className="topbar">
        <button
          type="button"
          className="menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="sidebar"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={"burger" + (open ? " is-open" : "")} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <span className="topbar-name">{profile.name}</span>
      </header>

      <div
        className={"scrim" + (open ? " show" : "")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside id="sidebar" className={"sidebar" + (open ? " open" : "")}>
        <div className="brand">
          <MiniAvatar />
          <div>
            <div className="brand-name">{profile.name}</div>
            <div className="brand-title">{profile.title}</div>
          </div>
        </div>
        <nav aria-label="Main navigation">
          <ul>
            {links.map((l, i) => (
              <li key={l.id} style={{ "--i": i } as React.CSSProperties}>
                <a
                  href={`#${l.id}`}
                  className={current === l.id ? "active" : ""}
                  aria-current={current === l.id ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-foot">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </aside>
    </>
  );
}
