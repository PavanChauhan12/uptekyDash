module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f8ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#0A84FF', // main primary
          600: '#0472e6',
          700: '#0357b3',
          800: '#013b80',
          900: '#00264d'
        },
        accent: {
          500: '#3B82F6' 
        }
      },
      borderRadius: {
        xl: '14px'
      },
      boxShadow: {
        card: '0 6px 20px rgba(12, 15, 20, 0.06)'
      }
    }
  },
  plugins: []
};
