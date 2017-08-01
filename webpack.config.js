var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
    plugins: [
        new LiveReloadPlugin()
    ],

    entry: [
        './src/index.ts',
        'webpack-dev-server/client?http://localhost:8080'
    ],

    output: {
        path: path.join(__dirname, 'dist/js'),
        publicPath: 'http://localhost:8080',
        filename: 'bundle.js'
    },

    module: {
        loaders: [ 
            { test: /\.ts?$/, loader: 'ts-loader' }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.json', '.ts'],
        modules: [__dirname, 'node_modules']
    },

    devtool: 'source-map',

    devServer: {
        historyApiFallback: true,
        hot: false
    }
};