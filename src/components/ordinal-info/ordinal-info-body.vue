<template>
    <div>
        <div class="row margin-top-20">
            <div class="col-md-12">
                <div class="portlet box">
                    <div class="portlet-body form">
                        <!--FORM BEGIN-->
                        <form class="form-horizontal">
                            <div class="form-body">
                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <label class="control-label col-md-4">业务应用编码</label>
                                        <div class="col-md-8">
                                            <input type="text" v-model="serviceCode" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="control-label col-md-4">业务应用名称</label>
                                        <div class="col-md-8">
                                            <input v-model="serviceName" type="text" class="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <label class="control-label col-md-4">前缀</label>
                                        <div class="col-md-8">
                                            <input v-model="prefixCode" type="text" class="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-12 text-right">
                                        <span class="btn btn-default" @click="reset">重置</span>
                                        <span class="btn btn-primary" @click="searchList(1);">查询</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <!--FORM END-->
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="portlet box">
                    <div class="portlet-body">
                        <div class="bootstrap-table bordered">
                            <div class="fixed-table-toolbar">
                                <div class="columns columns-left margin-left-10 margin-bottom-10">
                                    <a class="btn btn-primary" @click="addOrEdit('add')" data-toggle="modal" href="#addinfo">新增</a>
                                    <a class="btn btn-success" data-toggle="modal" href="#addinfo" @click="addOrEdit('edit')" v-show="selitem">编辑</a>
                                    <a class="btn btn-success" href="javascript:;" @click="getData" v-show="!selitem">编辑</a>
                                    <span class="btn btn-warning pull-right dataSync" @click="dataSync()">同步数据</span>
                                </div>
                            </div>
                            <div class="table-container">
                                <div class="fixed-table-body height-550 scroll">
                                    <table class="table table-striped table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th class="text-center">选择</th>
                                                <th class="text-center">序号</th>
                                                <th class="text-center">业务应用编码</th>
                                                <th class="text-center">业务应用名称</th>
                                                <th class="text-center">前缀</th>
                                                <th class="text-center">状态</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in tableData.list">
                                                <td class="text-center"><input name="selitem" type="radio" v-model="selitem" :value="item.serviceCode"></td>
                                                <td>{{index + startRow}}</td>
                                                <td>{{item.serviceCode}}</td>
                                                <td>{{item.serviceName}}</td>
                                                <td>{{item.prefixCode}}</td>
                                                <td class="text-center">{{item.isDeleted=="0"?"可用":"停用"}}</td>
                                            </tr>
                                            <tr v-if="!tableData.list || tableData.list.length == 0">
                                                <td colspan="6">暂无数据...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <pager class="margin-left-10" @page-change="pageChange" :page-no="pager.page_no" :page-size="pager.page_size" :total-result="total">
                                    <!--@page-change="pageChange"-->
                                </pager>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- start-updata-modal -->
        <div class="modal fade" id="addinfo" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                        <h4 class="modal-title text-center" v-text="type=='add'?'新增业务序列信息':'编辑业务序列信息'">业务序号信息</h4>
                    </div>
                    <div class="modal-body form">
                        <form class="form-horizontal">
                            <div class="form-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">编码 *</label>
                                            <div class="col-md-8">
                                                <input v-model="addserviceCode" :readonly="type!='add'?true:false" type="text" class="form-control" placeholder="必填" :class="{ require : required.serviceCode }"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">名称 *</label>
                                            <div class="col-md-8">
                                                <input type="text" v-model="addserviceName" class="form-control" placeholder="必填" :class="{ require : required.serviceName}"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">前缀 *</label>
                                            <div class="col-md-8">
                                                <input type="text" v-model="addprefixCode" class="form-control" placeholder="必填" :class="{ require : required.prefixCode}"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">下一个序列号值 *</label>
                                            <div class="col-md-8">
                                                <input type="text" v-model="addnextValue" class="form-control" placeholder="必填" :class="{ require : required.nextValue}"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">设置序列号长度 *</label>
                                            <div class="col-md-8">
                                                <input type="text" v-model="addnvLength" class="form-control" placeholder="必填" :class="{ require : required.nvLength}"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">时间戳</label>
                                            <div class="col-md-8">
                                                <select class="form-control" name="addTimeFlag" v-model="addTimeFlag">
                                                                                                <option v-for="item in addTimeFlags" :value="item.value">{{item.text}}</option>
                                                                                            </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">随机</label>
                                            <div class="col-md-8">
                                                <select class="form-control" name="addrandomFlag" v-model="addrandomFlag">
                                                                                                <option v-for="item in addrandomFlags" :value="item.value">{{item.text}}</option>
                                                                                            </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">重置</label>
                                            <div class="col-md-8">
                                                <select class="form-control" name="addreinitFlag" v-model="addreinitFlag">
                                                                                                <option v-for="item in addreinitFlags" :value="item.value">{{item.text}}</option>
                                                                                            </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-3 col-sm-3">时间戳格式</label>
                                            <div class="col-md-8">
                                                <select class="form-control" name="addtimeFormat" v-model="addtimeFormat">
                                                                                                <option v-for="item in addtimeFormats" :value="item.value">{{item.text}}</option>
                                                                                            </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label  col-md-3 col-sm-3">状态</label>
                                            <div class="col-md-8">
                                                <select class="form-control" v-model="isDeleted">
                                                                                                <option v-for="item in status" :value="item.value">{{item.text}}</option>
                                                                                            </select>
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
                                                <button type="button" @click="type=='add'?addinfo():edit()" class="btn btn-primary">确定</button>
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
    </div>
