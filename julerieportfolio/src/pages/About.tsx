import { useState } from "react";
import { profile, projects, skillGroups } from "../data";
import ResumeModal from "../components/ResumeModal";
import ProfilePhoto from "../components/ProfilePhoto";
import Reveal from "../components/Reveal";
import CountUp from "../components/CountUp";
import { useTyping } from "../hooks/useTyping";

const skillCount = skillGroups.reduce((n, g) => n + g.items.length, 0);

export default function About() {
  const [open, setOpen] = useState(false);
  const typed = useTyping(profile.roles);

  return (
    <section>
      <div className="hero">
        <div className="hero-text">
          <p className="kicker">Hello, I'm</p>
          <h1 className="gradient-text">{profile.name}</h1>
          <p className="lead typing" aria-label={profile.title}>
            <span aria-hidden="true">{typed}</span>
            <span className="caret" aria-hidden="true" />
          </p>
          <div className="prose">
            {profile.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="meta">📍 {profile.location}</p>
          <div className="row">
            <button className="btn btn-primary shine" onClick={() => setOpen(true)}>
              View Resume
            </button>
            <a className="btn btn-light" href="#projects">See my projects</a>
          </div>
        </div>

        <ProfilePhoto />
      </div>

      <div className="stats">
        {[
          { n: projects.length, label: "Projects built" },
          { n: skillCount, label: "Skills learned" },
          { n: skillGroups.length, label: "Areas explored" },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 120} className="stat">
            <strong><CountUp to={s.n} /></strong>
            <span>{s.label}</span>
          </Reveal>
        ))}
      </div>

      {open && <ResumeModal onClose={() => setOpen(false)} />}
    </section>
  );
}
