"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { getFirebaseDb } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { categories, type CategorySlug } from "@/lib/categories";
import { formatRp } from "@/lib/site";

interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  shortDesc: string;
  badge?: string;
  images: string[];
}

export default function AdminProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<{
    slug: string;
    name: string;
    category: CategorySlug;
    price: number;
    shortDesc: string;
    badge: string;
  }>({
    slug: "",
    name: "",
    category: (categories[0]?.slug as CategorySlug) || "papan-nama",
    price: 0,
    shortDesc: "",
    badge: "",
  });

  async function fetchProducts() {
    const db = getFirebaseDb();
    const snap = await getDocs(collection(db, "products"));
    const data: Product[] = [];
    snap.forEach((d) => {
      const docData = d.data();
      data.push({
        id: d.id,
        slug: docData.slug || "",
        name: docData.name || "",
        category: docData.category || "",
        price: docData.price || 0,
        shortDesc: docData.shortDesc || "",
        badge: docData.badge || "",
        images: docData.images || [],
      });
    });
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function resetForm() {
    setForm({ slug: "", name: "", category: (categories[0]?.slug as CategorySlug) || "papan-nama", price: 0, shortDesc: "", badge: "" });
    setEditId(null);
    setShowForm(false);
  }

  function startEdit(product: Product) {
    setForm({
      slug: product.slug,
      name: product.name,
      category: product.category as CategorySlug,
      price: product.price,
      shortDesc: product.shortDesc,
      badge: product.badge || "",
    });
    setEditId(product.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const db = getFirebaseDb();
    const payload = {
      ...form,
      images: [],
    };

    if (editId) {
      await updateDoc(doc(db, "products", editId), payload);
    } else {
      await addDoc(collection(db, "products"), payload);
    }
    resetForm();
    fetchProducts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin hapus produk ini?")) return;
    const db = getFirebaseDb();
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-ink">Kelola Produk</h1>
          <p className="mt-2 text-sm text-muted">Tambah, edit, atau hapus produk.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className={buttonVariants({ variant: "accent", size: "default" })}
        >
          <Plus className="h-4 w-4" aria-hidden />
          Tambah Produk
        </button>
      </div>

      {showForm && (
        <div className="mt-8 rounded-2xl border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-ink">
              {editId ? "Edit Produk" : "Tambah Produk Baru"}
            </h2>
            <button onClick={resetForm} className="text-muted hover:text-ink">
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Slug (URL)"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
                placeholder="papan-nama-acrylic"
              />
              <Input
                label="Nama Produk"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Papan Nama Acrylic"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-ink">Kategori</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as CategorySlug })}
                  className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Harga (Rp)"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                required
              />
            </div>
            <Input
              label="Deskripsi Singkat"
              value={form.shortDesc}
              onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
              required
            />
            <Input
              label="Badge (opsional)"
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              placeholder="Best Seller"
            />
            <div className="flex gap-3">
              <button type="submit" className={buttonVariants({ variant: "accent" })}>
                {editId ? "Simpan Perubahan" : "Tambah Produk"}
              </button>
              <button type="button" onClick={resetForm} className={buttonVariants({ variant: "outline" })}>
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8">
        {loading ? (
          <p className="text-center text-muted py-10">Memuat data...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-muted py-10">Belum ada produk.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-bg-soft">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted">Nama</th>
                  <th className="px-4 py-3 font-medium text-muted">Kategori</th>
                  <th className="px-4 py-3 font-medium text-muted">Harga</th>
                  <th className="px-4 py-3 font-medium text-muted">Badge</th>
                  <th className="px-4 py-3 font-medium text-muted text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-bg-soft/50">
                    <td className="px-4 py-3 text-ink font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-muted">{p.category}</td>
                    <td className="px-4 py-3 text-muted">{formatRp(p.price)}</td>
                    <td className="px-4 py-3 text-muted">{p.badge || "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => startEdit(p)}
                          className="rounded-lg p-1.5 text-muted hover:bg-accent/10 hover:text-accent"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="rounded-lg p-1.5 text-muted hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
