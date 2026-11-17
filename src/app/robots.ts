import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const rules = {
    userAgent: "*",
    allow: "/",
  };

  if (!SITE_URL) {
    return { rules };
  }

  return {
    rules,
    sitemap: `${SITE_URL.replace(/\/$/, "")}/sitemap.xml`,
  };
}
