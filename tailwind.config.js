import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px', // For large monitors and ultra-wide screens
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        clicker: ['"Clicker Script"', 'cursive'],
      },
      fontSize: {
        xl: '1.25rem', // Extra large (20px)
        '10xl': '12.5rem', // 24px
      },
    },
  },
  plugins: [daisyui],
};
