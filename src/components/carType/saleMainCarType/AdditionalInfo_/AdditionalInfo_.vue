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
                <top></top>
                <!-- <listbody></listbody> -->
                <add-list></add-list>
                <!-- <list></list> -->
                <!-- main从这结束 -->
            </div>
        </div>
        <!-- END PAGE -->
    </div>
    <commonfooter></commonfooter>


</div>
</template>

<script>
import commonConfig from "../../../common/commonConfig.js";
import commonheader from '../../../common/header.vue';
import sidebar from '../../../common/sidebar.vue';
import commonfooter from '../../../common/footer.vue';
import pageheader from '../../../common/pageheader';
import top from './top.vue';
import listbody from './listbody.vue'
import AddList from './addList'
import List from './list'


export default {
    data() {
        return {
            breadNav: commonConfig.breadNav.AdditionalInfo_,
        };
    },
    components: {
        commonheader,
        sidebar,
        commonfooter,
        pageheader,
        top,
        listbody,
        AddList,
        List
    },

}
</script>
