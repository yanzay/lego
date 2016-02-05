module.exports = {
    entry: "./static/shop.js",
    output: {
        path: __dirname,
        filename: "./static/build.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: { presets: ['react', 'es2015'] }
            },
            { test: /\.css$/, loader: "style!css" },
        ]
    },
    devtool: "source-map"
};
