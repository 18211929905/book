<template>
<div class="row margin-top-20">
	<div class="col-md-12">
	<div class="portlet box">
	  <div class="portlet-body form"> 
	    <!--FORM BEGIN-->
	    <form class="form-horizontal">
	      <div class="form-body">
	        <div class="row">
	           <div class="col-md-5 col-lg-5 col-sm-5">
	              <div class="form-group">
	                 <label class="control-label col-md-5 col-lg-4 col-sm-5">员工编码:</label>
	                 <div class="col-md-7 col-lg-5 col-sm-6">
	                   <input type="text" class="form-control" v-model="info.empCode"/>
	                </div>
	              </div>
	           </div>
	           <div class="col-md-5 col-lg-5 col-sm-5">
	             <div class="form-group">
	               <label class="control-label col-md-5 col-lg-4 col-sm-5">中文名称:</label>
	               <div class="col-md-7 col-lg-5 col-sm-6">
	                 <input type="text" class="form-control" v-model="info.empCnName"/>
	               </div>
	             </div>
	           </div>
	           <div class="col-md-2"></div>
	        </div>
         
				  <div class="row">
						<div class="col-md-5 col-lg-5 col-sm-5">
							<div class="form-group">
									<label class="control-label col-md-5 col-lg-4 col-sm-5">手机:</label>
									<div class="col-md-7 col-lg-5 col-sm-6">
										<input type="text" class="form-control" v-model="info.empMobile"/>
									</div>
							</div>
						</div>
						<div class="col-md-5 col-lg-5 col-sm-5">
							<div class="form-group">
									<label class="control-label col-md-5 col-lg-4 col-sm-5">类型:</label>
									<div class="col-md-7 col-lg-5 col-sm-6">
										<select class="form-control" v-model="info.empType">
											<option :value="item.value" v-for="item in empTypeList">{{item.text}}</option>
										</select>
									</div>
							</div>
						</div>
						<div class="col-md-2"></div>
					</div>

				  <div class="row">
	           <div class="col-md-5 col-lg-5 col-sm-5">
	              <div class="form-group">
	                 <label class="control-label col-md-5 col-lg-4 col-sm-5">登录系统账号:</label>
	                 <div class="col-md-7 col-lg-5 col-sm-6">
	                   <input type="text" class="form-control" v-model="info.loginName"/>
	                </div>
	              </div>
	           </div>
	           <div class="col-md-5 col-lg-5 col-sm-5">
							   <div class="form-group">
                    <label class="control-label col-md-5 col-lg-4 col-sm-5 text-right">组织名称:</label>
                    <div class="col-md-7 col-lg-5 col-sm-6" @click="orgClick" ref="org">
                       <input type="text" class="form-control" readonly v-model="info.orgName"/>
                    </div>
                    <div class="text-left select-tree" v-show="orgShow && !disabled" >
                        <el-tree 
                             :data="orgTreeData" 
                             :props="orgOptions" 
                             :load="orgLoad" node-key="id" 
                             lazy accordion check-strictly 
                             :default-expanded-keys="[0]" 
                             :expand-on-click-node="false" 
                             @node-click="orgItemClick">
                        </el-tree>
                    </div>
                </div>
	           </div>
	           <div class="col-md-2"></div>
	        </div>
			
					<div class="row">
	          <div class="pull-right">
								<div class="col-md-12">
									<input type="reset" class="btn btn-default" @click="oReset" value="重置">
									<input type="button" class="btn btn-primary" @click="query" value="查询">
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
import { getPostTypeList } from "./com-api";
import commonConfig from "components/common/commonConfig";
import api from "../common/api.js";

import Vue from 'vue'
import { Tree } from 'element-ui'
Vue.use(Tree)

export default {
    data: function() {
        return {
            info: {
                empCode: "",
                empCnName: "",
                empType: "",
                empMobile: "",
                pageNums: 15,
								pageStart: 1,
								loginName: '',
								orgName: ''
						},
						disabled:false,
            empTypeList: [],
            // org - tree
						orgTreeData: [],
						orgOptions: {
								children: 'children',
								label: 'name'
						},
						orgShow: false,
        };
		},
		created() {
			api.getUserAvailableInfo((msg) => {
                if (msg.data.message === 'success') {
                    this.availableType = msg.data.obj.availableType
                    if (this.availableType === '0') {
												let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
												this.info.orgCode = userInfo['inCharegOrgVo'].orgCode
												this.info.orgName = userInfo['inCharegSubOrgVo'].orgName
                        this.disabled = true
                    }
                }
            })
		},
    mounted() {
        getPostTypeList(this.empTypeList, commonConfig.employee.type);
    },
    methods: {
        query() {
					console.log(JSON.stringify(this.info))
            this.$emit("go", this.info);
        },
        oReset() {
            this.info = {
                empCode: "",
                empCnName: "",
                empType: "",
                empMobile: "",
                pageNums: 15,
								pageStart: 1,
								loginName: '',
								orgName: this.info.orgName,
								orgCode: this.info.orgCode,								
            };
        },
        // 获取组织
				orgLoad(node, resolve) {
						if (node.level === 0) {
								let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
								let orgCode = userInfo['inCharegOrgVo'].orgCode
								let params = { orgCode: orgCode };
								// let params = { orgCode: "000001" };
								api.organzation.getOrganizationByOrgCode(params).then(res => {
										if (res.data.code === 'success') {
												let obj = res.data.obj;
												let arr = [{
														id: 0,
														name: obj.orgName,
														code: obj.orgCode
												}];
												return resolve(arr);
										}
								})
						} else {
								let params = { orgCode: node.data.code };
								api.organzation.getOrganizationByOrgCode(params).then(res => {
										if (res.data.code === 'success') {
												let items = res.data.obj.childOrganizations;
												let arr = [];
												if (items !== null) {
														items.forEach((item, index) => {
																let data = {
																		name: item.orgName,
																		code: item.orgCode
																}
																arr.push(data)
														})
												} else {
														return resolve([])
												}
												return resolve(arr)
										}
								})
						}
				},
				orgItemClick(data) {
						this.info.orgName = data.name
						this.info.orgCode = data.code
						this.orgShow = false
				},
				orgClick() {
						this.orgShow = !this.orgShow;
				},
    }
};
</script>

<style>
.select-tree {
    position: absolute;
    right: 0;
    margin-top: 40px;
    width: 62%;
    z-index: 1000;
}

.el-tree {
    max-height: 300px;
    overflow-y: scroll;
}
</style>
