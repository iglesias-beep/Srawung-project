import { useState } from "react";
import { KONTAK, waLink } from "../data/site";
import { PageHead } from "../components/ui";

const LANGKAH_PESAN = [
  { nomor: "1", judul: "Pilih & tanyakan", teks: "Pilih produk di halaman Toko, lalu tanyakan stok & harga via WhatsApp/telepon." },
  { nomor: "2", judul: "Konfirmasi pesanan", teks: "Admin mengonfirmasi ketersediaan, total harga, dan ongkir ke lokasi Anda." },
  { nomor: "3", judul: "Pembayaran", teks: "Lakukan pembayaran transfer, e-wallet, atau COD sesuai kesepakatan." },
  { nomor: "4", judul: "Pengiriman", teks: "Barang custom diantar ke lokasi Anda sesuai jadwal." },
];

const PEMBAYARAN = ["Transfer Bank", "DANA", "OVO", "GoPay", "Cash", "COD (area tertentu)"];

const FAQ = [
  { q: "Apakah harga sudah termasuk ongkir?", a: "Belum, harga di katalog adalah harga barang. Ongkir dihitung terpisah berdasarkan jarak dan volume, kecuali promo gratis ongkir yang sedang berjalan." },
  { q: "Bagaimana cara memesan dalam jumlah besar (partai/proyek)?", a: "Hubungi admin via WhatsApp atau telepon, sampaikan kebutuhan barang custom dan lokasi pengiriman. Kami akan memberikan penawaran harga yang lebih kompetitif untuk pemesanan dalam jumlah banyak." },
  { q: "Apakah tersedia sistem COD?", a: "Ya, untuk area tertentu di sekitar toko kami melayani pembayaran di tempat (COD). Konfirmasikan ketersediaannya dengan admin sebelum pesanan diantar." },
  { q: "Apakah bisa meminta barang sisa dikembalikan?", a: "Barang yang masih utuh dan belum dibuka bisa ditukar/dikembalikan dalam waktu 7 hari dengan menunjukkan nota, sesuai ketentuan yang berlaku." },
  { q: "Apakah ada konsultasi pemilihan produk custom secara gratis?", a: "Tentu. Tim kami siap membantu memilih barang custom yang sesuai kebutuhan dan budget Anda, termasuk bantuan estimasi ukuran dan jumlah. Gratis!" },
];

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"faq-item" + (open ? " open" : "")}>
      <button className="faq-q" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {faq.q}
      </button>
      <div className="faq-a" style={{ maxHeight: open ? "200px" : 0 }}>
        <div className="faq-a-inner">{faq.a}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <PageHead crumb="Kontak" title="Hubungi Kami" />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="info-card">
                <h3>📍 Informasi Toko</h3>
                <div className="info-row">
                  <span className="ico">🏠</span>
                  <div><strong>Alamat</strong><span>{KONTAK.alamat}</span></div>
                </div>
                <div className="info-row">
                  <span className="ico">📞</span>
                  <div><strong>Telepon</strong><a href={`tel:${KONTAK.telInternational}`}>{KONTAK.telepon}</a></div>
                </div>
                <div className="info-row">
                  <span className="ico">💬</span>
                  <div>
                    <strong>WhatsApp</strong>
                    <a href={waLink("Halo Kertajaya, saya mau tanya-tanya barang custom.")} target="_blank" rel="noreferrer">Chat via WhatsApp</a>
                  </div>
                </div>
                <div className="info-row">
                  <span className="ico">🕒</span>
                  <div>
                    <strong>Jam Operasional</strong>
                    <span>{KONTAK.jam}<br />{KONTAK.jamMinggu}</span>
                  </div>
                </div>
              </div>

              <div className="info-card" style={{ marginTop: "1.2rem" }}>
                <h3>🚚 Cara Pemesanan</h3>
                {LANGKAH_PESAN.map((l) => (
                  <div className="info-row" key={l.nomor}>
                    <span className="ico">{l.nomor}</span>
                    <div><strong>{l.judul}</strong><span>{l.teks}</span></div>
                  </div>
                ))}
              </div>

              <div className="info-card" style={{ marginTop: "1.2rem" }}>
                <h3>💰 Metode Pembayaran</h3>
                <ul className="payment-list">
                  {PEMBAYARAN.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>

            <div>
              <div className="info-card" id="peta">
                <h3>🗺️ Lokasi Toko</h3>
                <div className="map-box">
                  <iframe
                    src={KONTAK.mapsEmbedUrl}
                    title="Peta lokasi Toko Kertajaya"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <p style={{ marginTop: "0.8rem", fontSize: "0.9rem", color: "var(--muted)" }}>
                  Gratis parkir luas untuk kendaraan roda dua dan roda empat. Layanan antar tersedia
                  untuk area Surabaya dan sekitarnya.
                </p>
              </div>

              <div className="info-card" style={{ marginTop: "1.2rem" }}>
                <h3>🚚 Info Ongkir</h3>
                <div className="info-row">
                  <span className="ico">📍</span>
                  <div><strong>Gratis ongkir</strong><span>Pembelian di atas Rp 500.000 dalam radius 5 km dari toko.</span></div>
                </div>
                <div className="info-row">
                  <span className="ico">🚚</span>
                  <div><strong>Pengiriman barang custom besar</strong><span>Totem, pylon sign, event booth, dan produk custom besar diantar menggunakan truk sesuai volume.</span></div>
                </div>
                <div className="info-row">
                  <span className="ico">💰</span>
                  <div><strong>Ongkir di luar area</strong><span>Disesuaikan jarak dan volume — hubungi admin untuk simulasi ongkir.</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">FAQ</span>
            <h2>Pertanyaan yang Sering Diajukan</h2>
          </div>
          <div style={{ maxWidth: "760px", marginInline: "auto" }}>
            {FAQ.map((f) => <FaqItem key={f.q} faq={f} />)}
          </div>
        </div>
      </section>
    </>
  );
}
