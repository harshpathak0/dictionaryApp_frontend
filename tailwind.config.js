/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: '#27374D',  // Blue color
        customPink: '#FFEAE3',  // Light pink color
      },
    },
  },
  plugins: [],
};
