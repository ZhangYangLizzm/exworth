/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#52c41a",
        danger: "#f5222d",
        warning:"#fadb14",
        pending:"#1890ff"
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

