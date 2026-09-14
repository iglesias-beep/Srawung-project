const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const FILE = "images/products/neon-box.jpg";
const BOXES = [
  { left: 61, top: 277, right: 88, bottom: 305 },
  { left: 241, top: 293, right: 274, bottom: 322 },
  { left: 234, top: 328, right: 264, bottom: 357 },
  { left: 275, top: 349, right: 305, bottom: 377 },
  { left: 303, top: 371, right: 332, bottom: 400 },
  { left: 64, top: 415, right: 109, bottom: 450 },
];

const BACKUP_ROOT = "backup-images";
const FEATHER = 8;
const RING = 9;

function gauss() {
  let s = 0;
  for (let i = 0; i < 12; i++) s += Math.random();
  return s - 6;
}

function insideAny(x, y) {
  for (const b of BOXES) {
    if (x >= b.left && x < b.right && y >= b.top && y < b.bottom) return true;
  }
  return false;
}

(async () => {
  const src = path.join("public", FILE);
  const bkp = path.join(BACKUP_ROOT, FILE);
  if (!fs.existsSync(bkp)) {
    fs.mkdirSync(path.dirname(bkp), { recursive: true });
    fs.copyFileSync(src, bkp);
    console.log("backup created: " + bkp);
  }

  const { data, info } = await sharp(bkp).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, c = info.channels;
  const orig = data;

  const result = Buffer.from(orig);
  for (const box of BOXES) {
    const r0 = Math.max(0, box.left - RING), s0 = Math.max(0, box.top - RING);
    const r1 = Math.min(W, box.right + RING), s1 = Math.min(H, box.bottom + RING);
    const mean = new Float64Array(c), m2 = new Float64Array(c);
    let n = 0;
    for (let y = s0; y < s1; y++) {
      for (let x = r0; x < r1; x++) {
        if (insideAny(x, y)) continue;
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
      std[ch] = Math.sqrt(Math.max(0, m2[ch] / n - mean[ch] * mean[ch]));
    }
    for (let y = box.top; y < box.bottom; y++) {
      for (let x = box.left; x < box.right; x++) {
        const o = (y * W + x) * c;
        for (let ch = 0; ch < c; ch++) {
          let v = Math.round(mean[ch] + gauss() * std[ch]);
          v = Math.max(0, Math.min(255, v));
          result[o + ch] = v;
        }
      }
    }
    console.log(`box [${box.left},${box.top}]-[${box.right},${box.bottom}) filled; mean=(${mean.map(m => m.toFixed(0)).join(',')}) std=(${std.map(s => s.toFixed(0)).join(',')}) n=${n}`);
  }

  const filled = Buffer.from(result);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let wmax = 0;
      for (const box of BOXES) {
        const dx = Math.max(box.left - x, x - (box.right - 1), 0);
        const dy = Math.max(box.top - y, y - (box.bottom - 1), 0);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const w = Math.max(0, Math.min(1, (FEATHER - dist) / FEATHER));
        if (w > wmax) wmax = w;
      }
      if (wmax > 0) {
        const o = (y * W + x) * c;
        for (let ch = 0; ch < c; ch++) {
          result[o + ch] = Math.round(orig[o + ch] * (1 - wmax) + filled[o + ch] * wmax);
        }
      }
    }
  }

  const out = await sharp(result, { raw: { width: W, height: H, channels: c } }).jpeg({ quality: 95 }).toBuffer();
  const target = path.join("public", FILE);
  const tmp = target + ".tmp";
  fs.writeFileSync(tmp, out);
  fs.renameSync(tmp, target);
  console.log("all done");
})().catch((e) => { console.error(e); process.exit(1); });
