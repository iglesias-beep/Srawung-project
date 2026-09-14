import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/section-heading";

type Client = {
  name: string;
  logo: string;
};

const clients: Client[] = [
  { name: "BUMN", logo: "/images/clients/bumn.png" },
  { name: "Pertamina", logo: "/images/clients/pertamina.jpg" },
  { name: "PLN", logo: "/images/clients/pln.webp" },
  { name: "Telkomsel", logo: "/images/clients/telkomsel.jpg" },
  { name: "Volcom", logo: "/images/clients/volcom.jpg" },
  { name: "Comnet Plus", logo: "/images/clients/comnet-plus.jpg" },
  { name: "Billabong", logo: "/images/clients/billabong.png" },
  { name: "Harfam Makmur", logo: "/images/clients/harfam-makmur.png" },
  { name: "Quiksilver", logo: "/images/clients/quiksilver.jpg" },
  { name: "Fonterra", logo: "/images/clients/fonterra.png" },
  { name: "Motasa", logo: "/images/clients/motasa.png" },
  { name: "PGN", logo: "/images/clients/pgn.jpg" },
];

function ClientChip({ name, logo }: Client) {
  return (
    <div className="mx-2 flex h-16 shrink-0 items-center gap-3 rounded-2xl border border-line bg-background px-6 shadow-card transition-all hover:border-accent/30">
      <div className="relative h-9 w-24">
        <Image
          src={logo}
          alt={name}
          fill
          sizes="96px"
          className="object-contain"
        />
      </div>
      <span className="whitespace-nowrap text-sm font-semibold text-ink">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Client[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div
        className={`marquee-track flex w-max items-center ${
          reverse
            ? "animate-[marquee-rtl_40s_linear_infinite]"
            : "animate-[marquee-ltr_40s_linear_infinite]"
        }`}
      >
        {doubled.map((client, i) => (
          <ClientChip key={`${client.name}-${i}`} {...client} />
        ))}
      </div>
    </div>
  );
}

export function ClientKami() {
  return (
    <section className="overflow-hidden border-y border-accent/20 bg-bg-soft py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Client Kami"
          title="Dipercaya BUMN & Brand Ternama"
          description="Barang custom dari Katalog Jasa dipercaya berbagai perusahaan, BUMN, dan brand ternama di Indonesia."
        />
      </Container>
      <div className="mt-2">
        <MarqueeRow items={clients} />
        <div className="mt-4">
          <MarqueeRow items={[...clients].reverse()} reverse />
        </div>
      </div>
    </section>
  );
}
