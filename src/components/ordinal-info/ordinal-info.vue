<template>
    <div>
        <commonheader></commonheader>
        <!-- BEGIN CONTAINER -->

        <div class="page-container">
            <!-- BEGIN SIDEBAR -->
            <sidebar></sidebar>
            <!-- END SIDEBAR -->

            <!-- BEGIN PAGE -->
            <div class="page-content-wrapper">
                <div class="page-content">
                    <pageheader :breadNav="breadNav"></pageheader>
                    <!-- main 从这开始 -->
                    <mainbody></mainbody>
                    <!-- main从这结束 -->
                </div>
<commonfooter></commonfooter>

                
            </div>
            <!-- END PAGE -->
        </div>
        <!-- END CONTAINER -->

    </div>
</template>

<script>
    import common from "../../assets/js/common.js";
    import commonConfig from "../common/commonConfig.js";
    import api from '../common/api.js';
    import commonheader from "../common/header.vue";
    import commonfooter from "../common/footer.vue";
    import sidebar from "../common/sidebar.vue";
    import pageheader from "../common/pageheader.vue";
    import mainbody from "./ordinal-info-body.vue";
    export default {
        data(){
            return {
                breadNav:commonConfig.breadNav.ordinalInfo
            };
        },
        components:{
            commonheader,
            commonfooter,
            sidebar,
            pageheader,
            mainbody
        }

    }

</script>
