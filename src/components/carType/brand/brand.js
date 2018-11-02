import Vue from 'vue';
import brand from './brand.vue';
import common from "../../../assets/js/common.js";

new Vue({
    el: '#app',   
    render: h => h(brand)
});