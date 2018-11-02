<template>
<div class="row">
	<div class="col-md-12">
		<div class="portlet box">
			<div class="portlet-body">
				<div class="bootstrap-table bordered">
					<div class="fixed-table-toolbar">
						<div class="columns columns-right margin-bottom-10">
							<a :href="url"><button class="btn btn-primary" title="新增">新增</button></a>
							<button class="btn btn-success" title="修改" data-toggle="modal" @click="change('#updata')">编辑</button>
							<button class="btn btn-info" title="配置岗位" @click="showMenuModal()">配置岗位</button>
							<button class="btn purple" title="重置密码" @click="resetPasswrod()">重置密码</button>
						</div>
					</div>
					<div class="table-container">
						<div class="fixed-table-body height-550 table-scrollable">
							<table class="table table-striped table-hover table-bordered">
									<thead>
										<tr class="text-center">
											<th v-show="datalist.length != 0"></th>
											<th class="text-center">序号</th>
											<th class="text-center">员工编码</th>
											<th class="text-center">外部员工编码</th>
											<th class="text-center">中文名称</th>
											<!-- <th class="text-center">英文名称</th> -->
											<th class="text-center">登录系统账号</th>
											<!-- <th class="text-center">前缀</th> -->
											<th class="text-center">组织名称</th>
											<th class="text-center">员工岗位</th>
											<!-- <th class="text-center">门店编码</th> -->
											<th class="text-center">类型</th>
											<th class="text-center">状态</th>
											<th class="text-center">性别</th>
											<!-- <th class="text-center">是否在职</th> -->
											<!-- <th class="text-center">考勤卡号</th> -->
											<!-- <th class="text-center">生日</th> -->
											<!-- <th class="text-center">身份证号</th> -->
											<!-- <th class="text-center">电话</th> -->
											<!-- <th class="text-center">手机</th> -->
											<!-- <th class="text-center">银行账号</th> -->
											<!-- <th class="text-center">电子邮件</th> -->
											<!-- <th class="text-center">地址</th> -->
											<th class="text-center">备注</th>
										</tr>
									</thead>
									<tbody class="text-center">
										<tr v-for="(data, index) in datalist">
											<td @click="check(index)"><input type="radio"  name="radio" v-model="selectedColumn" :value="index"/></td>
											<td>{{index + 1 + (obj.pageNum-1) * 15}}</td>
											<td>
												<a href="#" data-toggle="modal" data-target="#queryAllInfo" @click.prevent="detail(index)">{{data.empCode}}</a>
											</td>
											<td>{{data.externalCode}}</td>
											<td>{{data.empCnName}}</td>
											<!-- <td>{{data.empEnName}}</td> -->
											<td>{{data.loginName}}</td>
											<!-- <td>{{data.prefixValue}}</td> -->
											<td>{{data.orgName}}</td>
											<td>{{ data.postName }}</td>
											<!-- <td>{{data.postName}}</td>	 -->
											<!-- <td>{{data.storeCode}}</td> -->
											<td>{{data.empTypeName}}</td>
											<td>{{data.empStatus}}</td>
											<td>{{data.empSex | sex}}</td>
											<!-- <td>{{data.onJob | job}}</td> -->
											<!-- <td>{{data.empCheckinCard}}</td> -->
											<!-- <td>{{data.empBirthday | birthday}}</td> -->
											<!-- <td>{{data.empIdcard}}</td> -->
											<!-- <td>{{data.empPhone}}</td> -->
											<!-- <td>{{data.empMobile}}</td> -->
											<!-- <td>{{data.empBankno}}</td> -->
											<!-- <td>{{data.empEmail}}</td> -->
											<!-- <td>{{data.empAddress}}</td> -->
											<td>{{data.remark}}</td>
										</tr>
										<tr v-show="datalist.length == 0">
											<td colspan='22' class="text-left">暂无数据...</td>
										</tr>
								  </tbody>
							</table>
						</div>
						<!-- <div class="fixed-table-pagination clearfix">
							<div class="row pull-right">
								<div class="col-md-12 pagination">
									<span class="margin-right-10">第 {{pageNum}} 页 / 共 {{pages}} 页  </span>
									<button class="pageStyle" @click="changePage(1)" v-if="pageNum>1">
										<a href="javascript:;"><span>上一页</span></a>
									</button>
									<button class="pageStyle" @click="changePage(0)" v-if="!isLastPage && pages>1" >
										<a href="javascript:;"><span>下一页</span></a>
									</button>
								</div>
							</div>
						</div> -->

						<pager class="margin-left-10" @page-change="pageChange"
						:page-no="obj.pageNum"
						:page-size="obj.pageSize"
						:total-result="obj.total">
						</pager>
					</div>
				</div>
				<div class="modal fade" id="updata" aria-hidden="true">
					<div class="modal-dialog modal-wide">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
								<h4 class="modal-title text-center">编辑员工信息</h4>
							</div>
							<div class="modal-body form clearfix">
									<form class="form-horizontal">
										<div class="form-body">
											<p class="h3">主档信息</p>
											<div class="row">
												<!-- <div class="col-md-12">
													<div class="row"> -->
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">员工编码:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.empCode" readonly/>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">员工号:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.externalCode"/>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">中文名称:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.empCnName"/>
																</div>
															</div>
														</div>
													<!-- </div> -->
													<!-- <div class="row"> -->
                            							<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">英文名称:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.empEnName"/>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">系统账号:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.loginName"/>
																</div>
															</div>
														</div>
													<!-- </div> -->
													<!-- <div class="row"> -->
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">地址:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.empAddress"/>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">前缀:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.prefixValue"/>
																</div>
															</div>
														</div>
													<!-- </div> -->
													<!-- <div class="row"> -->
														<div class="col-md-6">
															<div class="form-group" @click="_orgCheck">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">组织名称:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<div class="dropdown">
																	<input id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="form-control text-left" v-model="updataParams.orgName" readonly/>
																	<div v-if="orgCheck" class="tree-box">
																		<div class="warp">
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
																	</div>
																</div>
																</div>
															</div>
														</div>
														<!-- <div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">门店编码:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.storeCode"/>
																</div>
															</div>
														</div> -->
													<!-- </div> -->
													<!-- <div class="row"> -->
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">类型:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<select class="form-control" v-model="updataParams.empType">
																		<option :value="item.value" v-for="item in empTypeList">{{item.text}}</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">状态:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<select class="form-control" v-model="updataParams.empStatus">
																		<option>正式员工</option>
																		<option>临时员工</option>
																	</select>
																</div>
															</div>
														</div>
													<!-- </div> -->
													<!-- <div class="row"> -->
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">性别:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<select class="form-control" v-model="updataParams.empSex">
																		<option value="1">男</option>
																		<option value="0">女</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">是否在职:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<select class="form-control" v-model="updataParams.onJob">
																		<option :value="0">离职</option>
																		<option :value="1">在职</option>
																	</select>
																</div>
															</div>
														</div>
													<!-- </div> -->
													<!-- <div class="row"> -->
                                                         <div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">考勤卡号:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.empCheckinCard"/>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">生日:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<datepicker  v-model="updataParams.empBirthday" language="ch" ></datepicker>
																</div>
															</div>
														</div>
													<!-- </div> -->
													<!-- <div class="row"> -->
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">身份证号:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.empIdcard"/>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">电话:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.empPhone"/>
																</div>
															</div>
														</div>
													<!-- </div> -->
													<!-- <div class="row"> -->
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">手机:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.empMobile"/>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">银行账号:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.empBankno"/>
																</div>
															</div>
														</div>
													<!-- </div> -->
													<!-- <div class="row"> -->
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">电子邮件:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" v-model="updataParams.empEmail"/>
																</div>
															</div>
														</div>
													<!-- </div> -->
													<!-- <div class="row"> -->
														<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">备注:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<textarea type="text" class="form-control" v-model="updataParams.remark"/>
																</div>
															</div>
														</div>
													<!-- </div> -->
												<!-- </div> -->
											</div>
											<p class="h3">附加信息</p>
											<div class="row">
											    <div class="col-md-12">
													<div class="col-md-6" v-for="(val, key) in updataParams.simpleEmpAddInfoMaps">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">{{key}}</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															<input type="text" class="form-control" v-model="updataParams.simpleEmpAddInfoMaps[key]"/>
															</div>
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
				<div class="modal fade" id="queryAllInfo" aria-hidden="true">
					<div class="modal-dialog modal-wide">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
								<h4 class="modal-title text-center">员工详细信息</h4>
							</div>
							<div class="modal-body form clearfix">
									<form class="form-horizontal">
										<div class="form-body">
											<p class="h3">主档信息</p>
											<div class="row">
												<div class="col-md-12">
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">员工编码:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empCode"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
															<div class="form-group">
																<label class="control-label col-md-5 col-lg-4 col-sm-5">员工号:</label>
																<div class="col-md-7 col-lg-5 col-sm-6">
																	<input type="text" class="form-control" :value="queryAllInfo.externalCode" readonly/>
																</div>
															</div>
														</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">中文名称:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empCnName"/>
															</div>
														</div>
													</div>
                                                    <div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">英文名称:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empEnName"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">系统账号:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.loginName"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">前缀:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.prefixValue"/>
															</div>
														</div>
													</div>
												    <div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">组织名称:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
																<div class="dropdown">
																<input id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="form-control text-left" v-model="queryAllInfo.orgName" readonly/>

															</div>
															</div>
														</div>
													</div>
													<!-- <div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">门店编码:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.storeCode"/>
															</div>
														</div>
													</div> -->
										            <div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">类型:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
																	<select class="form-control" v-model="queryAllInfo.empType" disabled>
																		<option :value="item.value" v-for="item in empTypeList">{{item.text}}</option>
																	</select>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">状态:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empStatus"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">性别:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empSex | sex"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">是否在职:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.onJob | job"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">考勤卡号:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empCheckinCard"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">生日:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empBirthday | birthday"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">身份证号:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empIdcard"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">电话:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empPhone"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">手机:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empMobile"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">银行账号:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empBankno"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">电子邮件:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empEmail"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">地址:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.empAddress"/>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">备注:</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
															    <input type="text" class="form-control" readonly="readonly" :value="queryAllInfo.remark"/>
															</div>
														</div>
													</div>
												</div>
											</div>
                      <p class="h3">附加信息</p>
											<div class="row">
											    <div class="col-md-12">
													<div class="col-md-6" v-for="(val, key) in queryAllInfo.simpleEmpAddInfoMaps">
														<div class="form-group">
															<label class="control-label col-md-5 col-lg-4 col-sm-5">{{key}}</label>
															<div class="col-md-7 col-lg-5 col-sm-6">
