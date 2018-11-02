import Vue from 'vue';
import mainCarType from './saleMainCarType.vue';
import common from "../../../assets/js/common.js";

new Vue({
    el: '#app',   
    render: h => h(mainCarType)
});