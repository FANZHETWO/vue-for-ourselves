/**
 * Created by Administrator on 2017-6-2.
 */
import keepAlive from '../router/keepAlive';
// import platform from 'h5-res-platform'
let storage = {
    get(key, isLocalStorage = false) {
        if (!key) return null
        let _storage = isLocalStorage ? localStorage : sessionStorage,
            props = key.split('.'),
            k = props.shift(),
            itemStr = _storage.getItem(k),
            itemObj = null
        try {
            itemObj = JSON.parse(itemStr)
            if (typeof itemObj != 'object')
                throw ('Not an object!')
        } catch (e) {
            return props.length ? null : itemStr
        }
        while (props.length && itemObj) {
            itemObj = itemObj[props.shift()]
        }
        return itemObj
    },
    set(key, value, isLocalStorage = false) {
        if (!key) return
        let _storage = isLocalStorage ? localStorage : sessionStorage,
            props = key.split('.'),
            k = props.shift()
        if (!props.length) {
            if (typeof value === 'object') value = JSON.stringify(value)
            _storage.setItem(k, value)
            return
        }
        let itemStr = _storage.getItem(k),
            itemObj = null
        if (itemStr) {
            try {
                itemObj = JSON.parse(itemStr)
                if (typeof itemObj != 'object')
                    throw ('Not an object!')
            } catch (e) {
                throw ('storage.set: key ' + k + ' 已被占用并且不是一个对象，无法为其设置属性值')
            }
        }
        let copy = itemObj = itemObj || {}
        while (props.length > 1) {
            let p = props.shift()
            copy[p] = copy[p] || {}
            copy = copy[p]
        }
        copy[props[0]] = value
        _storage.setItem(k, JSON.stringify(itemObj))
    },
    remove(key, isLocalStorage = false) {
        if (!key) return
        let _storage = isLocalStorage ? localStorage : sessionStorage
        _storage.removeItem(key)
    },
    clear(isLocalStorage = false) {
        let _storage = isLocalStorage ? localStorage : sessionStorage
        _storage.clear()
    }
}
/**
 * 处理错误，传入不规则的错误，输出可以在页面显示的错误信息
 * @param  {Object} [err={}]   错误对象，如果传入字符串，则会将字符串视为错误信息，如果传入既非对象也非字符串，则视为无效参数
 * @param  {String} defaultMsg 如果错误对象errorMsg属性为空，则将该值作为errorMsg
 * @return {Object}            输出一个带有errorMsg属性的对象
 */
function handleError(err = {}, defaultMsg) {
    if (typeof err === 'string') {
        err = {
            errorMsg: err
        }
    }
    if (typeof err != 'object') {
        err = {}
    }
    if (!err.errorMsg || typeof err.errorMsg != 'string') {
        err.errorMsg = defaultMsg
    }
    return err
}

/**
 * [skipKeepAlive 用于在特殊情况不需要keepAlive的页面，
 * 比如从详情页跳回列表页面的时候，该详情页面不需要缓存了，
 * 可以在详情页面的beforeRouteLeave里面使用该方法]
 * @param  {[String]} name 页面名
 */
function skipKeepAlive(name) {
    let old = keepAlive.value,
        arr = keepAlive.value.split(','),
        i = arr.indexOf(name)
    if (i != -1) {
        arr.splice(i, 1)
        keepAlive.value = arr.join()
        setTimeout(() => {
            keepAlive.value = old
        }, 500)
    }
}

/**
 * [unique 去重]
 * @param  {[Array]} arr     [原数组]
 * @param  {[String]} keyName [可选，传这个值代表数组里面的是对象，根据对象的这个属性来去重]
 * @return {[Array]}         [去重后的数组]
 */
function unique(arr, keyName) {
    const seen = new Map()
    if (keyName) {
        return arr.filter((a) => !seen.has(a[keyName]) && seen.set(a[keyName], 1))
    }
    return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
}
/**
 * 防抖函数  用于搜索需求时延迟请求  同时减少请求次数，提高性能
 * @param  func  function
 * @param delay  需要延迟的时间
 */
function debounce(func, delay = 250) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

