import { useEffect, useRef } from "react";
import "./Experience.css";

const JOBS = [
  {
    hash: "a3f9c1d",
    date: "Apr 2025 – Jul 2025",
    role: "Software Engineering Intern",
    org: "AmaliTech",
    place: "Takoradi, Ghana",
    desc: "Four months shipping production software as part of an engineering team.",
  },
  {
    hash: "7be42a0",
    date: "Sep 2023 – Dec 2023",
    role: "Bookstore Website & TEAS App Administrator",
    org: "Smartline Publishers",
    place: "Ghana",
    desc: "Managed and updated the TEAS app — university and course guidance for SHS leavers — plus the bookstore website.",
  },
  {
    hash: "c51d8e4",
    date: "Aug 2022 – Oct 2022",
    role: "Research Assistant",
    org: "Smartline Publishers",
    place: "Ghana",
    desc: "Research support across publishing projects.",
  },
];

const EDUCATION = [
  {
    hash: "e90b2f7",
    date: "2024 – 2026",
    role: "BTech, Information Technology — Software Engineering",
    org: "Takoradi Technical University",
    place: "Completed Aug 2026",
    desc: "",
  },
  {
    hash: "41ac6d2",
    date: "2021 – 2023",
    role: "Diploma of Technology, Information Technology",
    org: "Takoradi Technical University",
    place: "",
    desc: "",
  },
];

const LEADERSHIP = [
  "SRC Entertainment Committee Chairman ’25/’26",
  "Faculty Publicity Deputy ’23/’24",
  "Entertainment Prefect (SHS)",
  "Chapel Prefect (JHS)",
];

const CERTS = [
  "AmaliTech Internship",
  "ASUSTEM Robotics — Cybersecurity",
  "Blogger of the Year ’22 — Hall Premier Awards",
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
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section
      id="experience"
      ref={rootRef}
      className="experience reveal"
      aria-labelledby="experience-heading"
    >
      <div className="pane">
        <p className="pane__ps" aria-hidden="true">
          <span className="ps">$</span> git log --oneline --experience
        </p>
        <h2 id="experience-heading" className="pane__title">
          Experience <span className="pane__script">(the road)</span>
        </h2>

        <h3 className="exp__sub">work</h3>
        <Log items={JOBS} />

        <h3 className="exp__sub">education</h3>
        <Log items={EDUCATION} />

        <div className="exp__cols">
          <div>
            <p className="pane__ps" aria-hidden="true">
              <span className="ps">$</span> ls ~/leadership
            </p>
            <ul className="chips" aria-label="Leadership roles">
              {LEADERSHIP.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="pane__ps" aria-hidden="true">
              <span className="ps">$</span> ls ~/certs
            </p>
            <ul className="chips" aria-label="Certifications and awards">
              {CERTS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
