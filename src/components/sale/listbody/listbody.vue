<template>
	<div class="row">
	    <div class="col-md-12">
	        <div class="portlet box">
		        <div class="portlet-body">
			        <div class="bootstrap-table bordered">
			            <div class="fixed-table-toolbar">
				            <div class="columns columns-right margin-bottom-10">
			                   	   <button class="btn btn-primary" title="新增" data-toggle="modal" data-target="#addData" @click="add">新增</button>
								   <button class="btn btn-success" title="更新" data-toggle="modal" @click="change('#updata')">编辑</button>
								   <button class="btn btn-warning pull-right" @click="init">同步数据</button>
				            </div>
			            </div>
			            <div class="table-container">
			            	<div class="fixed-table-body height-550 table-scrollable">
								<table class="table table-striped table-hover table-bordered">
                                     <thead>
									     <tr class="text-center">
											<th v-show="datalist.length != 0"></th>
											<th class="text-center">序号</th>
			            				    <th class="text-center">销售区域编码</th>
			            				    <th class="text-center">销售区域名称</th>
			            				    <!--<th class="text-center">父级销售区域编码</th>
			            				    <th class="text-center">集联数据信息关系</th>-->
			            				    <th class="text-center">销售区域缩写</th>
			            				    <th class="text-center">销售区域业务值</th>
			            				    <th class="text-center">前缀</th>
			            				    <th class="text-center">备注</th>
											<th class="text-center">状态</th>
									     </tr>
								     </thead>
									 <tbody class="text-center">
										 <tr v-for="(data,index) in datalist">
											 <td @click="check(index)"><input type="radio" v-model="radioValue" name="radio" :value="index"/></td>
											 <td>{{index + 1 + (obj.pageNum-1) * 15}}</td>
											 <td>{{data.areaCode}}</td>
											 <td>{{data.areaName}}</td>
											 <!--<td>{{data.fatherAreaCode}}</td>
											 <td>{{data.relationCodeList}}</td>-->
											 <td>{{data.areaAddrName}}</td>
											 <td>{{data.areaValue}}</td>
											 <td>{{data.prefixValue}}</td>
											 <td>{{data.remark}}</td>
											 <td>{{data.isDeleted | isDeleted}}</td>
										 </tr>
										 <tr v-show="datalist.length == 0">
											 <td colspan='10' class="text-left">暂无数据...</td>
										 </tr>
									</tbody>
								</table>
			            	</div>
							<pager class="margin-left-10" @page-change="pageChange" 
							:page-no="obj.pageNum" 
							:page-size="obj.pageSize" 
							:total-result="obj.total">
							</pager>

			            </div>
			        </div>
                    <!-- start-addData-modal -->
					<div class="modal fade" id="addData" aria-hidden="true">
						<div class="modal-dialog modal-wide" >
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
									<h4 class="modal-title text-center">新增销售区域管理</h4>
								</div>
								<div class="modal-body form clearfix">
									<div class="col-md-5 col-sm-6 tree-padding">
										<ZTree
											ref='tree'
											:treeData="treeData"
											:options="options"
											@node-click="addClick"
											@add-node="addNode"
											:key="2"
											@root-click="getRootAdd"
									        :treeRootCode="treeRootCode">
										</ZTree>
									</div>
									<div class="col-md-7 col-sm-6">
                                         <form class="form-horizontal">
											<div class="form-body">
												<div class="row">
													<div class="col-md-12">
															<div class="form-group">
																<label class="control-label col-md-5 ">销售区域编码</label>
																<div class="col-md-7 ">
																		<input type="text" class="form-control" placeholder="必填" v-model="addDataParams.areaCode" readonly/>
																</div>
															</div>
															<div class="form-group">
																<label class="control-label col-md-5">销售区域名称 *</label>
																<div class="col-md-7 ">
																	<input type="text" class="form-control" :class="{ require : required}" placeholder="必填" v-model="addDataParams.areaName"/>
																</div>
															</div>
															<div class="form-group">
																<label class="control-label col-md-5">父级销售区域编码</label>
																<div class="col-md-7">
																		<input type="text" class="form-control" v-model="addDataParams.fatherAreaCode" readonly/>
																</div>
																<!--<button class="btn btn-danger btn-sm col-sm-3 col-md-2" @click.prevent="clear(0)">清空</button>-->
															</div>
															<!--<div class="form-group">
																<label class="control-label col-md-3 ">集联数据信息关系:</label>
																<div class="col-md-7 ">
																		<input type="text" class="form-control" v-model="addDataParams.relationCodeList"/>
																</div>
															</div>-->
															<div class="form-group">
																<label class="control-label col-md-5 ">销售区域缩写</label>
																<div class="col-md-7 ">
																		<input type="text" class="form-control" v-model="addDataParams.areaAddrName"/>
																</div>
															</div>
															<div class="form-group">
																<label class="control-label col-md-5 ">销售区域业务值</label>
																<div class="col-md-7 ">
																		<input type="text" class="form-control" v-model="addDataParams.areaValue"/>
																</div>
															</div>
															<div class="form-group">
																<label class="control-label col-md-5 ">前缀</label>
																<div class="col-md-7 ">
																		<input type="text" class="form-control" v-model="addDataParams.prefixValue"/>
																</div>
															</div>
															<div class="form-group">
																<label class="control-label col-md-5 ">备注</label>
																<div class="col-md-7 ">
																		<input type="text" class="form-control" v-model="addDataParams.remark"/>
																</div>
															</div>
															<div class="form-group">
																<label class="control-label col-md-5">状态</label>
																<div class="col-md-7 margin-bottom-10">
																	<select class="form-control" v-model="addDataParams.isDeleted">
																		<option value="0">可用</option>
																		<option value="1">停用</option>
																	</select>
																</div>
															</div>
													</div>
												</div>
												<div class="row">
													<div class="pull-right">
														<div class="col-md-12">
															<input type="button" class="btn btn-default" value="取消" data-dismiss="modal">
															<input type="button" class="btn btn-primary" value="确定" @click="addData" />
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
                    <!-- end-addData-modal -->
					<!-- start-updata-modal -->
					<div class="modal fade" id="updata" aria-hidden="true">
						<div class="modal-dialog modal-wide">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
									<h4 class="modal-title text-center">更新销售区域管理</h4>
								</div>
								<div class="modal-body form clearfix">
									<div class="col-md-5 col-sm-6 tree-padding">
										<ZTree ref='tree' :treeData="treeData" :options="options" @node-click="itemClick" @add-node="addNode" :key="2">
										</ZTree>
									</div>
									<div class="col-md-7 col-sm-6">
                                        <form class="form-horizontal">
											<div class="form-body">
												<div class="row">
													<div class="col-md-12">
														<div class="form-group">
															<label class="control-label col-md-5">销售区域编码</label>
															<div class="col-md-7">
																	<input type="text" class="form-control" placeholder="必填" readonly v-model="updataParams.areaCode"/>
															</div>
														</div>
														<div class="form-group">
															<label class="control-label col-md-5 ">销售区域名称 *</label>
															<div class="col-md-7 ">
																	<input type="text" class="form-control" placeholder="必填" readonly v-model="updataParams.areaName"/>
															</div>
														</div>
														<div class="form-group">
															<label class="control-label col-md-5">父级销售区域编码</label>
															<div class="col-md-7">
																	<input type="text" class="form-control" v-model="updataParams.fatherAreaCode" readonly="readonly"/>
															</div>
															<!--<button class="btn btn-danger btn-sm col-sm-3 col-md-2" @click.prevent="clear(1)">清空</button>-->
														</div>
														<!--<div class="form-group">
															<label class="control-label col-md-3">集联数据信息关系:</label>
															<div class="col-md-7">
																	<input type="text" class="form-control" v-model="updataParams.relationCodeList"/>
															</div>
														</div>-->
														<div class="form-group">
															<label class="control-label col-md-5">销售区域缩写</label>
															<div class="col-md-7">
																	<input type="text" class="form-control" v-model="updataParams.areaAddrName"/>
															</div>
														</div>
														<div class="form-group">
															<label class="control-label col-md-5">销售区域业务值</label>
															<div class="col-md-7">
																	<input type="text" class="form-control" v-model="updataParams.areaValue"/>
															</div>
														</div>
														<div class="form-group">
															<label class="control-label col-md-5">前缀</label>
															<div class="col-md-7">
																	<input type="text" class="form-control" v-model="updataParams.prefixValue"/>
															</div>
														</div>
														<div class="form-group">
															<label class="control-label col-md-5">备注</label>
															<div class="col-md-7">
																	<input type="text" class="form-control" v-model="updataParams.remark"/>
															</div>
														</div>
														<div class="form-group">
                                                            <label class="control-label col-md-5">状态</label>
															<div class="col-md-7 margin-bottom-10">
																<select class="form-control" v-model="updataParams.isDeleted">
																	<option value="0">可用</option>
																	<option value="1">停用</option>
																</select>
															</div>
														</div>
													</div>
												</div>
												<div class="row">
													<div class="pull-right">
														<div class="col-md-12">
															<input type="button" class="btn btn-default" value="取消" data-dismiss="modal">
															<input type="button" class="btn btn-primary" value="确定" @click="updata" data-dismiss="modal"/>
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
                    <!-- end-updata-modal -->
		        </div>
	        </div>
	    </div>
	</div>

