const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = "public/images/products";
const files = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));

(async () => {
  let out = "";
  for (const f of files) {
    const { data, info } = await sharp(path.join(dir, f))
      .removeAlpha()
      .resize(256, 192, { fit: "fill" })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const w = info.width, h = info.height, c = info.channels;
    const lum = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) {
      lum[i] = 0.299 * data[i * c] + 0.587 * data[i * c + 1] + 0.114 * data[i * c + 2];
    }
    // box blur radius 8
    const R = 8;
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
    // diff map (text brighter than local background)
    let maxDiff = -1e9, minDiff = 1e9;
    const diff = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) {
      const d = lum[i] - blur[i];
      diff[i] = d;
      if (d > maxDiff) maxDiff = d;
      if (d < minDiff) minDiff = d;
    }
    // find brightest connected cluster in the lower-right quadrant
    const TH = 9;
    const visited = new Uint8Array(w * h);
    const lowerRight = [];
    for (let y = Math.floor(h * 0.55); y < h; y++) {
      for (let x = Math.floor(w * 0.35); x < w; x++) {
        if (visited[y * w + x] || diff[y * w + x] <= TH) continue;
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
            if (visited[ny * w + nx] || diff[ny * w + nx] <= TH) continue;
            visited[ny * w + nx] = 1;
            stack.push([nx, ny]);
          }
        }
        if (size >= 6) {
          lowerRight.push({
            size, avg: (sumD / size).toFixed(1),
            box: { x: minX, y: minY, x2: maxX, y2: maxY },
            px: {
              left: Math.round((minX / w) * 1024), right: Math.round(((maxX + 1) / w) * 1024),
              top: Math.round((minY / h) * 768), bottom: Math.round(((maxY + 1) / h) * 768),
            },
          });
        }
      }
    }
    lowerRight.sort((a, b) => b.size - a.size);
    out += `\n===== ${f} =====\n`;
    out += `diff range: ${minDiff.toFixed(1)} .. ${maxDiff.toFixed(1)}\n`;
    if (lowerRight.length) {
      out += `bright-text clusters di area kanan-bawah (terbesar 5):\n`;
      lowerRight.slice(0, 5).forEach((cl) => {
        out += `  size=${cl.size} avgDiff=${cl.avg} box(px)=${JSON.stringify(cl.px)}\n`;
      });
    } else {
      out += "  tidak ada cluster teks terang yang menonjol\n";
    }
  }
  fs.writeFileSync(path.join(__dirname, "br-detect.txt"), out, "utf8");
  console.log(out);
})();
