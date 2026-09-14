import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, serverTimestamp } from "../firebase";

const sortData = (arr, field) =>
  [...arr].sort((a, b) => String(a[field] ?? "").localeCompare(String(b[field] ?? ""), "id"));

/* --------------------------- Produk --------------------------- */

export function subscribeProducts(cb, onError) {
  const q = query(collection(db, "products"));
  return onSnapshot(
    q,
    (snap) => cb(sortData(snap.docs.map((d) => ({ id: d.id, ...d.data() })), "nama")),
    (err) => { console.error("subscribeProducts:", err); onError?.(err); }
  );
}

const productDocData = (data) => ({
  nama: data.nama,
  cat: data.cat,
  harga: Number(data.harga) || 0,
  satuan: data.satuan,
  stok: Number(data.stok) || 0,
  unggulan: !!data.unggulan,
  gambar: typeof data.gambar === "string" ? data.gambar : "",
});

export async function addProduct(data) {
  await setDoc(doc(collection(db, "products"), data.id), productDocData(data));
}

export async function updateProduct(id, data) {
  await setDoc(doc(db, "products", id), productDocData(data));
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, "products", id));
}

/* --------------------------- Artikel --------------------------- */

export function subscribeArticles(cb, onError) {
  const q = query(collection(db, "articles"));
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => {
        const data = d.data();
        let blocks = data.blocksJson;
        if (typeof blocks === "string") {
          try {
            blocks = JSON.parse(blocks);
          } catch (e) {
            blocks = [];
          }
        } else if (!Array.isArray(blocks)) {
          blocks = Array.isArray(data.blocks) ? data.blocks : [];
        }
        let promo = data.promoJson;
        if (typeof promo === "string" && promo.trim()) {
          try {
            promo = JSON.parse(promo);
          } catch (e) {
            promo = null;
          }
        } else if (!promo || typeof promo !== "object") {
          promo = null;
        }
        return { id: d.id, ...data, blocks, promo };
      });
      cb(sortData(list, "title"));
    },
    (err) => { console.error("subscribeArticles:", err); onError?.(err); }
  );
}

const articleDocData = (data) => ({
  slug: data.slug,
  title: data.title,
  kategori: data.kategori,
  tanggal: data.tanggal,
  baca: data.baca,
  image: data.image,
  intro: data.intro,
  blocksJson: JSON.stringify(data.blocks || []),
  promoJson: data.promo && data.promo.namaUsaha ? JSON.stringify(data.promo) : "",
});

export async function addArticle(data) {
  await setDoc(doc(collection(db, "articles"), data.slug), articleDocData(data));
}

export async function updateArticle(slug, data) {
  await setDoc(doc(db, "articles", slug), articleDocData(data));
}

export async function deleteArticle(slug) {
  await deleteDoc(doc(db, "articles", slug));
}

/* --------------------------- Profil user --------------------------- */

export function subscribeProfile(uid, cb) {
  return onSnapshot(
    doc(db, "users", uid),
    (snap) => cb(snap.exists() ? snap.data() : null),
    (err) => console.error("subscribeProfile:", err)
  );
}

export async function saveProfile(uid, data) {
  await setDoc(doc(db, "users", uid), {
    nama: data.nama || "",
    wa: data.wa || "",
    alamat: data.alamat || "",
  });
}

/* --------------------------- Order --------------------------- */

export function subscribeMyOrders(uid, cb) {
  const q = query(collection(db, "orders"), where("uid", "==", uid));
  return onSnapshot(
    q,
    (snap) => {
      const mine = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      cb([...mine].sort((a, b) => String(b.tanggal).localeCompare(String(a.tanggal))));
    },
    (err) => console.error("subscribeMyOrders:", err)
  );
}

export async function addOrder(order) {
  const ref = doc(collection(db, "orders"));
  await setDoc(ref, {
    ...order,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export function subscribeAllOrders(cb, onError) {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => { console.error("subscribeAllOrders:", err); onError?.(err); }
  );
}

export async function updateOrderStatus(id, status) {
  await updateDoc(doc(db, "orders", id), { status });
}

export async function deleteOrder(id) {
  await deleteDoc(doc(db, "orders", id));
}

/* --------------------------- Seed --------------------------- */

export async function seedProducts(products) {
  const batch = writeBatch(db);
  products.forEach((p) => {
    const ref = doc(collection(db, "products"), p.id);
    batch.set(ref, productDocData(p));
  });
  await batch.commit();
}

export async function seedArticles(articles) {
  const batch = writeBatch(db);
  articles.forEach((a) => {
    const ref = doc(collection(db, "articles"), a.slug);
    batch.set(ref, articleDocData(a));
  });
  await batch.commit();
}

/* --------------------------- Util --------------------------- */

export async function collectionExists(name) {
  const snap = await getDocs(collection(db, name));
  return !snap.empty;
}

export function newOrderId() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `INV-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}
