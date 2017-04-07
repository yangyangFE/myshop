const path = require('path');

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, 'src/home/classSearch'),  // 2. 自己私人的 svg 存放目录
];
module.exports = {
  devtool: 'eval-source-map',

  entry:  __dirname + "/src/index.js",
  output: {
    path: __dirname + "/public",
    publicPath: "/public/",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015']
        }
      },
       {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
       {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      },
      {
　　　　　　test: /\.(png|jpg)$/,
　　　　　　loader: 'url-loader?limit=8192'
　　　　}
    ]
  },
  resolve:{
        extensions:['.web.js', '.js', '.json']
   },
  devServer: {
    contentBase: "./public",
    inline: true,
    hot: true
  }
}