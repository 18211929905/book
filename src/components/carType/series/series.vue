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
	                <query @go='change'></query>
                    <listbody ref="list" :query="listParams"></listbody>
	                <!-- main从这结束 -->
	            </div>
            </div>
            <!-- END PAGE -->
	    </div>
	    <commonfooter></commonfooter>
	    
	    
    </div>
</template>

<script>
	
    import commonConfig from "../../common/commonConfig.js";
    import api from '../../common/api.js';
    import commonheader from '../../common/header.vue';
    import sidebar from '../../common/sidebar.vue';
    import commonfooter from '../../common/footer.vue';
    import pageheader from '../../common/pageheader';
    import query from './query.vue';
    import listbody from './listbody.vue';
    
    export default {
        data() {
            return {
               breadNav:commonConfig.breadNav.series,
               listParams: {}
            };
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
            change(e) {
               e.pageNums = commonConfig.pageNums;
               e.pageStart = 1;
               this.listParams = e
               this.$refs.list.getQueryInfo(e)
            }
        }    
    }

</script>