import { useEffect, useRef } from "react";

/** Floating blurred shapes, a faint grid, a mouse glow and a scroll progress bar. */
export default function Background() {
  const glow = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let gx = x;
    let gy = y;
    const fine = window.matchMedia("(pointer: fine)").matches;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const loop = () => {
      gx += (x - gx) * 0.12;
      gy += (y - gy) * 0.12;
      if (glow.current) glow.current.style.transform = `translate(${gx - 200}px, ${gy - 200}px)`;
      raf = requestAnimationFrame(loop);
    };

    if (fine) {
      window.addEventListener("pointermove", onMove);
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true">
        <div ref={bar} className="progress-bar" />
      </div>
      <div className="bg" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <span className="grid-lines" />
        <div ref={glow} className="cursor-glow" />
      </div>
    </>
  );
}
