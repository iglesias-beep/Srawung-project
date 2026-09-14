"use client";

import { useEffect, useState } from "react";
import { getFirebaseDb } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { buttonVariants } from "@/components/ui/button";
import { formatRp } from "@/lib/site";

interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  productName: string;
  quantity: number;
  total: number;
  status: "pending" | "diproses" | "selesai" | "dibatalkan";
  createdAt: string;
  notes?: string;
}

const statusOptions: Order["status"][] = ["pending", "diproses", "selesai", "dibatalkan"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  diproses: "bg-blue-100 text-blue-700",
  selesai: "bg-green-100 text-green-700",
  dibatalkan: "bg-red-100 text-red-700",
};

export default function AdminPesananPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    const db = getFirebaseDb();
    const snap = await getDocs(collection(db, "orders"));
    const data: Order[] = [];
    snap.forEach((d) => {
      const docData = d.data();
      data.push({
        id: d.id,
        userId: docData.userId || "",
        userName: docData.userName || "",
        userEmail: docData.userEmail || "",
        productName: docData.productName || "",
        quantity: docData.quantity || 1,
        total: docData.total || 0,
        status: docData.status || "pending",
        createdAt: docData.createdAt || "",
        notes: docData.notes || "",
      });
    });
    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function updateStatus(id: string, newStatus: Order["status"]) {
    const db = getFirebaseDb();
    await updateDoc(doc(db, "orders", id), { status: newStatus });
    fetchOrders();
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Kelola Pesanan</h1>
      <p className="mt-2 text-sm text-muted">Lihat dan update status pesanan customer.</p>

      <div className="mt-8">
        {loading ? (
          <p className="text-center text-muted py-10">Memuat data...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-muted py-10">Belum ada pesanan.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-bg-soft">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted">Customer</th>
                  <th className="px-4 py-3 font-medium text-muted">Produk</th>
                  <th className="px-4 py-3 font-medium text-muted">Qty</th>
                  <th className="px-4 py-3 font-medium text-muted">Total</th>
                  <th className="px-4 py-3 font-medium text-muted">Status</th>
                  <th className="px-4 py-3 font-medium text-muted">Tanggal</th>
                  <th className="px-4 py-3 font-medium text-muted text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-bg-soft/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{o.userName}</p>
                      <p className="text-xs text-muted">{o.userEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">{o.productName}</td>
                    <td className="px-4 py-3 text-muted">{o.quantity}</td>
                    <td className="px-4 py-3 text-muted">{formatRp(o.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {o.createdAt ? new Date(o.createdAt).toLocaleDateString("id-ID") : "-"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value as Order["status"])}
                        className="rounded-lg border border-line bg-white px-2 py-1 text-xs text-ink outline-none focus:border-accent"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
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