/**
 * 节流函数  控制函数调用频率
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  执行间隔，单位是毫秒（ms）
 */
function throttle(fn, threshhold = 250) {
    let last,
        timer
    return function (...args) {
        let context = this,
            now = +new Date()
        // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
        // 执行 fn，并重新计时
        if (last && now < last + threshhold) {
            clearTimeout(timer)
            // 保证在当前时间区间结束后，再执行一次 fn
            timer = setTimeout(function () {
                last = now
                fn.apply(context, args)
            }, threshhold)
            // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}


/**
 * 传入毫秒，格式化时间
 * @param second 毫秒数
 * @param fmt 格式，常见：'yyyy-MM-dd hh:mm:ss'、'yyyy-M-d h:m:s'
 * statusObj  true  用于截取'yyyy-MM-dd hh:mm:ss'  false 用于转换时间戳
 * @returns {*}
 */
function formatDate(second, fmt, statusObj) {
    if (statusObj) {
        if (!second) return null;
        return second.substr(0, 10)
    }
    if (!Number(second)) return second;
    fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
    let date = new Date(Number(second)), // 后台时间转javascript时间戳
        o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours() % 24 === 0 ? 0 : date.getHours() % 24, // 小时
            'H+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            S: date.getMilliseconds() // 毫秒
        };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr((o[k].toString()).length)));
        }
    }

    return fmt;
}

function isIOS() {
    let isIphone, ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        // alert("iphone");
        isIphone = true
    } else if (/android/.test(ua)) {
        // alert("android");
        isIphone = false
    }
    return isIphone
}

function isIphoneX() {
    var ratio = window.devicePixelRatio || 1
    return isIOS() && screen.width * ratio == 1125 && screen.height * ratio == 2436
}


/**
 *
 * @param options
 * 底座改版的最新拍照方法，主要是修复安卓的闪退问题
 */
function commonTakePicture(options = {}) {
    if (typeof options !== 'object') console.error('params must be object')
    const IMGDATA = 'iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAYAAAAdHLWhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDOEQxNjM3MTc3OTRFNDExOTY2MEVCOEM3ODRBNTg2RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEODM4QjJFNkVBOTUxMUU2ODMwQThERUU2OUJEMjU5OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEODM4QjJFNUVBOTUxMUU2ODMwQThERUU2OUJEMjU5OCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI0OTczZmVlLTRkYTItNGNmNi04NTU5LWZlOWRkZmVhZTc3NCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjIwNjVlMTExLTViYTQtMTE3OS1hMmI5LWJm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';
    return new Promise((resolve, reject) => {
        if ($conf.isPcTest) {
            resolve(IMGDATA)
        } else {
            if (isIOS()) {
                platform.getPicture(options).then((rep) => {
                    if (rep.indexOf('.') >= 0) {
                        platform.getBase64CodeFromPictures(rep).then((result) => {
                            let imgs = result.base64;
                            if (imgs && Array.isArray(imgs) && imgs.length && imgs[0]) {
                                resolve(imgs[0]);
                            }
                        }).catch((res) => {
                            reject('base64转化失败');
                        });
                    } else {
                        resolve(rep);
                    }
                }).catch((res) => {
                    reject('调用相机失败');
                })
            } else {
                platform.getPictureNew(options).then((rep) => {
                    if (rep.indexOf('.') >= 0) {
                        platform.getBase64CodeFromPictures(rep).then((result) => {
                            let imgs = result.base64;
                            if (imgs && Array.isArray(imgs) && imgs.length && imgs[0]) {
                                resolve(imgs[0]);
                            }
                        }).catch((res) => {
                            reject('base64转化失败');
                        });
                    } else {
                        resolve(rep);
                    }
                }).catch((res) => {
                    reject('调用相机失败');
                })
            }
        }
    }).catch((e) => {
        reject('拍照失败');
    })
}



let methods = {
    isIOS,
    isIphoneX,
    formatDate,
    handleError,
    storage,
    skipKeepAlive,
    unique,
    debounce,
    throttle,
    commonTakePicture,

};


export {
    storage,
    handleError,
    commonTakePicture,
}
export default methods
