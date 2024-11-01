const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    filename: "bundle.js", // Output file name
    path: __dirname + "/dist", // Output directory
    clean: true, // Clean the output directory before each build
  },
  mode: "development",

  module: {
    rules: [
      {
        test: /\.wasm$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Template for index.html
      filename: "index.html", // Output index.html
    }),
  ],
};
