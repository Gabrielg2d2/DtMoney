/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'green-default': '#00BFA6',
        'red-default': '#E52E4D',
        'text-default': '#363F5F',
        'title-default': '#969CB2'
      }
    }
  },
  plugins: []
}
