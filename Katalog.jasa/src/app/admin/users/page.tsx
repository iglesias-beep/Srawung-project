"use client";

import { useEffect, useState } from "react";
import { getFirebaseDb } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

interface UserRecord {
  uid: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    const db = getFirebaseDb();
    const snap = await getDocs(collection(db, "users"));
    const data: UserRecord[] = [];
    snap.forEach((d) => {
      const docData = d.data();
      data.push({
        uid: docData.uid || d.id,
        name: docData.name || "",
        email: docData.email || "",
        role: docData.role || "user",
        createdAt: docData.createdAt || "",
      });
    });
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function toggleRole(uid: string, currentRole: string) {
    const db = getFirebaseDb();
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (!confirm(`Ubah role user ini menjadi ${newRole}?`)) return;
    await updateDoc(doc(db, "users", uid), { role: newRole });
    fetchUsers();
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-ink">Kelola Users</h1>
      <p className="mt-2 text-sm text-muted">Lihat dan manage akun user.</p>

      <div className="mt-8">
        {loading ? (
          <p className="text-center text-muted py-10">Memuat data...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-muted py-10">Belum ada user terdaftar.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-bg-soft">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted">Nama</th>
                  <th className="px-4 py-3 font-medium text-muted">Email</th>
                  <th className="px-4 py-3 font-medium text-muted">Role</th>
                  <th className="px-4 py-3 font-medium text-muted">Terdaftar</th>
                  <th className="px-4 py-3 font-medium text-muted text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {users.map((u) => (
                  <tr key={u.uid} className="hover:bg-bg-soft/50">
                    <td className="px-4 py-3 font-medium text-ink">{u.name}</td>
                    <td className="px-4 py-3 text-muted">{u.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          u.role === "admin" ? "bg-accent/10 text-accent" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString("id-ID") : "-"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => toggleRole(u.uid, u.role)}
                        className="text-xs font-medium text-accent hover:underline"
                      >
                        {u.role === "admin" ? "Jadikan User" : "Jadikan Admin"}
                      </button>
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
