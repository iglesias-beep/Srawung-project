const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const S = 80;
const boxes = [
  ["public/images/blog/blog-neon-box.jpg", 921, 641],
  ["public/images/blog/blog-neon-box.jpg", 747, 378],
  ["public/images/blog/blog-sticker-mobil.jpg", 921, 641],
  ["public/images/blog/blog-sticker-mobil.jpg", 337, 256],
  ["public/images/blog/blog-sticker-mobil.jpg", 620, 520],
  ["public/images/blog/blog-papan-nama.jpg", 1091, 631],
  ["public/images/blog/blog-papan-nama.jpg", 529, 323],
  ["public/images/blog/blog-papan-nama.jpg", 563, 262],
  ["public/images/products/sticker-cutting.jpg", 226, 509],
  ["public/images/products/sticker-cutting.jpg", 283, 489],
  ["public/images/products/sticker-cutting.jpg", 333, 471],
  ["public/images/products/sticker-cutting.jpg", 411, 273],
  ["public/images/products/sticker-cutting.jpg", 518, 678],
];

(async () => {
  let out = "";
  for (const [file, x0, y0] of boxes) {
    const m = await sharp(file).metadata();
    const ex = Math.min(S, m.width - x0), ey = Math.min(S, m.height - y0);
    if (ex <= 0 || ey <= 0) { out += `\n===== ${path.basename(file)} [${x0},${y0}] OUT OF RANGE =====\n`; continue; }
    const { data, info } = await sharp(file)
      .removeAlpha()
      .extract({ left: x0, top: y0, width: ex, height: ey })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const w = info.width, h = info.height, c = info.channels;
    const lum = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) {
      lum[i] = 0.299 * data[i * c] + 0.587 * data[i * c + 1] + 0.114 * data[i * c + 2];
    }
    const R = 10;
    const blur = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let sum = 0, n = 0;
        for (let dy = -R; dy <= R; dy++) {
          const yy = y + dy;
          if (yy < 0 || yy >= h) continue;
          for (let dx = -R; dx <= R; dx++) {
            const xx = x + dx;
            if (xx < 0 || xx >= w) continue;
            sum += lum[yy * w + xx]; n++;
          }
        }
        blur[y * w + x] = sum / n;
      }
    }
    out += `\n===== ${path.basename(file)} diff [${x0},${y0}] (${w}x${h}) =====\n`;
    for (let y = 0; y < h; y++) {
      let line = "";
      for (let x = 0; x < w; x++) {
        const d = lum[y * w + x] - blur[y * w + x];
        if (d > 30) line += "#";
        else if (d > 18) line += "+";
        else if (d > 8) line += ".";
        else line += " ";
      }
      out += line + "\n";
    }
  }
  fs.writeFileSync("scripts/blog-box-diff.txt", out, "utf8");
  console.log("done");
})();
