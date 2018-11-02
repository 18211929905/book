<template>
	<div>
		<!--查询部分-->
		<div>
			<div class="row margin-top-20">
				<div class="col-md-12">
					<div class="portlet box">
						<div class="portlet-body form">
							<!--FORM BEGIN-->
							<form class="form-horizontal">
								<div class="form-body">
									<div class="row">
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label col-md-4">编码:</label>
												<div class="col-md-8">
													<input type="text" class="form-control" v-model="ref.refCode" @keyup.enter="getTableData(1)" />
												</div>
											</div>
										</div>
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label col-md-4">名称:</label>
												<div class="col-md-8">
													<input type="text" class="form-control" v-model="ref.refName" @keyup.enter="getTableData(1)" />
												</div>
											</div>
										</div>
										<div class="col-md-4 text-right">
											<button type="button" class="btn btn-default" @click="clear()">重置</button>
											<button type="button" class="btn btn-primary" @click="getTableData(1)">查询</button>
										</div>
									</div>
								</div>
							</form>
							<!--FORM END-->
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--列表部分-->
		<div class="portlet box">
			<div class="portlet-body">
				<div class="bootstrap-table bordered">
					<div class="fixed-table-toolbar">
						<div class="columns columns-right margin-bottom-10">
							<button class="btn btn-primary" title="新增" data-toggle="modal" @click="change('creade','#more')">新增</button>
							<button class="btn btn-success" title="更新" data-toggle="modal" @click="change('edit','#more')">编辑</button>
							<button class="btn btn-warning pull-right" title="同步数据" @click="cache">同步数据</button>
						</div>
					</div>
					<div class="table-container bordered">
						<div class="fixed-table-body height-550 scroll">
							<table class="table table-striped table-hover table-bordered">
								<thead>
									<tr>
										<th></th>
										<th class="text-center">序列</th>
										<th class="text-center">编码</th>
										<th class="text-center">名称</th>
										<th class="text-center">业务值</th>
										<th class="text-center">项目内容展示类型</th>
										<th class="text-center">状态</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in datalist" :key="index">
										<td class="text-center"><input type="radio" name="dataDictionary" v-model="selitem" :value="item.refCode"></td>
										<td>{{ index + startRow }}</td>
										<td @click="codeDetail(item.refCode, item.displayType)"><a>{{ item.refCode }}</a></td>
										<td>{{ item.refName }}</td>
										<td>{{ item.refValue }}</td>
										<td class="text-center">{{ item.displayType == '0' ? "表" : "树状结构" }}</td>
										<td class="text-center">{{ item.isDeleted == '0' ? "可用" : "停用" }}</td>
									</tr>
									<tr v-if="prompt">
										<td colspan="30">暂无数据...</td>
									</tr>
								</tbody>
							</table>
						</div>
						<pager class="margin-left-10" @page-change="pageChange" :page-no="pager.page_no" :page-size="pager.page_size" :total-result="total">
						</pager>
					</div>
				</div>
			</div>
		</div>
		<!--新增/修改模态框-->
		<div class="modal fade" id="more" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content carousel-inner">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								x
							</button>
						<h4 class="modal-title text-center" id="myModalLabel">
							{{modelTatle}}
						</h4>
					</div>
					<div class="modal-body">
						<form class="form-horizontal">
							<div class="form-body">
								<div class="row">
									<div class="col-xs-11">
										<div class="form-group">
											<label class="control-label col-xs-4">数据字典编码</label>
											<div class="col-xs-7">
												<input type="text" class="form-control" v-model="creade.refCode" readonly/>
											</div>
										</div>
									</div>
									<div class="col-xs-11">
										<div class="form-group">
											<label class="control-label col-xs-4">数据字典名称 *</label>
											<div class="col-xs-7">
												<input class="form-control" type="text" v-model="creade.refName" :class="{ require : required}"/>
											</div>
										</div>
									</div>
									<div class="col-xs-11">
										<div class="form-group">
											<label class="control-label col-xs-4">业务值</label>
											<div class="col-xs-7">
												<input type="text" class="form-control" v-model="creade.refValue" />
											</div>
										</div>
									</div>
									<div class="col-xs-11">
										<div class="form-group">
											<label class="control-label col-xs-4">备注</label>
											<div class="col-xs-7">
												<input type="text" class="form-control" v-model="creade.remark" />
											</div>
										</div>
									</div>
									<div class="col-xs-11">
										<div class="form-group">
											<label class="control-label col-xs-4">状态</label>
											<div class="col-xs-7">
												<select class="form-control" v-model="creade.displayType">
														<option v-for="(item, index) in showType" :value="item.value" :key="index">{{item.text}}</option>
													</select>
											</div>
										</div>
									</div>
									<div class="col-xs-11">
										<div class="form-group">
											<label class="control-label col-xs-4">状态</label>
											<div class="col-xs-7">
												<select class="form-control" v-model="creade.isDeleted">
														<option v-for="(item, index) in status" :value="item.value" :key="index">{{item.text}}</option>
													</select>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-8"></div>
									<div class="col-xs-4 text-right">
										<button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">取消</button>
										<button type="button" class="btn btn-primary" @click="type =='creade'?addSubmit():editSubmit()">确定</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
	</div>
</template>

