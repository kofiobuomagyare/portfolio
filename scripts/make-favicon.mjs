// One-off: build a circular avatar favicon set from public/portrait.png.
// Run: node scripts/make-favicon.mjs
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public", "portrait.png");

const circlemask = async (size) =>
  sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`,
    ),
  )
    .resize(size, size)
    .png()
    .toBuffer();

for (const size of [180, 32]) {
  const out =
    size === 180
      ? join(root, "public", "apple-touch-icon.png")
      : join(root, "public", "favicon-32x32.png");
  // Circle-crop from the square source (pass 1), then size down (pass 2).
  // Two passes because sharp composites overlays after every resize op.
  const circled = await sharp(src)
    .resize(512, 512, { fit: "cover" })
    .composite([{ input: await circlemask(512), blend: "dest-in" }])
    .png()
    .toBuffer();
  await sharp(circled).resize(size, size).png().toFile(out);
  console.log("wrote", out);
}
