/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "btn-col": "#db2777",
      "sec-col": "#4E84F9",
    },
    extend: {},
    fontFamily: {
      custom: ["Rampart One", "cursive"],
      handwritten: ["Kalam", "cursive"],
      Button: ["IBM Plex Sans", "sans-serif"],
      handwritten2: ["Playpen Sans", "cursive"],
      roboto: ["Roboto", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      landing: ["Bodoni Moda", "serif"],
      nutino: ["Nunito", "sans-serif"],
    },
  },
  plugins: [],
});
