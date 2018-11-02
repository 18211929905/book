import Vue from 'vue';
import VueResource from 'vue-resource';
import dictionaryDetails from './dictionaryDetails.vue';
import common from "../../../assets/js/common.js";
Vue.use(VueResource);

new Vue({
    el: '#app',   
    render: h => h(dictionaryDetails)
});