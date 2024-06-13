module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'custom-gray': '#e0e0e0', // Softer grey for light mode background
        'custom-green': '#28a745', // Green for buttons
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};