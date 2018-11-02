import Vue from 'vue';
import china from './china.vue';
import common from "../../assets/js/common.js";

new Vue({
    el: '#app',   
    render: h => h(china)
});