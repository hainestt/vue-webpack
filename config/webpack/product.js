/*
 * @Author: Haines&lt;rxsnym@163.com&gt;
 * @Date: 2018-12-04 10:01:55
 * @Last Modified by: Haines
 * @Last Modified time: 2018-12-11 22:48:52
 */

'use strict'

const path = require('path')
const BaseConfig = require('./base')
const TerserJsPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

class ProConfig extends BaseConfig {
    constructor () {
        super()

        this.config = {
            mode: 'production',
            optimization: {
                splitChunks: {
                    chunks: 'async',
                    minSize: 30000,
                    minChunks: 1,
                    name: true,
                    cacheGroups: {
                        // default: false,
                        vendor: {
                            name: 'vendor',
                            test: /[\\/]node_modules[\\/]/,
                            chunks: 'all',
                            priority: -10
                        },
                        common: {
                            name: 'common',
                            minChunks: 2,
                            reuseExistingChunk: true,
                            priority: -20
                        },
                    }
                },
                runtimeChunk: {
                    name: "manifest",
                },
                minimizer: [
                    new TerserJsPlugin({
                        test: /\.js(\?.*)?$/i,
                        // cache: true,
                        parallel: true, //多线程，提高构建速度，强烈推荐开启{}
                        terserOptions: {
                            warnings: false,
                            mangle: true,
                            beautify: true,
                            comments: true,
                            compress: {
                                drop_console: true,
                                drop_debugger: true
                            }
                        }
                    }),
                    new OptimizeCSSAssetsPlugin({})
                ]
            },
            stats: {
                // children: false
            }
        }

        this.config.plugins = this.config.plugins.concat([
            new CleanWebpackPlugin(['static/*', 'index.html', 'favicon.ico'],{
                root: this.distAbsolutePath,
                verbose: true,
                dry: false,
                watch: false,
            }),
            new HtmlWebpackPlugin({
                favicon: path.resolve(this.srcAbsolutecPath, 'assets/favicon.ico'),
                template: path.resolve(this.srcAbsolutecPath, '../index.html'),
                filename: '../index.html',
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                }
            }),
            new MiniCssExtractPlugin({
                filename: 'styles/[name].[hash].css',
                chunkFilename: 'styles/[id].[hash].css'
            }),
            new ManifestPlugin()

        ])

        this.config.module.rules = this.config.module.rules.concat([
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ])
    }
}

module.exports = ProConfig
