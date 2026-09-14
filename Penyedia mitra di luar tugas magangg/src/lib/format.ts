export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: Date | string, opts?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...opts,
  }).format(d);
}

export function formatPriceLabel(value: number): string {
  if (value === 0) return "Gratis";
  if (value >= 1_000_000) {
    const juta = value / 1_000_000;
    return `Rp${juta % 1 === 0 ? juta.toFixed(0) : juta.toFixed(1).replace(".", ",")} jt`;
  }
  if (value >= 1_000) {
    const rb = value / 1_000;
    return `Rp${rb % 1 === 0 ? rb.toFixed(0) : rb.toFixed(1).replace(".", ",")}rb`;
  }
  return `Rp${value}`;
}

export function waLink(phone: string, message: string): string {
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone: string): string {
  return `tel:+${phone.replace(/\D/g, "")}`;
}
