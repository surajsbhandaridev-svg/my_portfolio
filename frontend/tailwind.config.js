/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        notebook: {
          bg: '#101010',
          lines: '#353535',
          text: '#F0E9EF',
          muted: '#BDB5B9',
          pink: '#F2A6AC',
          blue: '#76A9FF',
          green: '#8FCF9B',
          card: '#161616',
          border: 'rgba(255, 255, 255, 0.18)',
        }
      },
      fontFamily: {
        handwriting: ['Caveat', 'Patrick Hand', 'cursive'],
        serif: ['Lora', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'sketch': '4px 4px 0px rgba(0, 0, 0, 0.8)',
        'sketch-pink': '4px 4px 0px #F2A6AC',
        'paper': '0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
}
