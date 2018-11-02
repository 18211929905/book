import Vue from 'vue';
import purchase from './purchase.vue';
import common from "../../assets/js/common.js";

new Vue({
    el: '#app',   
    render: h => h(purchase)
});