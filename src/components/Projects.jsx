import { useEffect, useRef } from "react";
import "./Projects.css";
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

/**
 * Projects — `ls ~/projects` as a terminal pane.
 * FaithLooped leads as the featured build; Nsaano, PrintIT
 * and Emergensee follow as compact rows.
 */
export default function Projects() {
  const { t } = useLanguage();
  const rootRef = useRef(null);
  useReveal(rootRef);

  const featured = {
    index: "01",
    name: "FaithLooped",
    scope: [t("sc.front"), t("sc.back"), t("sc.ui")],
    stack: ["React Native", "Expo", "REST APIs", "WebSockets", "UI/UX design"],
    links: [
      { label: t("lk.site"), href: "https://faithlooped-13ba0.web.app/" },
      { label: t("lk.app"), href: "https://faithlooped.expo.app" },
    ],
  };

  const more = [
    {
      index: "02",
      name: "Nsaano",
      stack: ["Flutter", "Mobile"],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/kofiobuomagyare/booking_flutter.git",
        },
      ],
    },
    {
      index: "03",
      name: "PrintIT",
      stack: ["Web", "Vercel"],
      links: [{ label: t("lk.site"), href: "https://printit-website.vercel.app/" }],
    },
    {
      index: "04",
      name: "Emergensee",
      stack: ["UI/UX", "Figma"],
      links: [
        {
          label: "Figma",
          href: "https://www.figma.com/design/d9MufhDLaSDkO3QS6UAzlA/Emergensee?node-id=5-508&t=yUVIhnoVdkbpM2Q1-1",
        },
      ],
    },
  ];

  const moreDesc = { Nsaano: t("p.nsaano"), PrintIT: t("p.printit"), Emergensee: t("p.emerg") };

  return (
    <section
      id="work"
      ref={rootRef}
      className="projects reveal"
      aria-labelledby="work-heading"
    >
      <div className="pane">
        <p className="pane__ps" aria-hidden="true">
          <TypeLine text={t("workCmd")} />
        </p>
        <h2 id="work-heading" className="pane__title">
          {t("workA")} <span className="pane__script">{t("workB")}</span>
        </h2>

        <article className="project" aria-labelledby="faithlooped-heading">
          <div className="project__head">
            <span className="project__index" aria-hidden="true">
              {featured.index}
            </span>
            <p className="project__status">
              <span className="pulse" aria-hidden="true" />
              {t("featStatus")}
            </p>
          </div>

          <p className="project__tagline">{t("featTag")}</p>
          <h3 id="faithlooped-heading" className="project__name">
            {featured.name}
          </h3>
          <p className="project__desc">{t("featDesc")}</p>

          <dl className="project__meta">
            <div>
              <dt>{t("scopeL")}</dt>
              <dd>{featured.scope.join(" · ")}</dd>
            </div>
          </dl>

          <ul className="chips" aria-label={t("techL")}>
            {featured.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <ul className="links" aria-label={t("featLinks")}>
            {featured.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </article>

        <ul className="project-list" aria-label={t("moreAria")}>
          {more.map((p) => (
            <li key={p.name}>
              <article
                className="project project--compact"
                aria-labelledby={`${p.name}-heading`}
              >
                <div className="project__head">
                  <span className="project__index" aria-hidden="true">
                    {p.index}
                  </span>
                </div>
                <h3 id={`${p.name}-heading`} className="project__name--sm">
                  {p.name}
                </h3>
                <p className="project__desc">{moreDesc[p.name]}</p>
                <ul className="chips" aria-label={`${p.name} ${t("kTech")}`}>
                  {p.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ul className="links" aria-label={`${p.name} ${t("kLinks")}`}>
                  {p.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                        <span aria-hidden="true"> ↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>

        <p className="pane__ps pane__ps--end" aria-hidden="true">
          <TypeLine text={t("endEcho")} />
        </p>
      </div>
    </section>
  );
}
