<template>
	<div class="row margin-top-20">
		<div class="col-md-12">
			<div class="portlet box">
				<div class="portlet-body form">
					<!--FORM BEGIN-->
					<form class="form-horizontal">
						<div class="form-body">
							<p class="h3">主档信息</p>
							<div class="row">
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">员工编码</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.empCode" readonly/>
										</div>
									</div>
								</div>
								
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">中文名称</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.empCnName" />
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">英文名称</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.empEnName" />
										</div>
									</div>
								</div>
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">登录系统账号</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.loginName" />
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">性别</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<select class="form-control" v-model="info.empSex">
												<option value="1">男</option>
												<option value="0">女</option>
											</select>
										</div>
									</div>
								</div>
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">生日</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<datepicker v-model="info.empBirthday" language="ch" value.sync="12345"></datepicker>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">身份证号</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.empIdcard" />
										</div>
									</div>
								</div>
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">电话</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.empPhone" />
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">手机</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.empMobile" />
										</div>
									</div>
								</div>
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">银行账号</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.empBankno" />
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">电子邮件</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.empEmail" />
										</div>
									</div>
								</div>
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">地址</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.empAddress" />
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">外部员工编码</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.externalCode" />
										</div>
									</div>
								</div>
							</div>
							<hr>
<!--<div class="row">
	<div class="col-md-5 col-lg-5 col-sm-5">
	<div class="form-group">
	<label class="control-label col-md-5 col-lg-4 col-sm-5">登录系统账号密码:</label>
	<div class="col-md-7 col-lg-5 col-sm-6">
	<input type="text" class="form-control" v-model="info.loginPasswd"/>
	</div>
	</div>
	</div>
	<div class="col-md-2">
	</div>
	</div>-->
							<div class="row">
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">考勤卡号</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.empCheckinCard" />
										</div>
									</div>
								</div>
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">是否在职</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<select class="form-control" v-model="info.onJob">
													<option :value="0">离职</option>
													<option :value="1">在职</option>
												</select>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">类型 *</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<select class="form-control" v-model="info.empType" ref="typeSelect">
												<option :value="item.value" v-for="item in empTypeList">{{item.text}}</option>
											</select>
										</div>
									</div>
								</div>
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">状态</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<select class="form-control" v-model="info.empStatus">
													<option>正式员工</option>
													<option>临时员工</option>
												</select>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group" @click="check">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">所在行政管辖组织</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<div class="dropdown">
												<input id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="form-control text-left" v-model="orgName" readonly/>
												<div class="warp" v-if="checked">
													<ZTree ref='tree' :treeData="treeData" :options="options" @node-click="addClick" @add-node="addNode" :key="2" @root-click="getRootAdd" :treeRootCode="treeRootCode">
													</ZTree>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- <div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">门店编码:</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.storeCode" readonly/>
										</div>
									</div>
								</div> -->

								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">前缀</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.prefixValue" />
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-5 col-lg-5 col-sm-5">
									<div class="form-group">
										<label class="control-label col-md-5 col-lg-4 col-sm-5">备注</label>
										<div class="col-md-7 col-lg-5 col-sm-6">
											<input type="text" class="form-control" v-model="info.remark" />
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</form>
					<!--FORM END-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import common from '../../../assets/js/common.js'
	import commonConfig from '../../common/commonConfig.js'
	import api from "../../common/api.js"
	import datepicker from 'vue-date'
	import Vue from 'vue'
	import ZTree from '../../common/tree.vue'
	Vue.use(ZTree)
	export default {
		name: 'Tree2',
		props: {
			insertParams: {
				type: Object,
				default: {}
			}
		},
		data: function() {
			return {
				info: {
					empCode: '',
					externalCode: '',
					empCnName: '',
					empEnName: '',
					loginName: '',
					loginPasswd: '',
					prefixValue: '',
					orgCode: '',
					storeCode: '',
					empType: '',
					empStatus: '',
					empSex: '0',
					onJob: '1',
					empCheckinCard: '',
					empBirthday: '',
					empIdcard: '',
					empPhone: '',
					empMobile: '',
					empBankno: '',
					empEmail: '',
					empAddress: '',
					remark: '',
					simpleEmpAddInfoMaps: {}
				},
				treeData: [],
				options: {
					showCheckbox: false,
					halfCheckedStatus: false, //控制父框是否需要半钩状态
					lazy: true,
					load: this.loadingChild,
					showSearch: false,
					rootName: '总部',
					labelKey: 'label',
					iconClass: {
						close: 'icon-youjiantou',
						open: 'icon-xiajiantou',
						add: 'icon-add'
					},
					iconStyle: {
						color: '#108ee9'
					},
					dynamicAdd: false,
					dynamicAddFilter: (node) => {
						if (node.type === 1 || node.type === 2) {
							return true
						}
						return false
					},
					dynamicAddNode: this.addNode,
					dynamicSaveNode: this.saveNode,
					leafIcon: this.leafIcon,
					search: {
						useInitial: true,
						useEnglish: false,
						customFilter: null
					}
				},
				treeRootCode: JSON.parse(sessionStorage.getItem("userInfo"))['inCharegOrgVo'].orgCode, //点击树根节点获取的相关编码
				// treeRootCode: commonConfig.nodeCode.organizationCode.orgCode, //点击树根节点获取的相关编码
				checked: false,
				empTypeList: [],
				orgName: ''
			}
		},
		created() {
			this.getEmpCode();
			this.getEmpType();
		},
		methods: {
			required(flag = true) {
				if(flag) {
				    this.$refs.typeSelect.style.borderColor = '#f86c6b'
				}else {
					this.$refs.typeSelect.style.borderColor = '#e5e5e5'
				}
			},
			// 获取员工类型
			getEmpType() {
				 const params = { refCode: commonConfig.employee.type };
                 api.queryDictionaryDetails(params).then( res => {
					 if(res.data.code === 'success') {
                        let list = res.data.obj.list;
						list.forEach(item => {
							let data = {
								value: item.refDetailCode,
								text: item.refDetailName
							}
							this.empTypeList.push(data);
						})
					 }
				 })
			},
			getEmpCode() {
				let _params = commonConfig.employee.emp;
				api.ordinalInfo.getSequence({
					"serviceCode": _params
				}).then((res) => {
					if (res.data.code === 'success') this.info.empCode = res.data.obj;
				});
			},
			check() {
				this.checked = !this.checked;
				if (this.checked) {
					this.getTree()
				}
			},
			// 树状图
			getTree() {
				let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                let _params = userInfo['inCharegOrgVo'].orgCode; //员工组织编码
				// let _params = commonConfig.nodeCode.organizationCode.orgCode; //组织根节点code
				let _this = this;
				api.organzation.getOrganizationByOrgCode({
					"orgCode": _params
				}).then(function(res) {
					if (res.data.code === 'success') {
						if (res.data.obj) {
							_this.treeData = [];
							_this.rootCode = res.data.obj.orgCode;
							_this.options.rootName = res.data.obj.orgName;
							let childOrganizations = res.data.obj.childOrganizations;
							if (childOrganizations) {
								childOrganizations.forEach((item, index) => {
									let treeData = {
										label: item.orgName,
										orgCode: item.orgCode,
										children: [],
										open: false,
										leaf: false
									}
									_this.treeData.push(treeData);
								})
							}
							// console.log(_this.treeData)
						} else {
							Toast('暂无数据！');
						}
					}
				});
			},
			getRootAdd(rootCode) { 
				this.info.orgCode = rootCode;
				this.orgName = this.options.rootName;
			},
			addClick(node) {
				this.info.orgCode = node.orgCode;
				this.orgName = node.label
			},
			async loadingChild(node, index) {
				// console.log(node, index)
				let _this = this; //没用到  可删
				try {
					let data = await new Promise((resolve, reject) => {
						api.organzation.getOrganizationByOrgCode({
							"orgCode": node.orgCode
						}).then(function(res) {
							if (res.data.code === 'success') {
								if (res.data.obj) {
									let childOrganizations = res.data.obj.childOrganizations;
									if (childOrganizations) {
										childOrganizations.forEach((item, index) => {
											let treeData = {
												label: item.orgName,
												orgCode: item.orgCode,
												children: [],
												open: false,
												leaf: false
											}
											node.loading = false;
											node.open = true;
											node.children.push(treeData);
										})
									} else {
										node.loading = false;
										node.leaf = true;
									}
								} else {
									Toast('暂无数据！');
								}
							}
						});
					})
					let tem = this.getParentNode(node, this.treeData)
					// set Children
					//Vue.set(tem, 'children', generateKey(data, node.key));
					Vue.set(tem, 'children', data);
					Promise.resolve(data);
				} catch (e) {
					Promise.reject(e);
				}
			},
			async addNode(item) {
				let parent = this.getParentNode(item, this.treeData)
				let node = {
					id: 2,
					label: '一级节点',
					open: false,
					checked: false,
					nodeSelectNotAll: false,
					parentId: null,
					visible: true,
					searched: false
				}
				if (!item.hasOwnProperty('children') || item.children.length === 0) {
					await this.loadingChild(parent)
				}
				parent.open = true
				parent.children.splice(0, 0, Object.assign({}, {
					dynamicAdd: true,
					loaded: true
				}, node))
				//                generateKey(parent.children, parent.key) // regenerate key
				return Promise.resolve(true)
			},
			async saveNode(item, e) {
				if (!e.target.value) {
					return
				}
				return new Promise((resolve, reject) => {
					// todo sent data to sever
					delete item.dynamicAdd // 删除属性
					Vue.set(item, 'label', e.target.value)
					e.target.value = ''
					setTimeout(() => {
						resolve(item)
					}, 1000)
				})
			},
			generateKey(treeData = [], parentKey = '0') {
				let _this = this
				treeData = treeData.map((item, i) => {
					item.key = parentKey + '-' + i.toString();
					if (item.hasOwnProperty('children') && item.children.length > 0) {
						_this.generateKey(item.children, item.key)
					}
					return item;
				})
				return treeData;
			},
			getParentNode(node = {}, treeData = []) {
				let tem;
				let postions = node.key.split('-');
				for (let [index, item] of postions.entries()) {
					switch (index) {
						case 0:
							break;
						case 1:
							tem = treeData[item];
							break;
						default:
							tem = tem.children[item];
					}
				}
				return tem
			},
			leafIcon(node) {
				return ''
			}
		},
		watch: {
			info: {
				handler: function(value) {
					this.$emit('go', value);
				},
				deep: true
			},
			insertParams: function(value) {
				this.info = {};
			}
		},
		components: {
			datepicker,
			'ZTree': ZTree
		}
	}
</script>

<style>
	.dropdown {
		position: relative;
	}
	.warp {
		position: absolute;
		z-index: 999;
		background-color: #fff;
		width: 120%;

		max-height: 200px;
		overflow-y: scroll;
		margin-top: 3px;
		border: 1px solid #ccc;
	}
	.warp>div {
		transform: translateX(20px);
	}
</style>
