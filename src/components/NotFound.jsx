import { useEffect } from "react";
import "./Contact.css";
import "./Pages.css";
import { useLanguage } from "../i18n/useLanguage.jsx";

/**
 * NotFound — custom 404. The vercel.json SPA fallback serves
 * index.html for unknown paths, and App renders this view when
 * the pathname isn't home.
 */
export default function NotFound() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="minpage">
      <div className="pane">
        <p className="pane__ps" aria-hidden="true">
          <span className="ps">$</span> cd ~/this-page
        </p>
        <h1 className="contact__title">
          {t("nfA")}
          <span className="contact__accent"> {t("nfB")}</span>
        </h1>
        <p className="contact__lede">{t("nfLede")}</p>
        <div className="contact__actions">
          <a className="contact__mail" href="#top">
            {t("thanksBack")}
          </a>
        </div>
      </div>
    </main>
  );
}
