const plugin = require('tailwindcss/plugin')
const utilities = require('./plugins/utilities')
const components = require('./plugins/components')

module.exports = plugin(function ({ addUtilities, addComponents }) {
    utilities({ addUtilities }, ['responsive', 'hover'])
    components({ addComponents })
})

// marca tu export como plugin de PostCSS/Tailwind
module.exports.postcss = true
