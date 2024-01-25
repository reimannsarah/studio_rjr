/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'header': ["Archivo Black", "sans-serif"],
        'subheader': ["Barlow", "sans-serif"],
      },
      colors: {
        'primary': '#5f6265'
      }
    },
    plugins: [],
  },
};
