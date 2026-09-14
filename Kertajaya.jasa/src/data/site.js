export const KONTAK = {
  namaToko: "Kertajaya",
  wa: "6281234567890",
  telepon: "0812-3456-7890",
  telInternational: "+6281234567890",
  alamat: "Jl. Kertajaya Indah, Surabaya, Jawa Timur",
  jam: "Senin - Sabtu: 08.00 - 17.00",
  jamMinggu: "Minggu: 08.00 - 14.00",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Kertajaya,+Surabaya,+Jawa+Timur&output=embed",
};

export function waLink(pesan) {
  const text = encodeURIComponent(
    pesan || `Halo ${KONTAK.namaToko}, saya mau tanya soal barang custom.`
  );
  return `https://wa.me/${KONTAK.wa}?text=${text}`;
}

export function waLinkFor(nomorWa, pesan) {
  const nomor = String(nomorWa || "").replace(/\D/g, "");
  const text = encodeURIComponent(pesan || "Halo, saya mau tanya soal jasa/produk Anda.");
  return `https://wa.me/${nomor}?text=${text}`;
}

export function formatRp(n) {
  return "Rp " + n.toLocaleString("id-ID");
}
