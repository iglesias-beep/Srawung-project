"use client";

import { useEffect, useState } from "react";
import { Package, ShoppingCart, Users, DollarSign, AlertCircle } from "lucide-react";
import { getFirebaseDb } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface StatCard {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatCard[]>([
    { label: "Total Produk", value: "0", icon: Package, color: "text-blue-500" },
    { label: "Total Pesanan", value: "0", icon: ShoppingCart, color: "text-green-500" },
    { label: "Total Users", value: "0", icon: Users, color: "text-purple-500" },
    { label: "Total Pendapatan", value: "Rp 0", icon: DollarSign, color: "text-accent" },
  ]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        const db = getFirebaseDb();

        let productsCount = 0;
        let ordersCount = 0;
        let usersCount = 0;
        let totalRevenue = 0;

        try {
          const productsSnap = await getDocs(collection(db, "products"));
          productsCount = productsSnap.size;
        } catch {
          console.log("Products collection not found or no access");
        }

        try {
          const ordersSnap = await getDocs(collection(db, "orders"));
          ordersCount = ordersSnap.size;
          ordersSnap.forEach((d) => {
            const data = d.data();
            if (data.status === "selesai") {
              totalRevenue += data.total || 0;
            }
          });
        } catch {
          console.log("Orders collection not found or no access");
        }

        try {
          const usersSnap = await getDocs(collection(db, "users"));
          usersCount = usersSnap.size;
        } catch {
          console.log("Users collection not found or no access");
        }

        setStats([
          { label: "Total Produk", value: String(productsCount), icon: Package, color: "text-blue-500" },
          { label: "Total Pesanan", value: String(ordersCount), icon: ShoppingCart, color: "text-green-500" },
          { label: "Total Users", value: String(usersCount), icon: Users, color: "text-purple-500" },
          {
            label: "Total Pendapatan",
            value: "Rp " + totalRevenue.toLocaleString("id-ID"),
            icon: DollarSign,
            color: "text-accent",
          },
        ]);
      } catch (err) {
        setError("Gagal memuat data. Pastikan Firestore sudah aktif.");
        console.error(err);
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">Ringkasan data website Anda.</p>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-line bg-white p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">{stat.label}</p>
                <Icon className={`h-5 w-5 ${stat.color}`} aria-hidden />
              </div>
              <p className="mt-2 font-serif text-2xl font-semibold text-ink">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-white p-6">
        <h2 className="font-serif text-xl font-semibold text-ink">Menu Cepat</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <a
            href="/admin/produk"
            className="flex items-center gap-3 rounded-xl border border-line p-4 text-sm font-medium text-ink transition hover:border-accent hover:bg-accent/5"
          >
            <Package className="h-5 w-5 text-blue-500" />
            Kelola Produk
          </a>
          <a
            href="/admin/pesanan"
            className="flex items-center gap-3 rounded-xl border border-line p-4 text-sm font-medium text-ink transition hover:border-accent hover:bg-accent/5"
          >
            <ShoppingCart className="h-5 w-5 text-green-500" />
            Kelola Pesanan
          </a>
          <a
            href="/admin/users"
            className="flex items-center gap-3 rounded-xl border border-line p-4 text-sm font-medium text-ink transition hover:border-accent hover:bg-accent/5"
          >
            <Users className="h-5 w-5 text-purple-500" />
            Kelola Users
          </a>
        </div>
      </div>
    </div>
  );
}