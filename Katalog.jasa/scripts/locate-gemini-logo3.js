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
        if (visited[y * w + x] || lum[y * w + x] <= 175) continue;
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
            if (visited[ny * w + nx] || lum[ny * w + nx] <= 175) continue;
            visited[ny * w + nx] = 1;
            stack.push([nx, ny]);
          }
        }
        if (size >= 8) {
          const bw = maxX - minX + 1, bh = maxY - minY + 1;
          clusters.push({ size, bw, bh, avg: (sumLum / size).toFixed(0), x0: minX, y0: minY, x1: maxX, y1: maxY });
        }
      }
    }
    // filter: small compact square-ish blobs (star-sized)
    const cands = clusters.filter(
      (cl) =>
        cl.size >= 8 && cl.size <= 4000 &&
        cl.bw >= 4 && cl.bw <= 130 && cl.bh >= 4 && cl.bh <= 130 &&
        Math.abs(cl.bw - cl.bh) <= Math.max(cl.bw, cl.bh) * 0.6 &&
        cl.avg > 185
    );
    cands.sort((a, b) => b.size - a.size);
    out += `\n===== ${f} (${W}x${H}) star-sized bright blobs =====\n`;
    cands.slice(0, 10).forEach((cl) => {
      const nearRight = cl.x1 > W * 0.6 ? "R" : " ";
      const nearBottom = cl.y1 > H * 0.6 ? "B" : " ";
      out += `  size=${cl.size} w=${cl.bw} h=${cl.bh} avg=${cl.avg} [${cl.x0},${cl.y0}]-[${cl.x1},${cl.y1}] ${nearRight}${nearBottom}\n`;
    });
    if (!cands.length) out += `  none\n`;
  }
  fs.writeFileSync(path.join(__dirname, "gemini-locate3.txt"), out, "utf8");
  console.log(out);
})();
