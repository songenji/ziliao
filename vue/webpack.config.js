var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('css/[name].css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var srcDir = __dirname + '/src';
var fs = require('fs');
var arr = [];
var file_arr = [];
getEntry();
var webpackConfig = {
  // 入口文件
 /* entry: getEntry(),*/
  entry: {
	  "cs_index": __dirname + "/src/js/cs_index.js"  //仓储-合作供货商
  },

  // 编译输出的文件路径  
  output: {
    path: path.join(__dirname, "./html/"),
    //path: path.join(__dirname, "dist/"),
    //path: "../src/main/webapp/"
    publicPath: "../",
    filename: "js/[name].js",
  },

  //加载器  
  module: {
    loaders: [{
      test: require.resolve('jquery'),
      loader: 'expose?jQuery!expose?$'
    }, {
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader'
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: extractCSS.extract("style-loader", "css-loader")
    }, {
      test: /\.less/,
      exclude: /node_modules/,
      loader: extractCSS.extract('style', 'css!less')
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.png|.jpg|.jpeg$/,
      exclude: /node_modules/,
      //loader: 'file-loader?limit=5000&name=images/[name].[ext]'
      loader: 'file-loader?limit=5000&name=images/[name].[ext]'
    }, {
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      //loader: 'file-loader?limit=5000&name=css/[name].[ext]'
      loader: 'file-loader?limit=5000&name=css/[name].[ext]'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  },
  watch: true,
  plugins: [
    extractCSS,
    new HtmlWebpackPlugin({
      title: '123',
      template: __dirname + '/src/tpl/1.html', // 源模板文件
      filename: 'html/cs_index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
      inject: 'body',
    }),
    //js文件的压缩
    /*new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),*/
  ]
};
module.exports = webpackConfig;

function getEntry() {
  var jsPath = path.resolve(srcDir, 'js');
  var dirs = fs.readdirSync(jsPath);
  var matchs = [],
    files = {};
  dirs.forEach(function(item) {
    var json = {};
    matchs = item.match(/(.+)\.js$/);
    if (matchs) {
      files[matchs[1]] = path.resolve(srcDir, 'js', item);
      json[matchs[1]] = path.resolve(srcDir, 'js', item);
      arr.push(json);
    }
  });
  file_arr.push(files);
  return files;
}
/*for (var i = 0; i < arr.length; i++) {
  for (key in arr[i]) {
    var name = key.split("_")[0];
    var plugin = new HtmlWebpackPlugin({
      title: '123',
      template: __dirname + '/src/tpl/1.html', // 源模板文件
      filename: name + '/' + key + '.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
      inject: 'body',
      chunks: [key]
    });
    webpackConfig.plugins.push(plugin);
  };
}*/