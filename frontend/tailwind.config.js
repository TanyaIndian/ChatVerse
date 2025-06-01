/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.7s ease-out forwards',
        'pop-in': 'popIn 0.6s cubic-bezier(0.25, 1.25, 0.5, 1) forwards',
        'text-pop': 'textPop 0.8s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'text-glow-pop': 'textGlowPop 1s ease-out forwards, glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        popIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.8) translateY(-10px)'
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1) translateY(0)'
          }
        },
        textPop: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { color: '#fef9c3', textShadow: '0 0 8px #fca5a5' },
          '50%': { color: '#fca5a5', textShadow: '0 0 16px #f87171' },
        },
        textGlowPop: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px) scale(0.9)',
            color: '#fef9c3',
            textShadow: '0 0 0px #fca5a5',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
            color: '#fca5a5',
            textShadow: '0 0 16px #f87171',
          },
        },
      },
    },
  },
  plugins: [],
}

