/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to left top, #cfd9df, #161616)',
        'light-gradient': 'linear-gradient(to left top, #466173,#FFFFFF)',
        'light-forecast-gradient': 'linear-gradient(to bottom, #F88508 -10%, transparent 120%)',
        'dark-forecast-gradient': 'linear-gradient(to bottom, #443D64 30%, transparent 120%)'

      },
      backgroundColor: {
        lightMode: '#D9D9D9',
        darkMode: '#444444'
      },
      
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          'text-shadow': '1px 4px 20px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-md': {
          'text-shadow': '3px 3px 6px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          'text-shadow': '5px 5px 10px rgba(0, 0, 0, 0.5)',
        },
        '.dark-gradient-text': {
          'background': 'linear-gradient(120deg, #ffffffea, #7a7878)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'text-fill-color': 'transparent',
        },
        '.light-gradient-text': {
          'background': 'linear-gradient(270deg, #9f969645, #3c3b3b )',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'text-fill-color': 'transparent',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
}
