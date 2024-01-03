/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      fontFamily: {
        'magazine': ['Syne', 'sans-serif']
      },
      colors: {
        'white-paper': '#fff5eb',
        'black-paper': '#070707',
        'black-paper-50': '#838383',
        'white-line': '#dcdcdc',
        'white-paper-50':'#807b76',
        'white-paper-20': '#ccc4bc'
      },
      fontSize: {
        'vs': '0.6rem'
      }
    },
  },
  plugins: [],
}