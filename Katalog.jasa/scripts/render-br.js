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
    const R = 420, C = 360;
    const left = Math.max(0, w - R), top = Math.max(0, h - C);
    const { data, info } = await sharp(path.join(dir, f))
      .removeAlpha()
      .extract({ left, top, width: Math.min(R, w), height: Math.min(C, h) })
      .resize(120, 90, { fit: "fill" })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const cw = info.width, ch = info.height, cc = info.channels;
    out += `\n===== ${f} BR corner (x${left}-${left + R}, y${top}-${top + C}) =====\n`;
    for (let y = 0; y < ch; y++) {
      let line = "";
      for (let x = 0; x < cw; x++) {
        const idx = (y * cw + x) * cc;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        if (lum > 230 && mx - mn < 40) line += "W";
        else if (lum < 55) line += " ";
        else if (lum < 130) line += "-";
        else line += ".";
      }
      out += line + "\n";
    }
  }
  fs.writeFileSync(path.join(__dirname, "br-corners.txt"), out, "utf8");
  console.log("done");
})();
