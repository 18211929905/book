<template>
    <div>
 
	    <commonheader></commonheader>

	    <div class="clearfix"></div>
	    
	    <div class="page-container">
	        <sidebar></sidebar>

	        <!-- BEGIN PAGE -->
	        <div class="page-content-wrapper">
	            <div class="page-content">
                    <div class="row">
                        <div class="col-md-12">
	                        <pageheader :breadNav="breadNav"></pageheader>
                        </div>
                    </div>
	                <!-- main 从这开始 -->
	                <div class="row">
	                    <div class="col-md-12">
	                    	<pagemain></pagemain>
	                    </div>
	                </div>
	                <!-- main从这结束 -->
	            </div>
<commonfooter></commonfooter>

                
            </div>
            <!-- END PAGE -->
	    </div>
    </div>
</template>

<script>
	import commonconfig from "../common/commonConfig.js"
    import qs from 'querystring';
    import url  from 'url';
    import api from '../common/api.js';
    import commonheader from '../common/header.vue';
    import sidebar from '../common/sidebar.vue';
    import commonfooter from '../common/footer.vue';
    import pageheader from '../common/pageheader';
    import pagemain from "./organizationMain.vue";

    
    export default {
        data(){
            return {
                breadNav: commonconfig.breadNav.organization
            };
        },
        created(){
            
        },
        components:{
            commonheader,
            sidebar,
            commonfooter,
            pageheader,
            pagemain,

        },
        methods:{
        	
        }    
    }

</script>