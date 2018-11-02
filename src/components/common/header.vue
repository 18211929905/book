<template>
    <div class="page-header navbar navbar-fixed-top clearfix" style="z-index:9999999">
        <!-- BEGIN HEADER INNER -->
        <div class="page-header-inner">
            <!-- BEGIN LOGO -->
            <div class="page-logo logo navbar-my">
                <!-- <img class="black" src="/static/image/irislogo.jpg" alt=""> -->
                <img class="white" :src="menuLogo" alt="">                
            </div>
            <div class="navbar-toggler-warp">
                <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarMinimize">&#9776;</button>                
            </div>
            <!-- END LOGO -->
            <!-- BEGIN RESPONSIVE MENU TOGGLER -->
            <!-- BEGIN TOP NAVIGATION MENU -->
            <div class="top-menu">
                <ul class="nav navbar-nav pull-right">
                    <!-- BEGIN NOTIFICATION DROPDOWN -->
                    <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                    <li class="infopush dropdown dropdown-extended dropdown-notification mr-3" id="header_notification_bar2" @click="showApprovalList">
                        <a  href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" >
                            <i class="iconfont icon-xinxi"></i>
                        	<span class="badge badge-error badge-danger"> {{approvalNum}} </span>
                        </a>
                    </li>         
                    <li id="now-time" class="now-time">
                        <p class="time"><span class="iconfont icon-shijianicon"></span><span class="now-date">{{time}}</span><span class="MorningOrAfternoon">{{AMorPM}}</span></p>
                        <p class="year">{{year}}<span>{{week}}</span></p>                
                    </li>
               		      
                        <!-- <li class="infopush dropdown dropdown-extended dropdown-notification" id="header_notification_bar1">
                                    <a  href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                        <i class="icon-bell"></i>
                                    <span class="badge badge-error">
                                    7 </span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class="external">
                                            <h3><span class="bold">12 pending</span> notifications</h3>
                                            <a href="extra_profile.html">view all</a>
                                        </li>
                                        <li>
                                            <ul class="dropdown-menu-list scroller" style="height: 250px;" data-handle-color="#637283">
                                                <li>
                                                    <a href="javascript:;">
                                                        <span class="time">just now</span>
                                                    <span class="details">
                                                    <span class="label label-sm label-icon label-success">
                                                    <i class="fa fa-plus"></i>
                                                    </span>
                                                    New user registered. </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;">
                                                        <span class="time">3 mins</span>
                                                    <span class="details">
                                                    <span class="label label-sm label-icon label-danger">
                                                    <i class="fa fa-bolt"></i>
                                                    </span>
                                                    Server #12 overloaded. </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li class="infopush dropdown dropdown-extended dropdown-notification" id="header_notification_bar2">
                                    <a  href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                        <i class="iconfont icon-xinxi"></i>
                                    <span class="badge badge-error">
                                    7 </span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class="external">
                                            <h3><span class="bold">12 pending</span> notifications</h3>
                                            <a href="extra_profile.html">view all</a>
                                        </li>
                                        <li>
                                            <ul class="dropdown-menu-list scroller" style="height: 250px;" data-handle-color="#637283">
                                                <li>
                                                    <a href="javascript:;">
                                                        <span class="time">just now</span>
                                                    <span class="details">
                                                    <span class="label label-sm label-icon label-success">
                                                    <i class="fa fa-plus"></i>
                                                    </span>
                                                    New user registered. </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;">
                                                        <span class="time">3 mins</span>
                                                    <span class="details">
                                                    <span class="label label-sm label-icon label-danger">
                                                    <i class="fa fa-bolt"></i>
                                                    </span>
                                                    Server #12 overloaded. </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li> -->
                    <!-- END NOTIFICATION DROPDOWN -->
                    <!-- <li class="dropdown dropdown-user">
                        <span ></span>
                        <a href="javascript:;" class="head-portrait-dropdown" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                            <img alt="" class="img-circle head-portrait" src="/static/image/userimg.jpg" />
                            <span>{{userInfo['inCharegOrgVo']&&userInfo['inCharegOrgVo'].orgName}} - {{userInfo['empVo']&&userInfo['empVo'].empCnName}}</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-default">
                            <li v-show="userInfo.orgCodes&&userInfo.orgCodes.length >1">
                                <a href="#changeOrg" @click="changeOrg()" data-toggle="modal">
                                    <i class="icon-user"></i> 切换组织 </a>
                            </li>
                            <li>
                                <a  data-toggle="modal" href="#upDataPassword"><i class="icon-lock"></i>修改密码</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" @click="loginOut()">
                                    <i class="icon-key"></i>退出</a>
                            </li>
                        </ul>
                    </li> -->
                    <!-- END USER LOGIN DROPDOWN -->
                </ul>
            </div>
            <!-- END TOP NAVIGATION MENU -->
        </div>
        <!-- END HEADER INNER -->
        <!-- start-updata-modal -->
        <div class="modal fade" id="changeOrg" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                        <h4 class="modal-title text-center">切换组织</h4>
                    </div>
                    <div class="modal-body form">
                        <form class="form-horizontal form-body">
                            <div class="row" v-for="item in org">
                                <div class="col-md-4 text-right"><input type="radio" name="selOrg" v-model="selOrg" :value="item.orgCode"></div>
                                <div class="col-md-8">
                                    {{item.orgName}}
                                </div>
                            </div>
                            <div class="row margin-top-20">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="control-label col-md-3 col-sm-3"></label>
                                        <div class="col-md-8 text-right">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                            <button type="button" @click="changeLoginInfo()" class="btn btn-primary" data-dismiss="modal">确定</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- end-updata-modal -->
        <!-- start-updata-modal -->
        <div class="modal fade" id="upDataPassword" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                        <h4 class="modal-title text-center">修改密码</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">旧密码：</label>
                                            <div class="col-md-8">
                                                <input type="password" v-model="oldPassword" class="form-control" placeholder="必填" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">新密码：</label>
                                            <div class="col-md-8">
                                                <input type="password" v-model="newPassword" class="form-control" placeholder="必填" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">确认密码：</label>
                                            <div class="col-md-8">
                                                <input type="password" v-model="confirmNewPassword" class="form-control" placeholder="必填" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3"></label>
                                            <div class="col-md-8 text-right">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                                <button type="button" @click="upDataPassword()" class="btn btn-primary" data-dismiss="modal">确定</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- end-updata-modal -->
        <!--弹层审批流-->
         <approvalList ref="approvalModal" @sendNum = "getNum" @getNums = 'reloadNum'></approvalList>
    </div>
