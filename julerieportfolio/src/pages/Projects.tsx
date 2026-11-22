import { useState } from "react";
import { projects } from "../data";
import Card from "../components/Card";

const filters = ["All", "Java", "HTML", "CSS", "JavaScript", "Android Studio"];

export default function Projects() {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <section>
      <h1>Projects</h1>
      <p className="lead">Beginner projects I've made while learning the fundamentals.</p>

      <div className="filters" role="group" aria-label="Filter projects by technology">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={"filter" + (active === f ? " on" : "")}
            aria-pressed={active === f}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* key = replay the card entrance whenever the filter changes */}
      <div className="grid" key={active}>
        {shown.map((p, i) => (
          <div className="pop" style={{ "--i": i } as React.CSSProperties} key={p.title}>
            <Card>
              <span className="num" aria-hidden="true">{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <ul className="tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {p.link && (
                <a className="card-link" href={p.link} target="_blank" rel="noreferrer">
                  View project <span className="arrow">→</span>
                </a>
              )}
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
