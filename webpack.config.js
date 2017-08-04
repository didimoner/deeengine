const LiveReloadPlugin = require('webpack-livereload-plugin');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entries = process.env.NODE_ENV === 'production' 
    ? ['./src/index.ts']
    : ['./src/index.ts', 'webpack-dev-server/client?http://localhost:8080'];

module.exports = {
    plugins: [
        new LiveReloadPlugin()
    ],

    entry: entries,

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'stylus-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.ts?$/, 
                use: 'ts-loader' 
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?.*$|$)/,
                include: /fonts/,
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.(png|jpe?g|gif|ico)(\?.*$|$)/,
                use: [
                    'file-loader?name=assets/[name].[hash].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.json', '.ts', '.styl'],
        modules: [__dirname, 'node_modules']
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new ExtractTextPlugin('style.css')
    ],

    devtool: 'source-map',

    devServer: {
        historyApiFallback: true,
        hot: false
    }
};