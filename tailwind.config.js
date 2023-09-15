/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#0cbf53",
        danger: "#ff0000",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
