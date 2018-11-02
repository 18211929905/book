<template>
    <div>
    	
	    <commonheader></commonheader>

	    <div class="clearfix"></div>
	    
	    <div class="page-container">
	        <sidebar></sidebar>

	        <!-- BEGIN PAGE -->
	        <div class="page-content-wrapper">
	            <div class="page-content">
	                <pageheader :breadNav="breadNav"></pageheader>
	                <!-- main 从这开始 -->
	                <query v-on:go="getquery"></query>
                    <listbody :data="paramslistbody" ref="list"></listbody>
	                <!-- main从这结束 -->
	            </div>
<commonfooter></commonfooter>

                
            </div>
            <!-- END PAGE -->
	    </div>
	    
	    
    </div>
</template>

<script>
	
    import common from "../../assets/js/common.js";
    import commonConfig from "../common/commonConfig.js"
    import api from '../common/api.js';
    import commonheader from '../common/header.vue';
    import sidebar from '../common/sidebar.vue';
    import commonfooter from '../common/footer.vue';
    import pageheader from '../common/pageheader';
    import query from './query/query.vue';
    import listbody from './listbody/listbody.vue';
    
    export default {
        data() {
            return {
               paramslistbody:{},
               breadNav:commonConfig.breadNav.sale
            };
        },
        created() {
            console.info(this);
        },
        components:{
            commonheader,
            sidebar,
            commonfooter,
            pageheader,
            query,
	        listbody
        },
        methods: {
        	getquery(e) {
               e.pageNums = commonConfig.pageNums;
               e.pageStart = 1;
               this.paramslistbody = e; 
               this.$refs.list.getQueryInfo(e)
            } 
        }    
    }

</script>