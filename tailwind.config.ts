import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './content/**/*.json'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F7F9FC',
        surface: '#FFFFFF',
        graphite: '#171B22',
        muted: '#5D6677',
        line: 'rgba(23,27,34,0.08)',
        brand: '#F87F22',
        electric: '#1F7BFF',
        electricSoft: '#E8F1FF'
      },
      boxShadow: {
        soft: '0 18px 60px rgba(15, 23, 42, 0.08)',
        glass: '0 10px 40px rgba(31, 123, 255, 0.10)'
      },
      backdropBlur: {
        xs: '2px'
      },
      borderRadius: {
        xl2: '1.25rem'
      },
      maxWidth: {
        page: '1200px'
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(23,27,34,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,27,34,0.04) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
} satisfies Config;
