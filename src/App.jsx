import { useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Hero from "./components/Hero.jsx";
import Thanks from "./components/Thanks.jsx";
import NotFound from "./components/NotFound.jsx";

const HOME_TITLE = "Kofi Obuom Agyare — Developer & Designer";
const HOME_DESC =
  "Kofi Obuom Agyare — Frontend (React), Mobile (React Native & Flutter), Backend (Spring Boot & FastAPI) developer and UI/UX designer.";

const ROUTES = {
  home: {
    title: HOME_TITLE,
    desc: HOME_DESC,
  },
  thanks: {
    title: "Message received — Kofi Obuom Agyare",
    desc: "Thanks for reaching out to Kofi Obuom Agyare — expect a reply within a day.",
  },
  404: {
    title: "Page not found — Kofi Obuom Agyare",
    desc: "This page doesn't exist. Head back to Kofi Obuom Agyare's portfolio homepage.",
  },
};

function getRoute() {
  const p = window.location.pathname;
  if (p !== "/" && p !== "/index.html") return "404";
  return window.location.hash === "#thanks" ? "thanks" : "home";
}

/**
 * App — tiny view router. Home is the portfolio; `#thanks` is the
 * dedicated post-submit page; any other path is the custom 404
 * (vercel.json serves index.html for those). Each view sets its
 * own document title and meta description.
 */
function App() {
  const [route, setRoute] = useState(getRoute);
  const prev = useRef(route);

  useEffect(() => {
    const sync = () => {
      const next = getRoute();
      setRoute(next);
      // Returning from a standalone view: start at the top.
      // (In-page anchor taps keep native scroll — untouched.)
      if (prev.current !== "home" && next === "home") {
        window.scrollTo(0, 0);
      }
      prev.current = next;
    };
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  useEffect(() => {
    const meta = ROUTES[route] || ROUTES.home;
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.desc);
  }, [route]);

  return (
    <>
      {route === "thanks" ? (
        <Thanks />
      ) : route === "404" ? (
        <NotFound />
      ) : (
        <Hero />
      )}
      <Analytics />
    </>
  );
}

export default App;
