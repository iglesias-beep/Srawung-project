import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { categories } from "@/lib/categories";
import { products } from "@/lib/products";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/katalog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/tentang-kami`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/kontak`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const categoryRoutes = categories.map<MetadataRoute.Sitemap[number]>((category) => ({
    url: `${base}/katalog/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes = products.map<MetadataRoute.Sitemap[number]>((product) => ({
    url: `${base}/produk/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articles = await getArticles();
  const articleRoutes = articles.map<MetadataRoute.Sitemap[number]>((article) => ({
    url: `${base}/blog/${article.meta.slug}`,
    lastModified: new Date(article.meta.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...articleRoutes,
  ];
}
