/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx,css}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        mme: {
          background: '#def5f4',
          button: '#4ECDC4',
          buttonHover: '#38b6b2',
          text: '#0A3D62',
          body: '#555555',
          price: '#C1F53F'
        }
      }
    },
  },
  plugins: [],
}
