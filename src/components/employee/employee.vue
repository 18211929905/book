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
                    <listbody :query='listbodyParams' @show-config="showConfig" ref="list"></listbody>
                    <emp-post 
                        :show="show"
                        :empCode="empCode"
                        @cancel="cancel"
                        ref="post"
                        >
                    </emp-post>
	                <!-- main从这结束 -->
	            </div>
<commonfooter></commonfooter>

                
            </div>
            <!-- END PAGE -->
	    </div>
    </div>
</template>

<script>
	
    import common from "../../assets/js/common.js"
    import commonConfig from "../common/commonConfig.js"
    import api from '../common/api.js'
    import commonheader from '../common/header.vue'
    import sidebar from '../common/sidebar.vue'
    import commonfooter from '../common/footer.vue'
    import pageheader from '../common/pageheader'
    import query from './query.vue'
    import Listbody from './listbody'
    import EmpPost from './config-emp-post'
    import { Toast } from 'mint-ui'
    export default {
        data() {
            return {
               listbodyParams:{},
               breadNav:commonConfig.breadNav.employee,
            // config-emp-post - options
               show: false,
               empCode: '' 
            }
        },
        components:{
            commonheader,
            sidebar,
            commonfooter,
            pageheader,
            query,
	        Listbody,
            EmpPost
        },
        methods: {
            change(e) {
            //    e.pageNums = 15;
            //    e.pageStart = 1;
               this.listbodyParams = e;
               this.$refs.list.getQueryInfo(e)
            },
            showConfig(params) {
                // console.log(params)
                this.empCode = params.empCode
                this.show = true
                this.$refs.post.resetParams()
            },
            cancel() {
                this.show = false
            }
        }   
    }

</script>