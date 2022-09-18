/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'blueOne':'#4d3dff',
        'blueTwo':'#3d8eff',
        'blueTree':'#9ec6ff',
        'pink':'#ae3dff',
        'pinkTwo':'#d79eff',
      }
    },
  },
  plugins: [],
};
