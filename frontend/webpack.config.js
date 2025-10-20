const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    static: path.join(__dirname, 'public'), // можно, чтобы раздавал favicon и т.п.
    historyApiFallback: true,
    port: 3000
  },
  module: {
    rules: [
      // JS/JSX
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
        }
      },
      // CSS
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      },

    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
  resolve: { extensions: ['.js', '.jsx'] }
};
