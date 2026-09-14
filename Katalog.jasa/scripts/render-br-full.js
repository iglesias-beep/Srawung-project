const sharp = require("sharp");
const fs = require("fs");

const dir = "public/images/products";
const files = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));

(async () => {
  let out = "";
  for (const f of files) {
    const m = await sharp(dir + "/" + f).metadata();
    const W = m.width, H = m.height;
    const x0 = Math.max(0, W - 150), y0 = Math.max(0, H - 150);
    const { data, info } = await sharp(dir + "/" + f)
      .removeAlpha()
      .extract({ left: x0, top: y0, width: W - x0, height: H - y0 })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const w = info.width, h = info.height, c = info.channels;
    out += `\n===== ${f} BR 150x150 (x0=${x0} y0=${y0}) =====\n`;
    for (let y = 0; y < h; y += 3) {
      let line = "";
      for (let x = 0; x < w; x += 3) {
        const i = (y * w + x) * c;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const l = 0.299 * r + 0.587 * g + 0.114 * b;
        if (l > 215) line += "#";
        else if (l > 185) line += "+";
        else if (l > 140) line += ".";
        else if (l > 80) line += "-";
        else line += " ";
      }
      out += line + "\n";
    }
  }
  fs.writeFileSync("scripts/br-corners-full.txt", out, "utf8");
  console.log("written");
})();
