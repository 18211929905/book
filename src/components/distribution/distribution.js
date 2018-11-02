import Vue from 'vue';
import distribution from './distribution.vue';
import common from "../../assets/js/common.js";

new Vue({
    el: '#app',   
    render: h => h(distribution)
});