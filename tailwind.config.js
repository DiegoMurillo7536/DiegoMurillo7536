/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'cerulean': {
        '50': '#eff8ff',
        '100': '#def0ff',
        '200': '#b6e2ff',
        '300': '#75ccff',
        '400': '#2cb3ff',
        '500': '#14a5ff',
        '600': '#0079d4',
        '700': '#0060ab',
        '800': '#00518d',
        '900': '#064474',
        '950': '#042b4d',
    },
    
    },
    fontFamily: {
      sans: ['Poppins', 'Graphik', 'sans-serif'],
      serif: ['Roboto', 'Merriweather', 'serif'],
    },
    extend: {
      
    },
  },
  plugins: [],
}