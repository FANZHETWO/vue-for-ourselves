import axios from 'axios'
import {
    storage
} from '../js/common'
// import platform from 'h5-res-platform'
var qs = require('qs');
var instance = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: {},
    params: {},
});
// 接口通行规则配置
// 如果有个接口规定了status为ture的时候表示成功，那只要把true加入status的数组中即可
// 通行规则所配置的项都是或的关系，只要匹配到其中任意一个规则，视为通过，流到then
// 如果所有规则都比较过，发现接口返回对象没有包含规则中的任何属性，也视为通过
// 如果所有规则都比较完，对象包含一个以上属性，但没有匹配到其数组里面任何一个值时，视为不通过，接口返回对象会被附上一个属性{status: false}，并且流到catch
const errorPassRulesConfig = {
    status: [true, 'Y', '1', '0',0 ,1],
    code: ['0',1,'0000', null],
    error: [/^[23]\d{2}([\.\-]\d{1,2})?$/]
}
// 接口错误信息属性配置，如果某个接口错误是返回的错误信息的属性没有包含在这个集合中，将其加入。
// 那么错误信息的属性会被统一成 errMsg
const errorMsgPropsConfig = ['errorMsg', 'errMsg', 'errmsg', 'msg'];

// 请求拦截器
instance.interceptors.request.use(function(config) {
    let user = storage.get('baseInfo.user');
    config.params[$conf.tokenName] = user.ssoToken;
    if (config.method === 'post') {
        if (config.data) {
            let data = config.data;
            return autoFill(data).then(result => {
                // 直接用参数做请求，不进行报装
                if (config.data._pure) {
                    delete config.data._pure
                    if (config.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') >= 0) {
                        config.data = qs.stringify(data)
                    }
                    return config
                }
                // 外层只包装json
                if (config.data._noBody) {
                    delete config.data._noBody;
                    config.data = qs.stringify({
                        json: JSON.stringify(data)
                    });
                    return config
                }
                config.data = qs.stringify({
                    json: JSON.stringify({
                        body: data
                    })
                });
                return config;
            })
        }
    }
    if (config.method === 'get') {
        let data = config.params;
        return autoFill(data).then(result => {
            config.params = result;
            return config;
        })
    }
    return config;
}, function(error) {
    console.log(error);
    return Promise.reject(error)
})

/* 返回拦截器
 axios的拦截器有个奇怪的设定：如果没有reject则认为成功，即使是在失败回调函数里面也这样。
 但有些错误处理（比如登出和断网）希望在拦截器里面处理后不再往外抛，这时需要中断promise，
 虽然axios官方不建议这么做，但有个取巧的方案是返回一个空的promise：return new Promise(() => {})
 */
instance.interceptors.response.use(function(response) {
    let data = handleError(response.data)
    if (!data) {
        return response.data
    } else {
        return Promise.reject(data)
    }
}, function(error) {
    if (error.response) {
        // 请求已发送，服务器回复状态码在2xx之外
        console.error(error.response)
    } else if (error.request) {
        // 请求已发送，但没有收到回应
        console.error(error.request)
    } else {
        // 请求尚未发送就失败了，可以认为是某些设置引发的问题（代码问题、跨域、断网）
        // 建议错误在这里拦截处理，中断promise
        console.error(error)
        return Promise.reject(error);
    }
    return Promise.reject(error)
});

function autoFill(data) {
    return new Promise((resolve, reject) => {
        let user = storage.get('baseInfo.user'),
            props = data._autoFillProp || [];
        if (props.length) {
            //用于存放经常用的字段
            let all = {
                engineerCode: user && user.engineerCode,
                mobile: user && user.mobile
            }
            data._autoFillProp.forEach(prop => {
                let propArr = prop.split(':')
                if (propArr.length == 2) {
                    data[propArr[0]] = all[propArr[1]]
                } else {
                    data[prop] = all[prop]
                }
            })
        }
        delete data._autoFillProp
         resolve(data)
        
    })
}

