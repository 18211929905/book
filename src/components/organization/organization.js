import Vue from 'vue';
import VueResource from 'vue-resource';
import organization from './organization.vue';
import common from "../../assets/js/common.js";
Vue.use(VueResource);

new Vue({
    el: '#app',   
    render: h => h(organization)
});