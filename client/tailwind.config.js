/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,vue}',
    './components/**/*.{js,jsx,vue}',
    './app/**/*.{js,jsx,vue}',
    './src/**/*.{js,jsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Monserrat', 'sans-serif'],
        poppins: ['Poppins', 'serif'],
      }
    },
  },
  plugins: [],
}

