const defaultTheme = require("tailwindcss/defaultTheme");

const screens = {
  xs: "425px",
  ...defaultTheme.screens,
};

const fontSansSerif = [`"Nunito Sans"`, ...defaultTheme.fontFamily.sans];

const colors = [
  "primary",
  "primary-hover",
  "primary-shadow",
  "hotness-primary",
  "default-background",
  "default-foreground",
  "default-shadow",
  "default-fade",
  "default-border",
  "image-border",
  "secondary-background",
  "secondary-foreground",
  "secondary-button",
  "tertiary-foreground",
  "inactive-background",
  "input-background",
  "red",
  "blue",
];

/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./alerts/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    container: false,
  },
  theme: {
    screens,
    extend: {
      colors: colors.reduce(
        (object, key) => ({
          ...object,
          [key]: `rgb(var(--color-${key}) / <alpha-value>)`,
        }),
        {},
      ),
      fontFamily: {
        sans: fontSansSerif,
        arial: ["Arial", ...fontSansSerif],
      },
      animation: {
        "slide-left-in": "slide-left-in 300ms ease-out forwards",
        "grow-search-bar": "grow-search-bar 300ms ease-out forwards",
        "comment-focus": "comment-focus 4s linear",
        "fade-in": "fade-in 300ms linear",
      },
      keyframes: {
        "slide-left-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "grow-search-bar": {
          from: { width: "20%", marginLeft: "auto" },
          to: { transform: "100%", marginLeft: "auto" },
        },
        "comment-focus": {
          from: {
            backgroundColor: `rgb(var(--color-default-comment-focus) / 1)`,
          },
          to: {
            backgroundColor: `rgb(var(--color-default-comment-focus) / 0)`,
          },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      spacing: {
        4.5: "1.125rem",
      },
      fontSize: {
        "2.5xl": ["1.75rem", "2.125rem"],
        "4.5xl": ["2.625rem", "3rem"],
      },
      opacity: {
        85: "0.85",
        97: "0.97",
      },
      boxShadow: {
        "user-menu": "0 4px 12px 0 rgb(var(--color-default-shadow) / 0.2)",
        "product-page-action-menu":
          "0 4px 12px 0 rgb(var(--color-default-shadow) / 0.2)",
        "notifications-menu":
          "0 0 10px 0 rgb(var(--color-default-shadow) / 0.3)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".container": {
          width: "100%",
          paddingInline: "1rem",
          [`@media (min-width: ${screens.lg})`]: {
            paddingInline: "1.5rem",
          },
          [`@media (min-width: ${screens.xl})`]: {
            paddingInline: "2rem",
            maxWidth: "1424px",
            marginInline: "auto",
          },
        },
        ".no-scrollbar": {
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".grid-template-areas-hero": {
          gridTemplateAreas: `
            "image heading"
            "stores stores"
          `,
          [`@media (min-width: ${screens.lg})`]: {
            gridTemplateAreas: `
              "image heading"
              "image stores"
            `,
          },
        },
        ".grid-template-areas-product-card": {
          gridTemplateAreas: `
            "image content"
            "action action"
          `,
          [`@media (min-width: ${screens.lg})`]: {
            gridTemplateAreas: `
              "image content"
              "image action"
            `,
          },
        },
        ".grid-template-areas-product-page": {
          gridTemplateAreas: `
            "title" 
            "image" 
            "action" 
            "description"
          `,
          [`@media (min-width: ${screens.lg})`]: {
            gridTemplateAreas: `
              "image title action"
              "image description action"
            `,
          },
        },
        ".grid-template-areas-product-page-extra": {
          gridTemplateAreas: `
            "main"
            "deals" 
            "stores"
          `,
          [`@media (min-width: ${screens.lg})`]: {
            gridTemplateAreas: `
              "main stores"
              "main sidebar"
              "deals deals"
            `,
          },
        },
        ".grid-template-areas-product-page-tip": {
          gridTemplateAreas: `
            ". badge" 
            "image tip"
          `,
        },
      });
    },
  ],
};
