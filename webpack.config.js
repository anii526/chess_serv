const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: ['babel-polyfill', './src/index.ts'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js'
    },
    resolve: {
      modulesDirectories: ['node_modules'],
      extensions: ['', '.js', '.ts'],
    },
    externals: [nodeExternals()],
    module: {
        rules: [
        {
           test: /\.(js|ts)$/,
           exclude: /node_modules/,
           loader: 'babel-loader'
          }
        ]
      },
    
    resolve: {
      extensions: ['*', '.js', '.ts'],
    },
    target: "node",
  };