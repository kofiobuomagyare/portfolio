import { useEffect, useRef } from "react";
import "./Projects.css";

const FEATURED = {
  index: "01",
  name: "FaithLooped",
  tagline: "A Christ-centered community app",
  status: "In development",
  description:
    "Where believers share their daily walk, stay close to their church, and lift each other up — Verse of the Day, prayer requests, devotionals, church feeds, and a Faith Journey of streaks, quests, and badges. Family-safe by design and actively moderated.",
  scope: ["Frontend", "Backend", "UI/UX"],
  stack: ["React Native", "Expo", "REST APIs", "WebSockets", "UI/UX design"],
  links: [
    { label: "Website", href: "https://faithlooped-13ba0.web.app/" },
    { label: "Web app", href: "https://faithlooped.expo.app" },
  ],
};

const MORE = [
  {
    index: "02",
    name: "Nsaano",
    description:
      "Mobile app connecting service seekers with service providers — browse, book, and manage everyday services in one place.",
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
    description:
      "Website for PrintIT, a printing company — services, ordering, and company presence on the web.",
    stack: ["Web", "Vercel"],
    links: [{ label: "Website", href: "https://printit-website.vercel.app/" }],
  },
  {
    index: "04",
    name: "Emergensee",
    description:
      "UI concept for an emergency-services app — fast access to help when seconds matter.",
    stack: ["UI/UX", "Figma"],
    links: [
      {
        label: "Figma",
        href: "https://www.figma.com/design/d9MufhDLaSDkO3QS6UAzlA/Emergensee?node-id=5-508&t=yUVIhnoVdkbpM2Q1-1",
      },
    ],
  },
];

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
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section
      id="work"
      ref={rootRef}
      className="projects reveal"
      aria-labelledby="work-heading"
    >
      <div className="pane">
        <p className="pane__ps" aria-hidden="true">
          <span className="ps">$</span> ls ~/projects
        </p>
        <h2 id="work-heading" className="pane__title">
          Work <span className="pane__script">(selected)</span>
        </h2>

        <article className="project" aria-labelledby="faithlooped-heading">
          <div className="project__head">
            <span className="project__index" aria-hidden="true">
              {FEATURED.index}
            </span>
            <p className="project__status">
              <span className="pulse" aria-hidden="true" />
              {FEATURED.status}
            </p>
          </div>

          <p className="project__tagline">{FEATURED.tagline}</p>
          <h3 id="faithlooped-heading" className="project__name">
            {FEATURED.name}
          </h3>
          <p className="project__desc">{FEATURED.description}</p>

          <dl className="project__meta">
            <div>
              <dt>My scope</dt>
              <dd>{FEATURED.scope.join(" · ")}</dd>
            </div>
          </dl>

          <ul className="chips" aria-label="Technologies">
            {FEATURED.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <ul className="links" aria-label="FaithLooped links">
            {FEATURED.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </article>

        <ul className="project-list" aria-label="More projects">
          {MORE.map((p) => (
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
                <p className="project__desc">{p.description}</p>
                <ul className="chips" aria-label={`${p.name} technologies`}>
                  {p.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <ul className="links" aria-label={`${p.name} links`}>
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
          <span className="ps">$</span> echo &quot;more builds shipping
          soon&quot;
        </p>
      </div>
    </section>
  );
}
