const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
                test: /\.ts(x)?$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env"]
                        },
                    },
                    {
                        loader: 'ts-loader',
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                    from: './public/assets/images',
                    to: 'assets/images',
                    noErrorOnMissing: true,
                },
                {
                    from: './public/assets/sounds',
                    to: 'assets/sounds',
                    noErrorOnMissing: true,
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: true,
            title: "Phaser Game Webpack Template",
            appMountId: 'app',
            inlineSource: '.(js|css)$',
            minify: false
        })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 3000,
        hot: true,
    },
    devtool: 'inline-source-map',
}