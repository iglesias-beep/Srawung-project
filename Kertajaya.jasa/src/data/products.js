export const PRODUCTS = [
  { id: "papan-nama", nama: "Papan Nama Custom", cat: "Papan Nama", harga: 150000, satuan: "Unit", stok: 45, unggulan: true, image: "/assets/images/products/papan-nama.jpg" },
  { id: "neon-box", nama: "Neon Box Custom", cat: "Neon Box", harga: 200000, satuan: "Unit", stok: 30, unggulan: true, image: "/assets/images/products/neon-box.jpg" },
  { id: "rambu", nama: "Rambu-Rambu Custom", cat: "Rambu-Rambu", harga: 150000, satuan: "Rambu", stok: 120, unggulan: true, image: "/assets/images/products/rambu.jpg" },
  { id: "huruf-timbul", nama: "Huruf Timbul Custom", cat: "Huruf Timbul", harga: 80000, satuan: "Huruf", stok: 200, unggulan: true, image: "/assets/images/products/huruf-timbul.jpg" },
  { id: "totem-pylon", nama: "Totem & Pylon Sign Custom", cat: "Totem & Pylon", harga: 1300000, satuan: "Unit", stok: 8, unggulan: true, image: "/assets/images/products/totem-pylon.jpg" },
  { id: "sticker-mobil", nama: "Sticker Branding Mobil Custom", cat: "Sticker Branding Mobil", harga: 1000000, satuan: "Mobil", stok: 15, unggulan: true, image: "/assets/images/products/sticker-mobil.jpg" },
  { id: "sticker-sandblast", nama: "Sticker Sandblast Kaca Custom", cat: "Sticker Sandblast Kaca", harga: 25000, satuan: "122 x 50 cm", stok: 60, unggulan: true, image: "/assets/images/products/sticker-sandblast.jpg" },
  { id: "sticker-cutting", nama: "Sticker Cutting Custom", cat: "Sticker Cutting", harga: 2000, satuan: "Sticker", stok: 350, unggulan: true, image: "/assets/images/products/sticker-cutting.jpg" },
  { id: "event-booth", nama: "Event Booth Custom", cat: "Event Booth", harga: 25000000, satuan: "Unit", stok: 4, unggulan: true, image: "/assets/images/products/event-booth.jpg" },
  { id: "e-kiosk", nama: "E Kiosk & Charger Point Custom", cat: "E Kiosk & Charger Point", harga: 8000000, satuan: "Unit", stok: 6, unggulan: true, image: "/assets/images/products/e-kiosk.jpg" },
  { id: "electric-pop", nama: "Electric POP Display Custom", cat: "Electric POP Display", harga: 2500000, satuan: "Unit", stok: 10, unggulan: true, image: "/assets/images/products/electric-pop.jpg" },
];
export function listCategories() {
  return [...new Set(PRODUCTS.map((p) => p.cat))];
}
export function waPesanProduk(p) {
  return (
    `Halo ${"Kertajaya"}, saya mau tanya soal produk *${p.nama}* ` +
    `(${formatRp(p.harga)}/${p.satuan}).`
  );
}
export function formatRp(n) {
  return "Rp " + n.toLocaleString("id-ID");
}
export function imgProduk(id) {
  const p = PRODUCTS.find((prod) => prod.id === id);
  return p ? p.image : `/assets/images/products/${id}.jpg`;
}
