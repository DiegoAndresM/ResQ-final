/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html', './**/*.js', './**/*.pug', "./node_modules/flowbite/**/*.js/*.pug"],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}

