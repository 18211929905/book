<template>
    <div class="page-sidebar-wrapper">
    	<div class="user-info">
			<div>
				<div class="user-photo">
					<img :src="userImgPath" alt="">
				</div>
			</div>
        	<div class="user-info-name">
				<div>
					<div class="top-menu">
						<div class="dropdown">
							<span id="dLabel"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								{{userInfo['inCharegSubOrgVo']&&userInfo['inCharegSubOrgVo'].orgName}} - {{userInfo['empVo']&&userInfo['empVo'].empCnName}}
								<span class="caret"></span>
							</span>
							<ul class="dropdown-menu" aria-labelledby="dLabel">
								<li v-show="userInfo.orgCodes&&userInfo.orgCodes.length >1">
									<a href="#changeOrg-sidebar" @click="changeOrg()" data-toggle="modal">
										<i class="icon-user"></i> 切换组织 
									</a>
								</li>
								<li>
									<a data-toggle="modal" href="#upDataPassword">
										<i class="icon-lock"></i>修改密码
									</a>
								</li>
								<li>
									<a href="javascript:void(0)" @click="loginOut()">
										<i class="icon-key"></i>退出
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
        	</div>
      	</div>
      
        <div class="page-sidebar navbar-collapse collapse">
            <ul class="page-sidebar-menu " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                <li 
					class="parent" 
					:id="index" 
					v-for="(item, index) in arr" 
					:key="index" 
					v-show="item.isDisplay != '0'"
				>
                    <a class="nav-link" href="javascript:;">
                        <i :class="item.icon"></i>
                        <span class="title">{{item.name}}</span>
                        <span class="selected"></span>
                        <span class="arrow arrow-my"></span>
                    </a>
                    <ul class="sub-menu">   
						<li 
							class="nav-link" 
							v-for="(it, index1) in item.children" 
							:class="{'current':isCurrent == it.url}"
							:key="index1"
							v-if="item.children.length && it.isDisplay != 0"
						>
                            <a class="nav-link" :href="it.url">
                                <i></i> {{it.name}}
								<span v-if="it.children" class="arrow arrow-my"></span>
                            </a>
							
							<ul class="sub-menu" v-if="it.children">
								<li
									class="nav-link third-link"
									v-for="(dataItem, i) in it.children"
									:key="i"
									:title="dataItem.name.length > 8 && dataItem.name"
								>
									<a class="nav-link" :href="dataItem.url">
										<i :class="dataItem.icon"></i> {{dataItem.name}}
									</a>
								</li>
							</ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="modal fade" id="changeOrg-sidebar" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                        <h4 class="modal-title text-center">切换组织</h4>
                    </div>
                    <div class="modal-body form">
                        <form class="form-horizontal form-body">
                            <div class="row" v-for="(item, j) in org" :key="j">
                                <div class="col-md-4 text-right">
									<input type="radio" name="selOrg" v-model="selOrg" :value="item.orgCode">
								</div>
                                <div class="col-md-8">{{item.orgName}}</div>
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
    </div>
</template>

