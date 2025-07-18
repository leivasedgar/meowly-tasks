/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'baloo': ['Baloo 2', 'cursive'],
        'nunito': ['Nunito', 'sans-serif'],
        'sans': ['Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
