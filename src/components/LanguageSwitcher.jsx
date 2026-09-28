import { LOCALES } from "../i18n/index.js";
import { useLanguage } from "../i18n/useLanguage.jsx";
import "./LanguageSwitcher.css";

/**
 * LanguageSwitcher — `$ lang` + native select. Compact enough for
 * the terminal title bar on mobile; fully keyboard/screen-reader
 * operable for free.
 */
export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <label className="langsel">
      <span className="langsel__ps" aria-hidden="true">
        $ lang
      </span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        aria-label={t("langLabel")}
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
