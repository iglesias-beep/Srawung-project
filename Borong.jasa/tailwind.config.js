/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0F3D3E',
          charcoal: '#134E4A',
          navy: '#0D9488',
          steel: '#2DD4BF',
          slate: '#0F766E',
          light: '#FFFFFF',
          cream: '#F0FDFA',
          soft: '#ECFDF5',
          muted: '#5B6B70',
          accent: '#F59E0B',
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
