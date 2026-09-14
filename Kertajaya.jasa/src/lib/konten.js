/* Helper konten artikel & gambar untuk Admin */

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export function tanggalHariIni() {
  const d = new Date();
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

export function hitungLamaBaca(blocks) {
  const kata = (blocks || [])
    .map((b) => {
      if (b.text) return b.text;
      if (Array.isArray(b.items)) return b.items.join(" ");
      if (Array.isArray(b.rows)) return b.rows.flat().join(" ");
      return "";
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(kata / 200))} menit`;
}

export function buatIntro(blocks) {
  const p = (blocks || []).find((b) => b.type === "p" && b.text);
  if (!p) return "";
  return p.text.length > 180 ? p.text.slice(0, 177).trimEnd() + "..." : p.text;
}

/* ---------- Teks biasa -> blocks ---------- */
/*
  Aturan penulisan:
  - Baris kosong  : pemisah paragraf
  - ## Teks       : judul bagian (h2)
  - ### Teks      : sub judul (h3)
  - - item        : bullet list (baris berurutan)
  - 1. item       : list bernomor (baris berurutan)
  - | a | b |     : baris tabel (baris berurutan, baris pertama = header)
  - > [Tips] teks : kotak highlight (callout)
*/
export function textToBlocks(text) {
  const lines = String(text || "").replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let para = [];
  let list = null;
  let tableRows = null;

  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: "p", text: para.join(" ").trim() });
      para = [];
    }
  };
  const flushList = () => {
    if (list && list.items.length) blocks.push(list);
    list = null;
  };
  const flushTable = () => {
    if (tableRows && tableRows.length >= 1) {
      let rows = tableRows.slice();
      if (rows.length >= 2 && rows[1].every((c) => /^:?-{2,}:?$/.test(c.trim()))) rows.splice(1, 1);
      const head = rows.shift();
      if (head && head.some((c) => c.trim())) {
        blocks.push({ type: "table", head: head.map((c) => c.trim()), rows: rows.map((r) => r.map((c) => c.trim())) });
      }
    }
    tableRows = null;
  };
  const flushAll = () => { flushPara(); flushList(); flushTable(); };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) { flushAll(); continue; }

    if (line.startsWith("### ")) { flushAll(); blocks.push({ type: "h3", text: line.slice(4).trim() }); continue; }
    if (line.startsWith("## ")) { flushAll(); blocks.push({ type: "h2", text: line.slice(3).trim() }); continue; }

    if (/^[-*]\s+/.test(line)) {
      flushPara(); flushTable();
      if (!list || list.type !== "ul") { flushList(); list = { type: "ul", items: [] }; }
      list.items.push(line.replace(/^[-*]\s+/, "").trim());
      continue;
    }

    if (/^\d+[.)]\s+/.test(line)) {
      flushPara(); flushTable();
      if (!list || list.type !== "ol") { flushList(); list = { type: "ol", items: [] }; }
      list.items.push(line.replace(/^\d+[.)]\s+/, "").trim());
      continue;
    }

    if (line.startsWith("|") && line.endsWith("|")) {
      flushPara(); flushList();
      if (!tableRows) tableRows = [];
      tableRows.push(line.slice(1, -1).split("|").map((c) => c.trim()));
      continue;
    }

    if (line.startsWith(">")) {
      flushAll();
      let isi = line.replace(/^>\s?/, "").trim();
      let strong = "Catatan:";
      const m = isi.match(/^\[(.+?)\]\s*/);
      if (m) { strong = m[1]; isi = isi.slice(m[0].length); }
      blocks.push({ type: "callout", strong, text: isi });
      continue;
    }

    flushList(); flushTable();
    para.push(line);
  }
  flushAll();
  return blocks;
}

/* ---------- Blocks -> teks biasa ---------- */
export function blocksToText(blocks) {
  const out = [];
  for (const b of blocks || []) {
    switch (b.type) {
      case "h2": out.push(`## ${b.text}`, ""); break;
      case "h3": out.push(`### ${b.text}`, ""); break;
      case "p": out.push(b.text, ""); break;
      case "ul": b.items.forEach((it) => out.push(`- ${it}`)); out.push(""); break;
      case "ol": b.items.forEach((it, i) => out.push(`${i + 1}. ${it}`)); out.push(""); break;
      case "table":
        if (Array.isArray(b.head)) {
          out.push(`| ${b.head.join(" | ")} |`);
          out.push(`| ${b.head.map(() => "---").join(" | ")} |`);
          (b.rows || []).forEach((r) => out.push(`| ${(r || []).join(" | ")} |`));
          out.push("");
        }
        break;
      case "callout": out.push(`> [${b.strong || "Catatan:"}] ${b.text}`, ""); break;
      default: break;
    }
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/* ---------- Gambar -> data URL terkompresi ---------- */
export function fileKeDataUrl(file, maxDim = 1000, quality = 0.72) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("File harus berupa gambar."));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Format gambar tidak didukung."));
      img.onload = () => {
        try {
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;
          const scale = Math.min(1, maxDim / Math.max(w, h));
          w = Math.max(1, Math.round(w * scale));
          h = Math.max(1, Math.round(h * scale));
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } catch (e) {
          reject(e);
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* Kompresi bertingkat agar ukuran aman untuk Firestore (< ~650 KB) */
export async function fileKeGambarAman(file) {
  const percobaan = [
    { maxDim: 1000, quality: 0.72 },
    { maxDim: 800, quality: 0.6 },
    { maxDim: 640, quality: 0.5 },
    { maxDim: 480, quality: 0.4 },
  ];
  let last;
  for (const opsi of percobaan) {
    try {
      last = await fileKeDataUrl(file, opsi.maxDim, opsi.quality);
      if (last.length <= 650_000) return last;
    } catch (e) {
      throw e;
    }
  }
  return last;
}
