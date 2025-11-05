/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4500',      // Deep Orange/Red - OG style
          dark: '#FF4500',
          light: '#DC2626',
        },
        secondary: {
          DEFAULT: '#FFD700',      // Gold - OG style
          dark: '#FFD700',
          light: '#F59E0B',
        },
        accent: {
          DEFAULT: '#FF6B35',      // Bright Orange - OG style
          dark: '#FF6B35',
          light: '#EA580C',
        },
        dark: {
          DEFAULT: '#0a0000',      // Deep black with red tint
          secondary: '#1a0000',
        },
        light: {
          DEFAULT: '#FFF8F0',      // Cream/off-white
          secondary: '#FFEDD5',
        },
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

