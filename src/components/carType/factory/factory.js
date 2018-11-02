import Vue from 'vue';
import factory from './factory.vue';
import common from "../../../assets/js/common.js";

new Vue({
    el: '#app',   
    render: h => h(factory)
});