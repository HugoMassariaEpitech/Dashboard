/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        'primary': '#11203A',
        'secondary': '#FFCA0C',
        'bg_dark': 'rgba(26,32,44,1)',
        'dark_lighter': 'rgba(35,43,58,1)',
      },
      padding: {
        '1/2': '50%',
        'full': '100%'
      },
      backgroundImage: {
        'logoWhite': "url(Assets/Icons/logoWhite.svg)",
        'formContact': "url(Assets/BGFormContact.webp)",
        'AlfonZoAcademyMockup': "url(Assets/AlfonZoAcademyMockup.webp)",
        'RoswellMockup': "url(Assets/RoswellMockup.webp)",
        'flagFR': "url(Assets/Flags/la-france.png)",
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar-hide')
  ],
}