import Vue from 'vue';
import series from './series.vue';
import common from "../../../assets/js/common.js";

new Vue({
    el: '#app',   
    render: h => h(series)
});