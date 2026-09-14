const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const TARGET = { file: "public/images/products/papan-nama.jpg", left: 942, top: 613, right: 1010, bottom: 667 };
const BACKUP = path.join("backup-images", TARGET.file.replace(/^public\//, ""));

function inpaintRegion(orig, W, H, c, box) {
  const m = 6;
  const x0 = Math.max(0, box.left - m), y0 = Math.max(0, box.top - m);
  const x1 = Math.min(W, box.right + m), y1 = Math.min(H, box.bottom + m);
  const cur = Buffer.from(orig);
  const px = (b, x, y) => (y * W + x) * c;
  const mean = new Float64Array(c);
  {
    let n = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const o = px(orig, x, y);
      for (let ch = 0; ch < c; ch++) mean[ch] += orig[o + ch];
      n++;
    }
    for (let ch = 0; ch < c; ch++) mean[ch] = Math.round(mean[ch] / n);
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const o = px(cur, x, y);
      for (let ch = 0; ch < c; ch++) cur[o + ch] = mean[ch];
    }
  }
  const ITER = 1500;
  for (let it = 0; it < ITER; it++) {
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const acc = new Float64Array(c);
        let n = 0;
        const nb = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
        for (const [nx, ny] of nb) {
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const inside = nx >= x0 && nx < x1 && ny >= y0 && ny < y1;
          const src = inside ? cur : orig;
          const o = px(src, nx, ny);
          for (let ch = 0; ch < c; ch++) acc[ch] += src[o + ch];
          n++;
        }
        if (!n) continue;
        const o = px(cur, x, y);
        for (let ch = 0; ch < c; ch++) cur[o + ch] = Math.round(acc[ch] / n);
      }
    }
  }
  const FEATHER = 7;
  const fx0 = Math.max(0, x0 - FEATHER), fy0 = Math.max(0, y0 - FEATHER);
  const fx1 = Math.min(W, x1 + FEATHER), fy1 = Math.min(H, y1 + FEATHER);
  const out = Buffer.from(orig);
  for (let y = fy0; y < fy1; y++) {
    for (let x = fx0; x < fx1; x++) {
      const dx = Math.max(x0 - x, x - (x1 - 1), 0);
      const dy = Math.max(y0 - y, y - (y1 - 1), 0);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const w = Math.max(0, Math.min(1, (FEATHER - dist) / FEATHER));
      const oi = (y * W + x) * c;
      for (let ch = 0; ch < c; ch++) {
        out[oi + ch] = Math.round(orig[oi + ch] * (1 - w) + cur[oi + ch] * w);
      }
    }
  }
  return out;
}

(async () => {
  const { data, info } = await sharp(BACKUP).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, c = info.channels;
  const result = inpaintRegion(data, W, H, c, TARGET);
  const out = await sharp(result, { raw: { width: W, height: H, channels: c } }).jpeg({ quality: 95 }).toBuffer();
  const tmp = TARGET.file + ".tmp";
  fs.writeFileSync(tmp, out);
  fs.renameSync(tmp, TARGET.file);
  console.log(`papan-nama: inpainted full emblem [${TARGET.left},${TARGET.top}]-[${TARGET.right},${TARGET.bottom})`);
})();
