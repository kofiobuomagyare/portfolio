import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/useLanguage.jsx";

const MIN_PX = 13;
const ROLE_KEYS = [
  "roles.frontend",
  "roles.mobile",
  "roles.backend",
  "roles.designer",
];

/**
 * RoleFlipper — cycles the four disciplines in the giant
 * headline slot, now translated. Auto-advances every 3s, pauses
 * on hover/focus, offers manual dash controls, and goes static
 * (first role + instant switching) under prefers-reduced-motion.
 * Animated words are aria-hidden; screen readers get the list.
 * Every word is measured and shrunk until it fits its viewport.
 */
export default function RoleFlipper() {
  const { t } = useLanguage();
  const roles = ROLE_KEYS.map((k) => t(k));
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
        setIndex((i) => (i + 1) % ROLE_KEYS.length);
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

  // Keep the index valid if the role count ever changes per locale.
  const safeIndex = index % roles.length;

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
        {t("roles.list")}: {roles.join(", ")}.
      </span>
      <span
        className="flipper__viewport"
        ref={viewportRef}
        aria-hidden="true"
      >
        <span key={safeIndex} ref={wordRef} className="flipper__word">
          {roles[safeIndex]}
        </span>
      </span>
      <span className="flipper__dots" role="group" aria-label={t("roles.choose")}>
        {roles.map((role, i) => (
          <button
            key={role}
            type="button"
            className={
              i === safeIndex ? "flipper__dot is-active" : "flipper__dot"
            }
            aria-label={`${t("roles.show")} ${role}`}
            aria-current={i === safeIndex ? "true" : undefined}
            onClick={() => setIndex(i)}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </span>
    </span>
  );
}
