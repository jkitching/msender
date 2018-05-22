const webpack  = require('webpack');

export default (config, env, helpers) => {
  delete config.entry.polyfills;
  config.output.filename = "[name].js";

  let extractTextPlugin = helpers.getPluginsByName(config, "ExtractTextPlugin")[0].plugin;
  extractTextPlugin.options.disable = true;

  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    'react': 'preact-compat',
    'react-dom': 'preact-compat'
  });
  config.plugins.push(
    new webpack.ProvidePlugin({
      Component: ['preact', 'Component'],
      React: ['preact-compat']
    })
  );

  if (env.production) {
    config.output.libraryTarget = "umd";
  }
};
