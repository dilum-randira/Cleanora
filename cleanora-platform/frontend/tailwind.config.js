/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cleanora: {
          ink: '#14213d',
          mint: '#2ec4b6',
          aqua: '#3a86ff',
          mist: '#eef8f7',
          porcelain: '#f8fbfb',
          charcoal: '#1f2937'
        }
      },
      boxShadow: {
        soft: '0 18px 50px rgba(20, 33, 61, 0.12)'
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
