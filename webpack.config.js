/*
 * @Author: Haines&lt;rxsnym@163.com&gt;
 * @Date: 2018-12-04 10:49:03
 * @Last Modified by: Haines
 * @Last Modified time: 2018-12-11 22:48:59
 */

'use strict'

const webpackConfig = require('./config/webpack')
const defaultEnv = 'develop'

module.exports = env => {
    let CurrentConfig

    if (!!webpackConfig[env]) {
        CurrentConfig = webpackConfig[env]
    } else {
        CurrentConfig = webpackConfig[defaultEnv]
    }

    let configInstance = new CurrentConfig()

    return configInstance.config
}
