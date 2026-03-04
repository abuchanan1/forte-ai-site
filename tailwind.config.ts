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
        'navy-deep': '#060E1C',
        navy: '#0C1B33',
        'navy-mid': '#162444',
        brass: '#A07840',
        'brass-light': '#C49A58',
        'brass-dark': '#7A5C2E',
        white: '#F7F4EE',
        'white-warm': '#EDE9E0',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      lineHeight: {
        display: '1.05',
        body: '1.7',
      },
      letterSpacing: {
        mono: '0.2em',
        'mono-wide': '0.25em',
        label: '0.08em',
        logo: '0.18em',
        'logo-sub': '0.30em',
        button: '0.12em',
      },
    },
  },
  plugins: [],
}

export default config