</template>
<style>
@media screen and (min-width: 768px) {
  .modal-dialog {
    right: auto;
    left: 50%;
    width: 600px;
    padding-top: 52px;
    padding-bottom: 30px;
  }
}
</style>
<script>
import api from "../common/api.js";
import commonConfig from "../common/commonConfig.js";
import common from "../../assets/js/common.js";
import approvalList from "../common/approval-flow/approval-list.vue";
import { Toast } from "mint-ui";
export default {
  data: function() {
    return {
      empVo: {},
      inCharegOrgVo: {},
      orgCodes: [],
      org: [],
      selOrg: "",
      irisLogo: commonConfig.irisLogo,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      userInfo: {},
      ownOrg: "",
      year: "",
      time: "",
      AMorPM:"",
      week:"",
      approvalNum:null,
      menuLogo: (common.env() == 'development' ? commonConfig.menuLogoUrl: '/resources/image/menuLogo.png'),
    };
  },
  created() {
    var $this = this;
    api.toLogin.getLoginInfo({}).then(function(data) {
      var data = data.data;
      if (data.code == "success") {
        $this.userInfo = data.obj;
        $this.ownOrg = $this.userInfo.inCharegOrgVo.orgCode;
        $this.selOrg = $this.ownOrg;
        sessionStorage.setItem("userInfo", JSON.stringify($this.userInfo));
      }
    });
  },
  updated() {
    // 后续优化
  },
  mounted() {
    var fn = () => {
      var now = new Date();
      var y = now.getFullYear();
      var m = now.getMonth()+1;
      var d = now.getDate();
      var h = now.getHours();
      var mm = now.getMinutes();
      var s = now.getSeconds();
      var str;
      if (h > 12) {
        h -= 12;
        str = " PM";
      } else {
        str = " AM";
      }
      h = h < 10 ? "0" + h : h;
      d = d < 10 ? "0" + d : d;
      m = m < 10 ? "0" + m : m;
      mm = mm < 10 ? "0" + mm : mm;
      s = s < 10 ? "0" + s : s;
           var getWeek = now.getDay(); //注:0-6对应为星期日到星期六
      switch (getWeek) {
        case 0:
          this.week = "星期日";
          break;
        case 1:
          this.week = "星期一";
          break;
        case 2:
          this.week = "星期二";
          break;
        case 3:
          this.week = "星期三";
          break;
        case 4:
          this.week = "星期四";
          break;
        case 5:
          this.week = "星期五";
          break;
        case 6:
          this.week = "星期六";
          break;
        default:
          this.week = "系统错误！";
      }
      this.year = `${y}年${m}月${d}日`;
      this.time = `${h}:${mm}`;
      this.AMorPM = str
    };
    fn()   
    setInterval(fn,30000)
  },
  methods: {
  	  //显示审批流弹层
    showApprovalList(){
    	this.$refs.approvalModal.showModal()
    },
    //获取推送消息的数量
    getNum(){
    	//this.$refs.approvalModal.getList()
    },
    //
    reloadNum(data){
    	this.approvalNum = data
    },
    sidebarMinimize(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-minimized");
    },
    changeOrg: function() {
      var $this = this;
      api.toLogin.getOrg({}).then(function(data) {
        var data = data.data;
        if (data.code == "success") {
          $this.org = data.obj;
        }
      });
    },
    changeLoginInfo: function() {
      const $this = this;
      api.toLogin
        .changeLoginInfo({
          orgCode: this.selOrg
        })
        .then(function(msg) {
          if (msg.data.code == "success") {
            window.location.href = window.location.href;
          }
        });
    },
    loginOut: function() {
      api.toLogin.loginOut({}).then(function(data) {
        var data = data.data;
        if (data.code == "success") {
          //Toast(data.message);
          //直接贴出重新登录
          setTimeout(function() {
            common.clearSession();
            window.location.href = common.isweb() + "/login/login.html";
          }, 1000);
        }
      });
    },
    upDataPassword: function() {
      if (this.newPassword === this.confirmNewPassword) {
        let params = {
          loginPasswd: this.newPassword,
          oldLoginPassword: this.oldPassword
        };
        api.upDataPassword(params).then(function(data) {
          console.log(data);
        });
      } else {
        Toast("密码输入不一致，请重新输入");
      }
    }
  },
  components: {
  	approvalList
  }
};
</script>
<style media="screen">
.logo {
  overflow: hidden;
}
.head-portrait {
  height: 35px;
  margin: 0 10px;
}
.page-logo img {
  width: 121px;
}
.page-logo {
  width: 200px;
}
.navbar-toggler-warp {
  float: left;
  height: 55px;
  padding: 0.5rem 0;
  line-height: 50px;
}
.nav > li.dropdown.open {
  background-color: transparent;
}
.nav > li.dropdown > a:hover,
.nav > li.dropdown > a:focus {
  text-decoration: none;
  background-color: transparent;
}
.mr-3{margin-right: 1rem !important;}
.page-header.navbar .top-menu .navbar-nav>li.dropdown .dropdown-toggle>i{
  color: #20a8d8;
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
  font-size: 20px;
}
.badge-danger {
    color: #fff;
     background-color: #f86c6b;
}
.page-header.navbar .top-menu .navbar-nav>li.dropdown>.dropdown-toggle>.badge {
    top: 8px;
    left: 60%;
    padding: 3px 6px;
    right: auto;
}
.badge {
    display: inline-block;
    padding: .25em .4em;
    font-size: 75%;
    font-weight: 700 !important;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
}
.page-header.navbar .top-menu .navbar-nav>li.dropdown {
	    width: 50px;
    margin-right: 2rem!important;
    margin-top: 5px;
}
</style>
