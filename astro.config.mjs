import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";
import swup from "@swup/astro";

// https://astro.build/config

export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "https://camposviola.ngo",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash,
  devToolbar: {
    enabled: false
  },
  assets: {
    // Hier kannst du `astro:assets` für Bildverarbeitung konfigurieren
  },
  integrations: [
    swup({
      theme: "slide",
      animationClass: "class*='swuptransition-'",
      morph: ["header", "main", "footer", ".header-mobile"],
      containers: ["main"],
      cache: true,
      preload: true,
      progress: true
    }),
    react(), // React-Integration ist korrekt eingefügt
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
