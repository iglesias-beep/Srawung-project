import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product, Category, Order } from "@/types/product";

// ==================== PRODUCTS ====================

export async function getProducts(statusFilter?: "aktif" | "nonaktif"): Promise<Product[]> {
  let q;
  if (statusFilter) {
    q = query(collection(db, "products"), where("status", "==", statusFilter), orderBy("dibuat_pada", "desc"));
  } else {
    q = query(collection(db, "products"), orderBy("dibuat_pada", "desc"));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const catQuery = query(collection(db, "categories"), where("slug", "==", categorySlug));
  const catSnapshot = await getDocs(catQuery);
  if (catSnapshot.empty) return [];
  const categoryId = catSnapshot.docs[0].id;

  const q = query(
    collection(db, "products"),
    where("category_id", "==", categoryId),
    where("status", "==", "aktif"),
    orderBy("dibuat_pada", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(collection(db, "products"), where("slug", "==", slug), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Product;
}

export async function getProductById(id: string): Promise<Product | null> {
  const docSnap = await getDoc(doc(db, "products", id));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Product;
}

export async function addProduct(data: Omit<Product, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "products"), {
    ...data,
    dibuat_pada: new Date().toISOString(),
    diupdate_pada: new Date().toISOString(),
  });
  return docRef.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await updateDoc(doc(db, "products", id), {
    ...data,
    diupdate_pada: new Date().toISOString(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, "products", id));
}

// ==================== CATEGORIES ====================

export async function getCategories(): Promise<Category[]> {
  const q = query(collection(db, "categories"), orderBy("urutan", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Category));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const q = query(collection(db, "categories"), where("slug", "==", slug), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Category;
}

export async function addCategory(data: Omit<Category, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "categories"), data);
  return docRef.id;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  await updateDoc(doc(db, "categories", id), data);
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, "categories", id));
}

// ==================== ORDERS ====================

export async function getOrders(): Promise<Order[]> {
  const q = query(collection(db, "orders"), orderBy("dibuat_pada", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, "orders"),
    where("user_id", "==", userId),
    orderBy("dibuat_pada", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function addOrder(data: Omit<Order, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "orders"), {
    ...data,
    dibuat_pada: new Date().toISOString(),
    diupdate_pada: new Date().toISOString(),
  });
  return docRef.id;
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<void> {
  await updateDoc(doc(db, "orders", id), {
    status,
    diupdate_pada: new Date().toISOString(),
  });
}

// ==================== DASHBOARD STATS ====================

export async function getDashboardStats() {
  const productsSnap = await getDocs(collection(db, "products"));
  const ordersSnap = await getDocs(collection(db, "orders"));

  const totalProducts = productsSnap.size;
  const totalOrders = ordersSnap.size;
  const newOrders = ordersSnap.docs.filter((d) => d.data().status === "baru").length;
  const totalRevenue = ordersSnap.docs.reduce((acc, d) => {
    const data = d.data();
    if (data.status === "selesai") return acc + (data.total || 0);
    return acc;
  }, 0);

  return { totalProducts, totalOrders, newOrders, totalRevenue };
}
