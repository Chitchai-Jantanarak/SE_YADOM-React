module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'noto-sans-thai': ['Noto Sans Thai', 'sans-serif'],
          'poppins': ['Poppins', 'sans-serif'],
          'alike': ['Alike', 'serif'],
          'concert-one': ['Concert One', 'cursive'],
        },
      },
    },
    plugins: [
      require('daisyui'),
    ],
}