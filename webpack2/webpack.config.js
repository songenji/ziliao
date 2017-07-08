const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const plugin = new ExtractTextPlugin({
  filename: '../css/app.css',
  ignoreOrder: true,
});

module.exports = {
  devServer: {
    host: process.env.HOST, 
    port: 9000, 
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  entry: {
    'Storage_zhifupage': __dirname + '/src/js/Storage_zhifupage.js',
  },
  output: {
    path: path.join(__dirname, 'build/js/'),
    filename: '[name].js',
  },
  //devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader',
      },
      /*{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
           presets: ['es2015'],
           plugins: ['transform-runtime']
        }
      }
    },*/
      //npm run lintjs -- --fix
      {
        test: /\.js$/,
        enforce: 'pre',

        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: plugin.extract({
          use: ['css-loader'],
          fallback : 'style-loader',
        }),
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: plugin.extract({
          use: ['css-loader','less-loader'],
          fallback : 'style-loader',
        }),
      },
      {
        test: /\.png|.jpg|.jpeg$/,
        exclude: /node_modules/,
        use: 'file-loader?limit=5000&name=../images/[name].[ext]',
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        exclude: /node_modules/,
        use: 'file-loader?limit=5000&name=../images/[name].[ext]',
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader',
      },
    ],
  },
  watch: true,
  plugins: [
    plugin,
    new HtmlWebpackPlugin({
      title: '123',
      template: __dirname + '/src/tpl/1.html', 
      filename: '../html/[name].html', 
      inject: 'body',
    }),
  ],
};