const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TypedocWebpackPlugin = require("typedoc-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new TypedocWebpackPlugin({
            name: "PetriJS",
            mode: "modules"
        })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "petri.js",
        path: path.resolve(__dirname, "dist")
    }
};
