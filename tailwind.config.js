/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      system: 'var(--font-system)',
      body: 'var(--font-body)'
    },
    extend: {}
  },
  plugins: []
}
