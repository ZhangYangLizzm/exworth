/** @type {import('tailwindcss').Config} */
// import lineClamp from '@tailwindcss/line-clamp'
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      'mb': { 'min': '0', 'max': '639px' },
      'nmb': { 'min': '639px', 'max': '3000px' },
      'sm': { 'min': '640px', 'max': '767px' },
      // => @media (min-width: 640px and max-width: 767px) { ... }
      'md': { 'min': '768px', 'max': '1023px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }
      'lg': { 'min': '1024px', 'max': '1279px' },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }
      'xl': { 'min': '1280px', 'max': '1535px' },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
      '2xl': { 'min': '1536px' },
    },
    extend: {
      colors: {
        primary: '#0cbf53',
        primaryGreen: '#0cbf53',
        primaryBlue: '#050c42',
        danger: '#ff0000',
      },
    },
  },
  plugins: [
    // lineClamp
    // require('@tailwindcss/line-clamp')
  ],
  corePlugins: {
    preflight: false,
  },
}
