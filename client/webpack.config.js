const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js',        
    ],

    output: {
        publicPath: '/',
        filename: './main.js',
    },

    resolve: {
        extensions: ['.js', '.jsx'],

    },

    module: {
        rules: [
            {
                test: /\.(jpg?g|png|gif|svg)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'public/img/[name].[ext]',
                        outputPath: 'dist/img/',
                    },
                },
            },

            {
                text: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ loader: 'css-loader', options: {minisize: true }}, 'sass-loader'],
                }),
            },
            {
                text: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minisize: true,
                    },
                },
            },
            {
                test: /\.(otf|ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'public/fonts/[name].[ext]',
                    outputPath: 'dist/fonts',
                },
            },
        ],
    },

    plugin: [
        new ExtractTextPlugin({ filename: 'style.css'}),
        new HtmlWebpackPlugin({
            template: './resources/index.html',
            filename: './index.html',
            hash: true,
        }),
    ],

    devServer: {
        historyApiFallback: true,
        publicPath: '/',
        contentBase: './dist',
    },
};