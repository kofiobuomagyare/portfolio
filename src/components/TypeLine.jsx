import { useEffect, useRef, useState } from "react";
import "./TypeLine.css";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * TypeLine — terminal typewriter for `$` prompt lines.
 * Types out when scrolled into view, caret blinks while typing
 * and retires when the line completes. Instant full text under
 * prefers-reduced-motion. Always rendered inside aria-hidden
 * parents (decorative), so screen readers are unaffected.
 */
export default function TypeLine({ text, speed = 36 }) {
  // Reduced-motion users get the full line on first paint — no effect needed.
  const [count, setCount] = useState(() =>
    prefersReduced() ? text.length : 0,
  );
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (prefersReduced()) return;
    const node = ref.current;
    if (!node) return;
    let timer = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started.current) continue;
          started.current = true;
          io.disconnect();
          timer = window.setInterval(() => {
            setCount((c) => {
              if (c >= text.length) {
                window.clearInterval(timer);
                return c;
              }
              return c + 1;
            });
          }, speed);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [text, speed]);

  return (
    <span ref={ref} className="tw">
      <span className="ps">$</span> {text.slice(0, count)}
      {count < text.length ? (
        <span className="tw-caret" aria-hidden="true" />
      ) : null}
    </span>
  );
}
