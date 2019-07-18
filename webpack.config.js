module.exports = {
    mode: "development",
    // mode: "production",
    entry: "./src/index.ts",
    devtool: "source-map",
    target: "node",
    node: {
        process: false
    },
    output: {
        filename: "cookie.js",
        // filename: "whatstpl.min.js",
        library: "SfnCookie",
        libraryTarget: "umd",
        globalObject: "this",
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    }
};
