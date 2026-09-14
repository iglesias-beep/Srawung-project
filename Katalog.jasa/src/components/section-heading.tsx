import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-4 md:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" aria-hidden />
          {eyebrow}
          {align === "center" ? (
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent" aria-hidden />
          ) : null}
        </span>
      ) : null}
      <h2 className="font-serif text-3xl font-semibold leading-tight text-ink md:text-[2.5rem] md:leading-[1.15]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
