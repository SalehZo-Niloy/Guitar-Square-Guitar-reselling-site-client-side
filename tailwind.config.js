/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#f472b6",

          "secondary": "#9333ea",

          "accent": "#22d3ee",

          "neutral": "#1c1917",

          "base-100": "#212121",

          "info": "#2463EB",

          "success": "#16A249",

          "warning": "#DB7706",

          "error": "#DC2828",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
