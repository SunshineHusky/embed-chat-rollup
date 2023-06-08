const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { uglify } = require('rollup-plugin-uglify');

const resolve = function (filePath) {
  return path.join(__dirname, './', filePath);
};

module.exports = {
  input: resolve('/embedChatBot.js'),
  output: {
    file: resolve('/embedChatBot.min.js'),
    format: 'iife',
  },
  plugins: [
    uglify(),
    babel({
      presets: ['@babel/preset-env'],
    }),
  ],
};
