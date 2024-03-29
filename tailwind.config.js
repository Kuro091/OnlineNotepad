/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      gridTemplateRows: {
        // Simple 16 row grid
        '12': 'repeat(12, minmax(0, 1fr))',

      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