/**
 * 处理接口请求错误，由于客观原因，接口返回错误标识不统一，该函数用于处理这种情况
 * 该函数将对以下几种情况做处理：
 * 1、单个标识，如：{status: true}
 * 2、多个标识，如：{errorCode: null, status: true}
 * 3、成功只返回数据，没有标识信息
 * 4、不同接口使用相同的标识属性，但值不一样
 * @param  {Object} err 错误信息
 * @return {Object}     处理后的错误信息,如果判定不是错误，则返回null
 */
function handleError(err) {
    const pass = errorPassRulesConfig
    // 如果pass没有命中并且onceNotPass为true则视为不通过，
    // 如果pass没有命中但onceNotPass为false则视为通过（情况3）
    let onceNotPass = false
    for (let prop in pass) {
        if (pass.hasOwnProperty(prop) && err.hasOwnProperty(prop)) {
            let vals = pass[prop]
            if (!Array.isArray(vals)) {
                val = [vals]
            }
            for (let i = 0; i < vals.length; i++) {
                let val = vals[i]
                if (val instanceof RegExp) {
                    if (val.test(err[prop])) {
                        // 通过
                        return null
                    }
                } else if (val === err[prop]) {
                    // 通过
                    return null
                }
                onceNotPass = true
            }
        }
    }
    if (!onceNotPass) {
        return null
    }
    var ret = Object.assign({}, err, {
        status: false
    })
    ret = handleErrorMsg(ret)
    return ret
}

/**
 * 处理错误提示，接口返回错误提示属性不统一，该函数将提示统一为errMsg
 * @param  {Object} [err={}]   错误对象，如果传入字符串，则会将字符串视为错误信息，如果传入既非对象也非字符串，则视为无效参数
 * @return {Object}            输出一个对象，错误信息为该对象的errMsg属性，如果没有错误信息可以处理，原样返回对象
 */
function handleErrorMsg(err = {}) {
    const props = errorMsgPropsConfig
    if (typeof err === 'string') {
        return {
            errMsg: err
        }
    }
    if (typeof err != 'object') {
        err = {}
    }
    for (let i = 0; i < props.length; i++) {
        var p = props[i]
        if (err.hasOwnProperty(p) && typeof err[p] === 'string') {
            let ret = Object.assign({}, err, {
                errMsg: err[p]
            })
            delete ret[p]
            return ret
        }
    }
    return err
}
export default instance
// Instance methods
// request(config)
// get(url[, config])
// delete(url[, config])
// head(url[, config])
// post(url[, data[, config]])
// put(url[, data[, config]])
// patch(url[, data[, config]])

// config 主要属性
// {
//   // `url` is the server URL that will be used for the request
//   url: '/user',
//   // `method` is the request method to be used when making the request
//   method: 'get', // default
//   // `baseURL` will be prepended to `url` unless `url` is absolute.
//   // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
//   // to methods of that instance.
//   baseURL: 'https://some-domain.com/api/',
//   // `headers` are custom headers to be sent
//   headers: {'X-Requested-With': 'XMLHttpRequest'},
//   // `params` are the URL parameters to be sent with the request
//   // Must be a plain object or a URLSearchParams object
//   params: {
//     ID: 12345
//   },
//   // `data` is the data to be sent as the request body
//   // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
//   // When no `transformRequest` is set, must be of one of the following types:
//   // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
//   // - Browser only: FormData, File, Blob
//   // - Node only: Stream
//   data: {
//     firstName: 'Fred'
//   },
//   // `timeout` specifies the number of milliseconds before the request times out.
//   // If the request takes longer than `timeout`, the request will be aborted.
//   timeout: 1000,
//   // `responseType` indicates the type of data that the server will respond with
//   // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
//   responseType: 'json', // default
//   }
// }

// 详细请参考 https://github.com/mzabriskie/axios
