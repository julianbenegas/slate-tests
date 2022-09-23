const { indigoDark, indigoDarkA, orangeDark } = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      system: 'var(--font-system)',
      body: 'var(--font-body)'
    },
    colors: {
      // grayscale taken from https://workos.com/docs/directory-sync/what-you-ll-build
      // gray on light mode
      gray1: '#fcfcfd',
      gray2: '#f9f9fb',
      gray3: '#f2f2f5',
      gray4: '#ebebef',
      gray5: '#e4e4e9',
      gray6: '#dddde3',
      gray7: '#d3d4db',
      gray8: '#b9bbc6',
      gray9: '#8b8d98',
      gray10: '#81848e',
      gray11: '#696e77',
      gray12: '#2b333b',
      // gray on dark mode
      'dark-gray1': '#18181a',
      'dark-gray2': '#1b1b1f',
      'dark-gray3': '#29292f',
      'dark-gray4': '#2f3036',
      'dark-gray5': '#34353b',
      'dark-gray6': '#393a41',
      'dark-gray7': '#40424a',
      'dark-gray8': '#4d5059',
      'dark-gray9': '#696e77',
      'dark-gray10': '#787d86',
      'dark-gray11': '#9ea1a9',
      'dark-gray12': '#e3e5e8',
      'dark-gray13': '#fafafa',
      // rest
      // append "dark" before each key
      ...withPrefix(indigoDark, 'dark'),
      ...withPrefix(indigoDarkA, 'dark'),
      ...withPrefix(orangeDark, 'dark'),
      'basement-orange': '#ff4d00'
    },
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-radix')()]
}

function withPrefix(obj, prefix) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [`${prefix}-${key}`, value])
  )
}
