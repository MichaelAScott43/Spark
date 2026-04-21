/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        anchor: {
          bg: '#020617',
          card: '#0f172a',
          accent: '#22d3ee'
        }
      }
    }
  },
  plugins: []
};
