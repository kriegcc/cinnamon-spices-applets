import path from "path"
import webpack from "webpack"

const UUID = "fish@kriegcc"

const GENERATION_HINT = "/* This file was generated by webpack. Do not edit directly. */"
const GPL_BOILERPLATE_NOTICE = `/*!
 * This file is part of the fish@kriegcc applet project for Cinnamon desktop.
 * 
 * Copyright (C) ${new Date().getFullYear()} kriegcc
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */`

const banner = `${GENERATION_HINT}\n\n${GPL_BOILERPLATE_NOTICE}\n`

const config: webpack.Configuration = {
  mode: "production",
  entry: {
    index: "./src/applet.ts",
  },
  output: {
    filename: "fish-applet.js",
    path: path.resolve(__dirname, `files/${UUID}/`),
    // necessary for import in applet.js (entry point)
    library: "fishApplet",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [
      // allow import modules using absolute paths
      path.join(__dirname, "src"),
      "node_modules",
    ],
  },
  // without webpack renames 'global'
  target: "node",
  optimization: {
    minimize: false,
    usedExports: true,
  },
  plugins: [
    // add a boilerplate notice at the top of the output file
    new webpack.BannerPlugin({
      banner: banner,
      raw: true,
    }),
  ],
}

export default config