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
  "secondary-background",
  "secondary-foreground",
  "secondary-button",
  "tertiary-foreground",
  "inactive-background",
  "input-background",
  "red",
  "blue",
];

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
          [key]: colorWithOpacityValue(key),
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
      },
      spacing: {
        4.5: "1.125rem",
      },
      fontSize: {
        "2.5xl": ["1.75rem", "2.125rem"],
      },
      opacity: {
        85: "0.85",
        97: "0.97",
      },
      boxShadow: {
        "user-menu": "0 4px 12px 0 rgba(var(--color-default-shadow) / 0.2)",
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
          gridTemplateAreas: `"image heading" "stores stores"`,
          [`@media (min-width: ${screens.lg})`]: {
            gridTemplateAreas: `"image heading" "image stores"`,
          },
        },
        ".grid-template-areas-product-card": {
          gridTemplateAreas: `"image content" "action action"`,
          [`@media (min-width: ${screens.lg})`]: {
            gridTemplateAreas: `"image content" "image action"`,
          },
        },
      });
    },
  ],
};

function colorWithOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(--color-${variable}))`;
    }

    return `rgb(var(--color-${variable}) / ${opacityValue})`;
  };
}
