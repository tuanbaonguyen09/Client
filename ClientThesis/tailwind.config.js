/** @type {import('tailwindcss').Config} */
// const defaultColors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobile: '414px',
      // => @media (min-width: 414px) { ... }
      tablet: '834px',
      // => @media (min-width: 834px) { ... }
      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }
      desktop: '1920px',
      // => @media (min-width: 1920px) { ... }
    },
    extend: {
      colors: {
        main: {
          100: '#EDF1D6',
          200: '#9DC08B',
          300: '#609966',
          400: '#40513B'
        }, 
        primary: {
          '50': '#f2f8f1',
          '100': '#e1edde',
          '200': '#c2dbbf',
          '300': '#96c194',
          '400': '#79ac78',
          '500': '#458446',
          '600': '#336835',
          '700': '#29532c',
          '800': '#224324',
          '900': '#1d371f',
          '950': '#0f1f11',
        }
      },
      animation:{
        bounceRight: 'bounceRight 1s infinite',
        typing: 'typing 4s steps(40,end), blink-caret .75s step-end infinite',

      },
      keyframes:{
        bounceRight: {
            '0%, 100%': {
              transform: 'translateX(-10%)',
              'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
            },
            '50%':{
              transform: 'translateX(0)',
              'animation-timing-function':' cubic-bezier(0, 0, 0.2, 1)'
            }
        },
        typing:{
          '0%': {
            width: 0,
            visibility: "hidden"
          },
          '100%': {
            width: '100%',
          }
        },
        'blink-caret':{
          '0%, 100%': {
            'border-color': 'transparent',
          },
          '50%': {
            'border-color': 'white',
          }
        }
      }
      
    },
  },
  plugins: [],
}

