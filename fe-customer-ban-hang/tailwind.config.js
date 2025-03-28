const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      maxWidth: {
        container: '1440px'
      },
      screens: {
        xs: '320px',
        sm: '375px',
        sml: '500px',
        md: '667px',
        mdl: '768px',
        lg: '960px',
        lgl: '1024px',
        xl: '1280px'
      },
      fontFamily: {
        bodyFont: ['DM Sans', 'sans-serif'],
        titleFont: ['Poppins', 'sans-serif']
      },
      colors: {
        primeColor: '#FF7600',
        lightText: '#FFFFFF'
      },
      boxShadow: {
        testShadow: '0px 0px 54px -13px rgba(0,0,0,0.7)'
      }
    }
  },
  plugins: [import('tailwind-scrollbar'), require('@tailwindcss/line-clamp')]
})
