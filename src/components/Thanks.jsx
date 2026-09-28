import { useEffect } from "react";
import "./Contact.css";
import "./Pages.css";
import { useLanguage } from "../i18n/useLanguage.jsx";

/**
 * Thanks — dedicated landing after a successful contact-form submit.
 * Reached via `#thanks`; shares the contact pane language.
 */
export default function Thanks() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="minpage">
      <div className="pane">
        <p className="pane__ps" aria-hidden="true">
          <span className="ps">$</span> ./send.sh --to kofi
        </p>
        <h1 className="contact__title">
          {t("thanksA")}
          <span className="contact__accent"> {t("thanksB")}</span>
        </h1>
        <p className="contact__lede">{t("thanksLede")}</p>
        <div className="contact__actions">
          <a className="contact__mail" href="#top">
            {t("thanksBack")}
          </a>
        </div>
      </div>
    </main>
  );
}
