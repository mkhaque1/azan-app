/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['ScheherazadeNew-Regular', 'serif'], // Arabic font
        bangla: ['NotoSansBengali-VariableFont_wdth,wght', 'sans-serif'], // Bangla font
        english: ['Inter-VariableFont_opsz,wght', 'sans-serif'], // English font
      },
    },
  },
  plugins: [],
};
