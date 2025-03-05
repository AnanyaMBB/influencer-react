module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Includes your project's files for Tailwind to scan
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Replace with your primary color
        'blue-dark': '#1E3A8A', // Replace with your blue-dark color
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Replace with your desired fonts
      },
      boxShadow: {
        'testimonial-btn': '0px 15px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // 'class' for manual control, 'media' for system preference
};
