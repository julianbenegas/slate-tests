/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      system: 'var(--font-system)',
      body: 'var(--font-body)'
    },
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-radix')()]
}
