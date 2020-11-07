const path = require('path')

const webpack = require('webpack')

const dotenv = require('dotenv').config({ path: path.resolve(__dirname, 'config', '.env') })

const MiniExtractPlugin = require('mini-css-extract-plugin')

console.log(process.env.BASE_URL)

module.exports = (env, args) => {
  let isProd = args.mode === 'production'
  console.log(env)

  return {
    mode: args.mode,
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },

    module: {
      
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: [
          MiniExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotenv.parsed)
      }),
      new MiniExtractPlugin({filename: 'styles.css'})
    ],

    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    },
    devtool: isProd ? 'source-map' :  'eval-cheap-module-source-map'
  }
}