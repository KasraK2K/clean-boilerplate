import path from "path"
import nodeExternals from "webpack-node-externals"
import WebpackShellPluginNext from "webpack-shell-plugin-next"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"

const { NODE_ENV = "production" } = process.env

console.log({ NODE_ENV })

module.exports = {
  entry: "./src/server.ts",
  mode: NODE_ENV,
  target: "node",
  watch: NODE_ENV === "development",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [{ test: /\.ts$/, use: ["ts-loader"] }],
  },
  plugins: [
    new WebpackShellPluginNext({
      onAfterDone: {
        scripts: ["echo 'Build complete!'"],
      },
    }),
  ],
  optimization: { minimizer: [new UglifyJsPlugin()] },
}
