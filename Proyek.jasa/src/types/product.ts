export interface Product {
  id: string;
  nama: string;
  slug: string;
  category_id: string;
  category_nama?: string;
  deskripsi_singkat: string;
  deskripsi_lengkap: string;
  harga: number;
  satuan: string;
  gambar: string[];
  stok?: number;
  status: "aktif" | "nonaktif";
  dibuat_pada: string;
  diupdate_pada: string;
}

export interface Category {
  id: string;
  nama: string;
  slug: string;
  urutan: number;
  gambar?: string;
  deskripsi?: string;
}

export interface CartItem {
  product_id: string;
  nama: string;
  harga: number;
  jumlah: number;
  gambar: string;
  catatan_custom: string;
  satuan: string;
}

export interface Order {
  id: string;
  user_id: string;
  user_nama?: string;
  user_email?: string;
  user_no_hp?: string;
  user_alamat?: string;
  status: "baru" | "diproses" | "selesai" | "dibatalkan";
  total: number;
  catatan_pengiriman?: string;
  items: OrderItem[];
  dibuat_pada: string;
  diupdate_pada: string;
}

export interface OrderItem {
  product_id: string;
  nama: string;
  jumlah: number;
  harga_saat_pesan: number;
  catatan_custom: string;
  satuan: string;
}

export interface UserProfile {
  uid: string;
  nama: string;
  email: string;
  role: "user" | "admin";
  alamat?: string;
  no_hp?: string;
  dibuat_pada: string;
}
