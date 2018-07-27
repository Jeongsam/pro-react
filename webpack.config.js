const path = require("path");

module.exports = {
    mode: "development",

    entry: {
        main: "./src/App.js"
    },

    output: {
        path: path.resolve(__dirname + "public"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },

    devtool: "eval",

    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 9000,
        clientLogLevel: "info",
        index: "index.html"
    }
};