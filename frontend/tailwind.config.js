/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFB5C0',
        'secondary': '#F06292',
        'accent': '#FF8F9D',
        'text-dark': '#5D4037',
        'text-light': '#FFFFFF',
        'background': '#FFF9F9',
      }
    },
  },
  plugins: [],
}
