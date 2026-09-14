const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = "public/images/products";
const files = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));

(async () => {
  let out = "";
  for (const f of files) {
    const meta = await sharp(path.join(dir, f)).metadata();
    const W = meta.width, H = meta.height;
    const scanW = Math.min(520, W), scanH = Math.min(360, H);
    const left = Math.max(0, W - scanW), top = Math.max(0, H - scanH);
    const { data, info } = await sharp(path.join(dir, f))
      .removeAlpha()
      .extract({ left, top, width: scanW, height: scanH })
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
    const TH = 16;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const d = lum[y * w + x] - blur[y * w + x];
        if (visited[y * w + x] || Math.abs(d) <= TH) continue;
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
            if (visited[ny * w + nx] || Math.abs(lum[ny * w + nx] - blur[ny * w + nx]) <= TH) continue;
            visited[ny * w + nx] = 1;
            stack.push([nx, ny]);
          }
        }
        if (size >= 10) {
          const bw = maxX - minX + 1, bh = maxY - minY + 1;
          clusters.push({
            size, bw, bh,
            avg: (sumD / size).toFixed(1),
            dx: W - (left + maxX + 1),  // distance from right edge
            dy: H - (top + maxY + 1),   // distance from bottom edge
            box: { left: left + minX, right: left + maxX + 1, top: top + minY, bottom: top + maxY + 1 },
          });
        }
      }
    }
    clusters.sort((a, b) => b.size - a.size);
    out += `\n===== ${f} (${W}x${H}) scan x[${left}-${left + scanW}] y[${top}-${top + scanH}] =====\n`;
    clusters.slice(0, 14).forEach((cl) => {
      out += `  size=${cl.size} w=${cl.bw} h=${cl.bh} avgDiff=${cl.avg} distRight=${cl.dx} distBottom=${cl.dy} box=${JSON.stringify(cl.box)}\n`;
    });
    if (!clusters.length) out += "  none\n";
  }
  fs.writeFileSync(path.join(__dirname, "gemini-locate4.txt"), out, "utf8");
  console.log(out);
})();
