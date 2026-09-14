const sharp = require("sharp");
const fs = require("fs");

const dir = "public/images/products";
const files = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));

(async () => {
  let out = "";
  for (const f of files) {
    const m = await sharp(dir + "/" + f).metadata();
    const W = m.width, H = m.height;
    const x0 = Math.max(0, W - 90), y0 = Math.max(0, H - 90);
    const { data, info } = await sharp(dir + "/" + f)
      .removeAlpha()
      .extract({ left: x0, top: y0, width: W - x0, height: H - y0 })
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
    out += `\n===== ${f} diff-map [${x0},${y0}] (bright star => #) =====\n`;
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
  fs.writeFileSync("scripts/br-diff.txt", out, "utf8");
  console.log("done");
})();
