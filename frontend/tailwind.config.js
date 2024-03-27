/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,ts}"],
//   theme: {
//     extend: {
//       colors: {
//         'regal-blue': '#243c5a',
//       },
//     },
//   },
//   plugins: [],
// }

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}