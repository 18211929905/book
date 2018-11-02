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
                    <taskmain></taskmain>
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
import api from "../common/api.js";
import commonheader from "../common/header.vue";
import commonfooter from "../common/footer.vue";
import sidebar from "../common/sidebar.vue";
import pageheader from "../common/pageheader.vue";
import taskmain from "./taskmain.vue";
import commonConfig from "../common/commonConfig.js";
export default {
  data() {
    return {
      breadNav: commonConfig.breadNav.task
    };
  },
  created() {
    console.info(commonConfig.ordinalInfo);
  },
  components: {
    commonheader,
    commonfooter,
    sidebar,
    pageheader,
    taskmain
  },
  methods: {
    getParam() {
      var tar = url.parse(window.location.href).query,
        tmpObj = qs.parse(tar);
      return tmpObj;
    },
    parseData: function(data) {
      var _data;
      if (!data) return data;
      try {
        _data = JSON.parse(data);
      } catch (e) {
        _data = data;
      }
      return _data;
    }
  }
};
</script>
