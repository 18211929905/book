<template>
<div class="row">
	<div class="col-md-12">
		<div class="portlet box">
			<div class="portlet-body">
				<div class="bootstrap-table bordered">
					<div class="fixed-table-toolbar">
						<div class="columns columns-right margin-bottom-10">
							<button class="btn btn-primary" title="新增" data-toggle="modal" data-target="#updata" @click="addOrUpdata(0)">新增</button>
							<button class="btn btn-success" title="更新" data-toggle="modal" data-target="#updata" @click="addOrUpdata(1)" v-if="checked">编辑</button>
							<button class="btn btn-success" title="更新" @click="addOrUpdata(1)" v-else="checked">编辑</button>
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
                                        <th class="text-center">进气方式编码</th>
                                        <th class="text-center">进气方式名称</th>
                                        <th class="text-center">进气方式缩写</th>
                                        <!--<th class="text-center">进气方式大图</th>
                                        <th class="text-center">进气方式小图</th>-->
                                        <th class="text-center">进气方式业务值</th>
                                        <th class="text-center">前缀</th>
                                        <th class="text-center">备注</th>
                                        <th class="text-center">状态</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center">
                                    <tr v-for="(data,index) in datalist">
                                        <td @click="check(index)"><input type="radio" name="radio" v-model="radioValue" :value="index"/></td>
                                        <td>{{index + 1 + (obj.pageNum-1) * 15}}</td>
                                        <td><a href="#" data-toggle="modal" data-target="#detail" @click="detail(index)">{{data.ioTypeCode}}</a></td>
                                        <td>{{data.ioTypeName}}</td>
                                        <td>{{data.ioTypeAddrName}}</td>
                                        <!--<td>{{data.ioTypeBPic}}</td>
                                        <td>{{data.ioTypeSPic}}</td>-->
                                        <td>{{data.ioTypeValue}}</td>
                                        <td>{{data.prefixValue}}</td>
                                        <td>{{data.remark}}</td>
                                        <td>{{data.isDeleted | isDeleted}}</td>
                                    </tr>
                                    <tr v-show="datalist.length == 0">
                                        <td colspan='11' class="text-left">暂无数据...</td>
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
                <!-- start-insert-modal -->
				<div class="modal fade" id="updata" aria-hidden="true">
					<div class="modal-dialog modal-wide">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
								<h4 class="modal-title text-center" v-if="!myStatus">新增车型-进气方式信息</h4>
								<h4 class="modal-title text-center" v-if="myStatus">编辑车型-进气方式信息</h4>
							</div>
							<div class="modal-body form clearfix">
									<form class="form-horizontal">
										<div class="form-body">
											<div class="row">
												<div class="col-md-12">
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">进气方式编码</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="insertParams.ioTypeCode" readonly/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">进气方式名称 *</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="insertParams.ioTypeName" placeholder="必填" :class="{ require : required}"/>
															</div>
														</div>
													</div>
                                                    <div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">进气方式缩写</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="insertParams.ioTypeAddrName"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">进气方式业务值</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="insertParams.ioTypeValue"/>
															</div>
														</div>
													</div>
												    <div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">前缀</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="insertParams.prefixValue"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">状态</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
																<select class="form-control" v-model="insertParams.isDeleted">
																	<option value="0">可用</option>
																	<option value="1">停用</option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">备注</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="insertParams.remark"/>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="pull-right">
													<div class="col-md-12">
														<input type="button" class="btn btn-default" value="取消" data-dismiss="modal">
														<input type="button" class="btn btn-primary" value="确定" @click="insert(0)"  v-if="!myStatus"/>
														<input type="button" class="btn btn-primary" value="确定" @click="insert(1)"  v-if="myStatus"/>
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
				<!-- end-insert-modal -->
				<!-- start-detail-modal -->
				<div class="modal fade" id="detail" aria-hidden="true">
					<div class="modal-dialog modal-wide">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
								<h4 class="modal-title text-center">车型-进气方式详细信息</h4>
							</div>
							<div class="modal-body form clearfix">
									<form class="form-horizontal">
										<div class="form-body">
											<div class="row">
												<div class="col-md-12">
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">进气方式编码:</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="detailParams.ioTypeCode" readonly/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">进气方式名称:</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="detailParams.ioTypeName" readonly/>
															</div>
														</div>
													</div>
                                                    <div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">进气方式缩写:</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="detailParams.ioTypeAddrName" readonly/>
															</div>
														</div>
													</div>
													<!--<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">进气方式大图:</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="detailParams.ioTypeBPic"/>
															</div>
														</div>
													</div>
												    <div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">进气方式小图:</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="detailParams.ioTypeSPic"/>
															</div>
														</div>
													</div>-->
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">进气方式业务值:</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="detailParams.ioTypeValue" readonly/>
															</div>
														</div>
													</div>
												    <div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">前缀:</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="detailParams.prefixValue" readonly/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">状态:</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
																<select class="form-control" v-model="detailParams.isDeleted" disabled>
																	<option value="0">可用</option>
																	<option value="1">停用</option>
																</select>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">备注:</label>
															<div class="col-md-7 col-lg-6 col-sm-6">
															    <input type="text" class="form-control" v-model="detailParams.remark" readonly/>
															</div>
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
				<!-- end-detail-modal -->
			</div>
		</div>
	</div>
