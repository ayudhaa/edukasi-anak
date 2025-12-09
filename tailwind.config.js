/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'comic': ['Comic Neue', 'cursive'],
        'child': ['Nunito', 'Comic Neue', 'cursive', 'sans-serif'],
      },
      fontSize: {
        'child-lg': ['1.25rem', { lineHeight: '1.8', letterSpacing: '0.5px' }],
        'child-xl': ['1.5rem', { lineHeight: '1.6', letterSpacing: '0.3px' }],
        'child-2xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '0.2px' }],
        'child-3xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '0.1px' }],
        'child-4xl': ['3rem', { lineHeight: '1.2', letterSpacing: '0' }],
      },
      animation: {
        'float-slow': 'float 4s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}