const sharp = require("sharp");
const fs = require("fs");

const DOWN = 2;

async function loadLum(file) {
  const { data, info } = await sharp(file)
    .removeAlpha()
    .resize({ width: Math.round(info => info.width / DOWN) })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return data;
}

async function loadLumSimple(file, width, height) {
  const { data, info } = await sharp(file)
    .removeAlpha()
    .resize({ width: Math.round(width / DOWN), height: Math.round(height / DOWN) })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, c = info.channels;
  const lum = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) lum[i] = 0.299 * data[i * c] + 0.587 * data[i * c + 1] + 0.114 * data[i * c + 2];
  return { lum, W, H };
}

async function extractTemplate(file, left, top, w, h) {
  const { data, info } = await sharp(file)
    .removeAlpha()
    .extract({ left, top, width: w, height: h })
    .resize({ width: Math.round(w / DOWN), height: Math.round(h / DOWN) })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, c = info.channels;
  const lum = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) lum[i] = 0.299 * data[i * c] + 0.587 * data[i * c + 1] + 0.114 * data[i * c + 2];
  return { lum, W, H };
}

function integralOf(lum, W, H) {
  const S = new Float64Array((W + 1) * (H + 1));
  const S2 = new Float64Array((W + 1) * (H + 1));
  for (let y = 0; y < H; y++) {
    let rowS = 0, rowS2 = 0;
    for (let x = 0; x < W; x++) {
      const v = lum[y * W + x];
      rowS += v; rowS2 += v * v;
      S[(y + 1) * (W + 1) + (x + 1)] = S[y * (W + 1) + (x + 1)] + rowS;
      S2[(y + 1) * (W + 1) + (x + 1)] = S2[y * (W + 1) + (x + 1)] + rowS2;
    }
  }
  return { S, S2 };
}

function windowSum(S, W1, x0, y0, w, h) {
  const b = y0 + h, r = x0 + w;
  return S[b * W1 + r] - S[y0 * W1 + r] - S[b * W1 + x0] + S[y0 * W1 + x0];
}

(async () => {
  const file = "public/images/products/sticker-cutting.jpg";
  const { lum, W, H } = await loadLumSimple(file, 608, 768);
  console.log("downscaled", W, H);

  const templates = [
    await extractTemplate("public/images/products/event-booth.jpg", 763, 706, 37, 37),
    await extractTemplate("public/images/products/totem-pylon.jpg", 955, 678, 41, 41),
    await extractTemplate("public/images/blog/blog-neon-box.jpg", 953, 665, 33, 33),
  ];

  const { S, S2 } = integralOf(lum, W, H);
  const W1 = W + 1;

  let out = "";
  for (const [ti, tpl] of templates.entries()) {
    const tw = tpl.W, th = tpl.H;
    let tMean = 0;
    for (let i = 0; i < tw * th; i++) tMean += tpl.lum[i];
    tMean /= tw * th;
    let tVar = 0;
    for (let i = 0; i < tw * th; i++) { const d = tpl.lum[i] - tMean; tVar += d * d; }
    const tStd = Math.sqrt(tVar);

    const results = [];
    for (let y = 0; y + th <= H; y++) {
      for (let x = 0; x + tw <= W; x++) {
        let corr = 0;
        for (let ty = 0; ty < th; ty++) {
          const row = (y + ty) * W + x;
          for (let tx = 0; tx < tw; tx++) {
            corr += lum[row + tx] * tpl.lum[ty * tw + tx];
          }
        }
        const wSum = windowSum(S, W1, x, y, tw, th);
        const wSum2 = windowSum(S2, W1, x, y, tw, th);
        const n = tw * th;
        const wMean = wSum / n;
        let wVar = wSum2 - n * wMean * wMean;
        if (wVar < 1e-6) continue;
        const wStd = Math.sqrt(wVar);
        const score = (corr - n * wMean * tMean) / (wStd * tStd);
        results.push({ score, x, y });
      }
    }
    results.sort((a, b) => b.score - a.score);
    out += `\n===== template #${ti} (${tw}x${th} downscaled) top matches on sticker-cutting =====\n`;
    results.slice(0, 8).forEach((r) => {
      const absX = Math.round(r.x * DOWN), absY = Math.round(r.y * DOWN);
      out += `  ncc=${r.score.toFixed(3)} dpx(${r.x},${r.y}) abs=(${absX},${absY}) box=[${absX},${absY}]-[${absX + tw * DOWN},${absY + th * DOWN}]\n`;
    });
  }
  fs.writeFileSync("scripts/match-sticker.txt", out, "utf8");
  console.log(out);
})();
