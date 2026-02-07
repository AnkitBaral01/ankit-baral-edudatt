import colors from "tailwindcss/colors";

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#295a94',
          light: '#fce9e8',
        },
        secondary: '#2d3140',
        orange: '#f3722c',
        pink: {
          DEFAULT: '#f02892',
          accent: '#ff006e',
        },
        offwhite: '#f1e3d3',
        gray: {
          DEFAULT: 'gray',
          light: '#f0f0f0',
          lighter: '#E0E0E0',
        },
        green: {
          DEFAULT: '#198754',
          light: '#4CAF50',
        },
        yellow: {
          DEFAULT: '#f9c349',
          light: '#f6e06e',
          lighter: '#fffbe0',
        },
        blue: {
          DEFAULT: '#000099',
          light: '#0ea5e9',
        },
        text: '#333333',
        success: '#02b875',
        danger: '#f53b3e',
        turquise: '#afe1d9',
        orange: "#eb6b18",

        black: colors.black,
        white: colors.white,
        slate: colors.slate
      },
    },
  },
  plugins: [],
}