/* ============================================================
   Kertajaya.biz.id - Toko Bahan Bangunan
   JavaScript utama
   ============================================================ */

/* ---------- Konfigurasi kontak ---------- */
var KONTAK = {
  namaToko: "Toko Bangunan Kertajaya",
  wa: "6281234567890",
  telepon: "0812-3456-7890",
  alamat: "Jl. Kertajaya Indah, Surabaya, Jawa Timur",
  jam: "Senin - Sabtu: 07.00 - 17.00 | Minggu: 08.00 - 14.00"
};

function waLink(pesan) {
  var text = encodeURIComponent(pesan || "Halo " + KONTAK.namaToko + ", saya mau tanya soal material bangunan.");
  return "https://wa.me/" + KONTAK.wa + "?text=" + text;
}

function setWaLinks() {
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = waLink(el.getAttribute("data-wa"));
  });
}

/* ---------- Katalog produk ---------- */
var PRODUCTS = [
  { id: "semen-tigaroda", nama: "Semen Tiga Roda 50kg", cat: "Semen & Perekat", harga: 78000, satuan: "sak", unggulan: true },
  { id: "semen-holcim", nama: "Semen Holcim 50kg", cat: "Semen & Perekat", harga: 74000, satuan: "sak", unggulan: true },
  { id: "bata-merah", nama: "Bata Merah Press", cat: "Bata & Hebel", harga: 900, satuan: "biji", unggulan: true },
  { id: "hebel", nama: "Bata Ringan (Hebel) 60x20x10", cat: "Bata & Hebel", harga: 750000, satuan: "m³", unggulan: true },
  { id: "batako", nama: "Batako Press", cat: "Bata & Hebel", harga: 4500, satuan: "biji", unggulan: false },
  { id: "pasir", nama: "Pasir Pasang", cat: "Pasir & Split", harga: 250000, satuan: "m³", unggulan: true },
  { id: "split", nama: "Batu Split", cat: "Pasir & Split", harga: 320000, satuan: "m³", unggulan: false },
  { id: "cat-dulux", nama: "Cat Tembok Dulux Weathershield", cat: "Cat & Pelapis", harga: 145000, satuan: "5 kg", unggulan: true },
  { id: "catylac", nama: "Catylac Interior 25kg", cat: "Cat & Pelapis", harga: 470000, satuan: "pail", unggulan: false },
  { id: "besi-beton", nama: "Besi Beton 10mm", cat: "Besi & Baja", harga: 65000, satuan: "batang", unggulan: true },
  { id: "bondek", nama: "Bondek 0.75mm", cat: "Besi & Baja", harga: 120000, satuan: "lembar", unggulan: false },
  { id: "keramik", nama: "Keramik Lantai 40x40", cat: "Keramik & Lantai", harga: 70000, satuan: "dus", unggulan: true },
  { id: "gypsum", nama: "Papan Gypsum 120x240", cat: "Plafon & Gipsum", harga: 75000, satuan: "lembar", unggulan: false },
  { id: "genteng-metal", nama: "Genteng Metal Pasir", cat: "Atap & Genteng", harga: 45000, satuan: "lembar", unggulan: false },
  { id: "seng-gelombang", nama: "Seng Gelombang 0.25mm", cat: "Atap & Genteng", harga: 85000, satuan: "lembar", unggulan: false },
  { id: "triplek", nama: "Triplek 12mm", cat: "Bahan Kayu", harga: 145000, satuan: "lembar", unggulan: false },
  { id: "paku", nama: "Paku Kayu 7cm", cat: "Perkakas", harga: 15000, satuan: "kg", unggulan: false },
  { id: "sekop", nama: "Sekop & Cangkul", cat: "Perkakas", harga: 45000, satuan: "buah", unggulan: false }
];

function formatRp(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

function productCard(p) {
  var img = "assets/images/products/" + p.id + ".svg";
  return (
    '<article class="product-card">' +
      '<div class="thumb"><img src="' + img + '" alt="' + p.nama + '" loading="lazy"></div>' +
      '<div class="product-body">' +
        '<span class="product-cat">' + p.cat + "</span>" +
        "<h3>" + p.nama + "</h3>" +
        '<div class="product-price">' + formatRp(p.harga) + ' <span class="unit">/ ' + p.satuan + "</span></div>" +
        '<span class="stock-tag">&#10003; Tersedia</span>' +
        '<a class="btn btn-primary" data-wa="Halo ' + KONTAK.namaToko +
          ', saya mau tanya ketersediaan *' + p.nama + '* (' + formatRp(p.harga) + "/" + p.satuan + ")." +
          '">Tanya Stok</a>' +
      "</div>" +
    "</article>"
  );
}

function renderProducts(gridId, filter) {
  var grid = document.getElementById(gridId);
  if (!grid) return;
  var list = PRODUCTS.filter(filter || function () { return true; });
  grid.innerHTML = list.map(productCard).join("");
  setWaLinks();
}

/* ---------- Halaman Toko: pencarian & filter ---------- */
function initShop() {
  var grid = document.getElementById("productGrid");
  if (!grid) return;

  var search = document.getElementById("searchInput");
  var chipsWrap = document.getElementById("catChips");
  var info = document.getElementById("resultInfo");

  var cats = [];
  PRODUCTS.forEach(function (p) {
    if (cats.indexOf(p.cat) === -1) cats.push(p.cat);
  });

  var html = '<button class="chip active" data-cat="">Semua</button>';
  cats.forEach(function (c) {
    html += '<button class="chip" data-cat="' + c + '">' + c + "</button>";
  });
  chipsWrap.innerHTML = html;

  var state = { q: "", cat: "" };

  function apply() {
    var q = state.q.trim().toLowerCase();
    var list = PRODUCTS.filter(function (p) {
      var matchCat = !state.cat || p.cat === state.cat;
      var matchQ = !q || p.nama.toLowerCase().indexOf(q) !== -1 || p.cat.toLowerCase().indexOf(q) !== -1;
      return matchCat && matchQ;
    });
    if (list.length === 0) {
      grid.innerHTML =
        '<div class="empty-state"><div class="big">&#128722;</div>' +
        "<p>Produk tidak ditemukan. Coba kata kunci lain atau hubungi kami via WhatsApp.</p></div>";
      info.textContent = "";
      return;
    }
    grid.innerHTML = list.map(productCard).join("");
    info.textContent = "Menampilkan " + list.length + " dari " + PRODUCTS.length + " produk";
    setWaLinks();
  }

  search.addEventListener("input", function () { state.q = search.value; apply(); });

  chipsWrap.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (!chip) return;
    chipsWrap.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
    chip.classList.add("active");
    state.cat = chip.getAttribute("data-cat") || "";
    apply();
  });

  apply();
}

/* ---------- Nav mobile ---------- */
function initNav() {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("navMenu");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
  });
}

/* ---------- FAQ accordion ---------- */
function initFaq() {
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var answer = item.querySelector(".faq-a");
      var open = item.classList.toggle("open");
      answer.style.maxHeight = open ? answer.scrollHeight + "px" : 0;
    });
  });
}

/* ---------- Back to top ---------- */
function initBackTop() {
  var btn = document.getElementById("backTop");
  if (!btn) return;
  window.addEventListener("scroll", function () {
    btn.classList.toggle("show", window.scrollY > 400);
  });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Inisialisasi ---------- */
document.addEventListener("DOMContentLoaded", function () {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  renderProducts("productGridHome", function (p) { return p.unggulan; });
  initShop();
  initNav();
  initFaq();
  initBackTop();
  setWaLinks();
});
