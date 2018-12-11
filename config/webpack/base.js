/*
 * @Author: Haines&lt;rxsnym@163.com&gt;
 * @Date: 2018-12-03 21:29:12
 * @Last Modified by: Haines
 * @Last Modified time: 2018-12-11 22:48:42
 */

'use strict'

const path = require('path')
const webpack = require('webpack')
const buildEnv = require('../env')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

class BaseConfig {
    constructor () {
        this._config = {}
    }

    get config () {
        return this._config
    }

    set config (obj = {}) {
        this._config = Object.assign({}, this.defaultSettings, obj)
    }

    get srcAbsolutecPath () {
        return path.resolve(process.cwd(), 'src')
    }

    get distAbsolutePath () {
        return path.resolve(process.cwd(), 'dist')
    }

    get defaultSettings () {
        return {
            // cache: true,
            entry: path.resolve(this.srcAbsolutecPath, 'main.ts'),
            output: {
                path: `${this.distAbsolutePath}/static`,
                filename: 'javascripts/[name].[hash].js',
                publicPath: 'static/'
            },
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        exclude: /node_modules/,
                        enforce: 'pre',
                        loader: 'tslint-loader'
                    },
                    {
                        test: /\.vue$/,
                        loader: 'vue-loader',
                        options: {
                            transformAssetUrls: {
                                video: ['src', 'poster'],
                                source: 'src',
                                img: 'src',
                                image: 'xlink:href'
                            }
                        }
                    },
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader',
                        exclude: /node_modules/,
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    },
                    {
                        test: /\.jsx?$/,
                        loader: 'babel-loader?cacheDirectory',
                        exclude: file => (
                            /node_modules/.test(file) && !/\.vue\.js/.test(file) // js转义应用node_modules的Vue单文件组件
                        )
                    },
                    {
                        test: /\.(png|jpg|jpeg|svg)$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    name: 'assets/[name].[ext]',
                                    publicPath: '../',
                                    limit: 8192
                                }
                            }

                        ]
                    },
                    {
                        test: /\.(gif|eot|ttf|woff|woff2)(\?\S*)?$/,
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[hash].[ext]',
                            publicPath: '../'
                        }
                    },
                    {
                        test: /\.ico$/,
                        loader: 'file-loader',
                        options: {
                            name: '../[name].[ext]',
                        }
                    }
                ]
            },
            resolve: {
                extensions: ['.css','.js', '.vue', '.json', '.jsx', '.ts', '.tsx'],
                alias: {
                    'vue$': 'vue/dist/vue.esm.js',
                    '@': path.resolve(process.cwd(), 'src'),
                    'components': path.resolve(process.cwd(), 'src/components'),
                    'pages': path.resolve(process.cwd(), 'src/pages'),
                    'scss': path.resolve(process.cwd(), 'src/scss'),
                    'utils': path.resolve(process.cwd(), 'src/utils'),
                    'assets': path.resolve(process.cwd(), 'src/assets')
                }
            },
            plugins: [
                new VueLoaderPlugin(),
                new webpack.DefinePlugin({
                    'GLOBAL_CONFIG': {
                        apiBase: `"${buildEnv[process.env.BUILD_ENV].apiBase}"`
                    }
                })

            ],
            performance: {
                hints: false
            }
        }
    }
}

module.exports = BaseConfig
