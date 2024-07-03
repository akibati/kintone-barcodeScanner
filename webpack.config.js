const path = require('path');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');

module.exports = {
  mode: 'development',
  entry: {
    desktop: './src/js/desktop.js',
    config: './src/js/config.js',
  },
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'src', 'js', 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new KintonePlugin({
      manifestJSONPath: './src/manifest.json',
      privateKeyPath: './private.ppk',
      pluginZipPath: './dist/plugin.zip',
    }),
  ],
};
