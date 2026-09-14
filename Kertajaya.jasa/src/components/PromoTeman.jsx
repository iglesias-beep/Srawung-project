import { waLinkFor } from "../data/site";

export default function PromoTeman({ promo, judulArtikel }) {
  if (!promo || !promo.namaUsaha || !promo.wa) return null;

  const pesan =
    promo.pesan ||
    `Halo ${promo.namaUsaha}, saya lihat promosi jasa/produk Anda di artikel "${judulArtikel}" di blog Kertajaya dan mau order.`;

  return (
    <aside className="promo-teman">
      <span className="promo-teman-badge">🤝 Slot Promosi Gratis &middot; Support Usaha Teman</span>
      <div className="promo-teman-main">
        <span className="promo-teman-emoji" aria-hidden="true">{promo.emoji || "🛠️"}</span>
        <div className="promo-teman-info">
          <h3>{promo.namaUsaha}</h3>
          {promo.deskripsi && <p>{promo.deskripsi}</p>}
          {promo.hargaMulai && (
            <span className="promo-teman-harga">Mulai {promo.hargaMulai}</span>
          )}
        </div>
      </div>
      <a
        className="btn btn-whatsapp btn-lg"
        href={waLinkFor(promo.wa, pesan)}
        target="_blank"
        rel="noreferrer"
      >
        💬 Order / Tanya Langsung via WhatsApp
      </a>
      <small className="promo-teman-note">
        Slot promosi gratis dari Kertajaya &mdash; transaksi langsung dengan pemilik usaha.
      </small>
    </aside>
  );
}
