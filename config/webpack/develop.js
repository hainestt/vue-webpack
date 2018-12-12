/*
 * @Author: Haines&lt;rxsnym@163.com&gt;
 * @Date: 2018-12-04 10:02:08
 * @Last Modified by: Haines
 * @Last Modified time: 2018-12-11 22:48:37
 */

'use strict'

const path = require('path')
const webpack = require('webpack')
const BaseConfig = require('./base')
const HtmlWebpackPlugin = require('html-webpack-plugin')


class DevConfig extends BaseConfig {
    constructor () {
        super()
        this.config = {
            devtool: 'cheap-module-eval-source-map', // 原始源代码，不适用生产环境，构建速度中等
            mode: 'development',
            output: {
                path: this.distAbsolutePath,
                filename: 'dist.js',
                publicPath: this.distAbsolutePath
            },
            devServer: {
                host: '127.0.0.1',
                port: 8580,
                compress: true,
                open: true,
                disableHostCheck: true,
                historyApiFallback : true,
                // noInfo: true,
                hot: true,
                inline: true,
                proxy: {
                    '/api/': {
                        target: 'http://test.com',  //线上服务器
                        changeOrigin: true,
                        pathRewrite: {
                            '^/api': ''
                        }
                    }
                }
            }
        }

        this.config.plugins = this.config.plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new HtmlWebpackPlugin({
                template: 'index.html',
                filename: 'index.html',
                inject: true
            })

        ])

        this.config.module.rules = this.config.module.rules.concat([
            {
                test: /\.css$/,
                // include: [], //没有include，webpack会搜索node_modules下的css，速度比较慢
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ])

    }

}

module.exports = DevConfig