<script>
	import pager from "../common/pager/Pager"
	import common from "../../assets/js/common.js"
	import commonConfig from "../common/commonConfig.js"
	import api from "../common/api.js"
	import {
		Toast
	} from 'mint-ui'
	export default {
		data: function() {
			return {
				required: false,
				status: [{
						value: "0",
						text: "可用"
					},
					{
						value: "1",
						text: "停用"
					}
				],
				showType: [{
						value: '0',
						text: '表'
					},
					{
						value: '1',
						text: '树状结构'
					}
				],
				tablemsg: {
					theadmsg: ["", "编码", "名称", "业务值", "项目内容展示类型", "备注", "操作"],
				},
				ref: {
					refCode: "",
					refName: ""
				},
				creade: {
					id: "",
					refCode: "",
					refName: "",
					refValue: "",
					displayType: '',
					remark: "",
					isDeleted: "",
				},
				datalist: {},
				editlist: {},
				selitem: "",
				type: "",
				modelTatle: '新增数据字典',
				startRow: "", //每页第一行数据在数据库中的序号
				// exhibit: "列表", //项目内容展示类型
				prompt: true, //无数据时提示
				// href: "",       //进入详情页面链接
				confirm: "",
				//分页数据
				pager: {
					page_no: 1, //当前页数
					page_size: 15, //每页显示数
					sort_name: 'id',
					is_desc: false
				},
				total: 1 //总条数
			}
		},
		created() {
			if (sessionStorage.refCode != undefined && sessionStorage.refName != undefined) {
				let _this = this
				_this.ref.refCode = sessionStorage.refCode
				_this.ref.refName = sessionStorage.refName
				_this.pager.page_no = parseInt(sessionStorage.page_no)
				_this.getTableData()
			}
		},
		methods: {
			clear() {
				this.ref.refCode = "";
				this.ref.refName = "";
			},
			change: function(type, id) {
				const that = this
				if (type == "creade") {
					common.triggerModal(id)
				}
				that.type = type
				that.modelTatle = '新增数据字典'
				that.creade.id = ''
				that.creade.refName = ''
				that.creade.refCode = ''
				that.creade.refValue = ''
				that.creade.displayType = '0'
				that.creade.isDeleted = '0'
				that.creade.remark = ''
				if (type == 'edit') {
					if (that.selitem) {
						common.triggerModal(id)
					}
					that.getData()
					that.modelTatle = '编辑数据字典'
					that.creade.id = that.editlist.id
					that.creade.refCode = that.editlist.refCode
					that.creade.refName = that.editlist.refName
					that.creade.refValue = that.editlist.refValue
					that.creade.displayType = that.editlist.displayType
					that.creade.remark = that.editlist.remark
					that.creade.isDeleted = that.editlist.isDeleted
				} else {
					api.ordinalInfo.getSequence({
							"serviceCode": commonConfig.ordinal.dictionary
						}).then(function(res) {
							if (res.data.code == 'success') {
								that.creade.refCode = res.data.obj
							}
						}).catch(function(error) {
							
						})
				}
			},
			//查询数据字典主表信息
			getTableData: function(pageNum) {
				const _this = this
				this.selitem = ''
				//Web存储
				sessionStorage.refCode = _this.ref.refCode
				sessionStorage.refName = _this.ref.refName
				//查询数据
				api.queryDataDictionary({
						"pageNums": commonConfig.pageNums,
						"refCode": _this.ref.refCode,
						"refName": _this.ref.refName,
						"pageStart": pageNum ? pageNum : _this.pager.page_no
					})
					.then(function(res) {
						if (res.data.code == 'success') {
							_this.datalist = res.data.obj.list
							_this.startRow = res.data.obj.startRow
							_this.pager.page_no = parseInt(res.data.obj.pageNum)
							_this.total = res.data.obj.total
							_this.pager.page_size = res.data.obj.pageSize
							if (res.data.obj.list.length == 0) {
								_this.prompt = true
							} else {
								_this.prompt = false
							}
						} else {}
					})
					.catch(function(error) {
						
					})
			},
			//分页查询
			pageChange: function(num, size) {
				this.pager.page_no = num;
				this.getTableData();
				sessionStorage.page_no = this.pager.page_no
			},
			//新增数据字典主表
			addSubmit: function() {
				const _this = this
				api.createdDataDictionary({
						"refCode": _this.creade.refCode,
						"refName": _this.creade.refName,
						"refValue": _this.creade.refValue,
						"displayType": _this.creade.displayType,
						"remark": _this.creade.remark,
						"isDeleted": _this.creade.isDeleted
					})
					.then(function(res) {
						if (res.data.code == 'success') {
							_this.getTableData()
							$("#more").modal("hide")
							Toast(commonConfig.success.add)
						}
					})
					.catch(function(error) {
					});
			},
			//编辑数据字典主表
			editSubmit: function() {
				const _this = this
				if(this.creade.refName == ''){
					this.required = true
					return
				}
				api.editDataDictionary(_this.creade)
					.then(function(res) {
						if (res.data.code == 'success') {
							_this.getTableData()
							$("#more").modal("hide")
							Toast(commonConfig.success.edit)
						} else {}
					})
					.catch(function(error) {
					});
			},
			getData: function() {
				var $this = this;
				if (!$this.selitem) {
					Toast(commonConfig.prompt.checkData);
					return;
				}
				for (var i = 0, len = this.datalist.length; i < len; i++) {
					if (this.datalist[i].refCode == $this.selitem) {
						$this.editlist = this.datalist[i]
					}
				}
			},
			codeDetail: function(code, displayType) {
				let href = "./dictionaryDetails/dictionaryDetails.html?refCode=" + code + "&&displayType=" + displayType
				window.location.href = href
			},
			//同步数据
			cache: function() {
				api.cacheDataDictionary({})
					.then((res) => {
						if (res.data.code == 'success') {
							Toast(commonConfig.success.cache)
						}
					})
					.catch(function(error) {
					});
			}
		},
		components: {
			pager
		}
	}
</script>
<style lang="scss" scoped>
	.require {
		border-color: #f86c6b !important;
	}
</style>