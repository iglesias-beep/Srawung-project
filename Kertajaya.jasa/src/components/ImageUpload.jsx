import { useRef, useState } from "react";
import { fileKeGambarAman } from "../lib/konten";

export default function ImageUpload({ value, onChange, tinggi = 96 }) {
  const inputRef = useRef(null);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function prosesFile(file) {
    setErr("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErr("File harus berupa gambar (JPG/PNG/WebP).");
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await fileKeGambarAman(file);
      onChange(dataUrl);
    } catch (e) {
      setErr(e.message || "Gagal memproses gambar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          prosesFile(e.target.files && e.target.files[0]);
          e.target.value = "";
        }}
      />
      {value ? (
        <div className="img-upload-preview">
          <img src={value} alt="Pratinjau gambar" style={{ width: tinggi * 1.4, height: tinggi }} />
          <div className="img-upload-aksi">
            <span className="img-upload-ok">✓ Gambar siap</span>
            <div>
              <button type="button" className="btn btn-sm" onClick={() => inputRef.current?.click()}>
                Ganti
              </button>{" "}
              <button type="button" className="btn btn-sm btn-danger" onClick={() => onChange("")}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={"img-upload" + (over ? " over" : "")}
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            prosesFile(e.dataTransfer.files && e.dataTransfer.files[0]);
          }}
        >
          <div style={{ fontSize: "1.6rem" }}>🖼️</div>
          <strong>{busy ? "Memproses gambar..." : "Seret & lepas gambar di sini"}</strong>
          <div className="hint">atau klik untuk pilih file &middot; otomatis dikompres</div>
        </div>
      )}
      {err && <div className="img-upload-err">⚠️ {err}</div>}
    </div>
  );
}
