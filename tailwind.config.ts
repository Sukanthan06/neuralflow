import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        arctic: '#F1F6F4',
        mint: '#D9E8E2',
        forsythia: '#FFC801',
        saffron: '#FF9932',
        nocturnal: '#114C5A',
        noir: '#172B36',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #114C5A 0%, #172B36 100%)',
      },
    },
  },
  plugins: [],
}

export default config
