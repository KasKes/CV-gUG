const theme = require("./src/config/theme.json");

let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.fonts.font_size.scale);
let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
if (theme.fonts.font_family.primary) {
  fontPrimary = theme.fonts.font_family.primary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontPrimaryType = theme.fonts.font_family.primary_type;
}
if (theme.fonts.font_family.secondary) {
  fontSecondary = theme.fonts.font_family.secondary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontSecondaryType = theme.fonts.font_family.secondary_type;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: [
    { pattern: /^swiper-/ },
    { pattern: /^yarl__/ },
    { pattern: /^gslide-/ },
    "header-sticky-top",
    "glightbox-clean",
    "header-pinned",
    "react-photo-album--photo",
    "lg:ml-auto",
    "bg-[var(--pageColor])]",
    "bg-[var(--pageColorDark)]",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    container: {
      padding: "1.5rem",
    },
    extend: {
      colors: {
        light: "#f5f5f5",
        dark: "#1b1b1b",
        wedding: "#d4af37",
        wedding2: "#d4af37",
        // portrait: "#7b848c",
        video: "#f67a18",
        igot: "#34a19f",
        igot2: "#1fdeda",
        weristcv: "#61ce70",
        bgweiss: "#fffdf9",
        bgdark: "#1e1e1e",
        textweiss: "#eoeoeo",
        textdark: "#303030",
        text: theme.colors.default.text_color.default,
        light: theme.colors.default.text_color.light,
        dark: theme.colors.default.text_color.dark,
        primary: theme.colors.default.theme_color.primary,
        secondary: theme.colors.default.theme_color.secondary,
        body: theme.colors.default.theme_color.body,
        border: theme.colors.default.theme_color.border,
        "theme-light": theme.colors.default.theme_color.theme_light,
        "theme-dark": theme.colors.default.theme_color.theme_dark,
        darkmode: {
          dark: "#1b1b1b",
          wedding: "#c9aa55",
          wedding2: "#c6a036",
          // portrait: "#7b848c",
          video: "#f67a18",
          igot: "#34a19f",
          igot2: "#1fdeda",
          weristcv: "#61ce70",
          bgweiss: "#f5f5f4",
          bgdark: "#1b1b1b",
          textweiss: "#f5f5f4",
          textdark: "#09090b",
          text: theme.colors.default.text_color.default,
          light: theme.colors.default.text_color.light,
          dark: theme.colors.default.text_color.dark,
          primary: theme.colors.default.theme_color.primary,
          secondary: theme.colors.default.theme_color.secondary,
          body: theme.colors.default.theme_color.body,
          border: theme.colors.default.theme_color.border,
          "theme-light": theme.colors.default.theme_color.theme_light,
          "theme-dark": theme.colors.default.theme_color.theme_dark,
        },
      },
      fontSize: {
        base: font_base + "px",
        h1: h1 + "rem",
        "h1-sm": h1 * 0.7 + "rem",
        h2: h2 + "rem",
        "h2-sm": h2 * 0.7 + "rem",
        h3: h3 + "rem",
        "h3-sm": h3 * 0.7 + "rem",
        h4: h4 + "rem",
        "h4-sm": h4 * 0.7 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({
      generateContainer: false,
      gridGutterWidth: "2rem",
      gridGutters: {
        0: "0rem",
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
        6: "4.5rem",
      },
    }),
  ],
};
