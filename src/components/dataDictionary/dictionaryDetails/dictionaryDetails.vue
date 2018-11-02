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
            </div>
            <!-- END PAGE -->
	    </div>
	    <commonfooter></commonfooter>   
    </div>
</template>

<script>
    import commonconfig from "../../common/commonConfig.js"
    import qs from 'querystring';
    import url  from 'url';
    import api from '../../common/api.js';
    import commonheader from '../../common/header.vue';
    import sidebar from '../../common/sidebar.vue';
    import commonfooter from '../../common/footer.vue';
    import pageheader from '../../common/pageheader';
    import pagemain from "./dictionaryDetailsMain.vue";

    export default {
        created(){
            
        },
        data(){
            return {
                breadNav: commonconfig.breadNav.dictionaryDetails
            };
        },
        methods:{
        	
        },
        components: {
            sidebar,
            pagemain,
            pageheader,
            commonheader,
            commonfooter
        }  
    }
</script>