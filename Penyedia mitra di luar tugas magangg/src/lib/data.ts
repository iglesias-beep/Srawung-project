import "server-only";

import { prisma } from "@/lib/db";
import type { Category, BlogPost, Provider } from "@prisma/client";

export type ProviderWithCategory = Provider & {
  category: Category;
  _count?: { services: number };
};

const providerInclude = {
  category: true,
  _count: { select: { services: true } },
} as const;

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { providers: true } } },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { _count: { select: { providers: true } } },
  });
}

export async function getProvidersByCategory(
  slug: string,
  query?: string
): Promise<ProviderWithCategory[]> {
  return prisma.provider.findMany({
    where: {
      category: { slug },
      ...(query
        ? {
            OR: [
              { name: { contains: query } },
              { tagline: { contains: query } },
              { location: { contains: query } },
            ],
          }
        : {}),
    },
    include: providerInclude,
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
  });
}

export async function getAllProviders(
  query?: string,
  location?: string
): Promise<ProviderWithCategory[]> {
  return prisma.provider.findMany({
    where: {
      ...(query
        ? {
            OR: [
              { name: { contains: query } },
              { tagline: { contains: query } },
              { businessName: { contains: query } },
              { location: { contains: query } },
              { category: { name: { contains: query } } },
            ],
          }
        : {}),
      ...(location ? { location: { contains: location } } : {}),
    },
    include: providerInclude,
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
  });
}

export async function getFeaturedProviders(): Promise<ProviderWithCategory[]> {
  return prisma.provider.findMany({
    where: { featured: true },
    include: providerInclude,
    orderBy: { rating: "desc" },
    take: 6,
  });
}

export async function getRecentProviders(
  take = 6
): Promise<ProviderWithCategory[]> {
  return prisma.provider.findMany({
    include: providerInclude,
    orderBy: { rating: "desc" },
    take,
  });
}

export async function getProviderBySlug(slug: string) {
  return prisma.provider.findUnique({
    where: { slug },
    include: {
      category: true,
      services: { orderBy: { order: "asc" } },
      portfolios: true,
      reviews: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function getSimilarProviders(
  categoryId: string,
  excludeId: string,
  take = 3
): Promise<ProviderWithCategory[]> {
  return prisma.provider.findMany({
    where: { categoryId, id: { not: excludeId } },
    include: providerInclude,
    orderBy: { rating: "desc" },
    take,
  });
}

export async function getLocations(): Promise<string[]> {
  const rows = await prisma.provider.findMany({
    select: { location: true },
    distinct: ["location"],
  });
  return rows.map((r) => r.location).sort();
}

export async function getBlogPosts() {
  return prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function getRecentBlogPosts(
  take = 3
): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export async function getProviderCount() {
  return prisma.provider.count();
}

export async function getReviewCount() {
  return prisma.review.count();
}
