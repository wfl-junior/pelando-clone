const defaultTheme = require("tailwindcss/defaultTheme");

const screens = {
  xs: "425px",
  ...defaultTheme.screens,
};

const fontSansSerif = [`"Nunito Sans"`, ...defaultTheme.fontFamily.sans];

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
      colors: {
        primary: "#f27a0d",
        "primary-hover": "#e66d00",
        "primary-shadow": "#cc6100",
        "hotness-primary": "#f27a0d",
        "default-background": "#ffffff",
        "default-foreground": "#4d4d4d",
        "default-shadow": "#000000",
        "default-fade": "#ffffff",
        "default-border": "#e9e9e9",
        "secondary-background": "#f0f0f0",
        "secondary-foreground": "#999999",
        "secondary-button": "#e9e9e9",
        "tertiary-foreground": "#000000",
        "inactive-background": "#e9e9e9",
        "input-background": "#e9e9e9",
        red: "#d22d3a",
        blue: "#1262b2",
        "dark-primary": "#e57919",
        "dark-primary-hover": "#b84e19",
        "dark-primary-shadow": "#e57919",
        "dark-hotness-primary": "#e57919",
        "dark-default-background": "#1b1e1f",
        "dark-default-foreground": "#f5f5f5",
        "dark-default-shadow": "#000000",
        "dark-default-fade": "#000000",
        "dark-default-border": "#262a2b",
        "dark-secondary-background": "#101112",
        "dark-secondary-foreground": "#b8b2a9",
        "dark-secondary-button": "#262a2b",
        "dark-tertiary-foreground": "#f5f5f5",
        "dark-inactive-background": "#262a2b",
        "dark-input-background": "#262a2b",
        "dark-red": "#bf133c",
        "dark-blue": "#6699ff",
        "default-placeholder": "#757575",
      },
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
      });
    },
  ],
};
