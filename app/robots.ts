import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "Yandex",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot"],
        disallow: "/",
      },
    ],
    sitemap: "https://florstroy.ru/sitemap.xml",
  }
}
