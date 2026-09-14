const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const TARGETS = [
  { file: "public/images/products/event-booth.jpg",     left: 763,  top: 706, right: 800, bottom: 744 },
  { file: "public/images/products/totem-pylon.jpg",     left: 955,  top: 678, right: 996, bottom: 719 },
  { file: "public/images/products/papan-nama.jpg",      left: 958,  top: 619, right: 998, bottom: 659 },
  { file: "public/images/products/sticker-cutting.jpg", left: 573,  top: 700, right: 608, bottom: 748 },
  { file: "public/images/blog/blog-neon-box.jpg",       left: 953,  top: 663, right: 990, bottom: 701 },
  { file: "public/images/blog/blog-sticker-mobil.jpg",  left: 945,  top: 663, right: 985, bottom: 701 },
  { file: "public/images/blog/blog-papan-nama.jpg",     left: 1115, top: 648, right: 1155, bottom: 695 },
  { file: "public/images/hero-srawung.jpg",             left: 915,  top: 579, right: 945, bottom: 619 },
];

const BACKUP_ROOT = "backup-images";

function inpaintRegion(orig, W, H, c, box) {
  const m = 6;
  const x0 = Math.max(0, box.left - m), y0 = Math.max(0, box.top - m);
  const x1 = Math.min(W, box.right + m), y1 = Math.min(H, box.bottom + m);
  const rw = x1 - x0, rh = y1 - y0;

  const cur = Buffer.from(orig);
  const px = (b, x, y) => (y * W + x) * c;

  const ITER = 320;
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
      const ci = (y * W + x) * c;
      for (let ch = 0; ch < c; ch++) {
        out[oi + ch] = Math.round(orig[oi + ch] * (1 - w) + cur[ci + ch] * w);
      }
    }
  }
  return out;
}

(async () => {
  for (const t of TARGETS) {
    const src = path.join(BACKUP_ROOT, t.file.replace(/^public\//, ""));
    const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, c = info.channels;
    const result = inpaintRegion(data, W, H, c, t);
    const out = await sharp(result, { raw: { width: W, height: H, channels: c } })
      .jpeg({ quality: 95 })
      .toBuffer();
    const tmp = t.file + ".tmp";
    fs.writeFileSync(tmp, out);
    fs.renameSync(tmp, t.file);
    console.log(`${path.basename(t.file)}: inpainted [${t.left},${t.top}]-[${t.right},${t.bottom})`);
  }
  console.log("all done");
})();
