import Vue from 'vue';
import VueResource from 'vue-resource';
import datadictionary from './dataDictionary.vue';
import common from "../../assets/js/common.js";
Vue.use(VueResource);

new Vue({
    el: '#app',   
    render: h => h(datadictionary)
});