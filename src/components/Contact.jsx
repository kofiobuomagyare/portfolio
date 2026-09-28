import { useEffect, useRef, useState } from "react";
import "./Contact.css";
import TypeLine from "./TypeLine.jsx";
import { useLanguage } from "../i18n/useLanguage.jsx";

const YEAR = new Date().getFullYear();
const FORM_ENDPOINT = "https://formsubmit.co/ajax/kofiobuomagyare@gmail.com";

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
 * Contact + footer — `./contact.sh`: the ask, direct channels,
 * and the sign-off line.
 */
export default function Contact() {
  const { t } = useLanguage();
  const rootRef = useRef(null);
  useReveal(rootRef);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact — ${form.name}`,
          _template: "table",
          _captcha: "false",
          _honey: "",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      window.location.hash = "#thanks";
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={rootRef}
      className="contact reveal"
      aria-labelledby="contact-heading"
    >
      <div className="pane pane--contact">
        <p className="pane__ps" aria-hidden="true">
          <TypeLine text={t("contactCmd")} />
        </p>
        <div className="contact__grid">
          <div className="contact__side">
            <form className="form" onSubmit={onSubmit} aria-label="Contact form">
              <p className="pane__ps" aria-hidden="true">
                <span className="ps">$</span> ./send.sh --to kofi
              </p>
              <div className="field">
                <label htmlFor="cf-name">{t("f.name")}</label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  required
                  minLength={2}
                  maxLength={80}
                  value={form.name}
                  onChange={onChange}
                />
              </div>
              <div className="field">
                <label htmlFor="cf-email">{t("f.email")}</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  required
                  maxLength={120}
                  value={form.email}
                  onChange={onChange}
                />
              </div>
              <div className="field">
                <label htmlFor="cf-message">{t("f.msg")}</label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={5}
                  placeholder={t("f.msgPh")}
                  required
                  minLength={10}
                  maxLength={2000}
                  value={form.message}
                  onChange={onChange}
                />
              </div>
              {/* honeypot — humans never see this */}
              <input
                className="hp"
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value=""
                onChange={() => {}}
              />
              {status === "error" ? (
                <p className="form-note form-note--err" role="alert">
                  {t("f.err")}
                </p>
              ) : null}
              <button
                type="submit"
                className="form__send"
                disabled={status === "sending"}
              >
                {status === "sending" ? t("f.sending") : t("f.send")}
              </button>
            </form>
          </div>
          <div className="contact__copy">
            <h2 id="contact-heading" className="contact__title">
              {t("cA")}
              <span className="contact__accent"> {t("cB")}</span>
            </h2>
            <p className="contact__lede">{t("lede")}</p>
            <div className="contact__actions">
              <a
                className="contact__mail"
                href="mailto:kofiobuomagyare@gmail.com?subject=Hello%20Kofi%20—%20let's%20talk"
              >
                kofiobuomagyare@gmail.com
              </a>
              <ul className="links" aria-label={t("clinks")}>
                <li>
                  <a href="https://www.github.com/kofiobuomagyare">
                    GitHub<span aria-hidden="true"> ↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/kofi-obuom-agyare-760876263">
                    LinkedIn<span aria-hidden="true"> ↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/sey_ram08">
                    X<span aria-hidden="true"> ↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/_just.seyram_/">
                    Instagram<span aria-hidden="true"> ↗</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+233507119463">+233 507 119 463</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="signoff">
          <p className="signoff__line">
            <span aria-hidden="true" className="ps">
              $
            </span>{" "}
            exit 0 — © {YEAR} Kofi Obuom Agyare · Accra, Ghana
          </p>
          <p className="signoff__built">{t("built")}</p>
          <a className="signoff__top" href="#top">
            {t("backTop")} <span aria-hidden="true">↑</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
