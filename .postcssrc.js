// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    // to edit target browsers: use "browserslist" field in package.json
    require('autoprefixer'),
    require('postcss-import')(),
    require('postcss-url')({ maxSize: 1024 }),
    require('postcss-px-to-viewport')({
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,
      viewportUnit: 'vmin',
      fontViewportUnit: 'vmin',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false
    })
  ]
};
