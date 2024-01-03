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
        'white-line': '#dcdcdc'
      },
      fontSize: {
        'vs': '0.6rem'
      }
    },
  },
  plugins: [],
}