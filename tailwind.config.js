/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        offwhite: 'rgb(255, 255, 255, 0.94)',
        transgray: 'rgb(161, 161, 170, 0.1)',
        transgray2: 'rgb(161, 161, 170, 0.3)',
        red: 'rgb(254, 86, 80)',
        yellow: 'rgb(254, 181, 60)',
        green: 'rgb(98, 199, 85)',
        black: {
          90: 'rgba(0, 0, 0, 0.9)',
        }

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
