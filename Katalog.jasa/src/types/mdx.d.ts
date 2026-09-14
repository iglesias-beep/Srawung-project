declare module "*.mdx" {
  export const metadata: {
    title: string;
    description: string;
    category: string;
    date: string;
    readingTime: string;
    image: string;
    keywords: string[];
  };
}
