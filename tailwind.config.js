/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // <--- ESTA LÍNEA ES CRITICA
  ],
  theme: {
    extend: {
      colors: {
        lilac: {
          50: '#FAF7FD',
          100: '#F3ECF7',
          200: '#E6DAF0',
          400: '#C6A8DC',
          500: '#B98FCF',
        },
        muted: '#F7F6F5',
        beige: '#F6EFE8',
        softGray: '#9AA4A6'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
