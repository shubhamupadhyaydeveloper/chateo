/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        customblack: '#1D272A',
        primarygreen: '#00AA82',
        customwhite: '#E8EDEE',
      },
    },
  },
  plugins: [],
};

