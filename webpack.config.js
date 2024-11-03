const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/web/main.ts",
  output: {
    filename: "bundle.js", // Output file name
    path: __dirname + "/dist", // Output directory
    clean: true, // Clean the output directory before each build
  },
  mode: "development",

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/web/index.html", // Template for index.html
      filename: "index.html", // Output index.html
    }),
  ],
};
