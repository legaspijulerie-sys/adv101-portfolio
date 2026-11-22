import { skillGroups } from "../data";
import Card from "../components/Card";
import Reveal from "../components/Reveal";

const icons: Record<string, string> = {
  Programming: "{ }",
  Web: "</>",
  Mobile: "📱",
  Tools: "🛠",
};

export default function Skills() {
  const all = skillGroups.flatMap((g) => g.items);

  return (
    <section>
      <h1>Skills</h1>
      <p className="lead">The basics I've learned so far, and I'm still growing.</p>

      <div className="grid">
        {skillGroups.map((g, i) => (
          <Reveal key={g.group} delay={i * 110}>
            <Card>
              <div className="card-icon" aria-hidden="true">{icons[g.group] ?? "★"}</div>
              <h3>{g.group}</h3>
              <ul className="tags">
                {g.items.map((s, j) => (
                  <li key={s} style={{ "--j": j } as React.CSSProperties}>{s}</li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...all, ...all, ...all, ...all].map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
