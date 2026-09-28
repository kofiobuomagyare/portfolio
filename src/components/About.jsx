import { useEffect, useRef } from "react";
import "./About.css";

const STACK_GROUPS = [
  {
    title: "frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    title: "mobile",
    items: ["Flutter", "React Native"],
  },
  {
    title: "backend & apis",
    items: ["Spring Boot", "FastAPI", "PHP", "Java", "Python", "MySQL"],
  },
  {
    title: "also into",
    items: ["UI/UX design", "Cybersecurity", "Photography", "Writing"],
  },
];

const FACTS = [
  { key: "name", value: "Agyare Kofi Obuom" },
  { key: "based", value: "Spintex Road, Accra — Ghana" },
  {
    key: "education",
    value: "BTech Software Engineering, Takoradi Technical University — ’26",
  },
  { key: "focus", value: "Mobile · Web · APIs · UI/UX" },
  { key: "status", value: "Open to full-time roles & freelance" },
];

const STATS = [
  { num: "03", label: "Internships" },
  { num: "13", label: "Technologies" },
  { num: "04", label: "Leadership roles" },
];

const INTERESTS = ["Gaming", "Photography", "Basketball", "Beach days", "Running"];

function useReveal(ref) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [ref]);
}

/**
 * About — `cat about.txt` rendered as a terminal pane:
 * profile facts, bio, real links, stack listing, stats.
 * All content from Kofi's CV.
 */
export default function About() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section
      id="about"
      ref={rootRef}
      className="about reveal"
      aria-labelledby="about-heading"
    >
      <div className="pane">
        <p className="pane__ps" aria-hidden="true">
          <span className="ps">$</span> cat about.txt
        </p>
        <h2 id="about-heading" className="pane__title">
          About <span className="pane__script">(the human)</span>
        </h2>

        <div className="about__grid">
          {/* ——— profile ——— */}
          <div className="profile">
            <img
              className="profile__photo"
              src="/portrait.png"
              alt="Portrait of Kofi Obuom Agyare"
              loading="lazy"
            />
            <dl className="facts">
              {FACTS.map((f) => (
                <div className="fact" key={f.key}>
                  <dt>{f.key}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="bio-long">
              I&apos;m a software engineer trained at Takoradi Technical
              University who builds across the whole stack — React
              frontends, Flutter and React Native apps, Spring Boot and
              FastAPI backends. I&apos;ve
              shipped as a Software Engineer intern at AmaliTech, run a
              bookstore site and the TEAS app at Smartline Publishers, and
              I care about the design layer too: interfaces should feel
              effortless, not just function.
            </p>
            <ul className="links" aria-label="Profiles and contact">
              <li>
                <a href="https://www.github.com/kofiobuomagyare">
                  GitHub
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/kofi-obuom-agyare-760876263">
                  LinkedIn
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
              <li>
                <a href="https://x.com/sey_ram08">
                  X<span aria-hidden="true"> ↗</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/_just.seyram_/">
                  Instagram
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
              <li>
                <a href="mailto:kofiobuomagyare@gmail.com">Email</a>
              </li>
            </ul>
          </div>

          {/* ——— stack + stats ——— */}
          <div className="stackpane">
            <p className="pane__ps" aria-hidden="true">
              <span className="ps">$</span> ls ~/stack
            </p>
            <ul className="groups">
              {STACK_GROUPS.map((g) => (
                <li key={g.title} className="group">
                  <h3 className="group__title">{g.title}/</h3>
                  <ul className="chips">
                    {g.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <dl className="stats" aria-label="Highlights">
              {STATS.map((s) => (
                <div className="stat" key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.num}</dd>
                </div>
              ))}
            </dl>

            <p className="pane__ps" aria-hidden="true">
              <span className="ps">$</span> cat interests.txt
            </p>
            <ul className="chips chips--plain" aria-label="Interests">
              {INTERESTS.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>

            <a className="cta-row" href="#contact">
              Let&apos;s work together
              <svg viewBox="0 0 24 24" aria-hidden="true">
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
        </div>
      </div>
    </section>
  );
}
