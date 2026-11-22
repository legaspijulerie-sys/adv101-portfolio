import type { MouseEvent, ReactNode } from "react";

/** A card with a soft light that follows the mouse and a small 3D tilt. */
export default function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  const move = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--ry", `${(x / r.width - 0.5) * 6}deg`);
    el.style.setProperty("--rx", `${(0.5 - y / r.height) * 6}deg`);
  };
  const leave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <article className={`card ${className}`} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </article>
  );
}
