
var path = require('path')
var pageInfo = require('../CubeModule.json');

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getZipName(type) {
    var d = new Date();
    var year = d.getFullYear();
    var month = checkTime(d.getMonth() + 1);
    var day = checkTime(d.getDate());
    var hour = checkTime(d.getHours());
    var minute = checkTime(d.getMinutes());
    var mode = type === 2 ? '-pro' : '-test';
    var ver = type === 2 ? pageInfo.version : pageInfo.testVersion;
    return pageInfo.name + '-' + ver + mode + '-' + year + month + day + hour + minute + '.zip';
}

module.exports = {
    buildTest: {
        zipName: getZipName(1),
        env: require('./test.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
    },
    build: {
        zipName: getZipName(2),
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        iframe: path.resolve(__dirname, '../dist/iframe.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: false,
    },
    dev: {
        env: require('./dev.env'),
        port: 8666,
        autoOpenBrowser: false,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
