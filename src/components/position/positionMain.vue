<template>
    <div>
        <!--查询部分-->
        <div class="row margin-top-20">
            <div class="col-md-12">
                <div class="portlet box">
                    <div class="portlet-body form">
                        <!--FORM BEGIN-->
                        <form class="form-horizontal">
                            <div class="form-body">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="control-label col-md-4">岗位编码</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" v-model="postCode" @keyup.enter="getPositionList()"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="control-label col-md-4">岗位名称</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" v-model="postName" @keyup.enter="getPositionList()"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2"></div>
                                    </div>
                                    <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="control-label col-md-4">组织名称:</label>
                                            <div class="col-md-8" @click="orgClick" ref="org">
                                                <input type="text" class="form-control" readonly v-model="orgName"/>
                                            </div>
                                            <div class="text-left select-tree" v-show="orgShow && !disabled">
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
                                    <div class="col-md-7"></div>
                                    </div>
                                    <div class="col-md-12 text-right">
                                        <button type="button" class="btn btn-default" @click="reset()">重置</button>
                                        <button type="button" class="btn btn-primary" @click="getPositionList(1)">查询</button>
                                    </div>
                                
                            </div>
                        </form>
                        <!--FORM END-->
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
                            <button class="btn btn-primary" title="新增" type="button" data-toggle="modal" @click="change('created', '#position')">新增</button>
                            <button class="btn btn-success" title="更新" type="button" data-toggle="modal" @click="change('edit', '#position')">编辑</button>
                            <button class="btn btn-info" title="添加角色" type="button" data-toggle="modal" @click="getRole()">添加角色</button>
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
                                        <th class="text-center">组织名称</th>
                                        <!-- <th class="text-center">岗位编码</th> -->
                                        <th class="text-center">岗位名称</th>
                                        <th class="text-center">岗位类型</th>
                                        <th class="text-center">状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in detailList" :key="index">
                                        <td class="text-center"><input type="radio" name="dictionaryDetails" v-model="selitem" :value="item.postCode"></td>
                                        <td>{{index + startRow}}</td>
                                        <td>{{item.orgName}}</td>
                                        <!-- <td>{{item.postCode}}</td> -->
                                        <td>{{item.postName}}</td>
                                        <td>{{item.postTypeName}}</td>
                                        <td class="text-center">{{item.isDeleted == '0'?"可用":"停用"}}</td>
                                    </tr>
                                    <tr v-if="prompt">
                                        <td colspan="10">暂无数据...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <pager class="margin-left-10" @page-change="pageChange"
                                                        :page-no="pager.page_no"
                                                        :page-size="pager.page_size"
                                                        :total-result="total">
                        </pager>
                    </div>
                </div>
            </div>
        </div>
        <!--新增/编辑模态框-->
        <div class="modal fade" id="position" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog  modal-wide">
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
                        <div class="row">
                            <div class="col-md-6 tree-height">
                                <ZTree ref='tree'
                                        :treeData="treeData"
                                        :options="options"
                                        :rootOrgCode="rootOrgCode"
                                        @node-click="addClick"
                                        @add-node="addNode"
                                        :key="2"
                                        @root-click="getRootAdd"
									    :treeRootCode="treeRootCode">
                                </ZTree>
                            </div>
                            <div class="col-md-6">
                                <form class="form-horizontal">
                                    <div class="form-body row">
                                        <div class="row">
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">组织名称</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.orgName" @click="getTreeType('orgCode')" readonly/> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">上级岗位</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.fatherPostName" @click="getTreeType('postCode')" readonly/> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">岗位编码</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.postCode" readonly/> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">岗位名称</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.postName"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">岗位类型</label>
                                                    <div class="col-xs-7">
                                                        <select class="form-control" v-model="edit.postTypeCode">
                                                            <option v-for="(item, index) in positionType" :value="item.value" :key="index">{{item.text}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">状态</label>
                                                    <div class="col-xs-7">
                                                        <select class="form-control" v-model="edit.isDeleted">
                                                            <option v-for="(item, index) in status" :value="item.value" :key="index">{{item.text}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-11">
                                                <div class="form-group">
                                                    <label class="control-label col-xs-4">备注</label>
                                                    <div class="col-xs-7">
                                                        <input class="form-control" type="text" v-model="edit.remark"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12 text-right">
                                                <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">取消</button>
                                                <button type="button" class="btn btn-primary" @click="type =='edit'?editPosition():createdPosition()">确定</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
        <select-modal
                :show="showMenuModal"
                :options="selectOptions"
                :initOptionalItems="initOptionalItems"
                :initSelectedItems="initSelectedItems"
                @close-select-modal="disappearMenuModal"
                @commit="insertRoleMenus">
        </select-modal>
    </div>
</template>
<script>
    import pager from "../common/pager/Pager"
    import selectModal from "../common/selectModal"
    import common from "../../assets/js/common.js"
	import commonConfig from "../common/commonConfig.js"
	import api from "../common/api.js"
    import ZTree from "../common/tree.vue"
    import Vue from 'vue'
    import {Toast} from 'mint-ui'
    import { Tree } from 'element-ui'
    Vue.use(Tree)
    Vue.use(ZTree)
    export default {
        data: function () {
            return {
                orgTreeData: [],
                orgOptions: {
                    children: 'children',
                    label: 'name'
                },
                orgCode:"",
                orgName:"",
                orgShow : false,
                disabled : false,
                status: [
                    {
                        value: "0",
                        text: "可用"
                    },
                    {
                        value: "1",
                        text: "停用"
                    },
                ],
                postCode: "",
                postName: "",
                edit: {
                    id: "",
                    postCode: "",
                    postName: "",
                    orgCode: commonConfig.storeRoot.orgCode,
                    orgName: '',
                    fatherPostCode: commonConfig.storeRoot.postCode,
                    fatherPostName: "",
                    relationCodeList: "",
                    postTypeCode: "",
                    remark: "",
                    isDeleted: "0"
                },
                detailList: {},
                editlist: {},
                organzationCode: {},
                positionType: [],        //岗位类型
                roleList: {},            //角色信息列表
                checkedRoles: [],        //选中的角色
                Selected: [],
                cancelSelected: [],
                startRow: "",           //每页第一行数据在数据库中的序号
                prompt: true,           //无数据时提示
                type: '',
                selitem: '',
				// status: "可用",
                modelTatle: "新增岗位信息",   //模态框标题
                //分页数据
				pager: {
                    page_no: 1,  //当前页数
                    page_size: 15, //每页显示数
                    sort_name: 'id',
                    is_desc: false
                },
                total: 1,  //总条数
                treeData: [],
                options: {
					showCheckbox: false,
					halfCheckedStatus: false, //控制父框是否需要半钩状态
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
                treeRootCode: commonConfig.nodeCode.rootPostionCode,            //点击树根节点获取的上级职位编码
                rootOrgCode: commonConfig.nodeCode.organizationCode.orgCode,    //点击树根节点获取的组织编码
                showMenuModal: false,           // 控制弹出框显示与否标志位
                selectOptions: {
                    title: '岗位添加角色', //多选弹出框主标题
                    optionalTitle: '岗位没有的角色', //多选弹出框可选项标题
                    selectedIitle: '岗位已有的角色' //多选弹出框已选项标题
                },
              initOptionalItems: [], //初始化可选项
              initSelectedItems: [], //初始化已选项
              treeName: "orgCode",
            }
        },
        created () {
            const _this = this
            api.organzation.queryOrganization({
                "orgCode": "",
                "orgName": "",
                "pageNums": commonConfig.pageNums,
                "pageStart": "0"
            })
            .then(function (res) {
                if(res.data.code == 'success') {
                    _this.organzationCode = res.data.obj.list
                } else {
                }
            })
            api.queryDictionaryDetails({
                "refCode": commonConfig.acquireType.refPosition,
                "refName": "",
                "pageNums": commonConfig.maxpageNums,
                "pageStart": "0",
                'isDeleted':'0'
            })
            .then(function (res) {
                if(res.data.code == 'success') {
                    let posType = res.data.obj.list
                    for(let i = 0, len=posType.length; i<len; i++) {
                        let obj = {};
                        obj.value = posType[i].refDetailCode;
                        obj.text = posType[i].refDetailName;
                        _this.positionType.push(obj)
                    }
                    
                } else {
                }
            })
            api.getUserAvailableInfo((msg) => {
                if (msg.data.message === 'success') {
                    this.availableType = msg.data.obj.availableType
                    if (this.availableType === '0') {
                        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
                        this.orgCode = userInfo['inCharegOrgVo'].orgCode
                        this.orgName = userInfo['inCharegSubOrgVo'].orgName
                        this.disabled = true
                    }
                }
            })
        },
        methods: {
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
            orgClick() {
                this.orgShow = !this.orgShow;
            },
            orgItemClick(data) {
                this.orgName = data.name
                this.orgCode = data.code
                this.orgShow = false
            },
            reset() {
                this.postCode = '';
                this.postName = '';
                if(!this.disabled){
                    this.orgCode = '';
                    this.orgName = '';
                }
            },
            change: function (type, id) {
                const that = this
                that.getTreeType('orgCode')//获取组织的树；
                that.type = type
                if (type == "created") {
					common.triggerModal(id)
                }
                for(let i in that.edit) {
                    that.edit[i] = ""
                }
                that.edit.orgCode = commonConfig.nodeCode.organizationCode.orgCode
                that.edit.fatherPostCode = commonConfig.nodeCode.rootPostionCode
                that.edit.isDeleted = "0"
                that.modelTatle = "新增岗位信息"
                if (type == "edit") {
                    if(!that.selitem){
                        Toast(commonConfig.prompt.checkData)
                        return
                    }   
                    api.organzation.getPositionByPostCode({postCode: that.selitem})
                    .then(function (res) {
                        if (res.data.code == 'success') {
                            that.editlist = res.data.obj
                            that.modelTatle = "编辑岗位信息"
                            for(let i in that.edit) {
                                that.edit[i] = that.editlist[i] 
                            }
                            if (that.selitem) {
                                common.triggerModal(id)
                            }
                            // Toast(commonConfig.success.edit)
                        } else {
                        }
                    })
                    
                } else {
                    api.ordinalInfo.getSequence({
                            "serviceCode": commonConfig.ordinal.position
                        })
                        .then(function (res) {
                            if(res.data.code == 'success'){
                                that.edit.postCode = res.data.obj
                            }
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                }
            },
            //选中岗位角色状态
            getRole: function () {
                
                const _this = this
                this.getData()
                if (this.selitem) {
                    if(!this.showMenuModal) {
                        this.showMenuModal = true
                    }
                    api.addPostRole.postNotHaveRole({
                        "postCode": this.editlist.postCode,
                    })
                    .then(function (res) {
                        if (res.data.code == "success") {
                            _this.roleList = res.data.obj    //角色数据
                            _this.initOptionalItems = [];
                            if (res.data.obj.length != 0) {
                                res.data.obj.forEach((item) => {
                                    _this.initOptionalItems.push({
                                        name: item.roleName,
                                        value: item.roleCode
                                    })
                                })
                            }
                            if (res.data.obj.length == 0) {
                                Toast("暂无角色信息...")
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    api.addPostRole.postHaveRole({
                        "postCode": this.editlist.postCode,
                    })
                    .then(function (res) {
                        if (res.data.code == "success") {
                            _this.initSelectedItems = [];
                            if (res.data.obj.length != 0) {
                                res.data.obj.forEach((item) => {
                                    _this.initSelectedItems.push({
                                        name: item.roleName,
                                        value: item.roleCode
                                    })
                                })
                            }
                            if (res.data.obj.length == 0) {
                                Toast("暂无角色信息...")
                            }
                        }
                    })
                    .catch(function (error) {
                    })
                }

            },
            disappearMenuModal: function() { //控制弹出框关闭方法
               this.showMenuModal = false
            },
            insertRoleMenus: function(arr) {
                const _this = this
                let _params = [];
                if (arr.length != 0) {
                    for (let i = 0, len = arr.length; i<len; i++) {
                        let obj = {};
                        obj.postCode = this.editlist.postCode;
                        obj.roleCode = arr[i].value;
                        _params.push(obj)
                    }
                } else {
                    console.log(arr)
                    let obj = {}
                    obj.postCode = this.editlist.postCode;
                    obj.roleCode = ''
                    _params.push(obj)
                }
                
                api.postRole.insert(_params)
                .then(function (res) {
                    if (res.data.code == "success") {
                        _this.showMenuModal = false
                        Toast(commonConfig.success.addrole)
                    } else {
                    }
                })
                .catch(function (error) {
					console.log(error);
				})
            },
            //同步岗位数据
            cache: function () {
               api.organzation.cachePostionInfo({})
               .then(function (res) {
                   if (res.data.code == 'success') {
                       Toast(commonConfig.success.cache)
                   }
               })
            },
            //查询岗位信息
            getPositionList: function (pageNum) {
                this.selitem = ''
                const _this = this
                api.organzation.queryPosition({
                    "pageNums": commonConfig.pageNums,
                    "pageStart": pageNum?pageNum:_this.pager.page_no,
					"orgCode": _this.orgCode,
                    "postCode": _this.postCode,
					"postName": _this.postName,
                })
                .then(function (res) {
                    if(res.data.code == 'success') {
                        _this.detailList = res.data.obj.list
                        _this.startRow = res.data.obj.startRow
                        _this.pager.page_no = res.data.obj.pageNum;
						_this.total = res.data.obj.total;
						_this.pager.page_size = res.data.obj.pageSize;
                        if (res.data.obj.list.length == 0) {
                             _this.prompt = true
                        } else {
                            _this.prompt = false
                        }
                    } else {
                    }
                })
                .catch(function (error) {
					console.log(error);
				})
            },
            //新增岗位信息
            createdPosition: function () {
                const _this = this
                if (this.edit.postName == '') {
                    Toast('岗位名称不能为空')
                    return
                }
				// _this.edit.isDeleted = _this.status == "可用"?"0":"1"
                api.organzation.createdPosition({
                    "orgCode": _this.edit.orgCode,
                    "postCode": _this.edit.postCode,
                    "fatherPostCode": _this.edit.fatherPostCode,
                    "postName": _this.edit.postName,
                    "relationCodeList": _this.edit.relationCodeList,
                    "postTypeCode": _this.edit.postTypeCode,
                    "isDeleted": _this.edit.isDeleted

                })
                .then(function (res) {
                    if (res.data.code == 'success') {
                        _this.getPositionList()
                        $('#position').modal("hide");                      
                        Toast(commonconfig.success.add)
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
            },
            //编辑岗位信息
            editPosition: function () {
                const _this = this
                if (this.edit.postName == '') {
                    Toast('岗位名称不能为空')
                    return
                }
				// _this.edit.isDeleted = _this.status == "可用"?"0":"1"
                api.organzation.editPosition(_this.edit)
                .then(function (res) {
                    if (res.data.code == 'success') {
                        _this.getPositionList()
                        $('#position').modal("hide");
                        Toast(commonconfig.success.edit)
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
            },
            getData: function() {
                var $this = this;
                if(!$this.selitem){
                    Toast(commonConfig.prompt.checkData)
                    return
                }
                for(var i = 0,len = this.detailList.length; i < len; i++){
                    if(this.detailList[i].postCode == $this.selitem){
                        $this.editlist = this.detailList[i]
                    }
                }
            },
            pageChange:function(num, size){
                this.pager.page_no = num;
                this.getPositionList();
            },
            getTreeType: function(code) {
                if(code == 'orgCode'){
                    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                    let orgCode = userInfo['inCharegOrgVo'].orgCode; //员工组织编码
                    this.treeRootCode = orgCode
                }else{
                    this.treeRootCode = commonConfig.storeRoot[code];
                }
                this.getTree(code);
            },
            getTree(type, node, leaf) {
                const $this = this;
                let FunObj = {
                    orgCode:{
                        api: 'organzation',
                        childname:'childOrganizations',
                        param:'orgCode'
                    },
                    postCode:{
                        api: 'organzation',
                        childname:'childPositins',
                        param:'postCode',
                        paramName:'postName',
                    }
                };
                let $params = $this.treeRootCode, params, fn;
                if(type == 'orgCode'){
                    if(leaf) {
                        params = {"orgCode": node.orgCode}
                    } else {
                        params = {"orgCode": $params}
                    }
                    fn = api[FunObj[type].api].getOrganizationByOrgCode;
                }else{
                    if(leaf) {
                        params = {"postCode": node.postCode}
                    } else {
                        params = {"postCode": $params}
                    }
                    fn = api[FunObj[type].api].getPositionByPostCode;
                };
                fn(params).then(function(res){
                    if( res.data.code === 'success' ) {
                        if(res.data.obj) {
                            if (!leaf) {
                                $this.treeData = [];
                                $this.options.rootName = type != 'orgCode'? res.data.obj.postName:res.data.obj.orgName;
                            }
                            if($this.disabled && type == 'orgCode'){
                                $this.edit.orgName = $this.orgName
                                $this.edit.orgCode = $this.orgCode
                            }
                            let childname = res.data.obj[FunObj[type].childname];
                            if( childname ) {
                                var name = type != 'orgCode'?'postName':'orgName';
                                childname.forEach((item,index) => {
                                    let treeData = type == 'orgCode' ? {
                                        label: item[name],
                                        orgCode: item[FunObj[type].param],
                                        name: type,
                                        children:[],
                                        open: false,
                                        leaf: false
                                    } : {
                                        label: item[name],
                                        postCode: item[FunObj[type].param],
                                        postName: item[FunObj[type].paramName],
                                        name: type,
                                        children:[],
                                        open: false,
                                        leaf: false
                                    }
                                    if (leaf) {
                                        node.loading = false;
                                        node.open = true;
                                        node.children.push(treeData);
                                    } else {
                                        $this.treeData.push(treeData);
                                    }
                                })
                            } else {
                                if (leaf) {
                                    node.loading = false;
                                    node.leaf = true;
                                }
                            }

                        }
                    }
                });
            },
            
            getRootUpdata(rootCode) {
				// this.edit.fatherPostCode = rootCode;
			},
            getRootAdd(rootCode, name, rootOrgCode) {
                console.log(rootCode + "----------" +name +  "--------" +rootOrgCode)
				this.edit.fatherPostCode = rootCode;
                this.edit.orgCode = rootOrgCode;
			},
            itemClick(node) {
				// this.edit.fatherPostCode = node.postCode;
			},
            addClick(node) {
                if (node.name == 'orgCode') {
                    this.edit[node.name] = node.orgCode;
                    this.edit.orgName = node.label
                } else {
                    this.edit.fatherPostCode = node.postCode;
                    this.edit.fatherPostName = node.postName;
                }
			},
            async loadingChild(node, index) {
				let _this = this;
				try {
				let data = await new Promise((resolve, reject) => {
                    this.getTree(node.name, node, true)
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
        components: {
            pager,
            selectModal,
            'ZTree' : ZTree
        }
    }
</script>

<style>
    .tree-height {
        height: 343px;
        overflow: auto;
    }
    .scroll-y {
        overflow: auto;
        overflow-x: hidden;
    }
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
