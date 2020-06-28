const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', path.resolve(__dirname, './src/app.js')],
    mode: 'development',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: 'http://localhost:8080/',
        compress: true,
        watchContentBase: true
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader' ,'css-loader'] },
            { test: /\.(png|jpg|svg|gif)$/, use: 'file-loader' },
            { test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: false,
                    emitWarning: true,
                },
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: path.resolve(__dirname, './src/favicon.ico'),
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: './src/assets', to: 'assets' },
        ])
    ],
}
