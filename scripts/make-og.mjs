// One-off: build the 1200x630 social sharing image.
// Run: node scripts/make-og.mjs
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;

const text = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<rect x="64" y="150" width="72" height="10" fill="#5c8cff"/>` +
    `<text x="64" y="280" font-family="Arial, Helvetica, sans-serif" font-size="104" font-weight="bold" letter-spacing="2" fill="#f2efe9">KOFI OBUOM</text>` +
    `<text x="64" y="390" font-family="Arial, Helvetica, sans-serif" font-size="104" font-weight="bold" letter-spacing="2" fill="#f2efe9">AGYARE</text>` +
    `<text x="68" y="452" font-family="Arial, Helvetica, sans-serif" font-size="34" letter-spacing="4" fill="#8e8e99">DEVELOPER · DESIGNER</text>` +
    `<text x="68" y="502" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="2" fill="#5c8cff">REACT · MOBILE · APIS · UI/UX</text>` +
    `</svg>`,
);

// Circular portrait for the right side.
const P = 520;
const mask = await sharp(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${P}" height="${P}" viewBox="0 0 ${P} ${P}"><circle cx="${P / 2}" cy="${P / 2}" r="${P / 2}" fill="white"/></svg>`,
  ),
)
  .resize(P, P)
  .png()
  .toBuffer();
const face = await sharp(join(root, "public", "portrait.png"))
  .resize(P, P, { fit: "cover", position: "top" })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();

await sharp({
  create: { width: W, height: H, channels: 3, background: "#0b1220" },
})
  .composite([
    { input: text, left: 0, top: 0 },
    { input: face, left: W - P - 56, top: Math.round((H - P) / 2) },
  ])
  .jpeg({ quality: 80 })
  .toFile(join(root, "public", "og-image.jpg"));
console.log("wrote public/og-image.jpg");
