const fs = require('fs');
const sharp = require('sharp');

const JOBS = [
  {
    src: 'public/images/blog/blog-papan-nama.jpg',
    extract: { left: 100, top: 56, width: 1080, height: 608 },
  },
  {
    src: 'public/images/blog/blog-sticker-mobil.jpg',
    extract: { left: 280, top: 0, width: 720, height: 405 },
  },
];

(async () => {
  for (const job of JOBS) {
    const TMP = job.src + '.tmp';
    const meta = await sharp(job.src).metadata();
    const buf = await sharp(job.src)
      .removeAlpha()
      .extract(job.extract)
      .jpeg({ quality: 95, mozjpeg: true })
      .toBuffer();
    const m2 = await sharp(buf).metadata();
    fs.writeFileSync(TMP, buf);
    fs.renameSync(TMP, job.src);
    console.log(
      job.src.split('/').pop(),
      meta.width + 'x' + meta.height,
      '-> extract',
      JSON.stringify(job.extract),
      '->',
      m2.width + 'x' + m2.height,
      '(aspect ' + (m2.width / m2.height).toFixed(3) + ')'
    );
  }
})();
