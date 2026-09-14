import type { MDXComponents } from "mdx/types";
import Image from "next/image";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-10 font-serif text-3xl font-semibold leading-tight text-ink first:mt-0 md:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 font-serif text-2xl font-semibold leading-snug text-ink md:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 font-serif text-xl font-semibold leading-snug text-ink">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 leading-[1.8] text-text-secondary">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-accent underline decoration-accent-light underline-offset-4 transition-colors hover:text-primary"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-text-secondary [&_ul]:mt-2 [&_ul]:space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-text-secondary">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-[1.8]">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-8 border-l-2 border-accent bg-bg-soft py-4 pl-6 pr-4 font-serif text-lg italic leading-relaxed text-ink">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 h-px border-0 bg-accent-light" />,
  img: (props) => (
    <Image
      src={props.src ?? ""}
      alt={props.alt ?? ""}
      width={1600}
      height={900}
      sizes="100vw"
      className="mt-8 h-auto w-full rounded-[16px] border border-line"
    />
  ),
  table: ({ children }) => (
    <div className="mt-8 overflow-x-auto rounded-[16px] border border-line">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="bg-surface px-4 py-3 font-semibold text-ink">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-t border-line px-4 py-3 text-text-secondary">
      {children}
    </td>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