</div>
</template>

<script>

    import api from "../../common/api.js"
	import commonConfig from "../../common/commonConfig.js"
	import {Toast} from 'mint-ui'
	import pager from '../../common/pager/Pager.vue'

    export default {
		props: {
			query: {
				type: Object,
				default: {}
			}
		},
		components: {
			pager
		},
		data() {
			return {
				datalist: [],
                insertParams: {
                    ioTypeCode: "",
                    ioTypeName: "",
                    ioTypeAddrName: "",
                    ioTypeBPic: "",
                    ioTypeSPic: "",
                    ioTypeValue: "",
                    prefixValue: "",
                    remark: "",
                    isDeleted: "0"
                },
				detailParams: {
					ioTypeCode: "",
                    ioTypeName: "",
                    ioTypeAddrName: "",
                    ioTypeBPic: "",
                    ioTypeSPic: "",
                    ioTypeValue: "",
                    prefixValue: "",
                    remark: "",
                    isDeleted: ""
				},
				ioTypeCode: '',
				pages: 1,
				pageNum: 1,
				isLastPage: false,
				obj: {},
                myStatus: '',
				checked: false,
				radioValue: -1,
				required: false
			}
		},
		methods: {
            addOrUpdata(e) {
				this.required = false
                if(!e) {
                    this.myStatus = 0;
					let _params = commonConfig.carType.inlet;
					this.insertParams = {
						ioTypeCode: "",
						ioTypeName: "",
						ioTypeAddrName: "",
						ioTypeBPic: "",
						ioTypeSPic: "",
						ioTypeValue: "",
						prefixValue: "",
						remark: "",
						isDeleted: "0"
					}
					api.ordinalInfo.getSequence({"serviceCode":_params}).then((res) => {
						if(res.data.code === 'success') this.insertParams.ioTypeCode = res.data.obj;
					});
                }else {
                    this.myStatus = 1;
                    if(this.ioTypeCode) {
                        let _params = this.ioTypeCode;
						api.carType.ioType.getQueryInfo({"ioTypeCode": _params}).then((res) => {
                            if(res.data.code === 'success') this.insertParams = res.data.obj.list[0];
                        });
                    }else {
									Toast(commonConfig.prompt.checkData);
					}
                }
            },
            insert(e) {
				let _params = this.insertParams;
				if(!this.insertParams.ioTypeName) {
					this.required = true
					return
				}
                if(!e) {
					let insertPromise = new Promise((resolve, reject) => {
						 let _ioTypeCode = _params.ioTypeCode;
						 api.carType.ioType.getInsert(_params).then((res) => {
							if( res.data.code === 'success' ) {
								Toast(commonConfig.success.add)
								resolve(_ioTypeCode);
								this.insertParams.ioTypeName = '';
								this.insertParams.ioTypeAddrName = '';
								this.insertParams.ioTypeValue = '';
								this.insertParams.prefixValue = '';
								this.insertParams.remark = '';
							}
						});
					});
					insertPromise.then((_ioTypeCode) => {
						$('#updata').modal('hide')
						this.getQueryInfo({"ioTypeCode":_ioTypeCode});
					});
                }else {
					let updataPromise = new Promise((resolve, reject) => {
						 let _ioTypeCode = this.ioTypeCode;
						 api.carType.ioType.getUpdata(_params).then((res) => {
							if( res.data.code === 'success' ) {
								Toast(commonConfig.success.edit)
								resolve(_ioTypeCode);
								this.insertParams.ioTypeName = '';
								this.insertParams.ioTypeAddrName = '';
								this.insertParams.ioTypeValue = '';
								this.insertParams.prefixValue = '';
								this.insertParams.remark = '';
								this.insertParams.isDeleted = '0';
							}
						});
					});
					updataPromise.then((_ioTypeCode) => {
						$('#updata').modal('hide')
						this.getQueryInfo({"ioTypeCode":_ioTypeCode});
					});
                }
            },
            detail(i) {
                let params = this.datalist[i].ioTypeCode;
				api.carType.ioType.getFromDB({"ioTypeCode": params}).then((res) => {
					if(res.data.code === 'success') this.detailParams = res.data.obj;
				});
			},
			check(i) {
				this.checked = true;
				this.ioTypeCode = this.datalist[i].ioTypeCode;
			},
			pageChange(s) {
				this.query.pageStart = s
				let _params = this.query;
				this.getQueryInfo(_params); 
			},
			init() {
				api.carType.ioType.init().then(function(res) {
                    if(res.data.code === 'success') {
						Toast(commonConfig.success.cache)
					}
				});
			},
			// 查询功能封装
			getQueryInfo(_params) {
				this.radioValue = -1
				this.ioTypeCode = ''
				api.carType.ioType.getQueryInfo(_params).then((res) => {
					if(res.data.code ==='success') {
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
			}
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
	.modal-dialog {
		padding-top: 150px !important;
	}
	.require {
		border-color: #f86c6b;
	}
</style>
