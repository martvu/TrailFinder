/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        trailfinder_light: {
          primary: '#1eb854',
          secondary: '#40332e',
          accent: '#cba8a3',
          neutral: '#ffffff',
          'base-100': '#f5f5f5',
          info: '#2563EB',
          success: '#16A34A',
          warning: '#D97706',
          error: '#DC2626',
        },
        trailfinder_dark: {
          primary: '#1eb854',
          secondary: '#e7e5e4',
          accent: '#cba8a3',
          neutral: '#374151',
          'base-100': '#1f2937',
          info: '#3E6FEA',
          success: '#1BB166',
          warning: '#EC9913',
          error: '#EC5B67',
        },
        fontFamily: {
          sans: ['ui-sans-serif', 'system-ui'],
          serif: ['ui-serif', 'Georgia'],
          mono: ['ui-monospace', 'SFMono-Regular'],
          display: ['Oswald'],
          body: ['"Open Sans"'],
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
  },
};
