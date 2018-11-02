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
                    <pageheader></pageheader>
                    <!-- main 从这开始 -->
                    <div class="row margin-top-10">
                        <div class="col-md-12">
                            <p class="navbar-my" v-for="item in menus"><a :href="item.url">{{item.name}}</a></p>
                        </div>
                    </div>
                    <file-upload></file-upload> 
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
import api from "../common/api.js";
import commonheader from "../common/header.vue";
import commonfooter from "../common/footer.vue";
import sidebar from "../common/sidebar.vue";
import pageheader from "../common/pageheader.vue";
//import mainstyle from "../common/mainstyle.scss"
import { spinner } from "vue-strap";
import fileUpload from "../common/fileUpload.vue";

export default {
  data() {
    return {
      menus: [
        {
          name: "中国行政区域管理",
          url: common.isweb() + "/china/china.html"
        },
        {
          name: "数据字典",
          url: common.isweb() + "/dataDictionary/dataDictionary.html"
        },
        {
          name: "登录",
          url: common.isweb() + "/login/login.html"
        },
        {
          name: "菜单",
          url: common.isweb() + "/menu/menu.html"
        },
        {
          name: "业务序号信息",
          url: common.isweb() + "/ordinal-info/ordinal-info.html"
        },
        {
          name: "组织管理",
          url: common.isweb() + "/organization/organization.html"
        },
        {
          name: "职位管理",
          url: common.isweb() + "/position/position.html"
        },
        {
          name: "采购区域管理",
          url: common.isweb() + "/purchase/purchase.html"
        },
        {
          name: "角色管理",
          url: common.isweb() + "/role/role.html"
        },
        {
          name: "销售区域管理",
          url: common.isweb() + "/sale/sale.html"
        },
        {
          name: "统一任务调度",
          url: common.isweb() + "/task/tasklist.html"
        },
        {
          name: "配送区域管理",
          url: common.isweb() + "/distribution/distribution.html"
        },
        {
          name: "门店管理",
          url: common.isweb() + "/store/storeInfo/storeInfo.html"
        },
        {
          name: "员工信息",
          url: common.isweb() + "/employee/employee.html"
        },
        {
          name: "新增员工信息",
          url: common.isweb() + "/employee/insert/insert.html"
        },
        {
          name: "人员岗位关系信息",
          url: common.isweb() + "/employee/post-info/post-info.html"
        },
        {
          name: "车型-厂家信息",
          url: common.isweb() + "/carType/factory/factory.html"
        },
        {
          name: "车型-品牌信息",
          url: common.isweb() + "/carType/brand/brand.html"
        },
        {
          name: "车型-车系信息",
          url: common.isweb() + "/carType/series/series.html"
        },
        {
          name: "车型-车型信息",
          url: common.isweb() + "/carType/model/model.html"
        },
        {
          name: "车型-排量信息",
          url: common.isweb() + "/carType/displacement/displacement.html"
        },
        {
          name: "车型-进气方式",
          url: common.isweb() + "/carType/inlet/inlet.html"
        },
        {
          name: "主车型信息",
          url: common.isweb() + "/carType/mainCarType/mainCarType.html"
        },
        {
          name: "门店可见车型表",
          url: common.isweb() + "/store/storeVisibleCar/storeVisibleCar.html"
        },
        {
          name: "岗位类型添加角色",
          url: common.isweb() + "/addingroles/addingroles.html"
        }
      ]
    };
  },
  created() {
    // api.ajaxtest({
    //     method: "POST",
    //     body:{}
    // }).then(function(data){
    //     console.info(data);
    //     console.info('haha');
    // }).catch(function(error) {
    //     console.log(error)
    // });
    // api.testone(JSON.stringify({ "areaCode" : "310", "areaName" : "上海", "areaAddrName" : "sh", "prefixValue" : "s" })).then(function(){
    //     console.info(6666);
    // });
    // api.getTickerList({
    //     headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //     },
    //     method: "POST",
    //     body: JSON.stringify({ "areaCode" : "310", "areaName" : "上海", "areaAddrName" : "sh", "prefixValue" : "s" })
    // }).then(function(data){
    //     console.info(data);
    // });
  },
  mounted() {
    console.info("hahah");
    // this.$refs.spinner.show()
    // this.$broadcast('show::spinner')
  },
  components: {
    commonheader,
    commonfooter,
    sidebar,
    fileUpload,
    pageheader,
    spinner
  },
  methods: {}
};
</script>
