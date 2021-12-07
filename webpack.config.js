const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  const isProd = env.production ? true : false;

  return {
    entry: path.resolve(__dirname, "src/main.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[hash].js",
    },
    mode: isProd ? "production" : "development",
    devServer: { hot: true, open: true },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : { loader: "style-loader" },
            { loader: "css-loader" },
          ],
        },
        {
          test: /\.(png|jpg|svg|ico)$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[hash].css",
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body",
      }),
    ],
  };
};
