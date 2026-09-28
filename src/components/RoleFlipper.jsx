import { useEffect, useRef, useState } from "react";

const ROLES = [
  "Frontend Developer",
  "Mobile Developer",
  "Backend Developer",
  "UI/UX Designer",
];

const MIN_PX = 13;

/**
 * RoleFlipper — cycles Kofi's four disciplines in the giant
 * headline slot. Auto-advances every 3s, pauses on hover/focus,
 * offers manual dash controls, and goes static (first role +
 * instant manual switching) under prefers-reduced-motion.
 * The animated words are aria-hidden; screen readers get the
 * full static list instead of a chatty live region.
 *
 * Autofit: every word is measured and shrunk until it fits its
 * viewport — no font-size guesswork, no overflow on any screen.
 */
export default function RoleFlipper() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const reduceMotion = useRef(false);
  const viewportRef = useRef(null);
  const wordRef = useRef(null);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion.current) return;
    const id = window.setInterval(() => {
      if (!paused.current) {
        setIndex((i) => (i + 1) % ROLES.length);
      }
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  // Shrink-to-fit: runs per role, on resize, and once webfonts land.
  useEffect(() => {
    const viewport = viewportRef.current;
    const word = wordRef.current;
    if (!viewport || !word) return;

    const fit = () => {
      word.style.fontSize = "";
      const avail = viewport.clientWidth;
      if (avail <= 0) return;
      let size = parseFloat(getComputedStyle(viewport).fontSize) || MIN_PX;
      let guard = 60;
      while (word.scrollWidth > avail && size > MIN_PX && guard-- > 0) {
        size -= 1;
        word.style.fontSize = `${size}px`;
      }
    };

    fit();
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(fit)
        : null;
    if (ro) ro.observe(viewport);
    let cancelled = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) fit();
      });
    }
    return () => {
      cancelled = true;
      if (ro) ro.disconnect();
    };
  }, [index]);

  return (
    <span
      className="flipper"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
      onFocus={() => {
        paused.current = true;
      }}
      onBlur={() => {
        paused.current = false;
      }}
    >
      <span className="visually-hidden">
        Roles: {ROLES.join(", ")}.
      </span>
      <span
        className="flipper__viewport"
        ref={viewportRef}
        aria-hidden="true"
      >
        <span key={index} ref={wordRef} className="flipper__word">
          {ROLES[index]}
        </span>
      </span>
      <span className="flipper__dots" role="group" aria-label="Choose role">
        {ROLES.map((role, i) => (
          <button
            key={role}
            type="button"
            className={
              i === index ? "flipper__dot is-active" : "flipper__dot"
            }
            aria-label={`Show ${role}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => setIndex(i)}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </span>
    </span>
  );
}
