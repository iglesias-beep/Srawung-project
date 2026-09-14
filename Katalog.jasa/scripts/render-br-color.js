const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = "public/images/products";
const files = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));

(async () => {
  let out = "";
  for (const f of files) {
    const meta = await sharp(path.join(dir, f)).metadata();
    const w = meta.width, h = meta.height;
    const R = 500, C = 400;
    const left = Math.max(0, w - R), top = Math.max(0, h - C);
    const { data, info } = await sharp(path.join(dir, f))
      .removeAlpha()
      .extract({ left, top, width: Math.min(R, w), height: Math.min(C, h) })
      .resize(130, 100, { fit: "fill" })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const cw = info.width, ch = info.height, cc = info.channels;
    out += `\n===== ${f} BR corner =====\n`;
    for (let y = 0; y < ch; y++) {
      let line = "";
      for (let x = 0; x < cw; x++) {
        const idx = (y * cw + x) * cc;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const sat = mx - mn;
        if (sat > 60 && lum > 30) line += "C";
        else if (sat > 25 && lum > 60) line += "c";
        else if (lum > 235) line += "W";
        else if (lum < 50) line += " ";
        else line += ".";
      }
      out += line + "\n";
    }
  }
  fs.writeFileSync(path.join(__dirname, "br-color.txt"), out, "utf8");
  console.log("done");
})();
