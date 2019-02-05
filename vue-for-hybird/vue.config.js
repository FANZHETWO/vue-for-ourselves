let webpack = require('webpack')
let CopyWebpackPlugin = require("copy-webpack-plugin");
let ZipPlugin = require("zip-webpack-plugin");
let path = require("path");
let buildConfig = require("./buildConfig");
let shell = require('shelljs')
const IS_PRODUCTION = process.env.NODE_ENV === 'production' ? true : false;
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development' ? true : false;
console.log(process.env.NODE_ENV)
// 删除.zip包
shell.rm('-rf', '*.zip', path.resolve(__dirname, '../*.zip'));

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
let exportConfig = {
    assetsDir: 'static',
    publicPath: './',
    productionSourceMap: IS_PRODUCTION === true ? buildConfig.build.productionSourceMap : buildConfig.buildTest.productionSourceMap,
    configureWebpack: {
        plugins: [
            // 复制 CubeModule.json
            new CopyWebpackPlugin([{
                from: path.join(__dirname, './CubeModule.json'),
                to: path.join(__dirname, './dist/CubeModule.json')
            }, ]),
            // 打压缩包
            new ZipPlugin({
                path: path.join(__dirname, './'),
                filename: IS_PRODUCTION === true ? buildConfig.build.zipName : buildConfig.buildTest.zipName,
            }),
        ]
    },
    configureWebpack: (webpackConfig) => {
          // 设置全局变量
        let ENV_TYPE, CONF = path.resolve(__dirname, './src/projectConfig.js');;
        switch (process.env.NODE_ENV) {
            case 'development':
                ENV_TYPE = path.resolve(__dirname, './buildConfig/dev.env.js');
                break;
            case 'test':
                ENV_TYPE = path.resolve(__dirname, './buildConfig/test.env.js');
                break;
            case 'production':
                ENV_TYPE = path.resolve(__dirname, './buildConfig/prod.env.js');
                break
        }
        return {
            plugins: [
                new webpack.ProvidePlugin({
                    '$envType': ENV_TYPE,
                    '$conf': CONF
                }),
            ]
        }
    },
    chainWebpack: (webpackConfig) => {
        /*设置资源夹路径*/
        webpackConfig.resolve
            .alias
            .set('assets', resolve('src/assets')).set('$common', resolve('src/js/common.js'));
        /*设置资源夹路径*/
        webpackConfig.resolve
            .extensions
            .add('.js').add('.vue').add('.json');
        /*执行buildTest打包时添加webpack一些处理*/
        if (!IS_PRODUCTION && !IS_DEVELOPMENT) {
            webpackConfig
                .mode('production') // buildTest 用webpack 的 production 模式打包
                .devtool('source-map') // 添加 source-map
                .output
                .filename('static/js/[name].[contenthash:8].js') // 输出文件名字及位置
                .chunkFilename('static/js/[name].[contenthash:8].js');

            // keep module.id stable when vendor modules does not change
            // 模块代码没修改对应模块文件hash缓存
            webpackConfig
                .plugin('hash-module-ids')
                .use(require('webpack/lib/HashedModuleIdsPlugin'), [{
                    hashDigest: 'hex'
                }])
        }
    },

    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            }
        }
    },
    devServer: {
        port: buildConfig.dev.port,
        open:'Chrome'
    }
}


module.exports = exportConfig