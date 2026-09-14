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
    const { data, info } = await sharp(path.join(dir, f))
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const w = info.width, h = info.height, c = info.channels;
    const lum = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) {
      lum[i] = 0.299 * data[i * c] + 0.587 * data[i * c + 1] + 0.114 * data[i * c + 2];
    }
    const visited = new Uint8Array(w * h);
    const clusters = [];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (visited[y * w + x] || lum[y * w + x] <= 180) continue;
        const stack = [[x, y]];
        visited[y * w + x] = 1;
        let size = 0, minX = x, maxX = x, minY = y, maxY = y;
        let sumLum = 0;
        while (stack.length) {
          const [cx, cy] = stack.pop();
          size++; sumLum += lum[cy * w + cx];
          if (cx < minX) minX = cx; if (cx > maxX) maxX = cx;
          if (cy < minY) minY = cy; if (cy > maxY) maxY = cy;
          const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
          for (const [nx, ny] of neighbors) {
            if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
            if (visited[ny * w + nx] || lum[ny * w + nx] <= 180) continue;
            visited[ny * w + nx] = 1;
            stack.push([nx, ny]);
          }
        }
        if (size >= 5) {
          const bw = maxX - minX + 1, bh = maxY - minY + 1;
          clusters.push({ size, bw, bh, avg: (sumLum / size).toFixed(0), x0: minX, y0: minY, x1: maxX, y1: maxY });
        }
      }
    }
    clusters.sort((a, b) => b.size - a.size);
    out += `\n===== ${f} (${W}x${H}) bright(lum>180) components =====\n`;
    const candidates = clusters.filter(
      (cl) =>
        cl.size >= 5 && cl.size <= 20000 &&
        cl.bw >= 5 && cl.bw <= 220 && cl.bh >= 5 && cl.bh <= 220 &&
        cl.y0 >= H * 0.5 && cl.x0 >= W * 0.3
    );
    candidates.slice(0, 8).forEach((cl) => {
      out += `  size=${cl.size} w=${cl.bw} h=${cl.bh} avg=${cl.avg} box=[${cl.x0},${cl.y0}]-[${cl.x1},${cl.y1}]\n`;
    });
    if (!candidates.length) out += `  none\n`;
  }
  fs.writeFileSync(path.join(__dirname, "gemini-locate2.txt"), out, "utf8");
  console.log(out);
})();
