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
	                <master v-on:go='change' :insertParams='insertParams' ref="master"></master> 
                    <additional :master='master' v-on:to="reset" @required="required"></additional>
	                <!-- main从这结束 -->
	            </div>
            </div>
            <!-- END PAGE -->
	    </div>
	    <commonfooter></commonfooter>
	    
	    
    </div>
</template>

<script>
	
    import common from "../../../assets/js/common.js";
    import commonConfig from "../../common/commonConfig.js"
    import api from '../../common/api.js';
    import commonheader from '../../common/header.vue';
    import sidebar from '../../common/sidebar.vue';
    import commonfooter from '../../common/footer.vue';
    import pageheader from '../../common/pageheader';
    import master from './master.vue';
    import additional from './additional.vue';
    
    export default {
        data() {
            return {
               master:{},
               breadNav:commonConfig.breadNav.insert,
               insertParams: {}
            };
        },
        created() {
            
        },
        components:{
            commonheader,
            sidebar,
            commonfooter,
            pageheader,
            master,
	        additional
        },
        methods: {
            change(e) {
                console.log(e.empSex+'----'+e.onJob)
                this.master = e;
            },
            reset(e) {
                console.log(e)
                this.insertParams = e;
            },
            required(flag) {
                this.$refs.master.required(flag)
            }
        }    
    }

</script>