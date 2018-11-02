import Vue from 'vue'
import role from './role.vue'

Vue.filter('switchIsDeleted', function(isDeleted) {
    if (isDeleted === '0') {
        return '启用'
    } else if (isDeleted === '1') {
        return '停用'
    }
})

new Vue({
    el: '#app',
    render: h => h(role)
})