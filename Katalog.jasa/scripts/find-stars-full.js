const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const targets = [
  "public/images/blog/blog-neon-box.jpg",
  "public/images/blog/blog-papan-nama.jpg",
  "public/images/blog/blog-sticker-mobil.jpg",
  "public/images/products/sticker-cutting.jpg",
  "public/images/products/event-booth.jpg",
  "public/images/products/totem-pylon.jpg",
  "public/images/products/papan-nama.jpg",
];

(async () => {
  let out = "";
  for (const file of targets) {
    const meta = await sharp(file).metadata();
    const W = meta.width, H = meta.height;
    const { data, info } = await sharp(file)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const w = info.width, h = info.height, c = info.channels;
    const lum = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) {
      lum[i] = 0.299 * data[i * c] + 0.587 * data[i * c + 1] + 0.114 * data[i * c + 2];
    }
    const R = 15;
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
    const visited = new Uint8Array(w * h);
    const clusters = [];
    const TH = 11;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const d = lum[y * w + x] - blur[y * w + x];
        if (visited[y * w + x] || d <= TH) continue;
        const stack = [[x, y]];
        visited[y * w + x] = 1;
        let size = 0, sumD = 0, minX = x, maxX = x, minY = y, maxY = y;
        while (stack.length) {
          const [cx, cy] = stack.pop();
          size++; sumD += d;
          if (cx < minX) minX = cx; if (cx > maxX) maxX = cx;
          if (cy < minY) minY = cy; if (cy > maxY) maxY = cy;
          const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
          for (const [nx, ny] of neighbors) {
            if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
            if (visited[ny * w + nx] || lum[ny * w + nx] - blur[ny * w + nx] <= TH) continue;
            visited[ny * w + nx] = 1;
            stack.push([nx, ny]);
          }
        }
        if (size < 40 || size > 9000) continue;
        const bw = maxX - minX + 1, bh = maxY - minY + 1;
        if (bw < 14 || bw > 130 || bh < 14 || bh > 130) continue;
        const aspect = Math.max(bw / bh, bh / bw);
        if (aspect > 1.9) continue;
        const sq = 1 - (aspect - 1) / 1.9;
        const score = (size / 1200) * sq * (Math.min(sumD / size, 40) / 40);
        clusters.push({
          score: score.toFixed(3), size, bw, bh,
          avgD: (sumD / size).toFixed(1),
          box: { left: minX, right: maxX + 1, top: minY, bottom: maxY + 1 },
        });
      }
    }
    clusters.sort((a, b) => b.score - a.score);
    out += `\n===== ${path.basename(file)} (${W}x${H}) full-image star candidates =====\n`;
    clusters.slice(0, 10).forEach((cl) => {
      out += `  score=${cl.score} size=${cl.size} w=${cl.bw} h=${cl.bh} avgD=${cl.avgD} box=${JSON.stringify(cl.box)}\n`;
    });
    if (!clusters.length) out += "  none\n";
  }
  fs.writeFileSync(path.join(__dirname, "gemini-stars-full.txt"), out, "utf8");
  console.log(out);
})();
