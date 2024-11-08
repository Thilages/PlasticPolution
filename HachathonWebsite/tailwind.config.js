/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        brightness: {
          '0%, 100%': { filter: 'brightness(80%)' },
          '50%': { filter: 'brightness(50%)' },
        },
      },
      animation: {
        brightness: 'brightness 4s infinite',
      },
      
    },
  },
  plugins: [],
}