import en from "./en.js";
import fr from "./fr.js";
import es from "./es.js";
import pt from "./pt.js";
import nl from "./nl.js";
import ar from "./ar.js";
import zh from "./zh.js";
import ja from "./ja.js";
import sw from "./sw.js";
import tw from "./tw.js";
import ak from "./ak.js";
import ga from "./ga.js";
import ee from "./ee.js";
import ha from "./ha.js";
import yo from "./yo.js";
import ig from "./ig.js";
import pcm from "./pcm.js";
import gpe from "./gpe.js";
import am from "./am.js";
import zu from "./zu.js";

// Flags render natively on macOS/iOS/Android and fall back to
// two-letter codes on Windows — either way the label is clear.
export const LOCALES = [
  { code: "en", label: "🇬🇧 English", dir: "ltr" },
  { code: "fr", label: "🇫🇷 Français", dir: "ltr" },
  { code: "es", label: "🇪🇸 Español", dir: "ltr" },
  { code: "pt", label: "🇵🇹 Português", dir: "ltr" },
  { code: "nl", label: "🇳🇱 Nederlands", dir: "ltr" },
  { code: "ar", label: "🇸🇦 العربية", dir: "rtl" },
  { code: "zh", label: "🇨🇳 中文", dir: "ltr" },
  { code: "ja", label: "🇯🇵 日本語", dir: "ltr" },
  { code: "sw", label: "🇰🇪 Kiswahili", dir: "ltr" },
  { code: "tw", label: "🇬🇭 Twi", dir: "ltr" },
  { code: "ak", label: "🇬🇭 Akuapem Twi", dir: "ltr" },
  { code: "ga", label: "🇬🇭 Ga", dir: "ltr" },
  // Ewe is cross-border (Ghana + Togo) — both flags shown.
  { code: "ee", label: "🇬🇭 & 🇹🇬 Eʋe", dir: "ltr" },
  { code: "ha", label: "🇳🇬 Hausa", dir: "ltr" },
  { code: "yo", label: "🇳🇬 Yorùbá", dir: "ltr" },
  { code: "ig", label: "🇳🇬 Igbo", dir: "ltr" },
  { code: "pcm", label: "🇳🇬 Pidgin", dir: "ltr" },
  { code: "gpe", label: "🇬🇭 Gh Pidgin", dir: "ltr" },
  { code: "am", label: "🇪🇹 አማርኛ", dir: "ltr" },
  { code: "zu", label: "🇿🇦 isiZulu", dir: "ltr" },
];

const DICTS = { en, fr, es, pt, nl, ar, zh, ja, sw, tw, ak, ga, ee, ha, yo, ig, pcm, gpe, am, zu };

/** t("nav.work") → nested lookup with English fallback. */
export function translate(lang, path) {
  const get = (obj) =>
    path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
  return get(DICTS[lang]) ?? get(DICTS.en) ?? path;
}

export function isKnownLang(code) {
  return LOCALES.some((l) => l.code === code);
}
