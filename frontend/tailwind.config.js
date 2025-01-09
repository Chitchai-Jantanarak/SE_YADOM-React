/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans-thai': ['Noto Sans Thai', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'alike': ['Alike', 'serif'],
        'concert-one': ['Concert One', 'cursive'],
        'montserrat': ['montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

