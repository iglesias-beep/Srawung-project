const s = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'verify-previews');
fs.mkdirSync(OUT, { recursive: true });

const targets = [
  { name: 'event-booth',      rel: 'images/products/event-booth.jpg',      box: [763,706,800,744],  cx: 763, cy: 706, w: 90, h: 90 },
  { name: 'totem-pylon',      rel: 'images/products/totem-pylon.jpg',      box: [955,678,996,719],  cx: 955, cy: 678, w: 90, h: 90 },
  { name: 'papan-nama',       rel: 'images/products/papan-nama.jpg',       box: [942,613,1010,667], cx: 940, cy: 610, w: 120, h: 100 },
  { name: 'sticker-cutting',  rel: 'images/products/sticker-cutting.jpg',  box: [573,700,608,748],  cx: 560, cy: 690, w: 80, h: 90 },
  { name: 'blog-neon-box',    rel: 'images/blog/blog-neon-box.jpg',        box: [955,660,996,702],  cx: 950, cy: 655, w: 90, h: 90 },
  { name: 'blog-sticker-mobil', rel: 'images/blog/blog-sticker-mobil.jpg', box: [952,660,994,701],  cx: 945, cy: 655, w: 90, h: 90 },
  { name: 'blog-sticker-mobil-2', rel: 'images/blog/blog-sticker-mobil.jpg', box: [624,520,674,566], cx: 615, cy: 512, w: 78, h: 66 },
  { name: 'blog-papan-nama',  rel: 'images/blog/blog-papan-nama.jpg',      box: [1118,646,1161,698], cx: 1110, cy: 640, w: 90, h: 90 },
  { name: 'hero-srawung',     rel: 'images/hero-srawung.jpg',              box: [915,579,945,619],  cx: 900, cy: 570, w: 90, h: 90 },
  { name: 'neon-box-1',       rel: 'images/products/neon-box.jpg',         box: [230,285,347,410],  cx: 230, cy: 285, w: 117, h: 125 },
  { name: 'neon-box-2',       rel: 'images/products/neon-box.jpg',         box: [52,265,127,460],   cx: 52, cy: 265, w: 75, h: 195 },
];

(async () => {
  for (const t of targets) {
    const before = path.join(ROOT, 'backup-images', t.rel);
    const after = path.join(ROOT, 'public', t.rel);
    const meta = await s(after).metadata();
    const w = Math.min(t.w, meta.width - t.cx);
    const h = Math.min(t.h, meta.height - t.cy);
    const mkLabel = (txt) => s(Buffer.from(`<svg width="${w * 2}" height="18" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#1e1e1e"/><text x="4" y="13" font-family="monospace" font-size="12" fill="#ffcc66">${txt}</text></svg>`)).png().toBuffer();
    const labelBefore = await mkLabel(`BEFORE  ${t.name}  box=${t.box}`);
    const labelAfter = await mkLabel(`AFTER   ${t.name}  box=${t.box}`);
    const beforeIm = await s(before).removeAlpha().extract({ left: t.cx, top: t.cy, width: w, height: h }).toBuffer();
    const afterIm = await s(after).removeAlpha().extract({ left: t.cx, top: t.cy, width: w, height: h }).toBuffer();
    const canvas = await s({
      create: { width: w * 2, height: h + 24, channels: 3, background: { r: 30, g: 30, b: 30 } },
    })
      .composite([
        { input: beforeIm, left: 0, top: 24 },
        { input: afterIm, left: w, top: 24 },
        { input: labelBefore, left: 4, top: 2 },
        { input: labelAfter, left: w + 4, top: 2 },
        { input: await s({ create: { width: w * 2, height: 2, channels: 3, background: { r: 255, g: 80, b: 80 } } }).png().toBuffer(), left: 0, top: 22 },
      ])
      .png()
      .toFile(path.join(OUT, `${t.name}.png`));
    console.log('wrote', path.join(OUT, `${t.name}.png`));
  }

  const rows = [];
  for (const t of targets) {
    rows.push(path.join(OUT, `${t.name}.png`));
  }
  const imgs = await Promise.all(rows.map((f) => s(f).toBuffer()));
  const widths = [];
  for (const b of imgs) { const m = await s(b).metadata(); widths.push(m.width); }
  const cols = 2;
  const cellW = Math.max(...widths);
  const sheetW = cellW * cols + 4;
  const sheetH = Math.ceil(imgs.length / cols) * 200 + 8;
  const composite = [];
  imgs.forEach((b, i) => {
    const x = (i % cols) * (cellW + 4);
    const y = Math.floor(i / cols) * 200 + 4;
    composite.push({ input: b, left: x, top: y });
  });
  await s({ create: { width: sheetW, height: sheetH, channels: 3, background: { r: 20, g: 20, b: 20 } } })
    .composite(composite)
    .png()
    .toFile(path.join(OUT, '_ALL.png'));
  console.log('wrote', path.join(OUT, '_ALL.png'));
})().catch((e) => { console.error(e); process.exit(1); });
