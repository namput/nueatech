/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      // ทำให้ prose โทน dark อ่านง่ายขึ้น
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.neutral.200'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.blue.300'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-quotes': theme('colors.neutral.300'),
            '--tw-prose-code': theme('colors.neutral.100'),
            '--tw-prose-pre-bg': 'rgba(17,24,39,0.7)',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
  ],
};