<script>
	import api from '../common/api.js'
	import commonConfig from '../common/commonConfig.js'
	import common from '../../assets/js/common.js'
	import liveMenu from '../common/menuData.js'
	import { Toast } from 'mint-ui'
	import '../../assets/myfonts/iconfont.css'
	export default {
		data: function() {
			return {
				menuFlag: false, // true 二级菜单 false 三级菜单
				menusTree: {},
				menuInfo: {},
				pathName: window.location.pathname,
				flag: '',
				menuMap: commonConfig.menuMap,
				arr: [],
				userInfo: {},
				org: [],
				selOrg: '',
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: '',
				userImgPath: (common.env() == 'development' ? '/static/image/userimg.jpg': '/resources/image/userimg.jpg')
			}
		},
		created() {
			
			var $this = this
			let time = setInterval(() => {
				$this.userInfo = sessionStorage.getItem("userInfo")
				if ($this.userInfo) {
					$this.userInfo = JSON.parse($this.userInfo)
					clearInterval(time)
				}
			}, 100)

			this.isCurrent = window.location.pathname

			this.checkMenu()
		},
		updated() {
			
			const resize = function() {
				$(".page-sidebar-wrapper").height($(window).height() - 55)
				$(".page-content").height($(window).height() - 88)
			}
			
			$(".current").parents(".sub-menu").slideDown(200)
			$(".current").parents("li.parent").addClass("open").find("a span.arrow").addClass("open")
			
			// 设置菜单的高度
			resize();
			$(window).resize(resize)
		},
		methods: {
			loginOut: function() {
				api.toLogin.loginOut({}).then(function(data) {
					var data = data.data;
					if (data.code == "success") {
						//直接贴出重新登录
						setTimeout(function() {
							common.clearSession()
							window.location.href = common.isweb() + "/login/login.html"
						}, 1000)
					}
				});
			},

			upDataPassword: function() {
				if (this.newPassword === this.confirmNewPassword) {
					let params = {
						loginPasswd: this.newPassword,
						oldLoginPassword: this.oldPassword
					}
					api.upDataPassword(params).then(function(data) {
					})
				} else {
					Toast("密码输入不一致，请重新输入")
				}
			},

			changeOrg: function() {
				var $this = this
				api.toLogin.getOrg({}).then(function(data) {
					var data = data.data
					if (data.code == "success") {
						$this.org = data.obj
					}
				});
			},

			changeLoginInfo: function() {
				const $this = this
				api.toLogin.changeLoginInfo({ orgCode: this.selOrg }).then(msg => {
					if (msg.data.code == "success") {
						window.location.href = window.location.href
					}
				})
			},

			creatMenuData(info) {
				var info = info,
					_this = this;
				var menuCataLog = this.menuFlag ? liveMenu.cataLog : liveMenu.menuCataLog,
					config = liveMenu.menuMap;
				var menu = [];
				menu.length = 0;

				// 一级菜单
				for (let i=0, len = menuCataLog.length; i<len; i++) {
					menu.push({
						name: menuCataLog[i].modulName,
						icon: menuCataLog[i].iconClass,
						isOpen: false,
						isDisplay: 1,
						children: [],
					})

        			const children = menuCataLog[i].children

					// 二级菜单
					for (let j=0; j<children.length; j++) {
					
						// 有三级菜单
						if (typeof children[j] == 'object') {
							menu[i].children.push({
								name: children[j].childName,
								isOpen: false,
								isDisplay: 1,
								children: [],
							})
            
							const grandson = children[j].textCode

							// 三级菜单
							for (let k=0; k<grandson.length; k++) {
								const thirdMenu = menu[i].children[menu[i].children.length - 1]
								thirdMenu && _this.initThirdMenu(info, thirdMenu.children, config, grandson[k], i, j)
							}
						}  

						// 没有三级菜单
						if (typeof children[j] == 'string') {
							_this.initThirdMenu(info, menu[i].children, config, children[j], i, j)
						}
					}
					// 如果三级菜单为空  则二级菜单不显示
					menu[i].children.forEach(item => {
						if (item.children && item.children.length == 0) {
							item.isDisplay = 0
						}
					})

					// 如果二级菜单里的三级菜单全为空，则不显示一级菜单
					const isShowFirstMenu = menu[i].children.every(item => {
						return item.isDisplay == 0
					})

					if (menu[i].children.length == 0 || isShowFirstMenu) menu[i].isDisplay = 0
				}
				_this.arr = menu
			},

			// 渲染三级菜单
			initThirdMenu(info, target, config, code, i, j) {
				if (info.hasOwnProperty(code)) {
					target.push({
					code,
					name: info[code].menuName,
					url: config[code].url,
					isNative: config[code].isNative,
					icon: 'iconfont icon-yuandianxiao',
					isOpen: false,
					isDisplay: 1
					})
				}
			},

			// 判断MenuFlag
			checkMenu() {
				let params = { refDetailCode: 'MenuFlag' }
				api.getDictionaryDetails(params).then(res => {
					if (res.data.code == 'success' && res.data.obj.refDetailValue) {
						
						const userInfo = sessionStorage.getItem('userInfo')
						const relationCodeList = userInfo && JSON.parse(userInfo).inCharegOrgVo.relationCodeList
						const { refDetailValue } = res.data.obj
						const refDetailValueList = refDetailValue.split(',')
						
						// 有一个 code 匹配到就显示 二级菜单，否则显示三级菜单
						this.menuFlag = refDetailValueList.some(item => {
							return relationCodeList.includes(item)
						})
					} else if (res.data.code == 'fail') {
						this.menuFlag = true
					} else {
						this.menuFlag = false
					}
					this.getUserMenu()
				})
			},

			//获取cookie
			getUserMenu() {
				var $this = this
				api.toLogin.getUserMenu({}).then(function(data) {
					var data = data.data;
					if (data.code == "success") {
						$this.menusTree = data.obj.tree[0]
						$this.menuInfo = data.obj.info
						$this.creatMenuData($this.menuInfo)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.nav-link a {
		padding: 0 !important;
		height: 45px;
		line-height: 45px;
	}
	.third-link a {
		padding-left: 44px !important;
		padding-right: 10px !important;
		overflow: hidden;
	}
	.sub-menu {
		margin: 0 !important;
	}
</style>
