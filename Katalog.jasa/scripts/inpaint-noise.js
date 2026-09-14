const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const TARGETS = [
  { file: "images/blog/blog-neon-box.jpg",       left: 955, top: 660, right: 996, bottom: 702 },
  { file: "images/blog/blog-sticker-mobil.jpg",  left: 952, top: 660, right: 994, bottom: 701 },
  { file: "images/blog/blog-sticker-mobil.jpg",  left: 624, top: 520, right: 674, bottom: 566 },
  { file: "images/blog/blog-papan-nama.jpg",     left: 1118, top: 646, right: 1161, bottom: 698 },
];

const BACKUP_ROOT = "backup-images";
const FEATHER = 8;
const RING = 9;

function gauss() {
  let s = 0;
  for (let i = 0; i < 12; i++) s += Math.random();
  return s - 6;
}

function inpaintNoise(orig, W, H, c, box) {
  const L = box.left, T = box.top, R = box.right, B = box.bottom;
  const r0 = Math.max(0, L - RING), s0 = Math.max(0, T - RING);
  const r1 = Math.min(W, R + RING), s1 = Math.min(H, B + RING);

  const mean = new Float64Array(c);
  const m2 = new Float64Array(c);
  let n = 0;
  for (let y = s0; y < s1; y++) {
    for (let x = r0; x < r1; x++) {
      if (x >= L && x < R && y >= T && y < B) continue;
      const o = (y * W + x) * c;
      for (let ch = 0; ch < c; ch++) {
        mean[ch] += orig[o + ch];
        m2[ch] += orig[o + ch] * orig[o + ch];
      }
      n++;
    }
  }
  const std = new Float64Array(c);
  for (let ch = 0; ch < c; ch++) {
    mean[ch] /= n;
    const varv = Math.max(0, m2[ch] / n - mean[ch] * mean[ch]);
    std[ch] = Math.sqrt(varv);
  }

  const out = Buffer.from(orig);
  for (let y = T; y < B; y++) {
    for (let x = L; x < R; x++) {
      const o = (y * W + x) * c;
      for (let ch = 0; ch < c; ch++) {
        let v = Math.round(mean[ch] + gauss() * std[ch]);
        v = Math.max(0, Math.min(255, v));
        out[o + ch] = v;
      }
    }
  }

  const fx0 = Math.max(0, L - FEATHER), fy0 = Math.max(0, T - FEATHER);
  const fx1 = Math.min(W, R + FEATHER), fy1 = Math.min(H, B + FEATHER);
  const cur = Buffer.from(out);
  for (let y = fy0; y < fy1; y++) {
    for (let x = fx0; x < fx1; x++) {
      const dx = Math.max(L - x, x - (R - 1), 0);
      const dy = Math.max(T - y, y - (B - 1), 0);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const w = Math.max(0, Math.min(1, (FEATHER - dist) / FEATHER));
      const o = (y * W + x) * c;
      for (let ch = 0; ch < c; ch++) {
        out[o + ch] = Math.round(orig[o + ch] * (1 - w) + cur[o + ch] * w);
      }
    }
  }
  return out;
}

(async () => {
  const byFile = new Map();
  for (const t of TARGETS) {
    if (!byFile.has(t.file)) byFile.set(t.file, []);
    byFile.get(t.file).push(t);
  }
  for (const [file, boxes] of byFile) {
    const src = path.join(BACKUP_ROOT, file);
    const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, c = info.channels;
    let result = data;
    for (const box of boxes) {
      result = inpaintNoise(result, W, H, c, box);
      console.log(`${file}: noise-filled [${box.left},${box.top}]-[${box.right},${box.bottom})`);
    }
    const out = await sharp(result, { raw: { width: W, height: H, channels: c } }).jpeg({ quality: 95 }).toBuffer();
    const target = path.join("public", file);
    const tmp = target + ".tmp";
    fs.writeFileSync(tmp, out);
    fs.renameSync(tmp, target);
  }
  console.log("all done");
})().catch((e) => { console.error(e); process.exit(1); });
