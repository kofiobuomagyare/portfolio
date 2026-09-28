import { useEffect, useRef } from "react";
import "./Experience.css";
import TypeLine from "./TypeLine.jsx";
import { useLanguage } from "../i18n/useLanguage.jsx";

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
      { threshold: 0.12 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [ref]);
}

function Log({ items }) {
  return (
    <ol className="log">
      {items.map((j) => (
        <li key={j.hash} className="commit">
          <span className="commit__hash" aria-hidden="true">
            {j.hash}
          </span>
          <div className="commit__body">
            <p className="commit__title">
              {j.role} <span className="commit__at">@</span> {j.org}
            </p>
            <p className="commit__meta">
              {j.date}
              {j.place ? ` · ${j.place}` : ""}
            </p>
            {j.desc ? <p className="commit__desc">{j.desc}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Experience — `git log` as a career timeline: work history,
 * education, leadership, and certifications, all from the CV.
 */
export default function Experience() {
  const { t } = useLanguage();
  const rootRef = useRef(null);
  useReveal(rootRef);

  const jobs = [
    {
      hash: "a3f9c1d",
      date: "Apr 2025 – Jul 2025",
      role: t("j.r1"),
      org: "AmaliTech",
      place: "Takoradi, Ghana",
      desc: t("j.d1"),
    },
    {
      hash: "7be42a0",
      date: "Sep 2023 – Dec 2023",
      role: t("j.r2"),
      org: "Smartline Publishers",
      place: "Ghana",
      desc: t("j.d2"),
    },
    {
      hash: "c51d8e4",
      date: "Aug 2022 – Oct 2022",
      role: t("j.r3"),
      org: "Smartline Publishers",
      place: "Ghana",
      desc: t("j.d3"),
    },
  ];

  const education = [
    {
      hash: "e90b2f7",
      date: "2024 – 2026",
      role: t("j.e1r"),
      org: "Takoradi Technical University",
      place: t("j.e1p"),
      desc: "",
    },
    {
      hash: "41ac6d2",
      date: "2021 – 2023",
      role: t("j.e2r"),
      org: "Takoradi Technical University",
      place: "",
      desc: "",
    },
  ];

  return (
    <section
      id="experience"
      ref={rootRef}
      className="experience reveal"
      aria-labelledby="experience-heading"
    >
      <div className="pane">
        <p className="pane__ps" aria-hidden="true">
          <TypeLine text={t("expCmd")} />
        </p>
        <h2 id="experience-heading" className="pane__title">
          {t("expA")} <span className="pane__script">{t("expB")}</span>
        </h2>

        <h3 className="exp__sub">{t("expWork")}</h3>
        <Log items={jobs} />

        <h3 className="exp__sub">{t("expEdu")}</h3>
        <Log items={education} />

        <div className="exp__cols">
          <div>
            <p className="pane__ps" aria-hidden="true">
              <TypeLine text={t("leadCmd")} />
            </p>
            <ul className="chips" aria-label={t("leadAria")}>
              {t("lead").map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="pane__ps" aria-hidden="true">
              <TypeLine text={t("certCmd")} />
            </p>
            <ul className="chips" aria-label={t("certAria")}>
              {t("cert").map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
