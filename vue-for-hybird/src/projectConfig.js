'use strict';
 let config  = {
    // base url
    msg: {
        errMsg: '页面开小差了,请稍后重试...', // 网络错误提示
        noDataMsg: '暂无任何数据~' // 缺省页文字
    },
    get baseUrl() {
        let test = {
            uat: 'https://www'
        }

        let isPCUrl = 'https://www';

        let prod = 'https://www';

        return this.isPcTest ? isPCUrl : this.isTest ? test[this.testEnv] : prod;
    },
    get otherUrl() {
        var test = 'http://www',
    
            prod = 'http://www';
        return this.isTest ? test : prod;
    },
    // 用于pc环境调试的用户数据
    get fakeUser() {
        return {
            user: {
                // 操作人账号
                uid:'123',
                ssoToken: ''
            }
        }
    },
    // 操作钥匙
    get operateKey() {
        return Math.random().toString(36).substring(2);
    },
    // 是否是测试环境
    get isTest() {
        // return false;
        return $envType.type === 0 || $envType.type === 1;
    },
    // 测试环境: dev uat sit ver等
    testEnv: 'uat',
    // 是否跳过测试环境选择
    skipEnv: false,
    // token名字
    get tokenName() {
        return this.isTest ? 'test_sso_token' : 'pro_sso_token'
    },
    // 是否是pc环境
    get isPcTest() {
        return $envType.type === 0;
    }
};
export {config}