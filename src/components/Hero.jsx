import { useEffect, useRef, useState } from "react";
import "./Hero.css";
import RoleFlipper from "./RoleFlipper.jsx";
import BottomNav from "./BottomNav.jsx";
import About from "./About.jsx";
import Projects from "./Projects.jsx";
import Experience from "./Experience.jsx";
import Contact from "./Contact.jsx";

/**
 * Hero — terminal-window concept.
 * A shell session as the stage: traffic-light chrome, prompt lines,
 * a faint grid backdrop, and a vim-style statusline. The giant role
 * flipper stays (per request) but nothing drifts on pointer — the
 * only motion is the flipper beat, the badge ring, and the cursor.
 * Portrait slot: drop your photo at `public/portrait.jpg` and it
 * replaces the abstract bust automatically (see PORTRAIT_SRC).
 */
const PORTRAIT_SRC = "/portrait.png";

const STACK = [
  "React",
  "React Native",
  "Flutter",
  "Spring Boot",
  "FastAPI",
  "UI/UX",
];

function useMounted(ref) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => node.classList.add("is-mounted")),
    );
    return () => cancelAnimationFrame(raf);
  }, [ref]);
}

export default function Hero() {
  const rootRef = useRef(null);
  const badgeRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    // Stored preference wins, otherwise follow the OS.
    // (The pre-paint script in index.html computes the same value,
    // so there is no flash or mismatch.)
    try {
      const stored = window.localStorage.getItem("koa-theme");
      if (stored === "light" || stored === "dark") return stored;
      if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
      }
    } catch {
      /* private mode — fall through to the default */
    }
    return document.documentElement.dataset.theme === "light"
      ? "light"
      : "dark";
  });
  useMounted(rootRef);

  // Keep the <html> attribute (what the CSS keys off) in sync.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        window.localStorage.setItem("koa-theme", next);
      } catch {
        /* private mode — skip persistence */
      }
      return next;
    });
  };

  // Gentle magnetic pull on the badge CTA only — the one thing
  // that answers the pointer. Eases back on leave.
  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const strength = 10;
    const onMove = (e) => {
      const r = badge.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 110) {
        badge.style.translate = `${(dx / 110) * strength}px ${(dy / 110) * strength}px`;
      } else {
        badge.style.translate = "0px 0px";
      }
    };
    const onLeave = () => {
      badge.style.translate = "0px 0px";
    };
    window.addEventListener("pointermove", onMove);
    badge.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      badge.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <main className="page">
      <a className="skip-link" href="#hero-heading">
        Skip to introduction
      </a>

      <section ref={rootRef} id="top" className="hero" aria-labelledby="hero-heading">
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__grain" aria-hidden="true" />
        <div className="hero__vignette" aria-hidden="true" />

        {/* ——— terminal title bar ——— */}
        <header className="hero__top">
          <div className="win-controls" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="win-title">kofi@portfolio: ~</p>
          <nav aria-label="Primary">
            <ul className="nav">
              <li><a href="#about">About</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <p className="availability">
            <span className="pulse" aria-hidden="true" />
            Available for work
          </p>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </header>

        {/* ——— headline ——— */}
        <div className="hero__headline">
          <h1 id="hero-heading" className="headline">
            <span className="visually-hidden">
              Kofi Obuom Agyare — Frontend Developer, Mobile Developer,
              Backend Developer, UI/UX Designer
            </span>
            <span aria-hidden="true">
              <RoleFlipper />
            </span>
          </h1>
          <p className="headline__script" aria-hidden="true">
            (Kofi Obuom Agyare)
          </p>
        </div>

        {/* ——— figure: photo if present, abstract bust fallback ——— */}
        <span className="hero__side side--l" aria-hidden="true">
          fig. 01 — the developer
        </span>
        <span className="hero__side side--r" aria-hidden="true">
          rgba · 1000 × 1000
        </span>
        <figure className="hero__figure">
          <img
            className="figure__photo"
            src={PORTRAIT_SRC}
            alt="Portrait of Kofi Obuom Agyare"
            onError={(e) => {
              e.currentTarget.hidden = true;
            }}
          />
          <div className="bust" aria-hidden="true">
            <div className="bust__halo" />
            <div className="bust__head" />
            <div className="bust__neck" />
            <div className="bust__collar" />
            <div className="bust__shoulders" />
            <span className="bust__mono">KO</span>
          </div>
          <figcaption className="visually-hidden">
            Stylised portrait placeholder. Add your photo at public/portrait.jpg.
          </figcaption>
        </figure>

        {/* ——— bottom row ——— */}
        <div className="hero__bottom">
          <div className="bio">
            <p className="bio__ps" aria-hidden="true">
              <span className="ps">$</span> whoami
            </p>
            <p className="bio__name">Kofi Obuom Agyare</p>
            <p className="bio__text">
              I turn ideas into fast, functional products — React frontends,
              React&nbsp;Native &amp; Flutter apps, Spring&nbsp;Boot &amp;
              FastAPI backends, wrapped in UI/UX that feels effortless.
            </p>
          </div>

          <div ref={badgeRef} className="badge">
            <svg className="badge__ring" viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path
                  id="badge-circle"
                  d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                />
              </defs>
              <text className="badge__text">
                <textPath href="#badge-circle">
                  open to work • let&apos;s talk •
                </textPath>
              </text>
            </svg>
            <a
              className="badge__cta"
              href="#contact"
              aria-label="Get started — contact Kofi"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="badge__arrow">
                <path
                  d="M7 17 17 7M7 7h10v10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="scroll">
            <button type="button" className="scroll__btn" onClick={scrollDown}>
              Scroll Down
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 4v16m0 0 6-6m-6 6-6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ——— stack as shell output ——— */}
        <footer className="hero__stack">
          <span className="stack__ps" aria-hidden="true">
            <span className="ps">$</span> cat ./stack.txt
          </span>
          <ul aria-label="Specialisms">
            {STACK.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <span className="cursor" aria-hidden="true" />
        </footer>

        {/* ——— vim-style statusline ——— */}
        <div className="statusline" aria-hidden="true">
          <span className="statusline__mode">NORMAL</span>
          <span className="statusline__branch">main*</span>
          <span className="statusline__file">hero.jsx</span>
          <span className="statusline__meta">utf-8 · 100%</span>
        </div>
      </section>

      {/* Real sections mount here as they are built */}
      <About />
      <Projects />
      <Experience />
      <Contact />
      <BottomNav />
    </main>
  );
}
