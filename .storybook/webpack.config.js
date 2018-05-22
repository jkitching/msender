const path = require("path");
const webpack  = require('webpack');
const defaults = require('@storybook/react/dist/server/config/defaults/webpack.config');

module.exports = (base, env, helpers) => {
  const config = defaults(base, env, helpers);
  return Object.assign({}, config, {
    resolve: Object.assign({}, config.resolve, {
      alias: Object.assign({}, (config.resolve || {}).alias, {
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      })
    }),
    plugins: [
      new webpack.ProvidePlugin({
        Component: ['preact', 'Component'],
        React: ['preact-compat']
      })
    ].concat(config.plugins),
    module: Object.assign({}, config.module, {
      rules: [
        {
          test: /\.s[ac]ss$/,
          loaders: [
            'style-loader?sourceMap',
            'css-loader?modules&importLoaders=1',
            'sass-loader?sourceMap',
          ],
          include: path.resolve(__dirname, "../"),
        },
        {
          test: /\.css$/,
          loaders: [
            'style-loader?sourceMap',
            'css-loader',
          ],
          include: path.resolve(__dirname, "../"),
        }
      ].concat(config.module.rules)
    }),
  })
};
