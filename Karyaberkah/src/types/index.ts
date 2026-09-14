export interface Product {
  id: string
  nama: string
  slug: string
  kategori_id: string
  kategori_nama?: string
  deskripsi_singkat: string
  deskripsi_lengkap: string
  harga: number
  satuan: string
  gambar: string[]
  stok?: number
  status: "aktif" | "nonaktif"
  dibuat_pada: string
  diupdate_pada: string
}

export interface Category {
  id: string
  nama: string
  slug: string
  urutan: number
  gambar?: string
}

export interface Article {
  id: string
  judul: string
  slug: string
  kategori: string
  ringkasan: string
  konten: string
  gambar_cover: string
  waktu_baca: number
  dipublikasikan_pada: string
  status: "draft" | "published"
}

export interface CartItem {
  product_id: string
  nama: string
  harga: number
  jumlah: number
  catatan_custom?: string
  gambar?: string
}

export interface Order {
  id: string
  user_id: string
  status: "baru" | "diproses" | "selesai" | "dibatalkan"
  total: number
  dibuat_pada: string
  items: CartItem[]
  nama_lengkap?: string
  no_hp?: string
  alamat?: string
}

export interface User {
  uid: string
  nama: string
  email: string
  role: "user" | "admin"
  alamat?: string
  no_hp?: string
  dibuat_pada: string
}
