import Vue from 'vue'
import menu from './menu.vue'


Vue.filter('switchNeedLogin', function(needLogin) {
    if (needLogin === 0) {
        return '不需要登录'
    } else if (needLogin === 1) {
        return '必需登录'
    }
})

Vue.filter('switchIsDisplay', function(isDisplay) {
    if (isDisplay === '0') {
        return '不可见'
    } else if (isDisplay === '1') {
        return '可见'
    }
})

Vue.filter('switchIsDeleted', function(isDeleted) {
    if (isDeleted === '0') {
        return '启用'
    } else if (isDeleted === '1') {
        return '停用'
    }
})

new Vue({
    el: '#app',
    render: h => h(menu)
})
