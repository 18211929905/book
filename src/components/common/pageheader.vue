<template>
  <!-- BEGIN PAGE HEADER-->
  <div>
    <div class="my-class">
      <!-- BEGIN PAGE TITLE & BREADCRUMB-->
      <div class="page-bar page-bar-my">
        <ul class="page-breadcrumb">
          <li>
            <a :href="url">首页</a>
            <!-- <i class="icon-angle-right"></i> -->
          </li>
          <li class="pager-my" v-for="(item, index) in breadNav">
            <a :href="item.url" :class="{'active':(index == (breadNav.length - 1))}">{{item.name}} </a>
            <!-- <i v-if="index != breadNav.length - 1" class="icon-angle-right"></i> -->
          </li>
        </ul>
      </div>
      <!-- END PAGE TITLE & BREADCRUMB-->
    </div>
  </div>
  <!-- END PAGE HEADER-->
</template>
<script>
import common from "../../assets/js/common.js";
  export default {
    data(){
      return {
        url:'/livepro'
      }
    },
    props: {
      breadNav: {
        default: '1'
      }
    },
    mounted() {
      // console.info(this.breadNav);
    }
  }
</script>
<style>
  .pager-my::before {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    display: inline-block;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    color: #536c79;
    content: "/";
  }
  .page-bar-my {
    height: 46px;
  }
  .pagination>li>a {
    margin-left: 0px;
  }
  .pagination>li>a[aria-label=Next] {
    color: #2a4a7c;
    font-weight: 700;
  }
  .pagination>li>a[aria-label=Previous] {
    color: #c7c7c7;
    font-weight: 700;
  }
  /*
    color: black !important;
  } */
</style>
