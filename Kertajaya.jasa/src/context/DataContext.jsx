import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { subscribeProducts, subscribeArticles } from "../lib/db";
import { PRODUCTS as SEED_PRODUCTS } from "../data/products";
import { ARTICLES as SEED_ARTICLES } from "../data/articles";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const unsubP = subscribeProducts((list) => setProducts(list));
    const unsubA = subscribeArticles((list) => setArticles(list));
    return () => {
      unsubP();
      unsubA();
    };
  }, []);

  const value = useMemo(() => {
    const prod = products && products.length > 0 ? products : SEED_PRODUCTS;
    // Artikel dari database digabung dengan artikel dari file (slug sama = versi database menang)
    const dbArt = articles || [];
    const slugs = new Set(dbArt.map((a) => a.slug));
    const art = [...dbArt, ...SEED_ARTICLES.filter((a) => !slugs.has(a.slug))];
    return {
      products: prod,
      articles: art,
      dbEmpty: products !== null && products.length === 0,
      loading: products === null || articles === null,
      listCategories: () => [...new Set(prod.map((p) => p.cat))],
    };
  }, [products, articles]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData harus dipakai di dalam <DataProvider>");
  return ctx;
}
