import { useEffect, useRef } from "react";
import "./About.css";
import TypeLine from "./TypeLine.jsx";
import { useLanguage } from "../i18n/useLanguage.jsx";

const GROUP_ITEMS = {
  frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  mobile: ["Flutter", "React Native", "Expo"],
  backend: [
    "Spring Boot",
    "FastAPI",
    "PHP",
    "Java",
    "Python",
    "MySQL",
    "PostgreSQL",
    "Firebase",
    "Supabase",
  ],
  also: ["UI/UX design", "Cybersecurity", "Photography", "Writing"],
};

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
 * All content from Kofi's CV, fully translated.
 */
export default function About() {
  const { t } = useLanguage();
  const rootRef = useRef(null);
  const statsRef = useRef(null);
  useReveal(rootRef);

  const facts = [
    { key: t("fact.name"), value: "Agyare Kofi Obuom" },
    { key: t("fact.aka"), value: "Seyram" },
    { key: t("fact.based"), value: t("fval.based") },
    { key: t("fact.edu"), value: t("fval.edu") },
    { key: t("fact.focus"), value: t("fval.focus") },
    { key: t("fact.status"), value: t("fval.status") },
  ];

  const groups = [
    { title: t("group.frontend"), items: GROUP_ITEMS.frontend },
    { title: t("group.mobile"), items: GROUP_ITEMS.mobile },
    { title: t("group.backend"), items: GROUP_ITEMS.backend },
    { title: t("group.also"), items: GROUP_ITEMS.also },
  ];

  const stats = [
    { num: "03", label: t("stat.intern") },
    { num: "17", label: t("stat.tech") },
    { num: "04", label: t("stat.lead") },
  ];

  const interests = [
    t("int.gaming"),
    t("int.photo"),
    t("int.basket"),
    t("int.beach"),
    t("int.run"),
  ];

  // Count-up: stats tick from 00 to their value when scrolled into view.
  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    const nums = Array.from(node.querySelectorAll(".stat dd"));
    const targets = nums.map((el) => parseInt(el.textContent, 10) || 0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          const start = performance.now();
          const dur = 900;
          const step = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            nums.forEach((el, i) => {
              el.textContent = String(
                Math.round(targets[i] * eased),
              ).padStart(2, "0");
            });
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="about reveal"
      aria-labelledby="about-heading"
    >
      <div className="pane">
        <p className="pane__ps" aria-hidden="true">
          <TypeLine text={t("aboutCmd")} />
        </p>
        <h2 id="about-heading" className="pane__title">
          {t("aboutA")} <span className="pane__script">{t("aboutB")}</span>
        </h2>

        <div className="about__grid">
          {/* ——— profile ——— */}
          <div className="profile">
            <picture className="profile__picture">
              <source srcSet="/portrait.webp" type="image/webp" />
              <img
                className="profile__photo"
                src="/portrait.png"
                alt="Portrait of Kofi Obuom Agyare"
                width={1000}
                height={1000}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <dl className="facts">
              {facts.map((f) => (
                <div className="fact" key={f.key}>
                  <dt>{f.key}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="bio-long">{t("bioLong")}</p>
            <ul className="links" aria-label={t("profiles")}>
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
              <TypeLine text={t("aboutStack")} />
            </p>
            <ul className="groups">
              {groups.map((g) => (
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

            <dl className="stats" ref={statsRef} aria-label={t("statsAria")}>
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.num}</dd>
                </div>
              ))}
            </dl>

            <p className="pane__ps" aria-hidden="true">
              <TypeLine text={t("intCmd")} />
            </p>
            <ul className="chips chips--plain" aria-label={t("intAria")}>
              {interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>

            <a className="cta-row" href="#contact">
              {t("cta")}
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
