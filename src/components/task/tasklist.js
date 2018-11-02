import Vue from 'vue';
import tasklist from './tasklist.vue';


new Vue({
    el: '#app',   
    render: h => h(tasklist)
});