<!-- v-model="queryAllInfo.simpleEmpAddInfoMaps[key]" 这个问题导致线上打包错误( 应该是编辑的时候使用v-model, 展示的时候使用value, 我的锅...) -->
															<input type="text" class="form-control" :value="val" readonly="readonly"/>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="pull-right">
													<div class="col-md-12">
														<input type="button" class="btn btn-default" value="取消" data-dismiss="modal">
														<input type="button" class="btn btn-primary" value="确定" data-dismiss="modal"/>
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
			</div>
		</div>
	</div>
</div>
</template>

<script>
import common from "../../assets/js/common.js";
import commonConfig from "../common/commonConfig.js";
import api from "../common/api.js";
import { Toast } from "mint-ui";
import { MessageBox } from 'element-ui';
import datepicker from "vue-date";
import Vue from "vue";
import ZTree from "../common/tree.vue";
import pager from "../common/pager/Pager.vue";

Vue.use(ZTree);

export default {
    name: "Tree2",
    props: {
        query: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            datalist: [],
            queryAllInfo: {
                empCode: "",
                empCnName: "",
                empEnName: "",
                loginName: "",
                loginPasswd: "",
                prefixValue: "",
                orgCode: "",
                storeCode: "",
                empType: "",
                empStatus: "",
                empSex: 0,
                onJob: 0,
                empCheckinCard: "",
                empBirthday: "",
                empIdcard: "",
                empPhone: "",
                empMobile: "",
                empBankno: "",
                empEmail: "",
                empAddress: "",
                remark: "",
                simpleEmpAddInfoMaps: {}
            },
            updataParams: {
								empCode: "",
								externalCode: '',
                empCnName: "",
                empEnName: "",
                loginName: "",
                loginPasswd: "",
                prefixValue: "",
                orgCode: "",
                storeCode: "",
                empType: "",
                empStatus: "",
                empSex: "",
                onJob: "",
                empCheckinCard: "",
                empBirthday: "",
                empIdcard: "",
                empPhone: "",
                empMobile: "",
                empBankno: "",
                empEmail: "",
                empAddress: "",
                remark: "",
                simpleEmpAddInfoMaps: {}
            },
            updataEmpCode: "",
            pages: 1,
            pageNum: 1,
            isLastPage: false,
            obj: {},
            items: [], //你的去留 -> 取决于 -> 修改附加信息要不要从数据字典中重新拉取
            additional: {}, //同上
            checked: false,
            selectedColumn: -1,
            orgCheck: false,
            treeData: [],
            options: {
                showCheckbox: false,
                halfCheckedStatus: false, //控制父框是否需要半钩状态
                lazy: true,
                load: this.loadingChild,
                showSearch: false,
                rootName: "总部",
                labelKey: "label",
                iconClass: {
                    close: "icon-youjiantou",
                    open: "icon-xiajiantou",
                    add: "icon-add"
                },
                iconStyle: {
                    color: "#108ee9"
                },
                dynamicAdd: false,
                dynamicAddFilter: node => {
                    if (node.type === 1 || node.type === 2) {
                        return true;
                    }
                    return false;
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
            treeRootCode: commonConfig.nodeCode.organizationCode.orgCode, //点击树根节点获取的相关编码
            url: commonConfig.menuMap["000082"],
            empTypeList: []
        };
    },
    created() {
        this.getEmpType();
    },
    methods: {
        // 获取员工类型
        getEmpType() {
            const params = { refCode: commonConfig.employee.type };
            api.queryDictionaryDetails(params).then(res => {
                if (res.data.code === "success") {
                    let list = res.data.obj.list;
                    list.forEach(item => {
                        let data = {
                            value: item.refDetailCode,
                            text: item.refDetailName
                        };
                        this.empTypeList.push(data);
                    });
                }
            });
        },
        detail(i) {
            let params = this.datalist[i].empCode;
            api.getQueryAllInfo({ empCode: params }).then(res => {
                if (res.data.code === "success")
                    this.queryAllInfo = res.data.obj;
            });
        },
        // 配置组织岗位
        showMenuModal: function() {
            if (parseInt(this.selectedColumn) == -1) {
                Toast(commonConfig.prompt.checkData);
                return;
            }
            let params = this.datalist[parseInt(this.selectedColumn)];
            this.$emit("show-config", params);
        },
        resetPasswrod: function() {
			let _this = this
            let h = _this.$createElement
            if (this.checked) {
                let _params = {
                    empCode: this.updataEmpCode,
                    id: this.updataEmpId
                };
                MessageBox({
                       title: '提示',
                       message: h('h4','确定重置密码!'),
                       showCancelButton: true,
                       confirmButtonText: '确定',
                       cancelButtonText: '取消',
                       type: 'warning',
                       callback: (action, instance) => {
                           if(action === 'confirm') {
                              api.resetPasswrod(_params).then(res => {
                                  Toast(commonConfig.success.resetPasswrod);
                              })
                           }
                       }
                    })
            } else {
                Toast(commonConfig.prompt.checkData);
            }
        },
        check(i) {
            this.checked = true;
            this.updataEmpCode = this.datalist[i].empCode;
            this.updataEmpId = this.datalist[i].id;
        },
        // 修改
        change(id) {
            if (this.checked) {
                common.triggerModal(id);
                let _params = this.updataEmpCode;
                api.getQueryAllInfo({ empCode: _params }).then(res => {
                    if (res.data.code === "success") {
                        this.updataParams = res.data.obj;
                        this.updataParams.loginPasswd = "";
                        if (res.data.obj.empBirthday)
                            this.updataParams.empBirthday = res.data.obj.empBirthday.substr(
                                0,
                                10
                            );
                    }
                });
                // api.getDataDictionary({"refCode":commonConfig.empRefCode}).then((res) => {
                // 	if(res.data.code === 'success') this.items = res.data.obj.referenceDetailInfos;
                // });
            } else {
                Toast(commonConfig.prompt.checkData);
            }
        },
        // 修改 - 确定
        updata() {
            //this.updataParams.simpleEmpAddInfoMaps = this.additional;
            let _params = this.updataParams;
            api.getUpdataInfo(_params).then(res => {
                if (res.data.code === "success") {
                    Toast(commonConfig.success.edit);
                }
            });
            //this.additional = {};
        },

        pageChange(s) {
            this.query.pageStart = s;
            let _params = this.query;
            this.getQueryInfo(_params);
        },
        /* getQueryInfo(params) {
            this.selectedColumn = -1;
            api.getQueryMainInfo(params).then(res => {
                if (res.data.code === "success") {
                    this.obj = res.data.obj;
					this.datalist = this.obj.list;
					let forArr = this.obj.list
					let tempArr= []
					for(let i = 0; i< forArr.length; i++) {
						tempArr.push(forArr[i].empCode)
					}
					let option = {
						empCodeSet: tempArr,
						inCharge: '1'
					}
					api.getPositionByMan(option).then(res => {
						if(res.data.code === 'success') {
							let backData = res.data.obj
							for(let j =0; j<this.datalist.length; j++) {
								for(let k=0; k<backData.length; k++) {
									if(this.datalist[j].empCode === backData[k].empCode) {
										this.datalist[j].postName = backData[k].postName
									}
								}
							}
							this.datalist = JSON.parse(JSON.stringify(this.datalist))
						}
					})
                }
            });
		}, */
		getQueryInfo(params){
			this.selectedColumn = -1;
            api.queryMainEmployeeInfoByPost(params).then(res => {
                if (res.data.code === "success") {
                    this.obj = res.data.obj;
					this.datalist = JSON.parse(JSON.stringify(this.obj.list))
                }
            });
		},
        _orgCheck() {
            this.orgCheck = !this.orgCheck;
            this.getTree();
        },
        // 树状图
        getTree() {
			// let _params = commonConfig.nodeCode.organizationCode.orgCode; //组织根节点code
			let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
			let _params = userInfo['inCharegOrgVo'].orgCode; //员工组织编码
            let _this = this;
            api.organzation
                .getOrganizationByOrgCode({ orgCode: _params })
                .then(function(res) {
                    if (res.data.code === "success") {
                        if (res.data.obj) {
							_this.treeData = [];
							_this.treeRootCode = res.data.obj.orgCode;
                            _this.options.rootName = res.data.obj.orgName;
                            let childOrganizations =
                                res.data.obj.childOrganizations;
                            if (childOrganizations) {
                                childOrganizations.forEach((item, index) => {
                                    let treeData = {
                                        label: item.orgName,
                                        orgCode: item.orgCode,
                                        children: [],
                                        open: false,
                                        leaf: false
                                    };
                                    _this.treeData.push(treeData);
                                });
                            }
                            // console.log(_this.treeData)
                        } else {
                            Toast("暂无数据！");
                        }
                    }
                });
        },
        getRootAdd(rootCode) {
            this.updataParams.orgName = this.options.rootName;
            this.updataParams.orgCode = rootCode;
        },
        addClick(node) {
            this.updataParams.orgCode = node.orgCode;
            this.updataParams.orgName = node.label;
        },
        async loadingChild(node, index) {
            //   console.log(node, index);
            let _this = this; //没用到  可删
            try {
                let data = await new Promise((resolve, reject) => {
                    api.organzation
                        .getOrganizationByOrgCode({ orgCode: node.orgCode })
                        .then(function(res) {
                            if (res.data.code === "success") {
                                if (res.data.obj) {
                                    let childOrganizations =
                                        res.data.obj.childOrganizations;
                                    if (childOrganizations) {
                                        childOrganizations.forEach(
                                            (item, index) => {
                                                let treeData = {
                                                    label: item.orgName,
                                                    orgCode: item.orgCode,
                                                    children: [],
                                                    open: false,
                                                    leaf: false
                                                };
                                                node.loading = false;
                                                node.open = true;
                                                node.children.push(treeData);
                                            }
                                        );
                                    } else {
                                        node.loading = false;
                                        node.leaf = true;
                                    }
                                } else {
                                    Toast("暂无数据！");
                                }
                            }
                        });
                });
                let tem = this.getParentNode(node, this.treeData);
                // set Children
                //Vue.set(tem, 'children', generateKey(data, node.key));
                Vue.set(tem, "children", data);
                Promise.resolve(data);
            } catch (e) {
                Promise.reject(e);
            }
        },
        async addNode(item) {
            let parent = this.getParentNode(item, this.treeData);
            let node = {
                id: 2,
                label: "一级节点",
                open: false,
                checked: false,
                nodeSelectNotAll: false,
                parentId: null,
                visible: true,
                searched: false
            };
            if (
                !item.hasOwnProperty("children") ||
                item.children.length === 0
            ) {
                await this.loadingChild(parent);
            }
            parent.open = true;
            parent.children.splice(
                0,
                0,
                Object.assign(
                    {},
                    {
                        dynamicAdd: true,
                        loaded: true
                    },
                    node
                )
            );
            //                generateKey(parent.children, parent.key) // regenerate key
            return Promise.resolve(true);
        },
        async saveNode(item, e) {
            if (!e.target.value) {
                return;
            }
            return new Promise((resolve, reject) => {
                // todo sent data to sever
                delete item.dynamicAdd; // 删除属性
                Vue.set(item, "label", e.target.value);
                e.target.value = "";
                setTimeout(() => {
                    resolve(item);
                }, 1000);
            });
        },
        generateKey(treeData = [], parentKey = "0") {
            let _this = this;
            treeData = treeData.map((item, i) => {
                item.key = parentKey + "-" + i.toString();
                if (
                    item.hasOwnProperty("children") &&
                    item.children.length > 0
                ) {
                    _this.generateKey(item.children, item.key);
                }
                return item;
            });
            return treeData;
        },
        getParentNode(node = {}, treeData = []) {
            let tem;
            let postions = node.key.split("-");
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
            return tem;
        },
        leafIcon(node) {
            return "";
        }
    },
    // watch: {
    //   query: function(value) {
    //     api.getQueryMainInfo(value).then(res => {
    //       if (res.data.code === "success") {
    //         let obj = res.data.obj;
    //         this.obj = obj;
    //         this.datalist = obj.list;
    //         this.pages = obj.pages;
    //         this.pageNum = obj.pageNum;
    //         this.isLastPage = obj.isLastPage;
    //         this.checked = false;
    //         if (!obj.pages) this.pages = 1;
    //       }
    //     });
    //   }
    // },
    components: {
        datepicker,
        ZTree: ZTree,
        pager
    },
    filters: {
        sex: function(value) {
            if (value == 0) {
                return "女";
            } else {
                return "男";
            }
        },
        job: function(value) {
            if (value == 1) {
                return "在职";
            } else {
                return "离职";
            }
        },
        birthday: function(value) {
            if (value) {
                return value.substr(0, 10);
            } else {
                return "";
            }
        }
    }
};
</script>

<style>
.pageStyle {
    padding: 6px 12px;
}
.pageStyle a {
    line-height: 1.428571429;
    text-decoration: none;
}
.dropdown {
    position: relative;
}
.warp {
    padding-left: 20px;
}
.tree-box {
    position: absolute;
    z-index: 999;
    background-color: #fff;
    width: 140%;

    max-height: 200px;
    overflow-y: scroll;
    margin-top: 3px;
    border: 1px solid #ccc;
}
</style>
