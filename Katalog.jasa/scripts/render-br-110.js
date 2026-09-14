const sharp = require("sharp");
const fs = require("fs");

const dir = "public/images/products";
const files = ["e-kiosk.jpg","electric-pop.jpg","huruf-timbul.jpg","neon-box.jpg","papan-nama.jpg","rambu.jpg","sticker-cutting.jpg","sticker-mobil.jpg","sticker-sandblast.jpg","event-booth.jpg","totem-pylon.jpg"];

(async () => {
  let out = "";
  for (const f of files) {
    const m = await sharp(dir + "/" + f).metadata();
    const W = m.width, H = m.height;
    const x0 = Math.max(0, W - 110), y0 = Math.max(0, H - 110);
    const { data, info } = await sharp(dir + "/" + f)
      .removeAlpha()
      .extract({ left: x0, top: y0, width: W - x0, height: H - y0 })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const w = info.width, h = info.height, c = info.channels;
    out += `\n===== ${f} BR 110x110 (x0=${x0} y0=${y0}) =====\n`;
    for (let y = 0; y < h; y++) {
      let line = "";
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * c;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const l = 0.299 * r + 0.587 * g + 0.114 * b;
        if (l > 230) line += "#";
        else if (l > 200) line += "+";
        else if (l > 170) line += ".";
        else if (l > 110) line += "-";
        else line += " ";
      }
      out += line + "\n";
    }
  }
  fs.writeFileSync("scripts/br-110.txt", out, "utf8");
  console.log("done");
})();
