import Vue from 'vue';
import employee from './employee.vue';
import common from "../../assets/js/common.js";

new Vue({
    el: '#app',   
    render: h => h(employee)
});