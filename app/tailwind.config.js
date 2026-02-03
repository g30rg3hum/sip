/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // colors: {
      //   primary: "var(--color-primary)",
      //   "primary-foreground": "var(--color-primary-foreground)",
      //   "background-dark": "var(--color-background-dark)",
      //   "background-light": "var(--color-background-light)",
      //   foreground: "var(--color-foreground)",
      // },
    },
  },
  plugins: [],
};
