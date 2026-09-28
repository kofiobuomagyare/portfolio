import { useEffect, useRef, useState } from "react";
import "./BottomNav.css";

const TABS = [
  {
    id: "top",
    label: "Home",
    href: "#top",
    icon: (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
      </>
    ),
  },
  {
    id: "about",
    label: "About",
    href: "#about",
    icon: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
  },
  {
    id: "work",
    label: "Work",
    href: "#work",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    href: "#experience",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    icon: (
      <>
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M22 6l-10 7L2 6" />
      </>
    ),
  },
];

/**
 * BottomNav — mobile-only tab bar in the iOS Liquid Glass idiom:
 * floating capsule, translucent blur + saturation material, bright
 * top edge, accent-tinted active pill. Hidden on desktop (CSS),
 * where the terminal title-bar nav takes over.
 */
export default function BottomNav() {
  const [active, setActive] = useState("top");
  const navRef = useRef(null);

  // Scroll-spy: highlight the tab of whatever section owns the
  // middle band of the viewport.
  useEffect(() => {
    const tabFor = {
      top: "top",
      about: "about",
      work: "work",
      experience: "experience",
      contact: "contact",
    };
    const sections = Object.keys(tabFor)
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (typeof IntersectionObserver === "undefined" || sections.length === 0) {
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const tab = tabFor[entry.target.id];
            if (tab) setActive(tab);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // iOS/Android shove fixed bars around when the keyboard opens —
  // hide deterministically while typing instead of jumping.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onFocusIn = (e) => {
      if (
        e.target instanceof HTMLElement &&
        /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)
      ) {
        nav.classList.add("is-hidden");
      }
    };
    const onFocusOut = () => nav.classList.remove("is-hidden");
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return (
    <nav ref={navRef} className="bottom-nav" aria-label="Mobile">
      <ul>
        {TABS.map((tab) => (
          <li key={tab.id}>
            <a
              href={tab.href}
              className={active === tab.id ? "is-active" : undefined}
              aria-current={active === tab.id ? "page" : undefined}
              onClick={() => setActive(tab.id)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {tab.icon}
              </svg>
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
