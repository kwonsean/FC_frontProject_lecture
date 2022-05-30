const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin"); // 압축 플러그인
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/js/main.js", // js 파일 진입점
  output: {
    // 번들된 파일이 나오는 곳
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true, // dist 폴더 지우고 다시 생성
  },
  devtool: "source-map",
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Virutal keyboard",
      template: "./index.html",
      inject: "body", // 자바스크립트 삽입 위치 지정하지 않으면 head에 들어감
      favicon: "./favicon.ico",
    }),
    new MiniCssExtractPlugin({ filename: "style.css" }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // css 파일을 아래 방법으로 사용하겠다.
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()],
  },
  devServer: {
    host: "localhost",
    port: 8080,
    open: true,
    watchFiles: "index.html",
  },
};
