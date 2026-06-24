import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { services } from "@/data/services";
import { plans } from "@/data/plans";
import { concerns } from "@/data/concerns";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPaths = [
    "/",
    "/about",
    "/services",
    "/plans",
    "/ecosystem",
    "/projects",
    "/clients",
    "/insights",
    "/contact",
  ];

  const dynamicPaths = [
    ...services.map((s) => s.href),
    ...plans.map((p) => p.href),
    ...concerns.map((c) => `/ecosystem/${c.slug}`),
    ...projects.map((p) => p.href),
    ...getAllPosts().map((p) => `/insights/${p.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority:
      path === "/"
        ? 1
        : path.includes("/") && path.length > 1 && !path.slice(1).includes("/")
          ? 0.8
          : 0.6,
  }));
}
