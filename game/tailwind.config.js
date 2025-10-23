/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        gray: '#EAE6DA',
        white: '#FFFFFF',
        black: '#000000',
        yellow: '#FDC730',
        background: '#F5F5ED',
        'light-gray': '#EAE7DD',
        'dark-purple': '#5E2ABF',
        'light-purple': '#C3A7FF',
        purple: '#8E44FF',
      },
      fontFamily: {
        luckiest: 'LuckiestGuy_400Regular',
        'robotoc-regular': 'RobotoCondensed_400Regular',
        'robotoc-bold': 'RobotoCondensed_700Bold',
        'robotoc-light': 'RobotoCondensed_200ExtraLight',
      },
    },
  },
  plugins: [],
}
