import Vue from 'vue';
import mainCarType from './mainCarType.vue';
import common from "../../../assets/js/common.js";

new Vue({
    el: '#app',   
    render: h => h(mainCarType)
});