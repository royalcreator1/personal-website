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
          DEFAULT: '#6366f1',
          dark: '#6366f1',
          light: '#4f46e5',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
          dark: '#8b5cf6',
          light: '#7c3aed',
        },
        accent: {
          DEFAULT: '#06b6d4',
          dark: '#06b6d4',
          light: '#0891b2',
        },
        dark: {
          DEFAULT: '#0f172a',
          secondary: '#1e293b',
        },
        light: {
          DEFAULT: '#f8fafc',
          secondary: '#f1f5f9',
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

