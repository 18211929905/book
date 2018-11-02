import Vue from 'vue';
import VueResource from 'vue-resource';
import storeInfo from './storeInfo.vue';
import common from "../../../assets/js/common.js";
import 'element-ui/lib/theme-default/index.css'
Vue.use(VueResource);

new Vue({
    el: '#app',   
    render: h => h(storeInfo)
});