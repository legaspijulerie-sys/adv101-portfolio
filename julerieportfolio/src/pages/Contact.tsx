import { profile } from "../data";
import Reveal from "../components/Reveal";

export default function Contact() {
  const rows = [
    { label: "Email", node: <a href={`mailto:${profile.email}`}>{profile.email}</a> },
    {
      label: "GitHub",
      node: <a href={profile.github} target="_blank" rel="noreferrer">{profile.github}</a>,
    },
    { label: "Location", node: <span>{profile.location}</span> },
  ];

  return (
    <section>
      <h1>Contact</h1>
      <p className="lead">Want to say hello or work together on something? Send me a message.</p>
      <ul className="plain contact">
        {rows.map((r, i) => (
          <Reveal as="li" key={r.label} delay={i * 110}>
            <strong>{r.label}</strong>
            {r.node}
          </Reveal>
        ))}
      </ul>
      <a className="btn btn-primary shine pulse" href={`mailto:${profile.email}`}>Send an email</a>
    </section>
  );
}