</template>

<script>
	import common from "../../../assets/js/common.js"
	import commonConfig from "../../common/commonConfig.js"
    import {Toast} from 'mint-ui'
    import api from '../../common/api.js'
    import Vue from 'vue'
    //import axios from 'axios'
	import ZTree from '../../common/tree.vue'
	import pager from '../../common/pager/Pager.vue'

    Vue.use(ZTree)

	export default {
		name: 'Tree2',
		props: {
           data: {
              type: Object,
			  default: {}
		   }
		},
		data() {
			return {
				datalist: [],
				updataParams: {
					areaCode : "",
					areaName : "",
					fatherAreaCode : "",
					relationCodeList : "",
					areaAddrName : "",
					areaBigPic : "",
					areaSmallPic : "",
					areaValue : "",
					prefixValue : "",
					remark : "",
					id : "",
					isDeleted: ''
				},
				addDataParams: {
					areaCode : "",
					areaName : "",
					fatherAreaCode : "",
					relationCodeList : "",
					areaAddrName : "",
					areaBigPic : "",
					areaSmallPic : "",
					areaValue : "",
					prefixValue : "",
					remark : "",
					isDeleted: '0'
				},
				subParams: {
					areaCode: ''
				},
				pageParams: {
					areaCode: this.data.areaCode,
					areaName: this.data.areaName,
					areaAddrName: this.data.areaAddrName,
					prefixValue: this.data.prefixValue,
                    pageNums: 15,
				    pageStart: 1
				},
				pages: 1,
				pageNum: 1,
				isLastPage: false,
				treeData: [],
                options: {
					showCheckbox: false,
					halfCheckedStatus: false,
					lazy: true,
					load: this.loadingChild,
					showSearch: false,
					rootName: '全国',
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
				treeRootCode: commonConfig.areaRoot.sale,    //点击树根节点获取的相关编码
				obj: {},
				checked: false,
				areaCode: '',
				radioValue: -1,
				required: false
		    }
		},
		methods: {
			//初始化缓存
			init() {
				api.initSalesAreaToCache().then((res) => {
					if( res.data.code === 'success' ) {
						Toast(commonConfig.success.cache)
					}
				})
			},
			//更新功能  需要多传一个id
			updata() {
				let _params = this.updataParams;
				console.log(_params)
				api.getUpdateSalesAreaInfo(_params).then((res) => {
					  if( res.data.code === 'success' ) {
						  Toast(commonConfig.success.edit)
					  }
				});
				this.updataParams = {};
			},
			//新增功能
			addData() {
				if(!this.addDataParams.areaName) {
					this.required = true
					return
				}else {
					this.required = false
				
					let insertPromise = new Promise((resolve, reject) => {
						let _params = this.addDataParams;
						let _areaCode = _params.areaCode;
						api.getInsertSalesAreaInfo(_params).then((res) => {
							if( res.data.code === 'success' ) {
								Toast(commonConfig.success.add)
								resolve(_areaCode);
								this.addDataParams.areaName = '';
								this.addDataParams.relationCodeList = '';
								this.addDataParams.areaAddrName = '';
								this.addDataParams.areaBigPic = '';
								this.addDataParams.areaSmallPic = '';
								this.addDataParams.isDeleted = '0';
								this.addDataParams.areaValue = '';
								this.addDataParams.prefixValue = '';
								this.addDataParams.remark = '';
							}
						});
					});
					insertPromise.then((_areaCode) => {
						$('#addData').modal('hide')
						this.getQueryInfo({"areaCode":_areaCode});
					});
				}
				// console.log(this.required)
			},
			add() {
				this.addDataParams.areaName = '';
				this.addDataParams.relationCodeList = '';
				this.addDataParams.areaAddrName = '';
				this.addDataParams.areaBigPic = '';
				this.addDataParams.areaSmallPic = '';
				this.addDataParams.isDeleted = '0';
				this.addDataParams.areaValue = '';
				this.addDataParams.prefixValue = '';
				this.addDataParams.remark = '';
				this.required = false
				this.getTree();
				let _params = commonConfig.area.sale;
				api.ordinalInfo.getSequence({"serviceCode":_params}).then((res) => {
					this.addDataParams.areaCode = res.data.obj;
				});
				this.addDataParams.fatherAreaCode = commonConfig.areaRoot.sale;
			},
			//根据行政区域编码返回其直属下级
			getTree() {
                let _params = commonConfig.areaRoot.sale;
				let _this = this;
				api.getSalesAreaInfoByAreaCode({"areaCode" : _params}).then(function(res) {
                      if( res.data.code === 'success' ) {
							if( res.data.obj ) {
								_this.treeData = [];
								_this.options.rootName =  res.data.obj.areaName;
								let salesAreaSubInfo = res.data.obj.salesAreaSubInfo;
								if( salesAreaSubInfo ) {
										salesAreaSubInfo.forEach((item,index) => {
											let treeData = {
												label: item.areaName,
												areaCode: item.areaCode,
												children:[],
												open: false,
												leaf: false
											}
											_this.treeData.push(treeData);
										})
								}
								console.log(_this.treeData)
							}else {
								Toast('暂无数据！');
							}
					  }
				});
			},
			check(i) {
				this.checked = true;
                this.areaCode = this.datalist[i].areaCode;
			},
			change(id) {
				if( this.checked ) {
					common.triggerModal(id);
					this.getTree();
					let _params = this.areaCode;
					api.getQuerySalesAreaInfo({"areaCode":_params}).then((res) => {
							this.updataParams = res.data.obj.list[0];
					});
				}else {
					Toast(commonConfig.prompt.checkData)
				}
			},
			pageChange(s) {
				this.pageParams.pageStart = s
				let _params = this.pageParams;
				this.getQueryInfo(_params);
			},
			//封装 - 查询
			getQueryInfo(params) {
				this.radioValue = -1
				api.getQuerySalesAreaInfo(params).then((res) => {
					if(res.data.code === 'success') {
						let obj = res.data.obj;
						this.obj = obj;
						this.datalist = obj.list;
						this.pages = obj.pages;
						this.pageNum = obj.pageNum;
						this.isLastPage = obj.isLastPage;
						this.checked = false;
						if( !obj.pages ) this.pages = 1;
					}
				});
			},
			getRootUpdata(rootCode) {
				this.updataParams.fatherAreaCode = rootCode;
			},
			getRootAdd(rootCode) {
				this.addDataParams.fatherAreaCode = rootCode;
			},
			itemClick(node) {
				this.updataParams.fatherAreaCode = node.areaCode;
			},
			addClick(node) {
				this.addDataParams.fatherAreaCode = node.areaCode;
			},
			async loadingChild(node, index) {
				console.log(node,index)
				let _this = this;
				try {
				let data = await new Promise((resolve, reject) => {
					console.log(node.areaCode)
						api.getSalesAreaInfoByAreaCode({"areaCode" : node.areaCode}).then(function(res) {
								console.log(res)
								if( res.data.code === 'success' ) {
									console.log(res.data.message)
										let salesAreaSubInfo = res.data.obj.salesAreaSubInfo;
										if( salesAreaSubInfo != null ) {
											salesAreaSubInfo.forEach((item,index) => {
												let treeData = {
													label: item.areaName,
													areaCode: item.areaCode,
													children:[],
													open: false,
											        leaf: false
												}
												node.loading = false;
												node.open = true;
												node.children.push(treeData);
											})
										}else {
											node.loading = false;
											node.leaf = true;
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
			addDataParams(val) {
				if(val.areaName) {
					this.required = false
				}
			}
		},
		components: {
			'ZTree' : ZTree,
			pager
		},
		filters: {
			isDeleted: function (value) {
				 if(value == 1) {
					 return '停用'
				 }else {
					 return '可用'
				 }
			}
		}
	}
</script>

<style lang="css" @scope>
    .pageStyle {
		padding: 6px 12px;
	}
	.pageStyle a {
        line-height:1.428571429;
		text-decoration:none;
	}
	.tree-padding {
		margin-top: 20px;
		padding-left: 30px !important;
		max-height: 400px;
		overflow-y: scroll;
		border: 1px solid #ccc;
	}
	.modal-dialog {
		padding-top: 150px !important;
	}
	.require {
		border-color: #f86c6b;
	}
</style>
