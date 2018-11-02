export default {
    isdev: function(env) {
        var env = process.env.NODE_ENV;
        return env === 'development' ? '/cxb/api' : '/api';
    },
    isweb: function(env) {
        var env = process.env.NODE_ENV;
        return env === 'development' ? '' : '/web';
    },
    islivePro: function(env) {
        var env = process.env.NODE_ENV;
        return env === 'development' ? '' : '/livepro';
    },
    isliveCs: function(env) {
        var env = process.env.NODE_ENV;
        return env === 'development' ? '' : '/livecs';
    },
    env: function() {
        return process.env.NODE_ENV
    },
    //返回域名方法
    isEnv: function(domainName) {
        var envlist = {
            "prod": "chexiang",
            "pre": "chexiangpre",
            "sit": "chexiangsit",
            "development": "chexiangpre"
        }
        return domainName + "." + envlist[process.env.NODE_ENV] + ".com"
    },

    /* 设置cookie函数 */
    setCookie: (key, value, day) => {
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + '=' + escape(value) + ';expires=' + date;
    },

    /* 获取cookie函数 */
    getCookie: (key) => {
        var coo = unescape(document.cookie); //解码
        var arr1 = coo.split('; '); //第一次分解后是数组
        for (var i = 0; i < arr1.length; i++) { //第二次循环拆分数组
            var arr2 = arr1[i].split('=');
            if (arr2[0] == key) {
                return arr2[1];
            }
        }
    },
    parseData: function(data) {
        var _data;
        if (!data) return data;
        try {
            _data = JSON.parse(data);
        } catch (e) {
            _data = data;
        }
        return _data;
    },

    /* 删除cookie */
    removeCookie: (key) => {
        setCookie(key, '', -1);
    },

    /* 获取session storage**/
    getSession: (key) => {
        return sessionStorage.getItem(key)
    },

    /* 设置session storage值**/
    setSession: (key, value) => {
        sessionStorage.setItem(key, value)
    },

    /* 清空session storage 数据项**/
    removeSessionItem: (key) => {
        sessionStorage.removeItem(key)
    },

    /**清空session storage**/
    clearSession: () => {
        sessionStorage.clear()
    },
    // 触发模态框方法
    triggerModal: function(id) {
        $(id).modal('toggle')
    },
    getOrigin() {
        return window.location.origin
    },
};