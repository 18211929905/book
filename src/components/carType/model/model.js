import Vue from 'vue';
import model from './model.vue';
import common from "../../../assets/js/common.js";

new Vue({
    el: '#app',   
    render: h => h(model)
});