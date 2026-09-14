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
    const scanW = 400, scanH = 300;
    const left = Math.max(0, W - scanW), top = Math.max(0, H - scanH);
    const { data, info } = await sharp(path.join(dir, f))
      .removeAlpha()
      .extract({ left, top, width: Math.min(scanW, W), height: Math.min(scanH, H) })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const w = info.width, h = info.height, c = info.channels;
    const lum = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) {
      lum[i] = 0.299 * data[i * c] + 0.587 * data[i * c + 1] + 0.114 * data[i * c + 2];
    }
    const R = 12;
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
    const diff = new Float32Array(w * h);
    const visited = new Uint8Array(w * h);
    const clusters = [];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const d = lum[y * w + x] - blur[y * w + x];
        diff[y * w + x] = d;
        if (visited[y * w + x] || d <= 14) continue;
        const stack = [[x, y]];
        visited[y * w + x] = 1;
        let size = 0, sumD = 0, minX = x, maxX = x, minY = y, maxY = y;
        while (stack.length) {
          const [cx, cy] = stack.pop();
          size++; sumD += diff[cy * w + cx];
          if (cx < minX) minX = cx; if (cx > maxX) maxX = cx;
          if (cy < minY) minY = cy; if (cy > maxY) maxY = cy;
          const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
          for (const [nx, ny] of neighbors) {
            if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
            if (visited[ny * w + nx] || diff[ny * w + nx] <= 14) continue;
            visited[ny * w + nx] = 1;
            stack.push([nx, ny]);
          }
        }
        if (size >= 8) {
          clusters.push({
            size,
            avg: (sumD / size).toFixed(1),
            box: {
              left: left + minX, right: left + maxX + 1,
              top: top + minY, bottom: top + maxY + 1,
            },
          });
        }
      }
    }
    clusters.sort((a, b) => b.size - a.size);
    out += `\n===== ${f} (${W}x${H}) scan region x[${left}-${left + w}] y[${top}-${top + h}] =====\n`;
    clusters.slice(0, 12).forEach((cl) => {
      out += `  size=${cl.size} avgDiff=${cl.avg} box=${JSON.stringify(cl.box)}\n`;
    });
  }
  fs.writeFileSync(path.join(__dirname, "gemini-locate.txt"), out, "utf8");
  console.log(out);
})();
