import { products } from "../components/productsData";
import { COLLECTIONS } from "../components/collections";

const toSlug = (id) => id.replace(/\s+/g, "-");

export default function sitemap() {
  const baseUrl = "https://www.legacyimprint.co.uk";
  const now = new Date();

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/quote`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ].map((p) => ({ ...p, lastModified: now }));

  const collectionPages = COLLECTIONS.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productPages = products.map((p) => ({
    url: `${baseUrl}/products/${toSlug(p.id)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...collectionPages, ...productPages];
}
