import { useCallback, useEffect, useState } from "react";
import { LOCALES, isKnownLang, translate } from "./index.js";
import { LanguageContext } from "./LanguageContext.jsx";

function initialLang() {
  try {
    const stored = window.localStorage.getItem("koa-lang");
    if (stored && isKnownLang(stored)) return stored;
    const sys = (navigator.language || "en").split("-")[0].toLowerCase();
    if (isKnownLang(sys)) return sys;
  } catch {
    /* private mode — fall through */
  }
  return document.documentElement.lang && isKnownLang(document.documentElement.lang)
    ? document.documentElement.lang
    : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  const setLang = useCallback((code) => {
    if (!isKnownLang(code)) return;
    setLangState(code);
    try {
      window.localStorage.setItem("koa-lang", code);
    } catch {
      /* private mode — skip persistence */
    }
  }, []);

  useEffect(() => {
    const meta = LOCALES.find((l) => l.code === lang) || LOCALES[0];
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
  }, [lang]);

  const t = useCallback((path) => translate(lang, path), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
