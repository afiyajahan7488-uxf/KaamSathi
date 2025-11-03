/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-brown': '#2D3748',
        'dark-peach': '#D2691E',
      },
    },
  },
  plugins: [],
}
