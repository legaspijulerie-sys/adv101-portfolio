import { useEffect, useState } from "react";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Types each word, pauses, deletes it, then moves to the next one. */
export function useTyping(words: string[], speed = 70, pause = 1400) {
  const [text, setText] = useState(reduced() ? words[0] : "");

  useEffect(() => {
    if (reduced() || words.length === 0) return;
    let w = 0;
    let i = 0;
    let deleting = false;
    let timer: number;

    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      setText(word.slice(0, i));

      let delay = deleting ? speed / 2 : speed;
      if (!deleting && i === word.length) {
        deleting = true;
        delay = pause;
      } else if (deleting && i === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        delay = 350;
      }
      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, 500);
    return () => window.clearTimeout(timer);
  }, [words, speed, pause]);

  return text;
}
