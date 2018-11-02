import Vue from 'vue';
import VueResource from 'vue-resource';
import position from './position.vue';
import common from "../../assets/js/common.js";
Vue.use(VueResource);

new Vue({
    el: '#app',   
    render: h => h(position)
});