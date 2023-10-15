const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],

    },
};