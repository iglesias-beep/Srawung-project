import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg-base px-4">
      <div className="text-center">
        <p className="text-7xl font-bold font-[family-name:var(--font-display)] text-accent-brass/20 mb-4">
          404
        </p>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-text-primary mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-text-muted mb-8 max-w-md mx-auto">
          Sepertinya halaman yang Anda cari sudah dipindahkan atau tidak tersedia.
        </p>
        <Link href="/">
          <Button variant="emerald" size="lg">
            <ArrowLeft className="h-5 w-5" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
}
