import { promises as fs } from "node:fs";
import path from "node:path";

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
  keywords: string[];
  productLinks?: string[];
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export type Article = {
  meta: ArticleMeta;
  Body: (props?: {
    components?: Record<string, unknown>;
  }) => React.JSX.Element;
};

const contentDir = path.join(process.cwd(), "src", "content", "blog");

export async function getArticleSlugs(): Promise<string[]> {
  const files = await fs.readdir(contentDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    const meta = mod.metadata as Omit<ArticleMeta, "slug">;
    return {
      meta: { slug, ...meta },
      Body: mod.default,
    };
  } catch {
    return null;
  }
}

export async function getArticles(): Promise<Article[]> {
  const slugs = await getArticleSlugs();
  const articles = await Promise.all(slugs.map(getArticle));
  return articles
    .filter((a): a is Article => a !== null)
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
}
