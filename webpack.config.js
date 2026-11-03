const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: path.resolve(__dirname, './src/assets'), to: 'assets' }],
        }),
        new CleanWebpackPlugin(),
    ],
};

module.exports = ({ mode, demo }) => {
    const isProductionMode = mode === 'prod';
    const isDemoMode = demo === true || demo === 'true';
    const apiUrl = isDemoMode
        ? 'https://rss-news-api.onrender.com/'
        : process.env.API_URL || 'https://rss-news-api.onrender.com/';
    const apiKey = isDemoMode ? '' : process.env.API_KEY || '';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig, {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.API_URL': JSON.stringify(apiUrl),
                'process.env.API_KEY': JSON.stringify(apiKey),
            }),
        ],
    });
};
