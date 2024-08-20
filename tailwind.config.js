/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        grayScheme: {
          light: '#e2e8f0',  // Gris claro más oscuro
          DEFAULT: '#718096', // Gris medio más oscuro
          dark: '#1a202c',    // Gris muy oscuro
        },
      },
    },
  },
  plugins: [],
}