</template>

<script>
    import pager from '../common/pager/Pager.vue';
    import api from '../common/api.js';
    import {
        Toast
    } from 'mint-ui';
    import common from "../../assets/js/common.js";
    import commonConfig from "../common/commonConfig.js";
    export default {
        data() {
            return {
                status: [{
                    value: "0",
                    text: "可用"
                }, {
                    value: "1",
                    text: "停用"
                }],
                addtimeFormats: [{
                    value: "YYYYMMDD",
                    text: "YYYYMMDD"
                }, {
                    value: "YYMMDD",
                    text: "YYMMDD"
                }, {
                    value: "YYYY",
                    text: "YYYY"
                }, {
                    value: "YY",
                    text: "YY"
                }, {
                    value: "MMDD",
                    text: "MMDD"
                }, {
                    value: "MM",
                    text: "MM"
                }, {
                    value: "DD",
                    text: "DD"
                }],
                addreinitFlags: [{
                    value: "1",
                    text: "需要"
                }, {
                    value: "0",
                    text: "不需要"
                }],
                addrandomFlags: [{
                    value: "1",
                    text: "是"
                }, {
                    value: "0",
                    text: "否"
                }],
                addTimeFlags: [{
                    value: "1",
                    text: "是"
                }, {
                    value: "0",
                    text: "否"
                }],
                prefixCode: '',
                serviceCode: '',
                serviceName: '',
                id: "",
                isDeleted: "0",
                addprefixCode: '',
                addserviceCode: '',
                addserviceName: '',
                addTimeFlag: '1',
                addinitTime: '0',
                addnextValue: '',
                addnvLength: '',
                addrandomFlag: '1',
                addreinitFlag: '0',
                addtimeFormat: 'YYYYMMDD',
                startRow: "", //每页第一行数据在数据库中的序号
                forbid: '',
                selitem: '',
                tableData: {},
                currlist: {},
                type: '', // 区别编辑 还是 新增
                pager: {
                    page_no: 1, //当前页数
                    page_size: 15, //每页显示数
                    sort_name: 'id',
                    is_desc: false
                },
                total: 1, //总条数
                required: {
                    serviceCode: false,
                    serviceName: false,
                    prefixCode: false,
                    nextValue: false,
                    nvLength: false
                }
            };
        },
        created() {},
        components: {
            pager
        },
        methods: {
            //点击新增按钮
            addOrEdit: function(type, id) {
                const $this = this
                if (type == "add") {
                    common.triggerModal(id)
                }
                this.type = type;
                this.addprefixCode = ''
                this.addserviceCode = ''
                this.addserviceName = ''
                this.addTimeFlag = '1'
                this.addnextValue = ''
                this.addnvLength = ''
                this.addrandomFlag = '1'
                this.addreinitFlag = '0'
                this.addtimeFormat = 'YYYYMMDD'
                this.isDeleted = "0"
                if (type == 'edit') {
                    if (this.selitem) {
                        common.triggerModal(id)
                    }
                    this.getData();
                    this.id = this.currlist.id;
                    this.addserviceCode = this.currlist.serviceCode;
                    this.addserviceCode = this.currlist.serviceCode;
                    this.addserviceName = this.currlist.serviceName;
                    this.addprefixCode = this.currlist.prefixCode;
                    this.addinitTime = this.currlist.initTime;
                    this.addnextValue = this.currlist.nextValue;
                    this.addnvLength = this.currlist.nvLength;
                    this.isDeleted = this.currlist.isDeleted;
                    this.addTimeFlag = this.currlist.addTimeFlag;
                    this.addrandomFlag = this.currlist.addrandomFlag;
                    this.addreinitFlag = this.currlist.addreinitFlag;
                }
            },
            //新增 确定
            addinfo: function() {
                const _this = this
                if(!this.addserviceCode) {
                    this.required.serviceCode = true
                    return 
                }else if(!this.addserviceName) {
                    this.required.serviceName = true
                    return 
                }else if(!this.addprefixCode) {
                    this.required.prefixCode = true
                    return 
                }else if(!this.addnextValue) {
                    this.required.nextValue = true
                    return 
                }else if(!this.addnvLength) {
                    this.required.nvLength = true
                    return 
                }
                api.ordinalInfo.insert({
                    "prefixCode": _this.addprefixCode,
                    "serviceCode": _this.addserviceCode,
                    "serviceName": _this.addserviceName,
                    "addTimeFlag": _this.addTimeFlag,
                    "initTime": _this.addinitTime,
                    "nextValue": _this.addnextValue,
                    "nvLength": _this.addnvLength,
                    "randomFlag": _this.addrandomFlag,
                    "reinitFlag": _this.addreinitFlag,
                    "timeFormat": _this.addtimeFormat,
                    "isDeleted": _this.isDeleted
                }).then(function(res) {
                    if (res.data.code == 'success') {
                        $('#addinfo').modal('hide')
                        var data = res.data;
                        _this.searchList()
                        Toast(commonConfig.success.add)
                    }
                })
            },
            reset() {
                this.serviceCode = ""
                this.serviceName = ""
                this.prefixCode = ""
            },
            //查询
            searchList: function(pageNum) {
                var $this = this;
                api.ordinalInfo.search({
                    "serviceCode": this.serviceCode,
                    'serviceName': this.serviceName,
                    'prefixCode': this.prefixCode,
                    'pageNums': commonConfig.pageNums,
                    'pageStart': pageNum ? pageNum : this.pager.page_no
                }).then(function(data) {
                    var data = data.data;
                    if (data.code == 'success') {
                        $this.startRow = data.obj.startRow
                        $this.tableData = data.obj;
                        $this.pager.page_no = data.obj.pageNum;
                        $this.total = data.obj.total;
                        $this.pager.page_size = data.obj.pageSize;
                    }
                });
            },
            // 编辑
            edit: function() {
                var $this = this;
                if(!this.addserviceName) {
                    this.required.serviceName = true
                    return 
                }else if(!this.addprefixCode) {
                    this.required.prefixCode = true
                    return 
                }else if(!this.addnextValue) {
                    this.required.nextValue = true
                    return 
                }else if(!this.addnvLength) {
                    this.required.nvLength = true
                    return 
                }
                api.ordinalInfo.edit({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "id": $this.id,
                        "serviceCode": $this.addserviceCode,
                        'serviceName': $this.addserviceName,
                        'prefixCode': $this.addprefixCode,
                        "addTimeFlag": $this.addTimeFlag,
                        "initTime": $this.addinitTime,
                        "nextValue": $this.addnextValue,
                        "nvLength": $this.addnvLength,
                        "randomFlag": $this.addrandomFlag,
                        "reinitFlag": $this.addreinitFlag,
                        "timeFormat": $this.addtimeFormat,
                        "isDeleted": $this.isDeleted
                    })
                }).then(function(res) {
                    if (res.data.code == "success") {
                        $('#addinfo').modal('hide')
                        var data = res.data;
                        $this.searchList();
                        Toast(commonConfig.success.edit)
                    }
                })
            },
            getData: function() {
                var $this = this;
                if (!$this.selitem) {
                    Toast(commonConfig.prompt.checkData)
                    return;
                }
                for (var i = 0, len = this.tableData.list.length; i < len; i++) {
                    if (this.tableData.list[i].serviceCode == $this.selitem) {
                        $this.currlist = this.tableData.list[i]
                    }
                }
            },
            pageChange: function(num, size) {
                this.pager.page_no = num;
                this.searchList();
            },
            dataSync: function() {
                api.ordinalInfo.dataSync({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({})
                }).then(function(res) {
                    if (res.data.code == 'success') {
                        Toast(commonConfig.success.cache)
                    }
                })
            }
        },
        watch: {
            addserviceCode(val) {
                if(val) {
                    this.required.serviceCode = false
                }
            },
            addserviceName(val) {
                if(val) {
                    this.required.serviceName = false
                }
            },
            addprefixCode(val) {
                if(val) {
                    this.required.prefixCode = false
                }
            },
            addnextValue(val) {
                if(val) {
                    this.required.nextValue = false
                }
            },
            addnvLength(val) {
                if(val) {
                    this.required.nvLength = false
                }
            }
        }
    }
</script>
<style scoped>
.require {
    border-color: #f86c6b;
}
</style>


