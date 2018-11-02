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
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label col-md-4">岗位类型编码</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" v-model="postTypeCode"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label col-md-4">岗位类型名称</label>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" v-model="postTypeName"/>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-md-12 text-right">
                                        <button type="button" class="btn btn-default" @click="">重置</button>
                                        <button type="button" class="btn btn-primary" @click="getDetailsList(1)">查询</button>
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
                            <!-- <button class="btn btn-primary" title="新增" type="button" data-toggle="modal" @click="change('created', '#position')">新增</button>
                            <button class="btn btn-success" title="更新" type="button" data-toggle="modal" @click="change('edit', '#position')">编辑</button> -->
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
                                        <th class="text-center">岗位类型编码</th>
                                        <th class="text-center">岗位类型名称</th>
                                        <th class="text-center">状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in detailList" :key="index">
                                        <td class="text-center"><input type="radio" name="dictionaryDetails" v-model="selitem" :value="item.refDetailCode"></td>
                                        <td>{{index + startRow}}</td>
                                        <td>{{item.refDetailCode}}</td>
                                        <td>{{item.refDetailName}}</td>
                                        <!-- <td v-if="insert.refCode == 'GPSortTypeCode'">{{item.addField1}}</td> -->
                                        <td class="text-center">{{item.isDeleted == '0'?"可用":"停用"}}</td>
                                    </tr>
                                    <tr v-if="prompt">
                                        <td colspan="8">暂无数据...</td>
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
        <select-modal
                :show="showMenuModal"
                :options="selectOptions"
                :initOptionalItems="initOptionalItems"
                :initSelectedItems="initSelectedItems"
                @close-select-modal="disappearMenuModal"
                @commit="insertRoleMenus">
                <template slot="footer">
                    <div class="row">
                        <input type="text" class="selected col-md-4" v-model="selectedall"/>
                        <button type="button" class="btn btn-primary selectedbtn" @click="selecteds()">查询</button>
                    </div>
                </template>
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
        data() {
            return {
                selectedall: "",
                detailList: [],
                startRow: [],
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
                postTypeCode: "",
                postTypeName: "",
                // ref: {
				// 	refCode: "",
				// 	refName: ""
				// },
                positionType: [],        //岗位类型
                roleList: {},            //角色信息列表
                checkedRoles: [],        //选中的角色
                startRow: "",           //每页第一行数据在数据库中的序号
                prompt: true,           //无数据时提示
                type: '',
                selitem: '',
                editlist:{},
                //分页数据
				pager: {
                    page_no: 1,  //当前页数
                    page_size: 15, //每页显示数
                    sort_name: 'id',
                    is_desc: false
                },
                total: 1,  //总条数
                showMenuModal: false,           // 控制弹出框显示与否标志位
                selectOptions: {
                    title: '岗位添加角色', //多选弹出框主标题
                    optionalTitle: '岗位没有的角色', //多选弹出框可选项标题
                    selectedIitle: '岗位已有的角色' //多选弹出框已选项标题
                },
                initOptionalItems: [], //初始化可选项
                initSelectedItems: [], //初始化已选项
            }
        },
        created () {
        },
        methods: {
            //搜索查询
            selecteds() {
                api.getpostType.getqueryno({"roleName": this.selectedall,"postTypeCode": this.editlist.refDetailCode}, res => {
                        if (res.data.code == "success") {
                            this.initOptionalItems = [];
                            if (res.data.obj.length != 0) {
                                res.data.obj.forEach((item) => {
                                    this.initOptionalItems.push({
                                        name: item.roleName,
                                        value: item.roleCode
                                    })
                                })
                            }
                        }
                    })
            },
            //点击查询
            getDetailsList: function(pageNum) {
                const _this = this
                this.selitem = ''
                api.queryDictionaryDetails({
                        "pageNums": commonConfig.pageNums,
                        "pageStart": pageNum ? pageNum : _this.pager.page_no,
                        "refCode": "PositionType",
                        "refDetailCode": _this.postTypeCode,
                        "refDetailName": _this.postTypeName
                    })
                    .then(function(res) {
                        if (res.data.code == 'success') {
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
                        }
                    }).catch((error) => {
                    })
            },
            //点击添加角色
            getRole: function () {
                const _this = this
                this.getData()
                //首先判断是否选中  和选中的值
                if (this.selitem) {
                    if(!this.showMenuModal) {
                        this.showMenuModal = true
                    }
                    api.getpostType.getqueryno({"postTypeCode": this.editlist.refDetailCode}, res => {
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
                    api.getpostType.getqueryshow({"postTypeCode": this.editlist.refDetailCode} ,res => {
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
                }

            },
            //分页查询
            pageChange: function(num, size) {
                this.pager.page_no = num;
                this.getDetailsList();
            },
            //同步数据
            cache: function() {
                api.cacheDataDictionary({})
                    .then(function(res) {
                        if (res.data.code == 'success') {
                            Toast(commonConfig.success.cache)
                        }
                    })
                    .catch(function(error) {});
            },
            //判断是否为空      并且把当前的
            getData: function() {
                var $this = this;
                if (!$this.selitem) {
                    Toast('请选择');
                    return;
                }
                for (var i = 0, len = this.detailList.length; i < len; i++) {
                    if (this.detailList[i].refDetailCode == $this.selitem) {
                        $this.editlist = this.detailList[i]
                    }
                }
            },
            disappearMenuModal: function() { //控制弹出框关闭方法
               this.showMenuModal = false
            },
            //插入
            insertRoleMenus: function(arr) {
                const _this = this
                let _params = {
                      postTypeCode: this.editlist.refDetailCode,  //岗位类型编码
                      postTypeName: this.editlist.refDetailName, //岗位类型名称
                      roleInfoVos: []
                };
                if (arr.length != 0) {
                    for (let i = 0, len = arr.length; i<len; i++) {
                        _params.roleInfoVos.push({
                            roleCode: arr[i].value,
                            roleName: arr[i].name
                        })
                    }
                } else {
                    _params.roleInfoVos.push({
                        roleCode: '',
                        roleName: ''
                    })
                }
                api.getpostType.insert(_params, res => {
                if (res.data.code == "success") {
                        _this.showMenuModal = false
                        Toast(commonConfig.success.addrole)
                    } else {
                    }
                })
            },
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
    .selected {
        margin-left: 2%;
    }
    .selectedbtn {
        margin-left: 10px;
    }
</style>